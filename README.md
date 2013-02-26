Biofuels Game Running On Rails
------------------------------

to run you must have some way to access both MRI Ruby and JRuby w/ Java7 (for now). first compile the java model:

> javac -cp javaGame/json-simple-1.1.1.jar javaGame/*.java

then run

> bundle install
>
> rvm jruby exec ruby javaGame/server_runner.rb         # or run jruby another way
>
> thin start