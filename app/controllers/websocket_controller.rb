require 'websocket_helper'
require 'net/http'

class WebsocketController < WebsocketRails::BaseController

  include WebsocketHelper

  def initialize_session
    unless controller_store[:id_num]
      controller_store[:id_num] = 0
    end
    # unless controller_store[:pipes]
    #   puts "opening pipes"
    #   pipes = open_pipes("redis")
    #   puts pipes
    #   puts "setting pipes to #{{write: pipes[0], read: pipes[1]}}"
    #   controller_store[:pipes] = {write: pipes[0], read: pipes[1]}
    # end
  end

  def connected
    puts "connection made!"
    Thread.new do
      watch_pipe("redis")
    end
  end

  def send_event(send_channel, msg)
    if send_channel
      WebsocketRails[:"#{send_channel}"].trigger(:event, msg)
    else
      puts "no channel specified, skipping #{msg}"
      # WebsocketRails[:"#{controller_store[:current_event_id]}"].trigger(:event, msg)
    end

    # send_message :event, msg
  end

  def receive_event
    controller_store[:current_event_id] = message[0]
    jss = ActiveSupport::JSON.decode(message[1])
    jss["clientID"] = message[0]
    puts "received #{message}"
    # write_pipe(ActiveSupport::JSON.encode(jss))
    if(jss["event"] == "changeSettings")
      send_event(jss["roomName"],ActiveSupport::JSON.encode(jss))
    end
    # else
    #if @mode == "redis"
      write_queue(ActiveSupport::JSON.encode(jss))
    #else
     # write_pipe(ActiveSupport::JSON.encode(jss))
    # end
    # end
    # puts "wrote"
  end

  def get_new_id
    trigger_success "#{controller_store[:id_num]}"
    controller_store[:id_num] += 1
  end

  def watch_pipe(mode)
    loop do
      # if mode == "redis"
      # puts "polling"
      str = read_queue(true)
      puts str
      # else
      #   str = read_pipe
      # end
      obj = ActiveSupport::JSON.decode(str);

      if(obj["event"] == "changeSettings")
        send_channel = obj["roomName"]
      else
        send_channel = obj["clientID"]    #redundant?
      end

      puts "Sending #{str} to #{send_channel}"

      send_event(send_channel,str)
    end
  end

  def check_model
    # url = URI.parse('http://localhost:4567/start')
    url = URI.parse('http://mysterious-cliffs-4762.herokuapp.com/start')
    req = Net::HTTP::Get.new(url.path)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    trigger_success
  end
end