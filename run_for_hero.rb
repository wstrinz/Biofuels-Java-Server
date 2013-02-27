def runGame
puts "rvm jruby exec ruby javaGame/server_runner.rb"

pid1 = Process.spawn("rvm jruby exec ruby javaGame/server_runner.rb true")


# Process.detach(pid)

puts "rvm 1.9.3 exec rails server"
pid2 = Process.spawn("rvm 1.9.3 exec rails server")

[pid1, pid2]
# ensure
#   Process.kill("TERM", pid1)
#   Process.kill("TERM", pid2)
end

proccesses = runGame
loop do
  cmd = "#{gets.chomp}"

  if(cmd == "quit")
    puts "closing processes"
    begin
      Process.kill("TERM", proccesses[0])
      Process.kill("TERM", proccesses[1])
      break
    rescue Timeout::Error
      Process.kill("KILL", proccesses[0])
      Process.kill("KILL", proccesses[1])
      break
    end
  end
end