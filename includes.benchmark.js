const Benchmark = require("benchmark")

const suite = new Benchmark.Suite;

// add tests
suite
  .add('String#indexOf', function() {
    'Hello World!'.indexOf('o') > -1;
  })
  .add('String#includes', function() {
    'Hello World!'.includes('o');
  })
  .add('RegExp#test', function() {
    /o/.test('Hello World!');
  })
  .add('String#match', function() {
    !!'Hello World!'.match(/o/);
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

// String#indexOf x 70,494,484 ops/sec ±5.14% (70 runs sampled)
// String#includes x 31,629,054 ops/sec ±2.36% (78 runs sampled)
// RegExp#test x 19,110,444 ops/sec ±4.86% (76 runs sampled)
// String#match x 13,799,763 ops/sec ±3.53% (76 runs sampled)
// Fastest is String#indexOf
