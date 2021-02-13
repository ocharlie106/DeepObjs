/*
 * Module dependencies.
 */

// Create the enhanced EventEmitter
class DeepObjs {
    constructor (obj) {
      this._setObj(obj)
    }
  
    _setObj (obj) {
      // If obj wasn't passed, then just init the object
      // with an empty object
      if (typeof (obj) === 'undefined') {
        this.obj = {}
  
      // A parameter was passed. Check it, assign it
      } else {
        // If it wasn't an object, throw an error and fail
        if (typeof (obj) !== 'object') {
          this.obj = {}
          throw (new Error("DeepObjs's initial object needs to be of type Object"))
  
        // It was an object: nearly there
        } else {
          // In JS, null happens to be an object. Will need to fail if null is passed
          if (obj === null) {
            this.obj = {}
            throw (new Error("DeepObjs's initial object cannot be 'null'"))
  
          // Nothing short of a miracle: it's an actual object, and it's not null!
          } else {
            this.obj = obj
          }
        }
      }
      return obj
    }
  
    get (path, defaultValue) {
      // No path passed: return the whole object
      if (typeof (path) === 'undefined') {
        return this.obj
      } else {
        // The `path` parameter was passed: fetch the specific value
        var obj = this.obj
        var parts = path.split('.')
        for (var i = 0, l = parts.length; i < l; i++) {
          var part = parts[ i ]
          if (obj !== null && typeof obj === 'object' && part in obj) {
            obj = obj[ part ]
          } else {
            return defaultValue
          }
        }
        return obj
      }
    }
  
    set (path, value) {
      // Only one parameter: set the whole object
      if (typeof (value) === 'undefined') {
        value = path
        this._setObj(value)
  
      // The `path` parameter was passed: set the specific value
      } else {
        var obj = this.obj
        var parts = path.split('.')
        for (var i = 0, l = parts.length; i < l - 1; i++) {
          var part = parts[ i ]
  
          // If it's not already a (not null) object, then turn it into one
          if (typeof (obj[ part ]) !== 'object' || obj[ part ] === null) {
            obj[ part ] = {}
          }
  
          // Follow on
          obj = obj[ part ]
        }
        // Loop is over, assign it
        obj[ parts[ l - 1 ] ] = value
      }
  
      // Return the set value. Chaining would be pointless
      return value
    }
  
    static get (obj, path, defaultValue) {
      var o = new DeepObjs(obj)
      return o.get(path, defaultValue)
    }
  
    static set (obj, path, value) {
      var o = new DeepObjs(obj)
      return o.set(path, value)
    }
  }
  exports = module.exports = DeepObjs
  
  /*
  var o = { a: 10, b: { c: 20, d: 30 } }
  console.log('Object:')
  console.log(o)
  var dobj = new DeepObjs(o)
  dobj.set('a.b.c.d', 10)
  dobj.set('a.b.e', 20)
  console.log('Object after manipulation:')
  console.log(require('util').inspect(o, { depth: 10 }))
  
  function l (d, p) {
    console.log('Getting ' + p)
    console.log(require('util').inspect(d.get(p), { depth: 20 }))
    console.log('')
  }
  
  var d = new DeepObjs({ a: { b: { c1: 10, c2: 20 } } })
  
  l(d)
  l(d, 'a')
  l(d, 'a.b')
  l(d, 'a.b.c1')
  l(d, 'a.b.c3')
  l(d, 'z', 'hello')
  
  d.set('a.b.c3', 100)
  l(d)
  d.set('a1', 110)
  l(d)
  
  d.set('z.z.z.z.z.z.z.z.z.z', 120)
  l(d)
  
  d.set('z.z.z', null)
  l(d)
  
  d.set('z.z.z.z.z', 150)
  l(d)
  */
  