require 'websocket_helper'
require 'net/http'

class WebsocketController < WebsocketRails::BaseController

  include WebsocketHelper

  def initialize_session
    unless controller_store[:id_num]
      controller_store[:id_num] = 0
      Thread.abort_on_exception = true
      Thread.new do
        logger.info "starting listener"
        # watch_pipe('redis')
        subscribe_to_redis
      end
    end
  end

  def connected
    logger.info "connection made!"
    # send_message :test, "hello!"
  end

  def send_event(send_channel, msg)
    if send_channel
      WebsocketRails[:"#{send_channel}"].trigger(:event, msg)
    else
      logger.info "no channel specified, skipping #{msg}"
      # WebsocketRails[:"#{controller_store[:current_event_id]}"].trigger(:event, msg)
    end

    # send_message :event, msg
  end

  def receive_event
    logger.info "received #{message}"
    controller_store[:current_event_id] = message[0]
    jss = ActiveSupport::JSON.decode(message[2])
    jss["clientID"] = message[0]
    jss["roomID"] = message[1]
    jss["deviseName"] = "#{current_user.email}"
    # write_pipe(ActiveSupport::JSON.encode(jss))
    if(jss["event"] == "changeSettings")
      send_event(jss["roomName"],ActiveSupport::JSON.encode(jss))
    end
    # logger.info "current #{current_user.email}"
    # else
    #if @mode == "redis"
      write_queue(ActiveSupport::JSON.encode(jss))
    #else
     # write_pipe(ActiveSupport::JSON.encode(jss))
    # end
    # end
    # logger.info "wrote"
  end

  def get_new_id
    logger.info "assign"
    # logger.info "assigned #{controller_store[:id_num]}"
    trigger_success "#{controller_store[:id_num]}"
    controller_store[:id_num] += 1
  end

  def clean_environment
    logger.info "__\nclearing environment\n__"
    event = {"event"=>"clearAllGames"}
    write_queue(ActiveSupport::JSON.encode(event))

    trigger_success "succ"
  end


  def watch_pipe(mode)
    loop do
      # if mode == "redis"
      # logger.info "check queue"
      str = read_queue(true)
      # logger.info "read queue"
      logger.info "got #{str}"
      # else
      #   str = read_pipe
      # end
      obj = ActiveSupport::JSON.decode(str);

      if(obj["event"] == "changeSettings")
        send_channel = obj["roomName"]
      else
        send_channel = obj["clientID"]    #redundant?
      end

      logger.info "Sending #{str} to #{send_channel}"

      send_event(send_channel,str)
    end
  end

  def check_model
    url = URI.parse('http://localhost:4567/start')
    # if ENV["RAILS_ENV"] == "development"
    #   url = URI.parse('http://localhost:4567/start')
    # else
    #   url = URI.parse('http://mysterious-cliffs-4762.herokuapp.com/start')
    # end
    req = Net::HTTP::Get.new(url.path)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    trigger_success
  end

  def subscribe_to_redis
    redis = REDISLOCALR
    # if ENV["RAILS_ENV"] == "development"
    #   redis = REDISLOCALR
    # else
    #   redis = REDISREAD
    # end
    logger.info "subscribing"
    redis.subscribe(:toRuby) do |on|
      on.message do |channel, msg|
        data = JSON.parse(msg)
        logger.info "sending #{msg}"
        send_event(data["clientID"], msg)
        # logger.info "##{channel} - [#{data['user']}]: #{data['msg']}"
    end
  end
end
end