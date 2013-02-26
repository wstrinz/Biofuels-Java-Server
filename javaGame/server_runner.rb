if ARGV.first
  puts `javac -cp json-simple-1.1.1.jar *.java` # attempt to compile server
end


require_relative "server_wrapper"


if !File.exist?("../pipes/javapipe")
  puts 'making javapipe'
  # File.delete('javapipe')
  `mkfifo ".."/pipes/javapipe`
end

if !File.exist?("../pipes/rubypipe")
  puts 'making rubypipe'
  # File.delete('rubypipe')
  `mkfifo ".."/pipes/rubypipe`
end

s = ServerWrapper.new

s.watch