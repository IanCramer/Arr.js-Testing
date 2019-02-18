// Var.js
// Gunther Brenes
//


// Returns true if given null or undefined; otherwise returns false.
/*export*/ const isNotDefined = x => (x === null) || (x === undefined);

// Returns true if given null, undefined or empty string.
/*export*/ const isEmpty = x => isNotDefined(x) || (x === '');

module.exports = {
	isNotDefined: function(x) { return isNotDefined(x); },
	isEmpty: function(x) {return isEmpty(x); }
}


