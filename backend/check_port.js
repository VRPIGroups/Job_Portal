const net = require('net');
const client = net.connect({ port: 5432, host: '127.0.0.1' }, () => {
  console.log('Port 5432 is OPEN!');
  client.end();
  process.exit(0);
});
client.on('error', (err) => {
  console.log('Port 5432 is CLOSED:', err.message);
  process.exit(1);
});
