module WebsocketHelper
  def open_pipes(mode)
    if mode == "pipes"
      puts 'rails opening pipes'
      puts @rpipe = open("#{Rails.root}/pipes/javapipe",'r+')
      puts @wpipe = open("#{Rails.root}/pipes/rubypipe",'w+')
    else
      puts 'rails connecting to redis'
      uri = URI.parse("redis://redistogo:1f736fa2a27319dc45b7ebb470e04bbe@dory.redistogo.com:10177/")
      @red = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
      @blu = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
    end
    # #puts "#{File.exist?('~/javapipe')}"
    # Dir.chdir(File.dirname(__FILE__))


  end

  def write_pipe(msg)
    # puts "writing #{msg} to "

    @wpipe.puts(msg)
    @wpipe.flush
  end

  def read_pipe
    @rpipe.gets
  end

  def write_queue(msg)
    puts "writing #{msg}"
    @red.lpush("toJava", msg)
  end

  def read_queue
    # puts "waiting to read"
    @blu.brpop("fromJava")[1]
    # puts "read"
  end

end