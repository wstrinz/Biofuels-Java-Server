uri = URI.parse(ENV["REDISTOGO_URL"])
REDISSEND = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
REDISREC = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)