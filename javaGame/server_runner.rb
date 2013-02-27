if ARGV.first
  puts `javac -cp json-simple-1.1.1.jar *.java` # attempt to compile server
end


require_relative "server_wrapper"

scriptloc = File.expand_path(File.dirname(__FILE__))


if !File.exist?(File.join(scriptloc, "../pipes/javapipe"))
  puts 'making javapipe'
  # File.delete('javapipe')
  `mkfifo "#{scriptloc}"/../pipes/javapipe`
end

if !File.exist?(File.join(scriptloc,"../pipes/rubypipe"))
  puts 'making rubypipe'
  # File.delete('rubypipe')
  `mkfifo "#{scriptloc}"/../pipes/rubypipe`
end

s = ServerWrapper.new

s.watch