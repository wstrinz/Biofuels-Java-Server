Biofuels Game running on Rails

to run you must have some way to access both MRI Ruby and JRuby w/ Java7 (for now), then do

bundle install

rvm jruby exec ruby javaGame/server_runner.rb           # or run jruby another way

thin start