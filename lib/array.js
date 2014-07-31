
/**
 * Module exports
 *
 */

module.exports = {

  /**
   * Get only unique elements from an array
   *
   * @param {Array} array
   * @api public
   * @deprecate Not useful enough for re-use
   */
  
  unique: function(arr){
    var hash = {};
    arr.forEach(function(v){
      hash[v] = 1;
    });
    return Object.keys(hash);
  },
  
  /**
   * Append items to an array without creating a new copy
   *
   * @param {Array} array
   * @api public
   */
  
  pushMany: function(arr, arg){
    arr.push.apply(arr, arg);
    return arr;
  },

  /**
   * Splats an array if its not an array
   *
   * @param {Array} array
   * @return {Array}
   * @api public
   */
  
  splat: function(arr){
    if (arr instanceof Array) return arr;
    return [arr];
  },

  /**
   * Convers enumerable to array
   *
   * @param {Object} enumerable
   * @return {Array}
   * @api public
   */
  
  toArray: function(enu){
    var arr = [];
    for (var i = 0, len = enu.length; i < len; ++i) {
      arr.push(enu[i]);
    }
    return arr;
  },

  /**
   * Like Ruby find
   *
   * @param {Array} array
   * @param {Function} fn to filter
   * @return {Object} single item
   * @api public
   */
  
  find: function(arr, fn){
    for (var i = 0, l = arr.length; i < l; i++)
      if (fn(arr[i])) return arr[i];
    return null;
  },
  
  /**
   * Finds value in array
   *
   * @param {Array} array
   * @param {Mixed} mixed
   * @return {Boolean}
   * @api public
   */
  
  has: function(arr, needle){
    return !!~arr.indexOf(needle);
  }

};