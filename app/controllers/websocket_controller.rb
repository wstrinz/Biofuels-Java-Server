require 'websocket_helper'

class WebsocketController < WebsocketRails::BaseController

  include WebsocketHelper

  def initialize_session
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

#    render :nothing => true

    # respond_to do |format|
    #   format.html
    # end
  end

  def send_event(msg)
    # puts "sending #{msg}"
    # WebsocketRails[:"bla"].trigger(:event, "blaaaaa");
    send_message :event, msg
  end

  def receive_event
    puts "received #{message}"
    write_pipe(message)
  end
end