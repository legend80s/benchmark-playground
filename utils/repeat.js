exports.repeatVue = function repeatVue(str, n) {
  let res = '';

  while (n) {
    if (n % 2 === 1) { res += str; }

    if (n > 1) { str += str }

    n >>= 1;
  }

  return res;
}

/**
 *
 * @param {string} str
 * @param {number} n
 */
exports.repeatNative = function repeatNative(str, n) {
  return str.repeat(n);
}

/**
 *
 * @param {string} str
 * @param {number} n
 */
exports.repeatNormalWhile = function repeatNormalWhile(str, n) {
  let result = '';

  while (n) {
    result += str;

    n--;
  }

  return result;
}

/**
 *
 * @param {string} str
 * @param {number} n
 */
exports.repeatReduce = function repeatReduce(str, n) {
  return new Array(n).fill(0).reduce(result => result += str, '');
}
