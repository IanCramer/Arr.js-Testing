import { compare } from 'src/utils/string';
import { walk } from './obj';
import { isNotDefined } from 'src/utils/var';

// Returns true if two given arrays have the same set of values.
export const shallowCompare = (arr1, arr2) => {
  arr1 = arr1 || [];
  arr2 = arr2 || [];
  const { length: len1 } = arr1;
  const { length: len2 } = arr2;
  return (len1 === len2) &&
    !arr1.some((item, index) => item !== arr2[index]);
};

// Returns the first item in a given array that matches a given property
// name & value. If not found, returns null;
export const findBy = (arr, propName, propValue) => (
  (arr || []).find(item => (item && item[propName]) === propValue)
);

// Returns the index of the first item in a given array that matches a given property
// name & value. If not found, returns -1.
export const indexOfBy = (arr, propName, propValue) => {
  arr = arr || [];
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    const item = arr[i];
    if (item && item[propName] === propValue) {
      return i;
    }
  }
  return -1;
};

// Returns all items in a given array that do match a given property
// name & value.
export const filterBy = (arr, propName, propValue) => (
  (arr || []).filter(item => (item && item[propName]) === propValue)
);

// Returns all items in a given array that do not match a given property
// name & value.
export const rejectBy = (arr, propName, propValue) => (
  (arr || []).filter(item => (item && item[propName]) !== propValue)
);

// Returns a clone of a given array in which the items at 2 given indices
// have been swapped.
export const swapItems = (arr, index1, index2) => {
  if (!arr) {
    return arr;
  }
  const item1 = arr[index1];
  const item2 = arr[index2];
  const clone = arr.slice();
  clone[index1] = item2;
  clone[index2] = item1;
  return clone;
};

// Flattens an array of arrays into an array.
export const flatten = arr => (arr || []).reduce((out, item) => {
  out = out.concat(item);
  return out;
}, []);

// Sorts a copy of a given object array by the values at a given property path.
export const sortBy = (arr, propName, desc = false) => {
  const clone = arr ? [].concat(arr) : [];
  clone.sort((a, b) => (
    compare(walk(a, propName), walk(b, propName))
  ));
  if (desc) {
    clone.reverse();
  }
  return clone;
};

// Returns an array of pairs, where each pair is an array of two different
// members from the given array.  All possible pairs are included.  The pairs
// [a,b] and [b,a] are considered distinct, so both are included.
export const permutations = arr => {
  arr = arr || [];
  const out = [];
  arr.forEach(a => {
    arr.forEach(b => {
      if (a !== b) {
        out.push([ a, b ]);
      }
    });
  });
  return out;
};

// Returns a hash of slices of the given array, where each hash key is the
// value of the given prop for every array item in that slice.
export const splitBy = (arr, propName) => {
  arr = arr || [];
  const out = {};
  arr.forEach(a => {
    const propValue = walk(a, propName);
    if (!out[propValue]) {
      out[propValue] = [];
    }
    out[propValue].push(a);
  });
  return out;
};

// Returns a hash of slices of the given array, where each hash key is the
// return value of the given function for every array item in that slice.
// Similar to `splitBy` except takes a function instead of a property name.
export const splitByFn = (arr, fn) => {
  arr = arr || [];
  const out = {};
  arr.forEach(a => {
    const propValue = fn(a);
    if (!out[propValue]) {
      out[propValue] = [];
    }
    out[propValue].push(a);
  });
  return out;
};

// Given an array of non-objects (i.e. booleans, numbers, strings), returns
// a copy of the array in which duplicates have been removed.
// Warning: not optimized; best used on short arrays.
export const unique = arr => {
  if (!arr || !arr.length) {
    return arr;
  }
  const out = [];
  arr.forEach(item => {
    if (out.indexOf(item) === -1) {
      out.push(item);
    }
  });
  return out;
};

// Given an array, returns the subset of array items which are not null/undefined.
export const compact = arr => (arr || [])
  .filter(item => !isNotDefined(item));
