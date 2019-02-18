//import { isNotDefined } from './var';
const varFuncs = require('./var');
isNotDefined = varFuncs.isNotDefined;

// Returns false if a given hash has any keys of its own (regardless of their
// value); true otherwise.  Faster than checking `Object.keys(hash).length`.
/*export*/ const isEmpty = hash => {
  if (!hash) {
    return true;
  }
  let key;
  for (key in hash) {
    if (hash.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

// Returns true if two given objects have the same set of property
// names & values. In order to compare only as subset of their properties,
// An optional list of property names can be provided; otherwise all properties
// found are compared.
/*export*/ const shallowCompare = (hash1, hash2, keys) => {
  hash1 = hash1 || {};
  hash2 = hash2 || {};
  const keys1 = keys || Object.keys(hash1);
  const keys2 = keys || Object.keys(hash2);
  return (keys1.length === keys2.length) &&
    !keys1.some(key => hash1[key] !== hash2[key]);
};

// Returns the value found (possibly undefined or null) at a given
// property path for a given object. The path is a string of property
// names, concatenated by dots.
/*export*/ const walk = (hash, path, delim) => {
  if (isNotDefined(path)) {
    return path;
  }
  delim = delim || '.';
  const steps = path.split(delim);
  let out = hash;
  let step = steps.shift();
  while (out !== null && out !== undefined && step) {
    out = out[step];
    step = steps.shift();
  }
  return out;
};

// Binds a list of methods to a context object, enabling the methods to be
// called in DOM event handlers without losing their context.
/*export*/ const bindMethods = (methodNames, ctxt) => {
  (methodNames || '').forEach(name => {
    ctxt[name] = ctxt[name].bind(ctxt);
  });
};

// Copies the values of a given list of property names from one object to
// another. If no destination object is given, a new one is created.
/*export*/ const copyProps = (propNames, fromObject, toObject = {}) => {
  fromObject = fromObject || {};
  (propNames || []).forEach(name => {
    toObject[name] = fromObject[name];
  });
  return toObject;
};

// Returns an array constructured from a given hash's values.
// Takes a hash to be constructured and a bool if user wants the array sorted
/*export*/ const hashValuesToArray = (hash, sorted) => {
  const keys = Object.keys(hash || {});
  if (sorted) {
    keys.sort();
  }
  return keys.map(key => hash[key]);
};

// Returns a hash whose values are the given array's items. The hash key
// for each array item is determined by the given `keyFn` function, which is invoked
// once per array item, receiving the item as its sole argument.
// An optional hash can be given; otherwise a new hash is created.
// Assumes each array item is mapped to a unique key value.
/*export*/ const hashArrayBy = (arr, keyFn, hash) => (arr || [])
  .reduce((obj, item) => {
    const key = keyFn(item);
    obj[key] = item;
    return obj;
  }, hash || {});

// Returns a hash whose values are sub-slices of the given array. The hash key
// for each array item is determined by the given `keyFn` function, which is invoked
// once per array item, receiving the item as its sole argument.
// An optional hash can be given; otherwise a new hash is created.
// Similar to `hashArrayBy` except that multiple array items can be mapped to a
// single key value.
/*export*/ const hashArraySlicesBy = (arr, keyFn, hash) => (arr || [])
  .reduce((obj, item) => {
    const key = keyFn(item);
    if (!obj[key]) {
      obj[key] = [];
    }
    obj[key].push(item);
    return obj;
  }, hash || {});


module.exports = {
  isEmpty: function(hash) {return isEmpty(hash); },
  shallowCompare: function(hash1, hash2, keys) {return shallowCompare(hash1, hash2, keys);},
  walk: function(hash, path, delim) {return walk(hash, path, delim);},
  bindMethods: function(methodNames, ctxt) {return bindMethods(methodNames, ctxt);},
  copyProps: function(propNames, fromObject, toObject = {}) {return copyProps(propNames, fromObject, toObject);},
  hashValuesToArray: function(hash, sorted) {return hashValuesToArray(hash, sorted);},
  hashArrayBy: function(arr, keyFn, hash) {return hashArrayBy(arr, keyFn, hash);},
  hashArraySlicesBy: function(arr, keyFn, hash) {return hashArraySlicesBy(arr, keyFn, hash);},
}