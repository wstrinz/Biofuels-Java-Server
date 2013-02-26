require_relative "server_wrapper"

unless ARGV.first==false
`javac -cp json-simple-1.1.1.jar *.java` # attempt to compile server
end

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