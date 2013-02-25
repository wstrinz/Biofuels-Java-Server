module WebsocketHelper
  def open_pipes
    puts 'rails opening pipes'
    #puts "#{File.exist?('~/javapipe')}"
    Dir.chdir(File.dirname(__FILE__))

    # if !File.exist?("#{Rails.root}/pipes/javapipe")
    #   puts 'making javapipe'
    #   # File.delete('javapipe')
    #   `mkfifo "#{Rails.root}"/pipes/javapipe`
    # end

    # if !File.exist?("#{Rails.root}/pipes/rubypipe")
    #   puts 'making rubypipe'
    #   # File.delete('rubypipe')
    #   `mkfifo "#{Rails.root}"/pipes/rubypipe`
    # end
    puts @rpipe = open("#{Rails.root}/pipes/javapipe",'r+')
    puts @wpipe = open("#{Rails.root}/pipes/rubypipe",'w+')

  end

  def write_pipe(msg)
    puts "writing #{msg} to "
    # unless @wpipe
    #   open_pipes
    # end
    @wpipe.puts(msg)
    @wpipe.flush
  end

  def read_pipe
    # unless @rpipe
    #   open_pipes
    # end
    @rpipe.gets
  end

  def watch_pipe

  end
end