require 'websocket_helper'

class WebsocketController < WebsocketRails::BaseController

  include WebsocketHelper

  def initialize_session
    @id = 0
    @mode = "redis"
    open_pipes(@mode)
  end

  def connected
    puts "connection made!"
    Thread.new do
      watch_pipe
    end
  end

  def send_event(send_channel, msg)
    # puts "sending #{msg}"
    if send_channel #.nil?
      #puts send_channel
      WebsocketRails[:"#{send_channel}"].trigger(:event, msg)
    else
      WebsocketRails[:"#{@current_event_id}"].trigger(:event, msg)     # also a hack
    end

    # send_message :event, msg
  end

  def receive_event
    @current_event_id = message[0]  #this is temporary; still doesn't work concurrently
    jss = ActiveSupport::JSON.decode(message[1])
    # puts jss
    jss["clientID"] = message[0]
    puts "received #{message}"
    # write_pipe(ActiveSupport::JSON.encode(jss))
    if(jss["event"] == "changeSettings")
      send_event(jss["roomName"],ActiveSupport::JSON.encode(jss))
    else
      if @mode == "redis"
        write_queue(ActiveSupport::JSON.encode(jss))
      else
        write_pipe(ActiveSupport::JSON.encode(jss))
      end
    end
    # puts "wrote"
  end

  def get_new_id
    trigger_success "#{@id}"
    @id += 1
  end

  def watch_pipe
    loop do
      if @mode == "redis"
        str = read_queue
      else
        str = read_pipe
      end
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
end