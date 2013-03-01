module WebsocketHelper
  # def open_pipes(mode)
  #   if mode == "pipes"
  #     puts 'rails opening pipes'
  #     puts write = open("#{Rails.root}/pipes/javapipe",'r+')
  #     puts read = open("#{Rails.root}/pipes/rubypipe",'w+')
  #   else
  #     puts 'rails connecting to redis'
  #     uri = URI.parse("redis://redistogo:1f736fa2a27319dc45b7ebb470e04bbe@dory.redistogo.com:10177/")
  #     write = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
  #     read = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
  #   end
  #   puts "array #{[write,read]}"
  #   [write,read]
  #   # #puts "#{File.exist?('~/javapipe')}"
  #   # Dir.chdir(File.dirname(__FILE__))
  # end

  def write_pipe(pipe, msg)
    # puts "writing #{msg} to "

    pipe.puts(msg)
    pipe.flush
  end

  # def read_pipe
  #   red.gets
  # end

  def write_queue(msg)
    puts "writing #{msg}"
    REDISREAD.lpush("toJava", msg)
  end

  def read_queue(blocking)
    # puts "waiting to read"
    if blocking==false

      REDISWRITE.rpop("fromJava")
    else

      REDISWRITE.brpop("fromJava")[1]
    end
    # puts "read"
  end

end