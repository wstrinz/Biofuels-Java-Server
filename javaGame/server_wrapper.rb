require 'java'
require_relative 'GPT.jar'
java_import('EventHandler')

class ServerWrapper

  def open_pipes
    puts 'server opening pipes'
    scriptloc = File.expand_path(File.dirname(__FILE__))

    puts @rpipe = open(File.join(scriptloc, "../pipes/rubypipe"),'r+')
    puts @wpipe = open(File.join(scriptloc, "../pipes/javapipe"),'w+')

    @event_handler = EventHandler.new
  end

  def write_pipe(msg)
    @wpipe.puts(msg)
    @wpipe.flush
  end

  def read_pipe
    @rpipe.gets
  end

  def watch
    open_pipes
    loop do
      str = read_pipe
      puts str
      write_pipe(@event_handler.handle(str))
    end
  end

end
