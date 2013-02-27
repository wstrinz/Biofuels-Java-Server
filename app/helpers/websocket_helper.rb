module WebsocketHelper
  def open_pipes
    puts 'rails opening pipes'
    #puts "#{File.exist?('~/javapipe')}"
    Dir.chdir(File.dirname(__FILE__))

    puts @rpipe = open("#{Rails.root}/pipes/javapipe",'r+')
    puts @wpipe = open("#{Rails.root}/pipes/rubypipe",'w+')

  end

  def write_pipe(msg)
    # puts "writing #{msg} to "

    @wpipe.puts(msg)
    @wpipe.flush
  end

  def read_pipe

    @rpipe.gets
  end
end