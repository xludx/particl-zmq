# particl-zmq

> Get ZMQ notifications from particld

## Install

> npm install --save particl-zmq

And make sure to run particld with its [zmq options](https://github.com/particl/particl-core/blob/master/doc/zmq.md).

> particld -zmqpubsmsg=tcp://127.0.0.1:28333 -zmqpubhashtx=tcp://127.0.0.1:28333 -zmqpubhashblock=tcp://127.0.0.1:28333

## Usage example

```javascript
const ParticlZmq = require('particl-zmq');

const opts = { maxRetry: 20 };

const particld = new ParticlZmq({
  // topic: <zmq node>
  smsg: 'tcp://127.0.0.1:28333',
  hashtx: 'tcp://127.0.0.1:28333',
  hashblock: 'tcp://127.0.0.1:28333',
  rawtx: 'tcp://127.0.0.1:28333',
  rawblock: 'tcp://127.0.0.1:28333'

}, opts);

particld.connect();

particld.on('smsg', (msgid) => {
  // hash <Buffer ... />
  console.log(msgid.toString('hex'));
});

particld.on('hashblock', (hash) => {
  // hash <Buffer ... />
  console.log(hash.toString('hex'));
});

particld.on('hashtx', (hash) => {
  // hash <Buffer ... />
  console.log(hash.toString('hex'));
});

particld.on('rawblock', (block) => {
  // block <Buffer ... />
  console.log(block.toString('hex'));
});

particld.on('rawtx', (tx) => {
  // tx <Buffer ... />
  console.log(tx.toString('hex'));
});

particld.on('connect:*', (uri, type) => {
  console.log(`socket ${type} connected to ${uri}`);
});

particld.on('close:*', (uri, type) => {
  console.log(`socket ${type} closed to ${uri}`);
});

particld.on('retry:hashtx', (type, attempt) => {
  console.log(`hashtx, connect retry attempt: ${attempt}`);
});

particld.on('error:*', (err, type) => {
  console.error(`${type} had error:`, err);
});
```

### API

The `ParticlZMQ({...}, <opts>)` Class accepts in his constructor `topic -> zmq node` pairs. The only option available is `maxRetry` the maximum n. of attempt to connect to a zmq node.

- `.add(<type>, <uri>)`: Add a `topic -> zmq node` pair (ex. `.add('hashtx', 'tcp://127.0.0.1:28333')`).
- `.on(<eventName>, <fn>)`: the event name could be a [EventEmitter2](https://github.com/EventEmitter2/EventEmitter2) pattern with namespaces (ex. `.on('connect:hashtx', () => console.log('watching hashtx'))`).
- `.connect(<nodeType>)`: *nodeType* could be a **String**/**Array** of previously added topics to connect to. If none is provided it will connect to all the added nodes.
- `.disconnect(<nodeType>)`: disconnect from the given nodes or from all nodes if no argument is provided.

Also refer to the example for usage.

*Particld* available events are these below. You can add new coins' events or get rid of those you don't need when instantiating the Class:

- `hashblock`
- `hashtx`
- `rawblock`
- `rawtx`
- `smsg`

**Reserved events and namespaces**:

- `error:*` event fired with `Error`
- `close:*`: event fired with `Error` if any, and `nodeType`.
- `connect:*`: event fired with `Uri`, `nodeType`.
- `retry:*`: event fired with `nodeType`, `attempt`

*example*: `error:*` will catch every node error (`error:hashblock`, `error:hashtx`, and so on...)

### Debug

> DEBUG=particl-zmq

### License

MIT
