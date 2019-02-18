/*import { isEmpty } from 'var';*/
const varFuncs = require('./var');
const isEmpty = varFuncs.isEmpty;

// Replace whitespace and non-word chars in a given string with dashes.
/*export*/ const dasherize = str => String(str).replace(/[\W\s]/g, '-');

// String comparator, useful for Array.prototype.sort.
// Returns -1 if a < b, +1 if a > b, and 0 if equal.
/*export*/ const compare = (a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

/*export*/ const isBlank = str => isEmpty(str) || !String(str).match(/[\S]/);

// Returns either the given string, or a truncated version thereof if it
// exceeds a given length.  The truncated version is suffixed with ellipses.
/*export*/ const ellipse = (str, maxLength) => {
  str = str || '';
  if (maxLength && !isNaN(maxLength) && (str.length > maxLength)) {
    return `${str.substring(0, maxLength)}..`;
  } else {
    return str;
  }
};


module.exports = {
  dasherize: function(x) { return dasherize(x); },
  compare: function(a,b) {return compare(a,b); },
  isBlank: function(x) { return isBlank(x); },
  ellipse: function(a,b) { return ellipse(a,b); }
}
