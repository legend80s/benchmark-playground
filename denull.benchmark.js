const Benchmark = require("benchmark");
const {
  denullRecursivelyUsingObjectKeys,
  denullRecursivelyUsingObjectEntries,
  denullUsingStringify,
  denullRecursivelyUsingForLoop,
  denullRecursivelyUsingWhileLoop,
  denullRecursivelyUsingReverseWhileLoop,
} = require('./utils/denull');

const suite = new Benchmark.Suite;

const data = {
  a: '',
  b: { c: null, d: 1 },
  c: {},
  d: [null, { d1: null }],
  e: false,
  f: () => {},
  g: new Date(),
};

console.log('denullRecursivelyUsingReverseWhileLoop(data):', denullRecursivelyUsingReverseWhileLoop(data));
console.log('denullRecursivelyUsingWhileLoop(data):', denullRecursivelyUsingWhileLoop(data));
console.log('denullRecursivelyUsingForLoop(data):', denullRecursivelyUsingForLoop(data));
console.log('denullRecursivelyUsingObjectKeys(data):', denullRecursivelyUsingObjectKeys(data));
console.log('denullRecursivelyUsingObjectEntries(data):', denullRecursivelyUsingObjectEntries(data));
console.log('denullUsingStringify(data):', denullUsingStringify(data));

// process.exit(0)

// add tests
suite
  .add('denullRecursivelyUsingReverseWhileLoop', function() {
    denullRecursivelyUsingReverseWhileLoop(data);
  })
  .add('denullRecursivelyUsingWhileLoop', function() {
    denullRecursivelyUsingWhileLoop(data);
  })
  .add('denullRecursivelyUsingForLoop', function() {
    denullRecursivelyUsingForLoop(data);
  })
  .add('denullRecursivelyUsingObjectKeys', function() {
    denullRecursivelyUsingObjectKeys(data);
  })
  .add('denullRecursivelyUsingObjectEntries', function() {
    denullRecursivelyUsingObjectEntries(data);
  })
  .add('denullUsingStringify', function() {
    denullUsingStringify(data);
  })

  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });

// node -v v12.8.1
// denullRecursivelyUsingForLoop x 1,998,416 ops/sec ±0.69% (86 runs sampled)
// denullRecursivelyUsingObjectEntries x 1,710,570 ops/sec ±0.93% (84 runs sampled)
// denullRecursivelyUsingObjectKeys x 1,431,340 ops/sec ±0.76% (88 runs sampled)
// denullUsingStringify x 191,015 ops/sec ±0.72% (89 runs sampled)
// Fastest is denullRecursivelyUsingForLoop

// node -v 8
// denullRecursivelyUsingForLoop x 2,237,715 ops/sec ±0.70% (89 runs sampled)
// denullRecursivelyUsingObjectKeys x 1,305,823 ops/sec ±0.62% (90 runs sampled)
// denullRecursivelyUsingObjectEntries x 535,236 ops/sec ±2.06% (83 runs sampled)
// denullUsingStringify x 189,716 ops/sec ±0.55% (87 runs sampled)
// Fastest is denullRecursivelyUsingForLoop
