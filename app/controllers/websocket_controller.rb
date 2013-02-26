require 'websocket_helper'

class WebsocketController < WebsocketRails::BaseController

  include WebsocketHelper

  def initialize_session
    @id = 0
    open_pipes
  end

  def connected
    puts "connection made!"

    # watch_pipe

    Thread.new do
      loop do
        str = read_pipe
        # puts self
        puts "Sending #{str}"
        send_event str
      end
    end
  end

  def send_event(msg)
    # puts "sending #{msg}"
    WebsocketRails[:"#{@current_event_id}"].trigger(:event, msg)     # also a hack

    # send_message :event, msg
  end

  def receive_event
    @current_event_id = message[0]  #this is temporary; still doesn't work concurrently
    puts "received #{message}"
    write_pipe(message[1])
  end

  def get_new_id
    trigger_success "#{@id}"
    @id += 1
  end
end