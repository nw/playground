
module.exports = {
  
  merge: function (a, b) {
    if (!b) return a
    var keys = Object.keys(b)
    for (var i = 0, len = keys.length; i < len; ++i)
      a[keys[i]] = b[keys[i]]
    return a
  },
  
  values: function(obj) {
    if (!obj || typeof obj !== 'object')
      return []
    var keys = Object.keys(obj),
        vals = []
    for (var i = 0, len = keys.length; i < len; ++i)
      vals.push(obj[keys[i]])
    return vals
  }
  
}
