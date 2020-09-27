
const objToString = Object.prototype.toString;

function isPlainObject(obj) {
  return !!obj && typeof obj === 'object' && objToString.call(obj) === '[object Object]';
}

function denullRecursivelyUsingObjectEntries(obj) {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    if (isPlainObject(val)) {
      acc[key] = denullRecursivelyUsingObjectEntries(val);
    } else {
      if (val !== null) {
        acc[key] = val;
      }
      // else not save in result
    }

    return acc;
    }, {})
}

function denullRecursivelyUsingObjectKeys(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    const val = obj[key];

    if (isPlainObject(val)) {
      acc[key] = denullRecursivelyUsingObjectKeys(val);
    } else {
      if (val !== null) {
        acc[key] = val;
      }
      // else not save in result
    }

    return acc;
    }, {})
}

function denullRecursivelyUsingForLoop(obj) {
  const result = {};
  const keys = Object.keys(obj);

  for (let idx = 0, len = keys.length; idx < len; idx++) {
    const key = keys[idx];
    const val = obj[key];

    if (isPlainObject(val)) {
      result[key] = denullRecursivelyUsingForLoop(val);
    } else {
      if (val !== null) {
        result[key] = val;
      }
    }
  }

  return result;
}

function denullRecursivelyUsingWhileLoop(obj) {
  const result = {};
  const keys = Object.keys(obj);

  const len = keys.length
  let idx = 0;

  while (idx < len) {
    const key = keys[idx++];
    const val = obj[key];

    if (isPlainObject(val)) {
      result[key] = denullRecursivelyUsingWhileLoop(val);
    } else {
      if (val !== null) {
        result[key] = val;
      }
    }
  }

  return result;
}

function denullRecursivelyUsingReverseWhileLoop(obj) {
  const result = {};
  const keys = Object.keys(obj);

  const len = keys.length
  let idx = len;

  while (idx-- > 0) {
    const key = keys[idx];
    const val = obj[key];

    if (isPlainObject(val)) {
      result[key] = denullRecursivelyUsingReverseWhileLoop(val);
    } else {
      if (val !== null) {
        result[key] = val;
      }
    }
  }

  return result;
}

function denullUsingStringify(obj) {
  return JSON.parse(JSON.stringify(obj, (key, value) => {
    // console.log({ key, value })

    return value === null ? undefined : value;
  }))
}



// var data = { a: '', b: { c: null, d: 1 }, c: {}, d: [], e: false, f: () => {}, g: new Date() };

// expect(actual).toEqual({ a: '', b: { d: 1 }, c: {}, d: [], e: false, f: () => {}, g: new Date() })

exports.denullRecursivelyUsingReverseWhileLoop = denullRecursivelyUsingReverseWhileLoop;
exports.denullRecursivelyUsingWhileLoop = denullRecursivelyUsingWhileLoop;
exports.denullRecursivelyUsingForLoop = denullRecursivelyUsingForLoop;
exports.denullRecursivelyUsingObjectEntries = denullRecursivelyUsingObjectEntries;
exports.denullRecursivelyUsingObjectKeys = denullRecursivelyUsingObjectKeys;
exports.denullUsingStringify = denullUsingStringify;
