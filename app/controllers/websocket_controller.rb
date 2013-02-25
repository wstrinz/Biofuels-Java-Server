require 'websocket_helper'

class WebsocketController < WebsocketRails::BaseController

  include WebsocketHelper

  def initialize_session
    open_pipes
  end

  def connected
    puts "connection madeified!"
    # watch_pipe

    Thread.new do
      loop do
        str = read_pipe

        puts "Broadcasting #{str}"
        send_event str
      end
    end

    # trigger_success (message: 'awesome level is sufficient')

#    render :nothing => true

    # respond_to do |format|
    #   format.html
    # end
  end

  def send_event(msg)
    # puts "sending #{msg}"
    broadcast_message :event, msg
  end

  def receive_event
    puts "received #{message}"
    write_pipe(message)
  end
end