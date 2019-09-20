
const ParticlZmq = require('../');

const particld = new ParticlZmq({
  hashtx: 'tcp://127.0.0.1:28332',
  rawblock: 'tcp://127.0.0.1:28332',
  hashblock: 'tcp://127.0.0.1:28333',
  rawtx: 'tcp://127.0.0.1:28334'
});

particld.connect();

particld.on('hashblock', (hash) => {
  console.log('got block hash:', hash); // hash <Buffer ... />
});

particld.on('hashtx', (hash) => {
  console.log('got tx hash:', hash); // hash <Buffer ... />
});

particld.on('rawblock', (block) => {
  console.log('got raw block:', block); // block <Buffer ... />
});

particld.on('rawtx', (tx) => {
  console.log('got raw tx:', tx); // tx <Buffer ... />
});

particld.on('connect:*', (uri, type) => {
  console.log(`socket ${type} connected to ${uri}`);
});

particld.on('error:*', (err, type) => {
  console.error(`${type} had error:`, err);
});

particld.on('retry:*', (type, attempt) => {
  console.log(`type: ${type}, retry attempt: ${attempt}`);
});

particld.on('close:*', (err, type) => {
  console.log(`close ${type}`, err || '');
});
