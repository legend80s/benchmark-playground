const Benchmark = require("benchmark");
const {
  repeatNative,
  repeatVue,
  repeatNormalWhile,
  repeatReduce,
} = require('./utils/repeat');

const suite = new Benchmark.Suite;

const str = 'str';
const n = 3;
// const str = 'https://opendocs.alipay.com/mini/component/icon';
// const n = 1319;

console.log(`repeatNative("${str}", ${n}):`, repeatNative(str, n));
console.log(`repeatVue("${str}", ${n}):`, repeatVue(str, n));
console.log(`repeatNormalWhile("${str}", ${n}):`, repeatNormalWhile(str, n));
console.log(`repeatReduce("${str}", ${n}):`, repeatReduce(str, n));

// process.exit(0)

// add tests
suite
  .add('repeatNative', function() {
    repeatNative(str, n);
  })
  .add('repeatVue', function() {
    repeatVue(str, n);
  })
  .add('repeatNormalWhile', function() {
    repeatNormalWhile(str, n);
  })
  .add('repeatReduce', function() {
    repeatReduce(str, n);
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
