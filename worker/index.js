const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

function fib(index) {
  if (isNaN(index) || index < 0) return 0;
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
  const index = parseInt(message);
  if (!isNaN(index)) {
    redisClient.hset('values', message, fib(index));
  }
});
sub.subscribe('insert');
