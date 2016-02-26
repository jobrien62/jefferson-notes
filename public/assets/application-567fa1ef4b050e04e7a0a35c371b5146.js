/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
// Generated by CoffeeScript 1.7.1

/*
jQuery.Turbolinks ~ https://github.com/kossnocorp/jquery.turbolinks
jQuery plugin for drop-in fix binded events problem caused by Turbolinks

The MIT License
Copyright (c) 2012-2013 Sasha Koss & Rico Sta. Cruz
 */


(function() {
  var $, $document;

  $ = window.jQuery || (typeof require === "function" ? require('jquery') : void 0);

  $document = $(document);

  $.turbo = {
    version: '2.1.0',
    isReady: false,
    use: function(load, fetch) {
      return $document.off('.turbo').on("" + load + ".turbo", this.onLoad).on("" + fetch + ".turbo", this.onFetch);
    },
    addCallback: function(callback) {
      if ($.turbo.isReady) {
        callback($);
      }
      return $document.on('turbo:ready', function() {
        return callback($);
      });
    },
    onLoad: function() {
      $.turbo.isReady = true;
      return $document.trigger('turbo:ready');
    },
    onFetch: function() {
      return $.turbo.isReady = false;
    },
    register: function() {
      $(this.onLoad);
      return $.fn.ready = this.addCallback;
    }
  };

  $.turbo.register();

  $.turbo.use('page:load', 'page:fetch');

}).call(this);
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.querySelector('head').childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = __bind(this._trickle, this);
      this.value = 0;
      this.opacity = 1;
      this.content = '';
      this.speed = 300;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var _ref;
      if ((value > (_ref = this.value) && _ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = 1;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return "" + this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);
/*!
 * Modernizr v2.6.3
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */


window.Modernizr = (function( window, document, undefined ) {

    var version = '2.6.3',

    Modernizr = {},

    /*>>cssclasses*/
    // option for enabling the HTML classes to be added
    enableClasses = true,
    /*>>cssclasses*/

    docElement = document.documentElement,

    /**
     * Create our "modernizr" element that we do most feature tests on.
     */
    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    /**
     * Create the input element for various Web Forms feature tests.
     */
    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,

    /*>>smile*/
    smile = ':)',
    /*>>smile*/

    toString = {}.toString,

    // TODO :: make the prefixes more granular
    /*>>prefixes*/
    // List of property values to set for css tests. See ticket #21
    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    /*>>prefixes*/

    /*>>domprefixes*/
    // Following spec is to expose vendor-specific style properties as:
    //   elem.style.WebkitBorderRadius
    // and the following would be incorrect:
    //   elem.style.webkitBorderRadius

    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
    //   erik.eae.net/archives/2008/03/10/21.48.10/

    // More here: github.com/Modernizr/Modernizr/issues/issue/21
    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),
    /*>>domprefixes*/

    /*>>ns*/
    ns = {'svg': 'http://www.w3.org/2000/svg'},
    /*>>ns*/

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, // used in testing loop


    /*>>teststyles*/
    // Inject element with style element and some CSS rules
    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
          // After page load injecting a fake body doesn't work so check if body exists
          body = document.body,
          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
          fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
          // In order not to give false positives we create a node for each test
          // This also allows the method to scale for unspecified uses
          while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
          //avoid crashing IE8, if background image is used
          fakeBody.style.background = '';
          //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
      // If this is done after page load we don't want to remove the body so check if body exists
      if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    /*>>teststyles*/

    /*>>mq*/
    // adapted from matchMedia polyfill
    // by Scott Jehl and Paul Irish
    // gist.github.com/786768
    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq).matches;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
     /*>>mq*/


    /*>>hasevent*/
    //
    // isEventSupported determines if a given element supports the given event
    // kangax.github.com/iseventsupported/
    //
    // The following results are known incorrects:
    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
    //   ...
    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if ( !isSupported ) {
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
          if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

            // If property was created, "remove it" (by setting value to `undefined`)
            if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),
    /*>>hasevent*/

    // TODO :: Add flag for hasownprop ? didn't last time

    // hasOwnProperty shim by kangax needed for Safari 2.0 support
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }

    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
    // es5.github.com/#x15.3.4.5

    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    /**
     * setCss applies given styles to the Modernizr DOM node.
     */
    function setCss( str ) {
        mStyle.cssText = str;
    }

    /**
     * setCssAll extrapolates all vendor-specific css strings.
     */
    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    /**
     * is returns a boolean for if typeof obj is exactly type.
     */
    function is( obj, type ) {
        return typeof obj === type;
    }

    /**
     * contains returns a boolean for if substr is found within str.
     */
    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    /*>>testprop*/

    // testProps is a generic CSS / DOM property test.

    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.

    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.

    // Because the testing of the CSS property names (with "-", as
    // opposed to the camelCase DOM properties) is non-portable and
    // non-standard but works in WebKit and IE (but not Gecko or Opera),
    // we explicitly reject properties with dashes so that authors
    // developing in WebKit or IE first don't end up with
    // browser-specific content by accident.

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
    /*>>testprop*/

    // TODO :: add testDOMProps
    /**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     */
    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                // return the property name as a string
                if (elem === false) return props[i];

                // let's bind a function
                if (is(item, 'function')){
                  // default to autobind unless override
                  return item.bind(elem || obj);
                }

                // return the unbound function or obj or value
                return item;
            }
        }
        return false;
    }

    /*>>testallprops*/
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *   We specify literally ALL possible (known and/or likely) properties on
     *   the element including the non-vendor prefixed one, for forward-
     *   compatibility.
     */
    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }
    /*>>testallprops*/


    /**
     * Tests
     * -----
     */

    // The *new* flexbox
    // dev.w3.org/csswg/css3-flexbox

    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };

    // The *old* flexbox
    // www.w3.org/TR/2009/WD-css3-flexbox-20090723/

    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    };

    // On the S60 and BB Storm, getContext exists, but always returns undefined
    // so we actually have to call getContext() to verify
    // github.com/Modernizr/Modernizr/issues/issue/97/

    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };

    // webk.it/70117 is tracking a legit WebGL feature detect proposal

    // We do a soft detect which may false positive in order to avoid
    // an expensive context creation: bugzil.la/732441

    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };

    /*
     * The Modernizr.touch test only indicates if the browser supports
     *    touch events, which does not necessarily reflect a touchscreen
     *    device, as evidenced by tablets running Windows 7 or, alas,
     *    the Palm Pre / WebOS (touch) phones.
     *
     * Additionally, Chrome (desktop) used to lie about its support on this,
     *    but that has since been rectified: crbug.com/36415
     *
     * We also test for Firefox 4 Multitouch Support.
     *
     * For more info, see: modernizr.github.com/Modernizr/touch.html
     */

    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };


    // geolocation is often considered a trivial feature detect...
    // Turns out, it's quite tricky to get right:
    //
    // Using !!navigator.geolocation does two things we don't want. It:
    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
    //   2. Disables page caching in WebKit: webk.it/43956
    //
    // Meanwhile, in Firefox < 8, an about:config setting could expose
    // a false positive that would throw an exception: bugzil.la/688158

    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    // Chrome incognito mode used to throw an exception when using openDatabase
    // It doesn't anymore.
    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    // Vendors had inconsistent prefixing with the experimental Indexed DB:
    // - Webkit's implementation is accessible through webkitIndexedDB
    // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
    // For speed, we don't test the legacy (and beta-only) indexedDB
    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB", window);
    };

    // documentMode logic from YUI to filter out IE8 Compat Mode
    //   which false positives.
    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    // Per 1.6:
    // This used to be Modernizr.historymanagement but the longer
    // name has been deprecated in favor of a shorter and property-matching one.
    // The old API is still available in 1.6, but as of 2.0 will throw a warning,
    // and in the first release thereafter disappear entirely.
    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    // FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF10
    // will be supported until FF19 (2/12/13), at which time, ESR becomes FF17.
    // FF10 still uses prefixes, so check for it until then.
    // for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq/
    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    // css-tricks.com/rgba-browser-support/
    tests['rgba'] = function() {
        // Set an rgba() color and check the returned value

        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
        //   except IE9 who retains it as hsla

        setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
        // Setting multiple images AND a color on the background shorthand property
        //  and then querying the style.background property value for the number of
        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

        setCss('background:url(https://),url(https://),red url(https://)');

        // If the UA supports multiple backgrounds, there should be three occurrences
        //   of the string "url(" in the return value for elemStyle.background

        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };



    // this will false positive in Opera Mini
    //   github.com/Modernizr/Modernizr/issues/396

    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };


    // Super comprehensive table about all the unique implementations of
    // border-radius: muddledramblings.com/table-of-css3-border-radius-compliance

    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    // WebOS unfortunately false positives on this test.
    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    // FF3.0 will false positive on this test
    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
        // Browsers that actually have CSS Opacity implemented have done so
        //  according to spec, which means their return values are within the
        //  range of [0.0,1.0] - including the leading zero.

        setCssAll('opacity:.55');

        // The non-literal . in this regex is intentional:
        //   German Chrome returns this value as 0,55
        // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
        return (/^0.55$/).test(mStyle.opacity);
    };


    // Note, Android < 4 will pass this test, but can only animate
    //   a single property at a time
    //   daneden.me/2011/12/putting-up-with-androids-bullshit/
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        /**
         * For CSS Gradients syntax, please see:
         * webkit.org/blog/175/introducing-css-gradients/
         * developer.mozilla.org/en/CSS/-moz-linear-gradient
         * developer.mozilla.org/en/CSS/-moz-radial-gradient
         * dev.w3.org/csswg/css3-images/#gradients-
         */

        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
             // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
              (str1 + '-webkit- '.split(' ').join(str2 + str1) +
             // standard syntax             // trailing 'background-image:'
              prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

        // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
        //   some conditions. As a result, Webkit typically recognizes the syntax but
        //   will sometimes throw a false positive, thus we must do a more thorough check:
        if ( ret && 'webkitPerspective' in docElement.style ) {

          // Webkit allows this media query to succeed only if the feature is enabled.
          // `@media (transform-3d),(-webkit-transform-3d){ ... }`
          injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };


    /*>>fontface*/
    // @font-face detection routine by Diego Perini
    // javascript.nwbox.com/CSSSupport/

    // false positives:
    //   WebOS github.com/Modernizr/Modernizr/issues/342
    //   WP7   github.com/Modernizr/Modernizr/issues/538
    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };
    /*>>fontface*/

    // CSS generated content detection
    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
          bool = node.offsetHeight >= 3;
        });

        return bool;
    };



    // These tests evaluate support of the video/audio elements, as well as
    // testing what types of content they support.
    //
    // We're using the Boolean constructor here, so that we can extend the value
    // e.g.  Modernizr.video     // true
    //       Modernizr.video.ogg // 'probably'
    //
    // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
    //                     thx to NielsLeenheer and zcorpan

    // Note: in some older browsers, "no" was a return value instead of empty string.
    //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
    //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    // In FF4, if disabled, window.localStorage should === null.

    // Normally, we could not test that directly and need to do a
    //   `('localStorage' in window) && ` test first because otherwise Firefox will
    //   throw bugzil.la/365772 if cookies are disabled

    // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
    // will throw the exception:
    //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
    // Peculiarly, getItem and removeItem calls do not throw.

    // Because we are forced to try/catch this, we'll go aggressive.

    // Just FWIW: IE8 Compat mode supports these features completely:
    //   www.quirksmode.org/dom/html5.html
    // But IE8 doesn't support either with local files

    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    // Thanks to Erik Dahlstrom
    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    // specifically for SVG inline in HTML, not within XHTML
    // test page: paulirish.com/demo/inline-svg
    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    // SVG SMIL animation
    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };

    // This test is only for clip paths in SVG proper, not clip paths on HTML content
    // demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg

    // However read the comments to dig into applying SVG clippaths to HTML content here:
    //   github.com/Modernizr/Modernizr/issues/213#issuecomment-1149491
    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    /*>>webforms*/
    // input features and input types go directly onto the ret object, bypassing the tests loop.
    // Hold this guy to execute in a moment.
    function webforms() {
        /*>>input*/
        // Run through HTML5's new input attributes to see if the UA understands any.
        // We're using f which is the <input> element created early on
        // Mike Taylr has created a comprehensive resource for testing these attributes
        //   when applied to all input types:
        //   miketaylr.com/code/input-type-attr.html
        // spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary

        // Only input placeholder is tested while textarea's placeholder is not.
        // Currently Safari 4 and Opera 11 have support only for the input placeholder
        // Both tests are available in feature-detects/forms-placeholder.js
        Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
              // safari false positive's on datalist: webk.it/74252
              // see also github.com/Modernizr/Modernizr/issues/146
              attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        /*>>input*/

        /*>>inputtypes*/
        // Run through HTML5's new input types to see if the UA understands any.
        //   This is put behind the tests runloop because it doesn't return a
        //   true/false like all the other tests; instead, it returns an object
        //   containing each input type with its corresponding true/false value

        // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
        Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                // We first check to see if the type we give it sticks..
                // If the type does, we feed it a textual value, which shouldn't be valid.
                // If the value doesn't stick, we know there's input sanitization which infers a custom UI
                if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                      // Safari 2-4 allows the smiley as a value, despite making a slider
                      bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                              // Mobile android web browser has false positive, so must
                              // check the height to see if the widget is actually there.
                              (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                      // Spec doesn't define any special parsing or detectable UI
                      //   behaviors so we pass these through as true

                      // Interestingly, opera fails the earlier test, so it doesn't
                      //  even make it here.

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      // Real url and email support comes with prebaked validation.
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                      // If the upgraded input compontent rejects the :) text, we got a winner
                      bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        /*>>inputtypes*/
    }
    /*>>webforms*/


    // End of test definitions
    // -----------------------



    // Run through all tests and detect their support in the current UA.
    // todo: hypothetically we could be doing an array of tests and use a basic loop here.
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
            // run the test, throw the return value into the Modernizr,
            //   then based on that boolean, define an appropriate className
            //   and push it into an array of classes we'll join later.
            featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    /*>>webforms*/
    // input tests need to run.
    Modernizr.input || webforms();
    /*>>webforms*/


    /**
     * addTest allows the user to define their own feature tests
     * the result will be added onto the Modernizr object,
     * as well as an appropriate className set on the html element
     *
     * @param feature - String naming the feature
     * @param test - Function returning true if feature is supported, false if not
     */
     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
           // we're going to quit if you're trying to overwrite an existing test
           // if we were to allow it, we'd do this:
           //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
           //   docElement.className = docElement.className.replace( re, '' );
           // but, no rly, stuff 'em.
           return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; // allow chaining.
     };


    // Reset modElem.cssText to nothing to reduce memory footprint.
    setCss('');
    modElem = inputElem = null;

    /*>>shiv*/
    /*! HTML5 Shiv v3.6.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed */
    ;(function(window, document) {
    /*jshint evil:true */
      /** Preset options */
      var options = window.html5 || {};

      /** Used to skip problem elements */
      var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

      /** Not all elements can be cloned in IE **/
      var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

      /** Detect whether the browser supports default html5 styles */
      var supportsHtml5Styles;

      /** Name of the expando, to work with multiple documents or to re-shiv one document */
      var expando = '_html5shiv';

      /** The id for the the documents expando */
      var expanID = 0;

      /** Cached data for each document */
      var expandoData = {};

      /** Detect whether the browser supports unknown elements */
      var supportsUnknownElements;

      (function() {
        try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
            //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
            supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
              // assign a false positive if unable to shiv
              (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
        } catch(e) {
          supportsHtml5Styles = true;
          supportsUnknownElements = true;
        }

      }());

      /*--------------------------------------------------------------------------*/

      /**
       * Creates a style sheet with the given CSS text and adds it to the document.
       * @private
       * @param {Document} ownerDocument The document.
       * @param {String} cssText The CSS text.
       * @returns {StyleSheet} The style element.
       */
      function addStyleSheet(ownerDocument, cssText) {
        var p = ownerDocument.createElement('p'),
            parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

        p.innerHTML = 'x<style>' + cssText + '</style>';
        return parent.insertBefore(p.lastChild, parent.firstChild);
      }

      /**
       * Returns the value of `html5.elements` as an array.
       * @private
       * @returns {Array} An array of shived element node names.
       */
      function getElements() {
        var elements = html5.elements;
        return typeof elements == 'string' ? elements.split(' ') : elements;
      }

        /**
       * Returns the data associated to the given document
       * @private
       * @param {Document} ownerDocument The document.
       * @returns {Object} An object of data.
       */
      function getExpandoData(ownerDocument) {
        var data = expandoData[ownerDocument[expando]];
        if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
        }
        return data;
      }

      /**
       * returns a shived element for the given nodeName and document
       * @memberOf html5
       * @param {String} nodeName name of the element
       * @param {Document} ownerDocument The context document.
       * @returns {Object} The shived element.
       */
      function createElement(nodeName, ownerDocument, data){
        if (!ownerDocument) {
            ownerDocument = document;
        }
        if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
        }
        if (!data) {
            data = getExpandoData(ownerDocument);
        }
        var node;

        if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
        } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
        } else {
            node = data.createElem(nodeName);
        }

        // Avoid adding some elements to fragments in IE < 9 because
        // * Attributes like `name` or `type` cannot be set/changed once an element
        //   is inserted into a document/fragment
        // * Link elements with `src` attributes that are inaccessible, as with
        //   a 403 response, will cause the tab/window to crash
        // * Script elements appended to fragments will execute when their `src`
        //   or `text` property is set
        return node.canHaveChildren && !reSkip.test(nodeName) ? data.frag.appendChild(node) : node;
      }

      /**
       * returns a shived DocumentFragment for the given document
       * @memberOf html5
       * @param {Document} ownerDocument The context document.
       * @returns {Object} The shived DocumentFragment.
       */
      function createDocumentFragment(ownerDocument, data){
        if (!ownerDocument) {
            ownerDocument = document;
        }
        if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
        }
        data = data || getExpandoData(ownerDocument);
        var clone = data.frag.cloneNode(),
            i = 0,
            elems = getElements(),
            l = elems.length;
        for(;i<l;i++){
            clone.createElement(elems[i]);
        }
        return clone;
      }

      /**
       * Shivs the `createElement` and `createDocumentFragment` methods of the document.
       * @private
       * @param {Document|DocumentFragment} ownerDocument The document.
       * @param {Object} data of the document.
       */
      function shivMethods(ownerDocument, data) {
        if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
        }


        ownerDocument.createElement = function(nodeName) {
          //abort shiv
          if (!html5.shivMethods) {
              return data.createElem(nodeName);
          }
          return createElement(nodeName, ownerDocument, data);
        };

        ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
          'var n=f.cloneNode(),c=n.createElement;' +
          'h.shivMethods&&(' +
            // unroll the `createElement` calls
            getElements().join().replace(/\w+/g, function(nodeName) {
              data.createElem(nodeName);
              data.frag.createElement(nodeName);
              return 'c("' + nodeName + '")';
            }) +
          ');return n}'
        )(html5, data.frag);
      }

      /*--------------------------------------------------------------------------*/

      /**
       * Shivs the given document.
       * @memberOf html5
       * @param {Document} ownerDocument The document to shiv.
       * @returns {Document} The shived document.
       */
      function shivDocument(ownerDocument) {
        if (!ownerDocument) {
            ownerDocument = document;
        }
        var data = getExpandoData(ownerDocument);

        if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
          data.hasCSS = !!addStyleSheet(ownerDocument,
            // corrects block display not defined in IE6/7/8/9
            'article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}' +
            // adds styling not present in IE6/7/8/9
            'mark{background:#FF0;color:#000}'
          );
        }
        if (!supportsUnknownElements) {
          shivMethods(ownerDocument, data);
        }
        return ownerDocument;
      }

      /*--------------------------------------------------------------------------*/

      /**
       * The `html5` object is exposed so that more elements can be shived and
       * existing shiving can be detected on iframes.
       * @type Object
       * @example
       *
       * // options can be changed before the script is included
       * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
       */
      var html5 = {

        /**
         * An array or space separated string of node names of the elements to shiv.
         * @memberOf html5
         * @type Array|String
         */
        'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video',

        /**
         * A flag to indicate that the HTML5 style sheet should be inserted.
         * @memberOf html5
         * @type Boolean
         */
        'shivCSS': (options.shivCSS !== false),

        /**
         * Is equal to true if a browser supports creating unknown/HTML5 elements
         * @memberOf html5
         * @type boolean
         */
        'supportsUnknownElements': supportsUnknownElements,

        /**
         * A flag to indicate that the document's `createElement` and `createDocumentFragment`
         * methods should be overwritten.
         * @memberOf html5
         * @type Boolean
         */
        'shivMethods': (options.shivMethods !== false),

        /**
         * A string to describe the type of `html5` object ("default" or "default print").
         * @memberOf html5
         * @type String
         */
        'type': 'default',

        // shivs the document according to the specified `html5` object options
        'shivDocument': shivDocument,

        //creates a shived element
        createElement: createElement,

        //creates a shived documentFragment
        createDocumentFragment: createDocumentFragment
      };

      /*--------------------------------------------------------------------------*/

      // expose html5
      window.html5 = html5;

      // shiv the document
      shivDocument(document);

    }(this, document));
    /*>>shiv*/

    // Assign private properties to the return object with prefix
    Modernizr._version      = version;

    // expose these for the plugin API. Look in the source for how to join() them against your input
    /*>>prefixes*/
    Modernizr._prefixes     = prefixes;
    /*>>prefixes*/
    /*>>domprefixes*/
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;
    /*>>domprefixes*/

    /*>>mq*/
    // Modernizr.mq tests a given media query, live against the current state of the window
    // A few important notes:
    //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
    //   * A max-width or orientation query will be evaluated against the current state, which may change later.
    //   * You must specify values. Eg. If you are testing support for the min-width media query use:
    //       Modernizr.mq('(min-width:0)')
    // usage:
    // Modernizr.mq('only screen and (max-width:768)')
    Modernizr.mq            = testMediaQuery;
    /*>>mq*/

    /*>>hasevent*/
    // Modernizr.hasEvent() detects support for a given event, with an optional element to test on
    // Modernizr.hasEvent('gesturestart', elem)
    Modernizr.hasEvent      = isEventSupported;
    /*>>hasevent*/

    /*>>testprop*/
    // Modernizr.testProp() investigates whether a given style property is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testProp('pointerEvents')
    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };
    /*>>testprop*/

    /*>>testallprops*/
    // Modernizr.testAllProps() investigates whether a given style property,
    //   or any of its vendor-prefixed variants, is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    Modernizr.testAllProps  = testPropsAll;
    /*>>testallprops*/


    /*>>teststyles*/
    // Modernizr.testStyles() allows you to add custom styles to the document and test an element afterwards
    // Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... })
    Modernizr.testStyles    = injectElementWithStyles;
    /*>>teststyles*/


    /*>>prefixed*/
    // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
    // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

    // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
    // Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
    //
    //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

    // If you're trying to ascertain which transition end event to bind to, you might do something like...
    //
    //     var transEndEventNames = {
    //       'WebkitTransition' : 'webkitTransitionEnd',
    //       'MozTransition'    : 'transitionend',
    //       'OTransition'      : 'oTransitionEnd',
    //       'msTransition'     : 'MSTransitionEnd',
    //       'transition'       : 'transitionend'
    //     },
    //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
        return testPropsAll(prop, obj, elem);
      }
    };
    /*>>prefixed*/


    /*>>cssclasses*/
    // Remove "no-js" class from <html> element, if it exists:
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                            // Add the new classes to the <html> element.
                            (enableClasses ? ' js ' + classes.join(' ') : '');
    /*>>cssclasses*/

    return Modernizr;

})(this, this.document);
(function() {
  var root = (typeof exports == 'undefined' ? window : exports);

  var config = {
    // Ensure Content-Type is an image before trying to load @2x image
    // https://github.com/imulus/retinajs/pull/45)
    check_mime_type: true,

    // Resize high-resolution images to original image's pixel dimensions
    // https://github.com/imulus/retinajs/issues/8
    force_original_dimensions: true
 };

  root.Retina = Retina;

  function Retina() {}

  Retina.configure = function(options) {
    if (options == null) options = {};
    for (var prop in options) config[prop] = options[prop];
  };

  Retina.init = function(context) {
    if (context == null) context = root;

    var existing_onload = context.onload || new Function;

    context.onload = function() {
      var images = document.getElementsByTagName("img"), retinaImages = [], i, image;
      for (i = 0; i < images.length; i++) {
        image = images[i];
        retinaImages.push(new RetinaImage(image));
      }
      existing_onload();
    }
  };

  Retina.isRetina = function(){
    var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
                      (min--moz-device-pixel-ratio: 1.5),\
                      (-o-min-device-pixel-ratio: 3/2),\
                      (min-resolution: 1.5dppx)";

    if (root.devicePixelRatio > 1)
      return true;

    if (root.matchMedia && root.matchMedia(mediaQuery).matches)
      return true;

    return false;
  };


  root.RetinaImagePath = RetinaImagePath;

  function RetinaImagePath(path, at_2x_path) {
    this.path = path;
    if (typeof at_2x_path !== "undefined" && at_2x_path !== null) {
      this.at_2x_path = at_2x_path;
      this.perform_check = false;
    } else {
      this.at_2x_path = path.replace(/\.\w+$/, function(match) { return "@2x" + match; });
      this.perform_check = true;
    }
  }

  RetinaImagePath.confirmed_paths = [];

  RetinaImagePath.prototype.is_external = function() {
    return !!(this.path.match(/^https?\:/i) && !this.path.match('//' + document.domain) )
  }

  RetinaImagePath.prototype.check_2x_variant = function(callback) {
    var http, that = this;
    if (this.is_external()) {
      return callback(false);
    } else if (!this.perform_check && typeof this.at_2x_path !== "undefined" && this.at_2x_path !== null) {
      return callback(true);
    } else if (this.at_2x_path in RetinaImagePath.confirmed_paths) {
      return callback(true);
    } else {
      http = new XMLHttpRequest;
      http.open('HEAD', this.at_2x_path);
      http.onreadystatechange = function() {
        if (http.readyState != 4) {
          return callback(false);
        }

        if (http.status >= 200 && http.status <= 399) {
          if (config.check_mime_type) {
            var type = http.getResponseHeader('Content-Type');
            if (type == null || !type.match(/^image/i)) {
              return callback(false);
            }
          }

          RetinaImagePath.confirmed_paths.push(that.at_2x_path);
          return callback(true);
        } else {
          return callback(false);
        }
      }
      http.send();
    }
  }



  function RetinaImage(el) {
    this.el = el;
    this.path = new RetinaImagePath(this.el.getAttribute('src'), this.el.getAttribute('data-at2x'));
    var that = this;
    this.path.check_2x_variant(function(hasVariant) {
      if (hasVariant) that.swap();
    });
  }

  root.RetinaImage = RetinaImage;

  RetinaImage.prototype.swap = function(path) {
    if (typeof path == 'undefined') path = this.path.at_2x_path;

    var that = this;
    function load() {
      if (! that.el.complete) {
        setTimeout(load, 5);
      } else {
        if (config.force_original_dimensions) {
          that.el.setAttribute('width', that.el.offsetWidth);
          that.el.setAttribute('height', that.el.offsetHeight);
        }

        that.el.setAttribute('src', path);
      }
    }
    load();
  }




  if (Retina.isRetina()) {
    Retina.init(root);
  }

})();

/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
 *
 */


(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
// OpenLayers 3. see http://ol3js.org/
(function(){function aa(){return function(a){return a}}function ba(){return function(){}}function k(a){return function(){return this[a]}}function ca(a){return function(){return a}}var l,da=da||{},t=this;function ea(){}function fa(a){a.Ga=function(){return a.Ud?a.Ud:a.Ud=new a}}
function ga(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function u(a){return void 0!==a}function ha(a){return null===a}function ia(a){return"array"==ga(a)}function ka(a){var b=ga(a);return"array"==b||"object"==b&&"number"==typeof a.length}function la(a){return"string"==typeof a}function na(a){return"number"==typeof a}function oa(a){return"function"==ga(a)}function pa(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function v(a){return a[ra]||(a[ra]=++ta)}
var ra="closure_uid_"+(1E9*Math.random()>>>0),ta=0;function ua(a,b,c){return a.call.apply(a.bind,arguments)}function va(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
function wa(a,b,c){wa=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ua:va;return wa.apply(null,arguments)}function xa(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=Array.prototype.slice.call(arguments);b.unshift.apply(b,c);return a.apply(this,b)}}var ya=Date.now||function(){return+new Date};
function y(a,b){var c=a.split("."),d=t;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b}function B(a,b){function c(){}c.prototype=b.prototype;a.B=b.prototype;a.prototype=new c};function za(a){Error.captureStackTrace?Error.captureStackTrace(this,za):this.stack=Error().stack||"";a&&(this.message=String(a))}B(za,Error);za.prototype.name="CustomError";function Aa(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")}function Ba(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")}function Ca(a){if(!Da.test(a))return a;-1!=a.indexOf("\x26")&&(a=a.replace(Ea,"\x26amp;"));-1!=a.indexOf("\x3c")&&(a=a.replace(Fa,"\x26lt;"));-1!=a.indexOf("\x3e")&&(a=a.replace(Ga,"\x26gt;"));-1!=a.indexOf('"')&&(a=a.replace(Ha,"\x26quot;"));return a}
var Ea=/&/g,Fa=/</g,Ga=/>/g,Ha=/\"/g,Da=/[&<>\"]/;function Ia(a){a=u(void 0)?a.toFixed(void 0):String(a);var b=a.indexOf(".");-1==b&&(b=a.length);b=Math.max(0,2-b);return Array(b+1).join("0")+a}
function Ja(a,b){for(var c=0,d=Ba(String(a)).split("."),e=Ba(String(b)).split("."),f=Math.max(d.length,e.length),g=0;0==c&&g<f;g++){var h=d[g]||"",m=e[g]||"",n=RegExp("(\\d*)(\\D*)","g"),p=RegExp("(\\d*)(\\D*)","g");do{var q=n.exec(h)||["","",""],r=p.exec(m)||["","",""];if(0==q[0].length&&0==r[0].length)break;c=((0==q[1].length?0:parseInt(q[1],10))<(0==r[1].length?0:parseInt(r[1],10))?-1:(0==q[1].length?0:parseInt(q[1],10))>(0==r[1].length?0:parseInt(r[1],10))?1:0)||((0==q[2].length)<(0==r[2].length)?
-1:(0==q[2].length)>(0==r[2].length)?1:0)||(q[2]<r[2]?-1:q[2]>r[2]?1:0)}while(0==c)}return c};var Ka=Array.prototype,La=Ka.indexOf?function(a,b,c){return Ka.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(la(a))return la(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ma=Ka.forEach?function(a,b,c){Ka.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=la(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Na=Ka.map?function(a,b,c){return Ka.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),
f=la(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Oa=Ka.some?function(a,b,c){return Ka.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=la(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1};function Pa(a,b){var c=Qa(a,b,void 0);return 0>c?null:la(a)?a.charAt(c):a[c]}function Qa(a,b,c){for(var d=a.length,e=la(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}
function Ra(a,b){var c=La(a,b),d;(d=0<=c)&&Ka.splice.call(a,c,1);return d}function Sa(a){return Ka.concat.apply(Ka,arguments)}function Ta(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}function Ua(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c],e;if(ia(d)||(e=ka(d))&&Object.prototype.hasOwnProperty.call(d,"callee"))a.push.apply(a,d);else if(e)for(var f=a.length,g=d.length,h=0;h<g;h++)a[f+h]=d[h];else a.push(d)}}
function Va(a,b,c,d){Ka.splice.apply(a,Wa(arguments,1))}function Wa(a,b,c){return 2>=arguments.length?Ka.slice.call(a,b):Ka.slice.call(a,b,c)}function Xa(a,b){Ka.sort.call(a,b||Ya)}function Za(a,b){if(!ka(a)||!ka(b)||a.length!=b.length)return!1;for(var c=a.length,d=$a,e=0;e<c;e++)if(!d(a[e],b[e]))return!1;return!0}function Ya(a,b){return a>b?1:a<b?-1:0}function $a(a,b){return a===b};function ab(a,b,c){this.a=a;this.x=b;this.y=c}function bb(a,b,c,d){return u(d)?(d.a=a,d.x=b,d.y=c,d):new ab(a,b,c)}function cb(a,b,c){return a+"/"+b+"/"+c}ab.prototype.c=function(a){return u(a)?(a[0]=this.a,a[1]=this.x,a[2]=this.y,a):[this.a,this.x,this.y]};function db(a){var b=Array(a.a),c=1<<a.a-1,d,e;for(d=0;d<a.a;++d)e=48,a.x&c&&(e+=1),a.y&c&&(e+=2),b[d]=String.fromCharCode(e),c>>=1;return b.join("")}ab.prototype.toString=function(){return cb(this.a,this.x,this.y)};function eb(a,b,c,d){this.a=a;this.d=b;this.b=c;this.c=d}function fb(a,b,c,d,e){return u(e)?(e.a=a,e.d=b,e.b=c,e.c=d,e):new eb(a,b,c,d)}eb.prototype.contains=function(a){return this.a<=a.x&&a.x<=this.d&&this.b<=a.y&&a.y<=this.c};function gb(a){this.c=a.html;this.a=u(a.tileRanges)?a.tileRanges:null};var hb,ib,jb,kb,lb,mb,ob;function pb(){return t.navigator?t.navigator.userAgent:null}function qb(){return t.navigator}kb=jb=ib=hb=!1;var rb;if(rb=pb()){var sb=qb();hb=0==rb.lastIndexOf("Opera",0);ib=!hb&&(-1!=rb.indexOf("MSIE")||-1!=rb.indexOf("Trident"));jb=!hb&&-1!=rb.indexOf("WebKit");kb=!hb&&!jb&&!ib&&"Gecko"==sb.product}var tb=hb,E=ib,ub=kb,vb=jb,wb,yb=qb();wb=yb&&yb.platform||"";lb=-1!=wb.indexOf("Mac");mb=-1!=wb.indexOf("Win");ob=-1!=wb.indexOf("Linux");
var zb=!!qb()&&-1!=(qb().appVersion||"").indexOf("X11");function Ab(){var a=t.document;return a?a.documentMode:void 0}var Bb;a:{var Cb="",Db;if(tb&&t.opera)var Eb=t.opera.version,Cb="function"==typeof Eb?Eb():Eb;else if(ub?Db=/rv\:([^\);]+)(\)|;)/:E?Db=/\b(?:MSIE|rv)\s+([^\);]+)(\)|;)/:vb&&(Db=/WebKit\/(\S+)/),Db)var Fb=Db.exec(pb()),Cb=Fb?Fb[1]:"";if(E){var Gb=Ab();if(Gb>parseFloat(Cb)){Bb=String(Gb);break a}}Bb=Cb}var Hb={};function Ib(a){return Hb[a]||(Hb[a]=0<=Ja(Bb,a))}
var Jb=t.document,Kb=Jb&&E?Ab()||("CSS1Compat"==Jb.compatMode?parseInt(Bb,10):5):void 0;var Lb,Mb=!E||E&&9<=Kb;!ub&&!E||E&&E&&9<=Kb||ub&&Ib("1.9.1");E&&Ib("9");function Nb(a){a=a.className;return la(a)&&a.match(/\S+/g)||[]}function Ob(a,b){for(var c=Nb(a),d=Wa(arguments,1),e=c.length+d.length,f=c,g=0;g<d.length;g++)0<=La(f,d[g])||f.push(d[g]);a.className=c.join(" ");return c.length==e}function Pb(a,b,c){for(var d=Nb(a),e=!1,f=0;f<d.length;f++)d[f]==b&&(Va(d,f--,1),e=!0);e&&(d.push(c),a.className=d.join(" "))};function Qb(a,b,c){return Math.min(Math.max(a,b),c)}function Rb(a,b){var c=a%b;return 0>c*b?c+b:c}function Sb(a){return a*Math.PI/180};function Tb(a,b){this.x=u(a)?a:0;this.y=u(b)?b:0}l=Tb.prototype;l.I=function(){return new Tb(this.x,this.y)};l.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};l.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};l.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};l.scale=function(a,b){var c=na(b)?b:a;this.x*=a;this.y*=c;return this};function Ub(a,b){this.width=a;this.height=b}l=Ub.prototype;l.I=function(){return new Ub(this.width,this.height)};l.V=function(){return!(this.width*this.height)};l.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};l.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};l.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};
l.scale=function(a,b){var c=na(b)?b:a;this.width*=a;this.height*=c;return this};function Wb(a,b,c){for(var d in a)b.call(c,a[d],d,a)}function Xb(a,b){for(var c in a)if(b.call(void 0,a[c],c,a))return!0;return!1}function Yb(a){var b=0,c;for(c in a)b++;return b}function Zb(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function $b(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function ac(a){for(var b in a)return!1;return!0}function bc(a){for(var b in a)delete a[b]}function cc(a,b){b in a&&delete a[b]}function F(a,b,c){return b in a?a[b]:c}
function dc(a,b){var c=[];return b in a?a[b]:a[b]=c}function ec(a){var b={},c;for(c in a)b[c]=a[c];return b}var fc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function gc(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<fc.length;f++)c=fc[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function hc(a){return a?new ic(jc(a)):Lb||(Lb=new ic)}function kc(a){return la(a)?document.getElementById(a):a}function lc(a,b){Wb(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:d in mc?a.setAttribute(mc[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})}
var mc={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};function nc(a){a=a.document.documentElement;return new Ub(a.clientWidth,a.clientHeight)}
function oc(a,b,c){var d=arguments,e=document,f=d[0],g=d[1];if(!Mb&&g&&(g.name||g.type)){f=["\x3c",f];g.name&&f.push(' name\x3d"',Ca(g.name),'"');if(g.type){f.push(' type\x3d"',Ca(g.type),'"');var h={};gc(h,g);delete h.type;g=h}f.push("\x3e");f=f.join("")}f=e.createElement(f);g&&(la(g)?f.className=g:ia(g)?Ob.apply(null,[f].concat(g)):lc(f,g));2<d.length&&pc(e,f,d,2);return f}
function pc(a,b,c,d){function e(c){c&&b.appendChild(la(c)?a.createTextNode(c):c)}for(;d<c.length;d++){var f=c[d];!ka(f)||pa(f)&&0<f.nodeType?e(f):Ma(qc(f)?Ta(f):f,e)}}function rc(a){return document.createElement(a)}function sc(a,b){pc(jc(a),a,arguments,1)}function tc(a){for(var b;b=a.firstChild;)a.removeChild(b)}function uc(a,b){b.parentNode&&b.parentNode.insertBefore(a,b.nextSibling)}function vc(a,b,c){a.insertBefore(b,a.childNodes[c]||null)}
function wc(a){a&&a.parentNode&&a.parentNode.removeChild(a)}function xc(a){if(void 0!=a.firstElementChild)a=a.firstElementChild;else for(a=a.firstChild;a&&1!=a.nodeType;)a=a.nextSibling;return a}function yc(a,b){if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a}function jc(a){return 9==a.nodeType?a:a.ownerDocument||a.document}
function qc(a){if(a&&"number"==typeof a.length){if(pa(a))return"function"==typeof a.item||"string"==typeof a.item;if(oa(a))return"function"==typeof a.item}return!1}function ic(a){this.a=a||t.document||document}function zc(a){var b=a.a;a=vb?b.body:b.documentElement;b=b.parentWindow||b.defaultView;return E&&Ib("10")&&b.pageYOffset!=a.scrollTop?new Tb(a.scrollLeft,a.scrollTop):new Tb(b.pageXOffset||a.scrollLeft,b.pageYOffset||a.scrollTop)}ic.prototype.appendChild=function(a,b){a.appendChild(b)};
ic.prototype.contains=yc;function Ac(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d}l=Ac.prototype;l.I=function(){return new Ac(this.top,this.right,this.bottom,this.left)};l.contains=function(a){return this&&a?a instanceof Ac?a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom:a.x>=this.left&&a.x<=this.right&&a.y>=this.top&&a.y<=this.bottom:!1};
l.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};l.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};l.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};
l.scale=function(a,b){var c=na(b)?b:a;this.left*=a;this.right*=a;this.top*=c;this.bottom*=c;return this};function Bc(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d}l=Bc.prototype;l.I=function(){return new Bc(this.left,this.top,this.width,this.height)};l.contains=function(a){return a instanceof Bc?this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height:a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height};
l.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};l.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};l.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};
l.scale=function(a,b){var c=na(b)?b:a;this.left*=a;this.width*=a;this.top*=c;this.height*=c;return this};function Cc(a,b){var c=jc(a);return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b)||"":""}function Dc(a,b){return Cc(a,b)||(a.currentStyle?a.currentStyle[b]:null)||a.style&&a.style[b]}function Ec(a,b,c){var d,e=ub&&(lb||zb)&&Ib("1.9");b instanceof Tb?(d=b.x,b=b.y):(d=b,b=c);a.style.left=Fc(d,e);a.style.top=Fc(b,e)}
function Gc(a){var b;try{b=a.getBoundingClientRect()}catch(c){return{left:0,top:0,right:0,bottom:0}}E&&(a=a.ownerDocument,b.left-=a.documentElement.clientLeft+a.body.clientLeft,b.top-=a.documentElement.clientTop+a.body.clientTop);return b}
function Hc(a){if(E&&!(E&&8<=Kb))return a.offsetParent;var b=jc(a),c=Dc(a,"position"),d="fixed"==c||"absolute"==c;for(a=a.parentNode;a&&a!=b;a=a.parentNode)if(c=Dc(a,"position"),d=d&&"static"==c&&a!=b.documentElement&&a!=b.body,!d&&(a.scrollWidth>a.clientWidth||a.scrollHeight>a.clientHeight||"fixed"==c||"absolute"==c||"relative"==c))return a;return null}
function Ic(a){var b,c=jc(a),d=Dc(a,"position"),e=ub&&c.getBoxObjectFor&&!a.getBoundingClientRect&&"absolute"==d&&(b=c.getBoxObjectFor(a))&&(0>b.screenX||0>b.screenY),f=new Tb(0,0),g;b=c?jc(c):document;(g=!E)||(g=E&&9<=Kb)||(hc(b),g=!0);g=g?b.documentElement:b.body;if(a==g)return f;if(a.getBoundingClientRect)b=Gc(a),a=zc(hc(c)),f.x=b.left+a.x,f.y=b.top+a.y;else if(c.getBoxObjectFor&&!e)b=c.getBoxObjectFor(a),a=c.getBoxObjectFor(g),f.x=b.screenX-a.screenX,f.y=b.screenY-a.screenY;else{e=a;do{f.x+=e.offsetLeft;
f.y+=e.offsetTop;e!=a&&(f.x+=e.clientLeft||0,f.y+=e.clientTop||0);if(vb&&"fixed"==Dc(e,"position")){f.x+=c.body.scrollLeft;f.y+=c.body.scrollTop;break}e=e.offsetParent}while(e&&e!=a);if(tb||vb&&"absolute"==d)f.y-=c.body.offsetTop;for(e=a;(e=Hc(e))&&e!=c.body&&e!=g;)f.x-=e.scrollLeft,tb&&"TR"==e.tagName||(f.y-=e.scrollTop)}return f}function Jc(a,b){var c=Kc(a),d=Kc(b);return new Tb(c.x-d.x,c.y-d.y)}
function Kc(a){if(1==a.nodeType){var b;if(a.getBoundingClientRect)b=Gc(a),b=new Tb(b.left,b.top);else{b=zc(hc(a));var c=Ic(a);b=new Tb(c.x-b.x,c.y-b.y)}if(ub&&!Ib(12)){var d;E?d="-ms-transform":vb?d="-webkit-transform":tb?d="-o-transform":ub&&(d="-moz-transform");var e;d&&(e=Dc(a,d));e||(e=Dc(a,"transform"));a=e?(a=e.match(Lc))?new Tb(parseFloat(a[1]),parseFloat(a[2])):new Tb(0,0):new Tb(0,0);a=new Tb(b.x+a.x,b.y+a.y)}else a=b;return a}d=oa(a.$e);e=a;a.targetTouches?e=a.targetTouches[0]:d&&a.G.targetTouches&&
(e=a.G.targetTouches[0]);return new Tb(e.clientX,e.clientY)}function Fc(a,b){"number"==typeof a&&(a=(b?Math.round(a):a)+"px");return a}function Mc(a){var b=Nc;if("none"!=Dc(a,"display"))return b(a);var c=a.style,d=c.display,e=c.visibility,f=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";a=b(a);c.display=d;c.position=f;c.visibility=e;return a}
function Nc(a){var b=a.offsetWidth,c=a.offsetHeight,d=vb&&!b&&!c;return u(b)&&!d||!a.getBoundingClientRect?new Ub(b,c):(a=Gc(a),new Ub(a.right-a.left,a.bottom-a.top))}function Oc(a,b){var c=a.style;"opacity"in c?c.opacity=b:"MozOpacity"in c?c.MozOpacity=b:"filter"in c&&(c.filter=""===b?"":"alpha(opacity\x3d"+100*b+")")}function Pc(a,b){a.style.display=b?"":"none"}function Qc(a){return"rtl"==Dc(a,"direction")}
function Rc(a){var b=jc(a),c=E&&a.currentStyle,d;if(d=c)hc(b),d="auto"!=c.width&&"auto"!=c.height&&!c.boxSizing;if(d)return b=Sc(a,c.width,"width","pixelWidth"),a=Sc(a,c.height,"height","pixelHeight"),new Ub(b,a);c=new Ub(a.offsetWidth,a.offsetHeight);b=Tc(a,"padding");a=Uc(a);return new Ub(c.width-a.left-b.left-b.right-a.right,c.height-a.top-b.top-b.bottom-a.bottom)}
function Sc(a,b,c,d){if(/^\d+px?$/.test(b))return parseInt(b,10);var e=a.style[c],f=a.runtimeStyle[c];a.runtimeStyle[c]=a.currentStyle[c];a.style[c]=b;b=a.style[d];a.style[c]=e;a.runtimeStyle[c]=f;return b}function Vc(a,b){var c=a.currentStyle?a.currentStyle[b]:null;return c?Sc(a,c,"left","pixelLeft"):0}
function Tc(a,b){if(E){var c=Vc(a,b+"Left"),d=Vc(a,b+"Right"),e=Vc(a,b+"Top"),f=Vc(a,b+"Bottom");return new Ac(e,d,f,c)}c=Cc(a,b+"Left");d=Cc(a,b+"Right");e=Cc(a,b+"Top");f=Cc(a,b+"Bottom");return new Ac(parseFloat(e),parseFloat(d),parseFloat(f),parseFloat(c))}var Wc={thin:2,medium:4,thick:6};function Xc(a,b){if("none"==(a.currentStyle?a.currentStyle[b+"Style"]:null))return 0;var c=a.currentStyle?a.currentStyle[b+"Width"]:null;return c in Wc?Wc[c]:Sc(a,c,"left","pixelLeft")}
function Uc(a){if(E){var b=Xc(a,"borderLeft"),c=Xc(a,"borderRight"),d=Xc(a,"borderTop");a=Xc(a,"borderBottom");return new Ac(d,c,a,b)}b=Cc(a,"borderLeftWidth");c=Cc(a,"borderRightWidth");d=Cc(a,"borderTopWidth");a=Cc(a,"borderBottomWidth");return new Ac(parseFloat(d),parseFloat(c),parseFloat(a),parseFloat(b))}var Lc=/matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;function Yc(a){this.length=a.length||a;for(var b=0;b<this.length;b++)this[b]=a[b]||0}Yc.prototype.a=4;Yc.prototype.c=function(a,b){b=b||0;for(var c=0;c<a.length&&b+c<this.length;c++)this[b+c]=a[c]};Yc.prototype.toString=Array.prototype.join;"undefined"==typeof Float32Array&&(Yc.BYTES_PER_ELEMENT=4,Yc.prototype.BYTES_PER_ELEMENT=Yc.prototype.a,Yc.prototype.set=Yc.prototype.c,Yc.prototype.toString=Yc.prototype.toString,y("Float32Array",Yc));function Zc(a){this.length=a.length||a;for(var b=0;b<this.length;b++)this[b]=a[b]||0}Zc.prototype.a=8;Zc.prototype.c=function(a,b){b=b||0;for(var c=0;c<a.length&&b+c<this.length;c++)this[b+c]=a[c]};Zc.prototype.toString=Array.prototype.join;if("undefined"==typeof Float64Array){try{Zc.BYTES_PER_ELEMENT=8}catch($c){}Zc.prototype.BYTES_PER_ELEMENT=Zc.prototype.a;Zc.prototype.set=Zc.prototype.c;Zc.prototype.toString=Zc.prototype.toString;y("Float64Array",Zc)};function ad(a,b,c,d,e){a[0]=b;a[1]=c;a[2]=d;a[3]=e};function bd(){var a=Array(16);cd(a,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);return a}function dd(){var a=Array(16);cd(a,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return a}function cd(a,b,c,d,e,f,g,h,m,n,p,q,r,s,z,x,w){a[0]=b;a[1]=c;a[2]=d;a[3]=e;a[4]=f;a[5]=g;a[6]=h;a[7]=m;a[8]=n;a[9]=p;a[10]=q;a[11]=r;a[12]=s;a[13]=z;a[14]=x;a[15]=w}
function ed(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];a[6]=b[6];a[7]=b[7];a[8]=b[8];a[9]=b[9];a[10]=b[10];a[11]=b[11];a[12]=b[12];a[13]=b[13];a[14]=b[14];a[15]=b[15]}function fd(a){a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1}
function gd(a,b,c){var d=a[0],e=a[1],f=a[2],g=a[3],h=a[4],m=a[5],n=a[6],p=a[7],q=a[8],r=a[9],s=a[10],z=a[11],x=a[12],w=a[13],C=a[14];a=a[15];var A=b[0],D=b[1],H=b[2],P=b[3],J=b[4],U=b[5],X=b[6],ma=b[7],sa=b[8],R=b[9],qa=b[10],ja=b[11],Vb=b[12],nb=b[13],xb=b[14];b=b[15];c[0]=d*A+h*D+q*H+x*P;c[1]=e*A+m*D+r*H+w*P;c[2]=f*A+n*D+s*H+C*P;c[3]=g*A+p*D+z*H+a*P;c[4]=d*J+h*U+q*X+x*ma;c[5]=e*J+m*U+r*X+w*ma;c[6]=f*J+n*U+s*X+C*ma;c[7]=g*J+p*U+z*X+a*ma;c[8]=d*sa+h*R+q*qa+x*ja;c[9]=e*sa+m*R+r*qa+w*ja;c[10]=f*sa+
n*R+s*qa+C*ja;c[11]=g*sa+p*R+z*qa+a*ja;c[12]=d*Vb+h*nb+q*xb+x*b;c[13]=e*Vb+m*nb+r*xb+w*b;c[14]=f*Vb+n*nb+s*xb+C*b;c[15]=g*Vb+p*nb+z*xb+a*b}function hd(a,b,c){var d=a[1]*b+a[5]*c+0*a[9]+a[13],e=a[2]*b+a[6]*c+0*a[10]+a[14],f=a[3]*b+a[7]*c+0*a[11]+a[15];a[12]=a[0]*b+a[4]*c+0*a[8]+a[12];a[13]=d;a[14]=e;a[15]=f}function id(a,b,c){cd(a,a[0]*b,a[1]*b,a[2]*b,a[3]*b,a[4]*c,a[5]*c,a[6]*c,a[7]*c,1*a[8],1*a[9],1*a[10],1*a[11],a[12],a[13],a[14],a[15])}
function jd(a,b){var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],m=a[6],n=a[7],p=Math.cos(b),q=Math.sin(b);a[0]=c*p+g*q;a[1]=d*p+h*q;a[2]=e*p+m*q;a[3]=f*p+n*q;a[4]=c*-q+g*p;a[5]=d*-q+h*p;a[6]=e*-q+m*p;a[7]=f*-q+n*p}new Float64Array(3);new Float64Array(3);new Float64Array(4);new Float64Array(4);new Float64Array(4);new Float64Array(16);function kd(a,b){var c=rc("CANVAS");u(a)&&(c.width=a);u(b)&&(c.height=b);return c.getContext("2d")}
var ld=function(){var a;return function(){if(!u(a))if(t.getComputedStyle){var b=rc("P"),c,d={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.appendChild(b);for(var e in d)e in b.style&&(b.style[e]="translate(1px,1px)",c=t.getComputedStyle(b).getPropertyValue(d[e]));wc(b);a=c&&"none"!==c}else a=!1;return a}}(),md=function(){var a;return function(){if(!u(a))if(t.getComputedStyle){var b=rc("P"),
c,d={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.appendChild(b);for(var e in d)e in b.style&&(b.style[e]="translate3d(1px,1px,1px)",c=t.getComputedStyle(b).getPropertyValue(d[e]));wc(b);a=c&&"none"!==c}else a=!1;return a}}();function nd(a,b){var c=a.style;c.WebkitTransform=b;c.MozTransform=b;c.a=b;c.msTransform=b;c.transform=b;E&&!od&&(a.style.transformOrigin="0 0")}
function pd(a,b){var c;if(md()){if(u(6)){var d=Array(16);for(c=0;16>c;++c)d[c]=b[c].toFixed(6);c=d.join(",")}else c=b.join(",");nd(a,"matrix3d("+c+")")}else if(ld()){d=[b[0],b[1],b[4],b[5],b[12],b[13]];if(u(6)){var e=Array(6);for(c=0;6>c;++c)e[c]=d[c].toFixed(6);c=e.join(",")}else c=d.join(",");nd(a,"matrix("+c+")")}else a.style.left=Math.round(b[12])+"px",a.style.top=Math.round(b[13])+"px"};var qd=["experimental-webgl","webgl","webkit-3d","moz-webgl"];function rd(a,b){var c,d,e=qd.length;for(d=0;d<e;++d)try{if(c=a.getContext(qd[d],b),null!==c)return c}catch(f){}return null};var G={},sd="https:"===t.location.protocol,od=E&&!Ib("9.0")&&""!==Bb;G.vd=t.devicePixelRatio||1;G.wd="ArrayBuffer"in t;G.Wb=!1;G.xd=function(){if(!("HTMLCanvasElement"in t))return!1;try{var a=kd();if(null===a)return!1;u(a.setLineDash)&&(G.Wb=!0);return!0}catch(b){return!1}}();G.yd="DeviceOrientationEvent"in t;G.Ce=!0;G.zd="geolocation"in t.navigator;G.De="JSON"in t&&"parse"in t.JSON;G.zc="ontouchstart"in t;G.Fe="PointerEvent"in t;G.Ee=!!t.navigator.msPointerEnabled;
G.Ad=function(){if(!("WebGLRenderingContext"in t))return!1;try{var a=rc("CANVAS");return!ha(rd(a,{We:!0}))}catch(b){return!1}}();function td(){0!=ud&&(this.Ii=Error().stack,vd[v(this)]=this)}var ud=0,vd={};td.prototype.U=!1;td.prototype.Eb=function(){if(!this.U&&(this.U=!0,this.w(),0!=ud)){var a=v(this);delete vd[a]}};function wd(a,b){var c=xa(xd,b);a.O||(a.O=[]);a.O.push(wa(c,void 0))}td.prototype.w=function(){if(this.O)for(;this.O.length;)this.O.shift()()};function xd(a){a&&"function"==typeof a.Eb&&a.Eb()};function yd(a,b){this.type=a;this.c=this.target=b}l=yd.prototype;l.Eb=ba();l.La=!1;l.Ef=!1;l.pe=!0;l.za=function(){this.La=!0};l.preventDefault=function(){this.Ef=!0;this.pe=!1};function zd(a){a.za()}function Ad(a){a.preventDefault()};var Bd=!E||E&&9<=Kb,Cd=!E||E&&9<=Kb,Dd=E&&!Ib("9");!vb||Ib("528");ub&&Ib("1.9b")||E&&Ib("8")||tb&&Ib("9.5")||vb&&Ib("528");ub&&!Ib("8")||E&&Ib("9");var Ed=E?"focusout":"DOMFocusOut";function Fd(a){Fd[" "](a);return a}Fd[" "]=ea;function Gd(a,b){a&&Hd(this,a,b)}B(Gd,yd);var Id=[1,4,2];l=Gd.prototype;l.target=null;l.relatedTarget=null;l.offsetX=0;l.offsetY=0;l.clientX=0;l.clientY=0;l.screenX=0;l.screenY=0;l.button=0;l.xa=0;l.Uc=0;l.Nb=!1;l.Y=!1;l.ya=!1;l.Vc=!1;l.tb=!1;l.G=null;
function Hd(a,b,c){var d=a.type=b.type;yd.call(a,d);a.target=b.target||b.srcElement;a.c=c;if(c=b.relatedTarget){if(ub){var e;a:{try{Fd(c.nodeName);e=!0;break a}catch(f){}e=!1}e||(c=null)}}else"mouseover"==d?c=b.fromElement:"mouseout"==d&&(c=b.toElement);a.relatedTarget=c;a.offsetX=vb||void 0!==b.offsetX?b.offsetX:b.layerX;a.offsetY=vb||void 0!==b.offsetY?b.offsetY:b.layerY;a.clientX=void 0!==b.clientX?b.clientX:b.pageX;a.clientY=void 0!==b.clientY?b.clientY:b.pageY;a.screenX=b.screenX||0;a.screenY=
b.screenY||0;a.button=b.button;a.xa=b.keyCode||0;a.Uc=b.charCode||("keypress"==d?b.keyCode:0);a.Nb=b.ctrlKey;a.Y=b.altKey;a.ya=b.shiftKey;a.Vc=b.metaKey;a.tb=lb?b.metaKey:b.ctrlKey;a.state=b.state;a.G=b;b.defaultPrevented&&a.preventDefault();delete a.La}function Jd(a){return(Bd?0==a.G.button:"click"==a.type?!0:!!(a.G.button&Id[0]))&&!(vb&&lb&&a.Nb)}l.za=function(){Gd.B.za.call(this);this.G.stopPropagation?this.G.stopPropagation():this.G.cancelBubble=!0};
l.preventDefault=function(){Gd.B.preventDefault.call(this);var a=this.G;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Dd)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};l.$e=k("G");var Kd="closure_listenable_"+(1E6*Math.random()|0);function Ld(a){return!(!a||!a[Kd])}var Md=0;function Nd(a,b,c,d,e,f){this.sa=a;this.a=b;this.src=c;this.type=d;this.capture=!!e;this.Za=f;this.key=++Md;this.Ca=this.hb=!1}function Od(a){a.Ca=!0;a.sa=null;a.a=null;a.src=null;a.Za=null};var Pd={},Qd={},Rd={},Sd={};function I(a,b,c,d,e){if(ia(b)){for(var f=0;f<b.length;f++)I(a,b[f],c,d,e);return null}c=Td(c);return Ld(a)?a.Z(b,c,d,e):Ud(a,b,c,!1,d,e)}
function Ud(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");e=!!e;var g=Qd;b in g||(g[b]={F:0});g=g[b];e in g||(g[e]={F:0},g.F++);var g=g[e],h=v(a),m;if(g[h]){m=g[h];for(var n=0;n<m.length;n++)if(g=m[n],g.sa==c&&g.Za==f){if(g.Ca)break;d||(m[n].hb=!1);return m[n]}}else m=g[h]=[],g.F++;n=Vd();g=new Nd(c,n,a,b,e,f);g.hb=d;n.src=a;n.sa=g;m.push(g);Rd[h]||(Rd[h]=[]);Rd[h].push(g);a.addEventListener?a.addEventListener(b,n,e):a.attachEvent(b in Sd?Sd[b]:Sd[b]="on"+b,n);return Pd[g.key]=g}
function Vd(){var a=Wd,b=Cd?function(c){return a.call(b.src,b.sa,c)}:function(c){c=a.call(b.src,b.sa,c);if(!c)return c};return b}function Xd(a,b,c,d,e){if(ia(b)){for(var f=0;f<b.length;f++)Xd(a,b[f],c,d,e);return null}c=Td(c);return Ld(a)?a.S.add(b,c,!0,d,e):Ud(a,b,c,!0,d,e)}function Yd(a,b,c,d,e){if(ia(b))for(var f=0;f<b.length;f++)Yd(a,b[f],c,d,e);else if(c=Td(c),Ld(a))a.pd(b,c,d,e);else if(d=!!d,a=Zd(a,b,d))for(f=0;f<a.length;f++)if(a[f].sa==c&&a[f].capture==d&&a[f].Za==e){K(a[f]);break}}
function K(a){if(na(a)||!a||a.Ca)return!1;var b=a.src;if(Ld(b))return $d(b.S,a);var c=a.type,d=a.a,e=a.capture;b.removeEventListener?b.removeEventListener(c,d,e):b.detachEvent&&b.detachEvent(c in Sd?Sd[c]:Sd[c]="on"+c,d);b=v(b);Rd[b]&&(d=Rd[b],Ra(d,a),0==d.length&&delete Rd[b]);Od(a);if(d=Qd[c][e][b])Ra(d,a),0==d.length&&(delete Qd[c][e][b],Qd[c][e].F--),0==Qd[c][e].F&&(delete Qd[c][e],Qd[c].F--),0==Qd[c].F&&delete Qd[c];delete Pd[a.key];return!0}
function Zd(a,b,c){var d=Qd;return b in d&&(d=d[b],c in d&&(d=d[c],a=v(a),d[a]))?d[a]:null}function ae(a){if(Ld(a))return be(a.S,void 0);a=v(a);var b=Rd[a];if(b){var c=u(void 0),d=u(void 0);return c&&d?(b=Qd[void 0],!!b&&!!b[void 0]&&a in b[void 0]):c||d?Oa(b,function(a){return c&&void 0==a.type||d&&void 0==a.capture}):!0}return!1}function ce(a,b,c){var d=1;b=v(b);if(a[b])for(a=Ta(a[b]),b=0;b<a.length;b++){var e=a[b];e&&!e.Ca&&(d&=!1!==ee(e,c))}return Boolean(d)}
function ee(a,b){var c=a.sa,d=a.Za||a.src;a.hb&&K(a);return c.call(d,b)}
function Wd(a,b){if(a.Ca)return!0;var c=a.type,d=Qd;if(!(c in d))return!0;var d=d[c],e,f;if(!Cd){if(!(c=b))a:{for(var c=["window","event"],g=t;e=c.shift();)if(null!=g[e])g=g[e];else{c=null;break a}c=g}e=c;c=!0 in d;g=!1 in d;if(c){if(0>e.keyCode||void 0!=e.returnValue)return!0;a:{var h=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(m){h=!0}if(h||void 0==e.returnValue)e.returnValue=!0}}h=new Gd;Hd(h,e,this);e=!0;try{if(c){for(var n=[],p=h.c;p;p=p.parentNode)n.push(p);f=d[!0];for(var q=n.length-
1;!h.La&&0<=q;q--)h.c=n[q],e&=ce(f,n[q],h);if(g)for(f=d[!1],q=0;!h.La&&q<n.length;q++)h.c=n[q],e&=ce(f,n[q],h)}else e=ee(a,h)}finally{n&&(n.length=0)}return e}d=new Gd(b,this);return e=ee(a,d)}var fe="__closure_events_fn_"+(1E9*Math.random()>>>0);function Td(a){return oa(a)?a:a[fe]||(a[fe]=function(b){return a.handleEvent(b)})};function ge(a){return function(){return a}}var he=ge(!1),ie=ge(!0);function je(a){return a}function ke(a){return function(){throw a;}}function le(a){var b;b=b||0;return function(){return a.apply(this,Array.prototype.slice.call(arguments,0,b))}}function me(a){var b=arguments,c=b.length;return function(){for(var a=0;a<c;a++)if(!b[a].apply(this,arguments))return!1;return!0}};function ne(a){this.src=a;this.a={};this.c=0}ne.prototype.add=function(a,b,c,d,e){var f=this.a[a];f||(f=this.a[a]=[],this.c++);var g=oe(f,b,d,e);-1<g?(a=f[g],c||(a.hb=!1)):(a=new Nd(b,null,this.src,a,!!d,e),a.hb=c,f.push(a));return a};ne.prototype.remove=function(a,b,c,d){if(!(a in this.a))return!1;var e=this.a[a];b=oe(e,b,c,d);return-1<b?(Od(e[b]),Ka.splice.call(e,b,1),0==e.length&&(delete this.a[a],this.c--),!0):!1};
function $d(a,b){var c=b.type;if(!(c in a.a))return!1;var d=Ra(a.a[c],b);d&&(Od(b),0==a.a[c].length&&(delete a.a[c],a.c--));return d}function be(a,b){var c=u(b),d=u(void 0);return Xb(a.a,function(a){for(var f=0;f<a.length;++f)if(!(c&&a[f].type!=b||d&&void 0!=a[f].capture))return!0;return!1})}function oe(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.Ca&&f.sa==b&&f.capture==!!c&&f.Za==d)return e}return-1};function pe(){td.call(this);this.S=new ne(this);this.Ac=this}B(pe,td);pe.prototype[Kd]=!0;l=pe.prototype;l.ed=null;l.addEventListener=function(a,b,c,d){I(this,a,b,c,d)};l.removeEventListener=function(a,b,c,d){Yd(this,a,b,c,d)};
function L(a,b){var c,d=a.ed;if(d)for(c=[];d;d=d.ed)c.push(d);var d=a.Ac,e=b,f=e.type||e;if(la(e))e=new yd(e,d);else if(e instanceof yd)e.target=e.target||d;else{var g=e,e=new yd(f,d);gc(e,g)}var g=!0,h;if(c)for(var m=c.length-1;!e.La&&0<=m;m--)h=e.c=c[m],g=qe(h,f,!0,e)&&g;e.La||(h=e.c=d,g=qe(h,f,!0,e)&&g,e.La||(g=qe(h,f,!1,e)&&g));if(c)for(m=0;!e.La&&m<c.length;m++)h=e.c=c[m],g=qe(h,f,!1,e)&&g;return g}
l.w=function(){pe.B.w.call(this);if(this.S){var a=this.S,b=0,c;for(c in a.a){for(var d=a.a[c],e=0;e<d.length;e++)++b,d[e].Ca=!0;delete a.a[c];a.c--}}this.ed=null};l.Z=function(a,b,c,d){return this.S.add(a,b,!1,c,d)};l.pd=function(a,b,c,d){return this.S.remove(a,b,c,d)};function qe(a,b,c,d){b=a.S.a[b];if(!b)return!0;b=Ta(b);for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.Ca&&g.capture==c){var h=g.sa,m=g.Za||g.src;g.hb&&$d(a.S,g);e=!1!==h.call(m,d)&&e}}return e&&!1!=d.pe};function re(){pe.call(this);this.c=0}B(re,pe);l=re.prototype;l.s=function(){++this.c;L(this,"change")};l.xh=function(a,b,c){return I(this,a,b,!1,c)};l.Dh=function(a,b,c){return Xd(this,a,b,!1,c)};l.ii=function(a,b,c){Yd(this,a,b,!1,c)};l.ji=function(a){K(a)};function se(a,b){yd.call(this,a);this.key=b}B(se,yd);function te(a,b){this.target=a;this.key=b;this.c=this.a=je}te.prototype.transform=function(a,b){this.a=a;this.c=b;this.target.Zc(this.key)};function M(a){re.call(this);v(this);this.e={};this.i={};this.ba={};this.X={};u(a)&&this.T(a)}B(M,re);var ue={},ve={},we={};function xe(a){return ue.hasOwnProperty(a)?ue[a]:ue[a]="change:"+a.toLowerCase()}l=M.prototype;
l.Se=function(a,b,c){c=c||a;this.od(a);var d=xe(c);this.X[a]=I(b,d,function(){ye(this,a)},void 0,this);this.ba[a]=I(b,"beforepropertychange",ze(a,c),void 0,this);b=new te(b,c);this.i[a]=b;ye(this,a);return b};function ze(a,b){return function(c){c.key===b&&L(this,new se("beforepropertychange",a))}}
l.get=function(a){var b,c=this.i;if(c.hasOwnProperty(a)){a=c[a];b=a.target;var c=a.key,d=ve.hasOwnProperty(c)?ve[c]:ve[c]="get"+(c.substr(0,1).toUpperCase()+c.substr(1)),d=F(b,d);b=u(d)?d.call(b):b.get(c);b=a.c(b)}else this.e.hasOwnProperty(a)&&(b=this.e[a]);return b};l.qa=function(){var a=this.i,b;if(ac(this.e)){if(ac(a))return[];b=a}else if(ac(a))b=this.e;else{b={};for(var c in this.e)b[c]=!0;for(c in a)b[c]=!0}return $b(b)};
l.kb=function(){var a={},b;for(b in this.e)a[b]=this.e[b];for(b in this.i)a[b]=this.get(b);return a};l.Zc=function(a){var b=this.i;b.hasOwnProperty(a)?(a=b[a],a.target.Zc(a.key)):ye(this,a)};function ye(a,b){var c=xe(b);L(a,c);L(a,new se("propertychange",b))}
l.t=function(a,b){L(this,new se("beforepropertychange",a));var c=this.i;if(c.hasOwnProperty(a)){var d=c[a],c=d.target,e=d.key;b=d.a(b);d=we.hasOwnProperty(e)?we[e]:we[e]="set"+(e.substr(0,1).toUpperCase()+e.substr(1));d=F(c,d);u(d)?d.call(c,b):c.t(e,b)}else this.e[a]=b,ye(this,a)};l.T=function(a){for(var b in a)this.t(b,a[b])};l.od=function(a){var b=this.X,c=b[a];c&&(delete b[a],K(c),b=this.get(a),delete this.i[a],this.e[a]=b);if(b=this.ba[a])K(b),delete this.ba[a]};l.ki=function(){for(var a in this.X)this.od(a)};function Ae(a,b,c){yd.call(this,a,c);this.element=b}B(Ae,yd);function N(a){M.call(this);this.a=a||[];Be(this)}B(N,M);l=N.prototype;l.clear=function(){for(;0<this.$a();)this.pop()};l.xg=function(a){var b,c;b=0;for(c=a.length;b<c;++b)this.push(a[b]);return this};l.forEach=function(a,b){Ma(this.a,a,b)};l.yg=k("a");l.Ld=function(a){return this.a[a]};l.$a=function(){return this.get("length")};l.jc=function(a,b){Va(this.a,a,0,b);Be(this);L(this,new Ae("add",b,this))};
l.pop=function(){return this.tc(this.$a()-1)};l.push=function(a){var b=this.a.length;this.jc(b,a);return b};l.remove=function(a){var b=this.a,c,d;c=0;for(d=b.length;c<d;++c)if(b[c]===a)return this.tc(c)};l.tc=function(a){var b=this.a[a];Ka.splice.call(this.a,a,1);Be(this);L(this,new Ae("remove",b,this));return b};l.$h=function(a,b){var c=this.$a();if(a<c)c=this.a[a],this.a[a]=b,L(this,new Ae("remove",c,this)),L(this,new Ae("add",b,this));else{for(;c<a;++c)this.jc(c,void 0);this.jc(a,b)}};
function Be(a){a.t("length",a.a.length)};function Ce(a){M.call(this);a=u(a)?a:{};this.a=null;I(this,xe("tracking"),this.n,!1,this);this.b(u(a.tracking)?a.tracking:!1)}B(Ce,M);Ce.prototype.w=function(){this.b(!1);Ce.B.w.call(this)};
Ce.prototype.l=function(a){a=a.G;if(null!=a.alpha){var b=Sb(a.alpha);this.t("alpha",b);"boolean"==typeof a.absolute&&a.absolute?this.t("heading",b):null!=a.webkitCompassHeading&&(null!=a.webkitCompassAccuracy&&-1!=a.webkitCompassAccuracy)&&this.t("heading",Sb(a.webkitCompassHeading))}null!=a.beta&&this.t("beta",Sb(a.beta));null!=a.gamma&&this.t("gamma",Sb(a.gamma));this.s()};Ce.prototype.f=function(){return this.get("alpha")};Ce.prototype.getAlpha=Ce.prototype.f;Ce.prototype.g=function(){return this.get("beta")};
Ce.prototype.getBeta=Ce.prototype.g;Ce.prototype.j=function(){return this.get("gamma")};Ce.prototype.getGamma=Ce.prototype.j;Ce.prototype.k=function(){return this.get("heading")};Ce.prototype.getHeading=Ce.prototype.k;Ce.prototype.d=function(){return this.get("tracking")};Ce.prototype.getTracking=Ce.prototype.d;Ce.prototype.n=function(){if(G.yd){var a=this.d();a&&null===this.a?this.a=I(t,"deviceorientation",this.l,!1,this):a||null===this.a||(K(this.a),this.a=null)}};
Ce.prototype.b=function(a){this.t("tracking",a)};Ce.prototype.setTracking=Ce.prototype.b;function De(){re.call(this);this.extent=void 0;this.e=-1;this.f={};this.j=this.i=0}B(De,re);De.prototype.q=function(a,b){var c=u(b)?b:[NaN,NaN];this.ea(a[0],a[1],c,Infinity);return c};De.prototype.Ra=he;var Ee={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",
darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",
ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",
lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",
moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",
seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};var Fe=/^#(?:[0-9a-f]{3}){1,2}$/i,Ge=/^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i,He=/^(?:rgba)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|1|0\.\d{0,10})\)$/i;function Ie(a){if(!la(a)){var b=a[0];b!=(b|0)&&(b=b+0.5|0);var c=a[1];c!=(c|0)&&(c=c+0.5|0);var d=a[2];d!=(d|0)&&(d=d+0.5|0);a="rgba("+b+","+c+","+d+","+a[3]+")"}return a}
var Ke=function(){var a={},b=0;return function(c,d){var e;if(a.hasOwnProperty(c))e=a[c];else{if(1024<=b){e=0;for(var f in a)0===(e++&3)&&(delete a[f],--b)}e=Je(c);a[c]=e;++b}u(d)&&(d[0]=e[0],d[1]=e[1],d[2]=e[2],d[3]=e[3],e=d);return e}}();
function Je(a){var b=!1;Ee.hasOwnProperty(a)&&(a=Ee[a],b=!0);var c,d;if(b||Fe.exec(a))return d=3==a.length-1?1:2,b=parseInt(a.substr(1+0*d,d),16),c=parseInt(a.substr(1+1*d,d),16),a=parseInt(a.substr(1+2*d,d),16),1==d&&(b=(b<<4)+b,c=(c<<4)+c,a=(a<<4)+a),b=[b,c,a,1];if(d=He.exec(a))return b=Number(d[1]),c=Number(d[2]),a=Number(d[3]),d=Number(d[4]),b=[b,c,a,d],Le(b,b);if(d=Ge.exec(a))return b=Number(d[1]),c=Number(d[2]),a=Number(d[3]),b=[b,c,a,1],Le(b,b);throw Error(a+" is not a valid color");}
function Le(a,b){var c=u(b)?b:[];c[0]=Qb(a[0]+0.5|0,0,255);c[1]=Qb(a[1]+0.5|0,0,255);c[2]=Qb(a[2]+0.5|0,0,255);c[3]=Qb(a[3],0,1);return c};var Me=Ke("black"),Ne=[],Oe=[0,0,0,1];function Pe(a){a=u(a)?a:{};this.a=u(a.color)?a.color:null}Pe.prototype.c=k("a");function Qe(a){this.j=a.opacity;this.k=a.rotateWithView;this.e=a.rotation;this.f=a.scale;this.n=a.ue}Qe.prototype.o=k("e");Qe.prototype.O=k("f");function Re(a){a=u(a)?a:{};this.a=u(a.color)?a.color:null;this.b=a.lineCap;this.d=u(a.lineDash)?a.lineDash:null;this.e=a.lineJoin;this.f=a.miterLimit;this.c=a.width}l=Re.prototype;l.ih=k("a");l.of=k("b");l.jh=k("d");l.pf=k("e");l.tf=k("f");l.kh=k("c");function Se(a){a=u(a)?a:{};this.i=rc("CANVAS");this.c=null;this.b=u(a.fill)?a.fill:null;this.d=a.radius;this.a=u(a.stroke)?a.stroke:null;a=this.i;var b,c;null===this.a?c=0:(b=Ie(this.a.a),c=this.a.c,u(c)||(c=1));var d=2*(this.d+c)+1;a.height=d;a.width=d;var e=a.getContext("2d");e.arc(d/2,d/2,this.d,0,2*Math.PI,!0);null!==this.b&&(e.fillStyle=Ie(this.b.a),e.fill());null!==this.a&&(e.strokeStyle=b,e.lineWidth=c,e.stroke());null===this.b?(a=this.c=rc("CANVAS"),a.height=d,a.width=d,e=a.getContext("2d"),
e.arc(d/2,d/2,this.d,0,2*Math.PI,!0),e.fillStyle=Me,e.fill(),null!==this.a&&(e.strokeStyle=b,e.lineWidth=c,e.stroke())):this.c=a;this.g=[d/2,d/2];this.l=[d,d];Qe.call(this,{opacity:1,rotateWithView:!1,rotation:0,scale:1,ue:void 0})}B(Se,Qe);l=Se.prototype;l.Lb=k("g");l.eh=k("b");l.ge=k("c");l.Rb=k("i");l.he=ca(2);l.fh=k("d");l.sb=k("l");l.gh=k("a");l.Vd=ea;l.ie=ea;l.ye=ea;function Te(a){a=u(a)?a:{};this.d=u(a.fill)?a.fill:null;this.e=u(a.image)?a.image:null;this.b=u(a.stroke)?a.stroke:null;this.c=u(a.text)?a.text:null;this.a=a.zIndex}l=Te.prototype;l.lh=k("d");l.mh=k("e");l.nh=k("b");l.oh=k("c");l.Cf=k("a");function Ue(a){M.call(this);this.P=void 0;this.a="geometry";this.g=null;this.f=void 0;this.d=null;I(this,xe(this.a),this.ic,!1,this);null!=a?a instanceof De?this.cb(a):this.T(a):this.cb(null)}B(Ue,M);Ue.prototype.J=function(){return this.get(this.a)};Ue.prototype.getGeometry=Ue.prototype.J;l=Ue.prototype;l.hf=k("P");l.gf=k("a");l.Eg=k("g");l.Fg=k("f");l.Kf=function(){this.s()};l.ic=function(){null!==this.d&&(K(this.d),this.d=null);var a=this.J();null!=a&&(this.d=I(a,"change",this.Kf,!1,this))};
l.cb=function(a){this.t(this.a,a)};Ue.prototype.setGeometry=Ue.prototype.cb;Ue.prototype.j=function(a){this.g=a;oa(a)||(a=ia(a)?a:[a],a=ge(a));this.f=a;this.s()};Ue.prototype.b=function(a){this.P=a};Ue.prototype.k=function(a){Yd(this,xe(this.a),this.ic,!1,this);this.a=a;I(this,xe(this.a),this.ic,!1,this);this.ic()};
function Ve(){var a=new Pe({color:"rgba(255,255,255,0.4)"}),b=new Re({color:"#3399CC",width:1.25}),c=[new Te({image:new Se({fill:a,stroke:b,radius:5}),fill:a,stroke:b})];Ve=function(){return c};return c}function We(a,b){var c=a.f;u(c)||(c=Ve);return c.call(a,b)}function Xe(a){oa(a)||(a=ia(a)?a:[a],a=ge(a));return a}
function Ye(){var a={},b=[255,255,255,1],c=[0,153,255,1];a.Polygon=[new Te({fill:new Pe({color:[255,255,255,0.5]})})];a.MultiPolygon=a.Polygon;a.LineString=[new Te({stroke:new Re({color:b,width:5})}),new Te({stroke:new Re({color:c,width:3})})];a.MultiLineString=a.LineString;a.Point=[new Te({image:new Se({radius:6,fill:new Pe({color:c}),stroke:new Re({color:b,width:1.5})}),zIndex:Infinity})];a.MultiPoint=a.Point;a.GeometryCollection=a.Polygon.concat(a.Point);return a};function Ze(a,b,c,d,e,f){yd.call(this,a,b);this.vectorContext=c;this.frameState=d;this.context=e;this.glContext=f}B(Ze,yd);function $e(a){a=u(a)?a:{};this.i=this.d=this.e=this.c=this.b=this.a=null;this.f=u(a.style)?Xe(a.style):void 0;u(a.features)?ia(a.features)?this.Tb(new N(Ta(a.features))):this.Tb(a.features):this.Tb(new N);u(a.map)&&this.setMap(a.map)}l=$e.prototype;l.Zd=function(a){this.a.push(a)};l.zg=k("a");l.$d=function(){af(this)};l.If=function(a){a=a.element;this.c[v(a).toString()]=I(a,"change",this.$d,!1,this);af(this)};l.Jf=function(a){a=v(a.element).toString();K(this.c[a]);delete this.c[a];af(this)};
l.Cg=function(a){if(null!==this.a){var b=this.f;u(b)||(b=We);var c=a.frameState.view2DState.resolution,d=a.vectorContext,e,f,g;this.a.forEach(function(a){g=b(a,c);if(null!=g)for(f=g.length,e=0;e<f;++e)d.Oc(a,g[e])},this)}};l.pc=function(a){this.a.remove(a)};function af(a){null===a.e||a.e.K()}
l.Tb=function(a){null!==this.b&&(Ma(this.b,K),this.b=null);null!==this.c&&(Ma(Zb(this.c),K),this.c=null);this.a=a;if(null!==a){this.b=[I(a,"add",this.If,!1,this),I(a,"remove",this.Jf,!1,this)];this.c={};a=a.a;var b,c=a.length,d;for(b=0;b<c;++b)d=a[b],this.c[v(d).toString()]=I(d,"change",this.$d,!1,this)}af(this)};l.setMap=function(a){null!==this.d&&(K(this.d),this.d=null);af(this);this.e=a;null!==a&&(this.d=I(a,"postcompose",this.Cg,!1,this),a.K())};l.Dg=function(a){this.i=a;this.f=Xe(a);af(this)};
l.Ag=k("i");l.Bg=k("f");function bf(a,b){a[0]+=b[0];a[1]+=b[1];return a}function cf(a,b){var c=a[0],d=a[1],e=b[0],f=b[1],g=e[0],e=e[1],h=f[0],f=f[1],m=h-g,n=f-e,c=0===m&&0===n?0:(m*(c-g)+n*(d-e))/(m*m+n*n||0);0>=c||(1<=c?(g=h,e=f):(g+=c*m,e+=c*n));return[g,e]}function df(a,b){var c=Rb(a+180,360)-180,d=Math.abs(Math.round(3600*c));return Math.floor(d/3600)+"\u00b0 "+Math.floor(d/60%60)+"\u2032 "+Math.floor(d%60)+"\u2033 "+b.charAt(0>c?1:0)}
function ef(a,b,c){return u(a)?b.replace("{x}",a[0].toFixed(c)).replace("{y}",a[1].toFixed(c)):""}function ff(a,b){for(var c=!0,d=a.length-1;0<=d;--d)if(a[d]!=b[d]){c=!1;break}return c}function gf(a,b){var c=Math.cos(b),d=Math.sin(b),e=a[1]*c+a[0]*d;a[0]=a[0]*c-a[1]*d;a[1]=e;return a}function hf(a,b){var c=a[0]-b[0],d=a[1]-b[1];return c*c+d*d}function jf(a,b){return ef(a,"{x}, {y}",b)};function kf(a){for(var b=lf(),c=0,d=a.length;c<d;++c){var e=b,f=a[c];f[0]<e[0]&&(e[0]=f[0]);f[0]>e[2]&&(e[2]=f[0]);f[1]<e[1]&&(e[1]=f[1]);f[1]>e[3]&&(e[3]=f[1])}return b}function mf(a,b,c){var d=Math.min.apply(null,a),e=Math.min.apply(null,b);a=Math.max.apply(null,a);b=Math.max.apply(null,b);return nf(d,e,a,b,c)}function of(a,b,c){return u(c)?(c[0]=a[0]-b,c[1]=a[1]-b,c[2]=a[2]+b,c[3]=a[3]+b,c):[a[0]-b,a[1]-b,a[2]+b,a[3]+b]}
function pf(a,b){return u(b)?(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b):a.slice()}function qf(a,b,c){b=b<a[0]?a[0]-b:a[2]<b?b-a[2]:0;a=c<a[1]?a[1]-c:a[3]<c?c-a[3]:0;return b*b+a*a}function rf(a,b){return a[0]<=b[0]&&b[2]<=a[2]&&a[1]<=b[1]&&b[3]<=a[3]}function lf(){return[Infinity,Infinity,-Infinity,-Infinity]}function nf(a,b,c,d,e){return u(e)?(e[0]=a,e[1]=b,e[2]=c,e[3]=d,e):[a,b,c,d]}function sf(a){return nf(Infinity,Infinity,-Infinity,-Infinity,a)}
function tf(a,b){return a[0]==b[0]&&a[2]==b[2]&&a[1]==b[1]&&a[3]==b[3]}function uf(a,b){b[0]<a[0]&&(a[0]=b[0]);b[2]>a[2]&&(a[2]=b[2]);b[1]<a[1]&&(a[1]=b[1]);b[3]>a[3]&&(a[3]=b[3]);return a}function vf(a,b,c,d,e){for(;c<d;c+=e){var f=a,g=b[c],h=b[c+1];f[0]=Math.min(f[0],g);f[1]=Math.min(f[1],h);f[2]=Math.max(f[2],g);f[3]=Math.max(f[3],h)}return a}function wf(a){return[a[0],a[1]]}function xf(a){return[(a[0]+a[2])/2,(a[1]+a[3])/2]}
function yf(a,b,c,d){var e=b*d[0]/2;d=b*d[1]/2;b=Math.cos(c);c=Math.sin(c);e=[-e,-e,e,e];d=[-d,d,-d,d];var f,g,h;for(f=0;4>f;++f)g=e[f],h=d[f],e[f]=a[0]+g*b-h*c,d[f]=a[1]+g*c+h*b;return mf(e,d,void 0)}function zf(a){return a[3]-a[1]}function Af(a){return[a[0],a[3]]}function Bf(a){return a[2]-a[0]}function Cf(a,b){return a[0]<=b[2]&&a[2]>=b[0]&&a[1]<=b[3]&&a[3]>=b[1]}function Df(a){return a[2]<a[0]||a[3]<a[1]}function Ef(a,b){return u(b)?(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b):a}
function Ff(a,b){var c=(a[2]-a[0])/2*(b-1),d=(a[3]-a[1])/2*(b-1);a[0]-=c;a[2]+=c;a[1]-=d;a[3]+=d}function Gf(a,b){return Cf(a,b)&&(a[0]==b[2]||a[2]==b[0]||a[1]==b[3]||a[3]==b[1])}function Hf(a,b,c){a=[a[0],a[1],a[0],a[3],a[2],a[1],a[2],a[3]];b(a,a,2);return mf([a[0],a[2],a[4],a[6]],[a[1],a[3],a[5],a[7]],c)};function If(a,b){var c,d;c=0;for(d=b.length;c<d;++c)a.push(b[c])}function Jf(a,b,c){var d=a.length;if(a[0]<=b)return 0;if(!(b<=a[d-1]))if(0<c)for(c=1;c<d;++c){if(a[c]<b)return c-1}else if(0>c)for(c=1;c<d;++c){if(a[c]<=b)return c}else for(c=1;c<d;++c){if(a[c]==b)return c;if(a[c]<b)return a[c-1]-b<b-a[c]?c-1:c}return d-1};function Kf(a,b,c,d){var e=c[0],f=c[1],g=c[4],h=c[5],m=c[12];c=c[13];var n=u(d)?d:[],p=0,q,r;q=0;for(r=a.length;q<r;q+=b){var s=a[q],z=a[q+1];n[p++]=e*s+g*z+m;n[p++]=f*s+h*z+c}u(d)&&n.length!=p&&(n.length=p);return n};function Lf(){De.call(this);this.b="XY";this.a=2;this.h=null}B(Lf,De);function Mf(a){if("XY"==a)return 2;if("XYZ"==a||"XYM"==a)return 3;if("XYZM"==a)return 4;throw Error("unsupported layout: "+a);}l=Lf.prototype;l.Ra=he;l.p=function(a){if(this.e!=this.c){var b=this.h,c=this.h.length,d=this.a,e=sf(this.extent);this.extent=vf(e,b,0,c,d);this.e=this.c}return Ef(this.extent,a)};l.df=function(){return this.h.slice(0,this.a)};l.mf=function(){return this.h.slice(this.h.length-this.a)};l.nf=k("b");
l.Wa=function(a){this.j!=this.c&&(bc(this.f),this.i=0,this.j=this.c);if(0>a||0!==this.i&&a<=this.i)return this;var b=a.toString();if(this.f.hasOwnProperty(b))return this.f[b];var c=this.lb(a);if(c.h.length<this.h.length)return this.f[b]=c;this.i=a;return this};l.lb=function(){return this};function Nf(a,b,c){a.a=Mf(b);a.b=b;a.h=c}
function Of(a,b,c,d){if(u(b))c=Mf(b);else{for(b=0;b<d;++b){if(0===c.length){a.b="XY";a.a=2;return}c=c[0]}c=c.length;if(2==c)b="XY";else if(3==c)b="XYZ";else if(4==c)b="XYZM";else throw Error("unsupported stride: "+c);}a.b=b;a.a=c}l.transform=function(a){null!==this.h&&(a(this.h,this.h,this.a),this.s())};function Pf(a,b,c){var d=a.h;return null===d?null:Kf(d,a.a,b,c)};function Qf(a,b,c,d){for(var e=0,f=a[c-d],g=a[c-d+1];b<c;b+=d)var h=a[b],m=a[b+1],e=e+(g*h-f*m),f=h,g=m;return e/2}function Rf(a,b,c,d){var e=0,f,g;f=0;for(g=c.length;f<g;++f){var h=c[f],e=e+Qf(a,b,h,d);b=h}return e};function Sf(a,b,c,d){a=c-a;b=d-b;return a*a+b*b};function Tf(a,b,c,d,e,f,g){var h=a[b],m=a[b+1],n=a[c]-h,p=a[c+1]-m;if(0!==n||0!==p)if(f=((e-h)*n+(f-m)*p)/(n*n+p*p),1<f)b=c;else if(0<f){for(e=0;e<d;++e)g[e]=a[b+e]+f*(a[c+e]-a[b+e]);g.length=d;return}for(e=0;e<d;++e)g[e]=a[b+e];g.length=d}function Uf(a,b,c,d,e){var f=a[b],g=a[b+1];for(b+=d;b<c;b+=d){var h=a[b],m=a[b+1],f=Sf(f,g,h,m);f>e&&(e=f);f=h;g=m}return e}function Vf(a,b,c,d,e){var f,g;f=0;for(g=c.length;f<g;++f){var h=c[f];e=Uf(a,b,h,d,e);b=h}return e}
function Wf(a,b,c,d,e,f,g,h,m,n,p){if(b==c)return n;var q;if(0===e){q=Sf(g,h,a[b],a[b+1]);if(q<n){for(p=0;p<d;++p)m[p]=a[b+p];m.length=d;return q}return n}for(var r=u(p)?p:[NaN,NaN],s=b+d;s<c;)if(Tf(a,s-d,s,d,g,h,r),q=Sf(g,h,r[0],r[1]),q<n){n=q;for(p=0;p<d;++p)m[p]=r[p];m.length=d;s+=d}else s+=d*Math.max((Math.sqrt(q)-Math.sqrt(n))/e|0,1);if(f&&(Tf(a,c-d,b,d,g,h,r),q=Sf(g,h,r[0],r[1]),q<n)){n=q;for(p=0;p<d;++p)m[p]=r[p];m.length=d}return n}
function Xf(a,b,c,d,e,f,g,h,m,n,p){p=u(p)?p:[NaN,NaN];var q,r;q=0;for(r=c.length;q<r;++q){var s=c[q];n=Wf(a,b,s,d,e,f,g,h,m,n,p);b=s}return n};function Yf(a,b){var c=0,d,e;d=0;for(e=b.length;d<e;++d)a[c++]=b[d];return c}function Zf(a,b,c,d){var e,f;e=0;for(f=c.length;e<f;++e){var g=c[e],h;for(h=0;h<d;++h)a[b++]=g[h]}return b}function $f(a,b,c,d,e){e=u(e)?e:[];var f=0,g,h;g=0;for(h=c.length;g<h;++g)b=Zf(a,b,c[g],d),e[f++]=b;e.length=f;return e};function ag(a,b,c,d,e){e=u(e)?e:[];for(var f=0;b<c;b+=d)e[f++]=a.slice(b,b+d);e.length=f;return e}function bg(a,b,c,d,e){e=u(e)?e:[];var f=0,g,h;g=0;for(h=c.length;g<h;++g){var m=c[g];e[f++]=ag(a,b,m,d,e[f]);b=m}e.length=f;return e};function cg(a,b,c,d,e,f,g){var h=(c-b)/d;if(3>h){for(;b<c;b+=d)f[g++]=a[b],f[g++]=a[b+1];return g}var m=Array(h);m[0]=1;m[h-1]=1;c=[b,c-d];for(var n=0,p;0<c.length;){var q=c.pop(),r=c.pop(),s=0,z=a[r],x=a[r+1],w=a[q],C=a[q+1];for(p=r+d;p<q;p+=d){var A;A=a[p];var D=a[p+1],H=z,P=x,J=w-H,U=C-P;if(0!==J||0!==U){var X=((A-H)*J+(D-P)*U)/(J*J+U*U);1<X?(H=w,P=C):0<X&&(H+=J*X,P+=U*X)}A=Sf(A,D,H,P);A>s&&(n=p,s=A)}s>e&&(m[(n-b)/d]=1,r+d<n&&c.push(r,n),n+d<q&&c.push(n,q))}for(p=0;p<h;++p)m[p]&&(f[g++]=a[b+p*
d],f[g++]=a[b+p*d+1]);return g}
function dg(a,b,c,d,e,f,g,h){var m,n;m=0;for(n=c.length;m<n;++m){var p=c[m];a:{var q=a,r=p,s=d,z=e,x=f;if(b!=r){var w=z*Math.round(q[b]/z),C=z*Math.round(q[b+1]/z);b+=s;x[g++]=w;x[g++]=C;var A=void 0,D=void 0;do if(A=z*Math.round(q[b]/z),D=z*Math.round(q[b+1]/z),b+=s,b==r){x[g++]=A;x[g++]=D;break a}while(A==w&&D==C);for(;b<r;){var H,P;H=z*Math.round(q[b]/z);P=z*Math.round(q[b+1]/z);b+=s;if(H!=A||P!=D){var J=A-w,U=D-C,X=H-w,ma=P-C;J*ma==U*X&&(0>J&&X<J||J==X||0<J&&X>J)&&(0>U&&ma<U||U==ma||0<U&&ma>U)||
(x[g++]=A,x[g++]=D,w=A,C=D);A=H;D=P}}x[g++]=A;x[g++]=D}}h.push(g);b=p}return g};function eg(a,b){Lf.call(this);this.d=this.g=-1;this.H(a,b)}B(eg,Lf);l=eg.prototype;l.I=function(){var a=new eg(null);gg(a,this.b,this.h.slice());return a};l.ea=function(a,b,c,d){if(d<qf(this.p(),a,b))return d;this.d!=this.c&&(this.g=Math.sqrt(Uf(this.h,0,this.h.length,this.a,0)),this.d=this.c);return Wf(this.h,0,this.h.length,this.a,this.g,!0,a,b,c,d)};l.Ng=function(){return Qf(this.h,0,this.h.length,this.a)};l.v=function(){return ag(this.h,0,this.h.length,this.a)};
l.lb=function(a){var b=[];b.length=cg(this.h,0,this.h.length,this.a,a,b,0);a=new eg(null);gg(a,"XY",b);return a};l.A=ca("LinearRing");l.H=function(a,b){null===a?gg(this,"XY",null):(Of(this,b,a,1),null===this.h&&(this.h=[]),this.h.length=Zf(this.h,0,a,this.a),this.s())};function gg(a,b,c){Nf(a,b,c);a.s()};function hg(a,b){Lf.call(this);this.H(a,b)}B(hg,Lf);l=hg.prototype;l.I=function(){var a=new hg(null);ig(a,this.b,this.h.slice());return a};l.ea=function(a,b,c,d){var e=this.h;a=Sf(a,b,e[0],e[1]);if(a<d){d=this.a;for(b=0;b<d;++b)c[b]=e[b];c.length=d;return a}return d};l.v=function(){return this.h.slice()};l.p=function(a){if(this.e!=this.c){var b=this.h,c=b[0],b=b[1];this.extent=nf(c,b,c,b,this.extent);this.e=this.c}return Ef(this.extent,a)};l.A=ca("Point");
l.H=function(a,b){null===a?ig(this,"XY",null):(Of(this,b,a,0),null===this.h&&(this.h=[]),this.h.length=Yf(this.h,a),this.s())};function ig(a,b,c){Nf(a,b,c);a.s()};function jg(a,b,c,d,e,f){for(var g=!1,h=a[c-d],m=a[c-d+1];b<c;b+=d){var n=a[b],p=a[b+1];m>f!=p>f&&e<(n-h)*(f-m)/(p-m)+h&&(g=!g);h=n;m=p}return g}function kg(a,b,c,d,e,f){if(0===c.length||!jg(a,b,c[0],d,e,f))return!1;var g;b=1;for(g=c.length;b<g;++b)if(jg(a,c[b-1],c[b],d,e,f))return!1;return!0};function lg(a,b,c,d,e,f,g){var h,m,n,p,q,r=e[f+1],s=[],z=c[0];n=a[z-d];q=a[z-d+1];for(h=b;h<z;h+=d){p=a[h];m=a[h+1];if(r<=q&&m<=r||q<=r&&r<=m)n=(r-q)/(m-q)*(p-n)+n,s.push(n);n=p;q=m}z=NaN;q=-Infinity;s.sort();n=s[0];h=1;for(m=s.length;h<m;++h){p=s[h];var x=Math.abs(p-n);x>q&&(n=(n+p)/2,kg(a,b,c,d,n,r)&&(z=n,q=x));n=p}isNaN(z)&&(z=e[f]);return u(g)?(g.push(z,r),g):[z,r]};function mg(a,b,c,d){for(var e=0,f=a[c-d],g=a[c-d+1];b<c;b+=d)var h=a[b],m=a[b+1],e=e+(h-f)*(m+g),f=h,g=m;return 0<e}function ng(a,b,c){var d=0,e,f;e=0;for(f=b.length;e<f;++e){var g=b[e],d=mg(a,d,g,c);if(0===e?!d:d)return!1;d=g}return!0}function og(a,b,c,d){var e,f;e=0;for(f=c.length;e<f;++e){var g=c[e],h=mg(a,b,g,d);if(0===e?!h:h)for(var h=a,m=g,n=d;b<m-n;){var p;for(p=0;p<n;++p){var q=h[b+p];h[b+p]=h[m-n+p];h[m-n+p]=q}b+=n;m-=n}b=g}return b};function pg(a,b){Lf.call(this);this.d=[];this.k=-1;this.n=null;this.r=this.l=this.o=-1;this.g=null;this.H(a,b)}B(pg,Lf);l=pg.prototype;l.Pe=function(a){null===this.h?this.h=a.h.slice():If(this.h,a.h);this.d.push(this.h.length);this.s()};l.I=function(){var a=new pg(null);qg(a,this.b,this.h.slice(),this.d.slice());return a};
l.ea=function(a,b,c,d){if(d<qf(this.p(),a,b))return d;this.l!=this.c&&(this.o=Math.sqrt(Vf(this.h,0,this.d,this.a,0)),this.l=this.c);return Xf(this.h,0,this.d,this.a,this.o,!0,a,b,c,d)};l.Ra=function(a,b){return kg(rg(this),0,this.d,this.a,a,b)};l.Qg=function(){return Rf(rg(this),0,this.d,this.a)};l.v=function(){return bg(this.h,0,this.d,this.a)};function sg(a){if(a.k!=a.c){var b=xf(a.p());a.n=lg(rg(a),0,a.d,a.a,b,0);a.k=a.c}return a.n}l.kf=function(){return new hg(sg(this))};
l.rf=function(a){if(0>a||this.d.length<=a)return null;var b=new eg(null);gg(b,this.b,this.h.slice(0===a?0:this.d[a-1],this.d[a]));return b};l.Nd=function(){var a=this.b,b=this.h,c=this.d,d=[],e=0,f,g;f=0;for(g=c.length;f<g;++f){var h=c[f],m=new eg(null);gg(m,a,b.slice(e,h));d.push(m);e=h}return d};function rg(a){if(a.r!=a.c){var b=a.h;ng(b,a.d,a.a)?a.g=b:(a.g=b.slice(),a.g.length=og(a.g,0,a.d,a.a));a.r=a.c}return a.g}
l.lb=function(a){var b=[],c=[];b.length=dg(this.h,0,this.d,this.a,Math.sqrt(a),b,0,c);a=new pg(null);qg(a,"XY",b,c);return a};l.A=ca("Polygon");l.H=function(a,b){if(null===a)qg(this,"XY",null,this.d);else{Of(this,b,a,2);null===this.h&&(this.h=[]);var c=$f(this.h,0,a,this.a,this.d);this.h.length=0===c.length?0:c[c.length-1];this.s()}};function qg(a,b,c,d){Nf(a,b,c);a.d=d;a.s()};/*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licenced under CC-BY-3.0.
*/
function tg(a){this.radius=a}function ug(a,b,c){var d=Sb(b[1]),e=Sb(c[1]),f=(e-d)/2;b=Sb(c[0]-b[0])/2;d=Math.sin(f)*Math.sin(f)+Math.sin(b)*Math.sin(b)*Math.cos(d)*Math.cos(e);return 2*a.radius*Math.atan2(Math.sqrt(d),Math.sqrt(1-d))};var vg=new tg(6370997);var wg={},xg="object"==typeof Proj4js;wg.degrees=2*Math.PI*vg.radius/360;wg.ft=0.3048;wg.m=1;function yg(a){this.a=a.code;this.na=a.units;this.k=u(a.extent)?a.extent:null;this.c=u(a.axisOrientation)?a.axisOrientation:"enu";this.j=u(a.global)?a.global:!1;this.f=null}yg.prototype.g=k("a");yg.prototype.p=k("k");yg.prototype.n=k("na");yg.prototype.b=function(){return wg[this.na]};function zg(a){return a.c}
function Ag(a,b){var c={units:a.units,axisOrientation:a.axis};gc(c,b);yg.call(this,c);this.i=a;this.e=null}B(Ag,yg);Ag.prototype.b=function(){var a=this.i.to_meter;u(a)||(a=wg[this.na]);return a};
Ag.prototype.d=function(a,b){if("degrees"==this.na)return a;null===this.e&&(this.e=Bg(this,Cg({code:"EPSG:4326",extent:null})));var c=[b[0]-a/2,b[1],b[0]+a/2,b[1],b[0],b[1]-a/2,b[0],b[1]+a/2],c=this.e(c,c,2),d=ug(vg,c.slice(0,2),c.slice(2,4)),c=ug(vg,c.slice(4,6),c.slice(6,8)),d=(d+c)/2;"ft"==this.na&&(d/=0.3048);return d};function Dg(a){return a.i}var Eg={},Fg={},Gg={};function Hg(a){Ig(a);Ma(a,function(b){Ma(a,function(a){b!==a&&Jg(b,a,Kg)})})}
function Lg(){var a=Mg,b=Ng,c=Og;Ma(Pg,function(d){Ma(a,function(a){Jg(d,a,b);Jg(a,d,c)})})}function Qg(a){Fg[a.a]=a;Jg(a,a,Kg)}function Ig(a){Ma(a,function(a){Qg(a)})}function Rg(a){return null!=a?la(a)?Sg(a):a:Sg("EPSG:3857")}function Jg(a,b,c){a=a.a;b=b.a;a in Gg||(Gg[a]={});Gg[a][b]=c}function Sg(a){var b;a instanceof yg?b=a:la(a)?(b=Fg[a],xg&&!u(b)&&(b=Cg({code:a,extent:null})),u(b)||(b=null)):b=null;return b}
function Cg(a){var b=a.code,c=Eg[b];if(!u(c)){var d=new Proj4js.Proj(b),e=d.srsCode,c=Eg[e];u(c)||(a=ec(a),a.code=e,c=new Ag(d,a),Eg[e]=c);Eg[b]=c}return c}function Tg(a,b){var c=Sg(a),d=Sg(b);return Bg(c,d)}
function Bg(a,b){var c=a.a,d=b.a,e;c in Gg&&d in Gg[c]&&(e=Gg[c][d]);if(xg&&!u(e)){var f=Dg(a instanceof Ag?a:Cg({code:c,extent:null})),g=Dg(b instanceof Ag?b:Cg({code:d,extent:null}));e=function(a,b,c){var d=a.length;c=1<c?c:2;u(b)||(b=2<c?a.slice():Array(d));for(var e,r=0;r<d;r+=c)e=new Proj4js.Point(a[r],a[r+1]),e=Proj4js.transform(f,g,e),b[r]=e.x,b[r+1]=e.y;return b};Jg(a,b,e)}u(e)||(e=Ug);return e}function Ug(a,b){if(u(b)&&a!==b){for(var c=0,d=a.length;c<d;++c)b[c]=a[c];a=b}return a}
function Kg(a,b){var c;if(u(b)){c=0;for(var d=a.length;c<d;++c)b[c]=a[c];c=b}else c=a.slice();return c};var Vg=new tg(6378137);function O(a){M.call(this);a=u(a)?a:{};this.a=null;this.d=Ug;this.b=void 0;I(this,xe("projection"),this.Gg,!1,this);I(this,xe("tracking"),this.Hg,!1,this);u(a.projection)&&this.n(Sg(a.projection));u(a.trackingOptions)&&this.l(a.trackingOptions);this.f(u(a.tracking)?a.tracking:!1)}B(O,M);l=O.prototype;l.w=function(){this.f(!1);O.B.w.call(this)};l.Gg=function(){var a=this.j();null!=a&&(this.d=Bg(Sg("EPSG:4326"),a),null===this.a||this.t("position",this.d(this.a)))};
l.Hg=function(){if(G.zd){var a=this.k();a&&!u(this.b)?this.b=t.navigator.geolocation.watchPosition(wa(this.Lh,this),wa(this.Mh,this),this.g()):!a&&u(this.b)&&(t.navigator.geolocation.clearWatch(this.b),this.b=void 0)}};
l.Lh=function(a){var b=a.coords;this.t("accuracy",b.accuracy);this.t("altitude",null===b.altitude?void 0:b.altitude);this.t("altitudeAccuracy",null===b.altitudeAccuracy?void 0:b.altitudeAccuracy);this.t("heading",null===b.heading?void 0:Sb(b.heading));null===this.a?this.a=[b.longitude,b.latitude]:(this.a[0]=b.longitude,this.a[1]=b.latitude);a=this.d(this.a);this.t("position",a);this.t("speed",null===b.speed?void 0:b.speed);a=this.a;var c=b.accuracy,d=u(void 0)?void 0:32,b=[],e;for(e=0;e<d;++e){var f=
2*Math.PI*e/d,g=Sb(a[1]),h=c/Vg.radius,m=Math.asin(Math.sin(g)*Math.cos(h)+Math.cos(g)*Math.sin(h)*Math.cos(f));Ua(b,[180*(Sb(a[0])+Math.atan2(Math.sin(f)*Math.sin(h)*Math.cos(g),Math.cos(h)-Math.sin(g)*Math.sin(m)))/Math.PI,180*m/Math.PI])}b.push(b[0],b[1]);a=new pg(null);qg(a,"XY",b,[b.length]);a.transform(this.d);this.t("accuracyGeometry",a);this.s()};l.Mh=function(a){a.type="error";L(this,a)};l.Ze=function(){return this.get("accuracy")};O.prototype.getAccuracy=O.prototype.Ze;
O.prototype.o=function(){return this.get("accuracyGeometry")||null};O.prototype.getAccuracyGeometry=O.prototype.o;O.prototype.r=function(){return this.get("altitude")};O.prototype.getAltitude=O.prototype.r;O.prototype.q=function(){return this.get("altitudeAccuracy")};O.prototype.getAltitudeAccuracy=O.prototype.q;O.prototype.D=function(){return this.get("heading")};O.prototype.getHeading=O.prototype.D;O.prototype.L=function(){return this.get("position")};O.prototype.getPosition=O.prototype.L;
O.prototype.j=function(){return this.get("projection")};O.prototype.getProjection=O.prototype.j;O.prototype.u=function(){return this.get("speed")};O.prototype.getSpeed=O.prototype.u;O.prototype.k=function(){return this.get("tracking")};O.prototype.getTracking=O.prototype.k;O.prototype.g=function(){return this.get("trackingOptions")};O.prototype.getTrackingOptions=O.prototype.g;O.prototype.n=function(a){this.t("projection",a)};O.prototype.setProjection=O.prototype.n;
O.prototype.f=function(a){this.t("tracking",a)};O.prototype.setTracking=O.prototype.f;O.prototype.l=function(a){this.t("trackingOptions",a)};O.prototype.setTrackingOptions=O.prototype.l;function Wg(a,b){pe.call(this);this.a=a;this.state=b}B(Wg,pe);Wg.prototype.d=function(){return v(this).toString()};Wg.prototype.j=k("a");function Xg(a,b,c,d,e){Wg.call(this,a,b);this.g=c;this.c=new Image;null!==d&&(this.c.crossOrigin=d);this.f={};this.e=null;this.l=e}B(Xg,Wg);Xg.prototype.b=function(a){if(u(a)){var b=v(a);if(b in this.f)return this.f[b];a=ac(this.f)?this.c:this.c.cloneNode(!1);return this.f[b]=a}return this.c};Xg.prototype.d=k("g");Xg.prototype.k=function(){this.state=3;Ma(this.e,K);this.e=null;L(this,"change")};
Xg.prototype.n=function(){u(this.c.naturalWidth)||(this.c.naturalWidth=this.c.width,this.c.naturalHeight=this.c.height);this.state=this.c.naturalWidth&&this.c.naturalHeight?2:4;Ma(this.e,K);this.e=null;L(this,"change")};function Yg(){M.call(this);this.k=[0,0]}B(Yg,M);Yg.prototype.M=ca(null);Yg.prototype.$c=ca(!1);function Zg(a,b){a.k[1]+=b};function $g(a){return 1-Math.pow(1-a,3)};function ah(a){return 3*a*a-2*a*a*a}function bh(a){return a}function ch(a){return 0.5>a?ah(2*a):1-ah(2*(a-0.5))};function dh(a){var b=a.source,c=u(a.start)?a.start:ya(),d=b[0],e=b[1],f=u(a.duration)?a.duration:1E3,g=u(a.easing)?a.easing:ah;return function(a,b){if(b.time<c)return b.animate=!0,b.viewHints[0]+=1,!0;if(b.time<c+f){var n=1-g((b.time-c)/f),p=d-b.view2DState.center[0],q=e-b.view2DState.center[1];b.animate=!0;b.view2DState.center[0]+=n*p;b.view2DState.center[1]+=n*q;b.viewHints[0]+=1;return!0}return!1}}
function eh(a){var b=a.rotation,c=u(a.start)?a.start:ya(),d=u(a.duration)?a.duration:1E3,e=u(a.easing)?a.easing:ah;return function(a,g){if(g.time<c)return g.animate=!0,g.viewHints[0]+=1,!0;if(g.time<c+d){var h=1-e((g.time-c)/d),m=b-g.view2DState.rotation;g.animate=!0;g.view2DState.rotation+=h*m;g.viewHints[0]+=1;return!0}return!1}}
function fh(a){var b=a.resolution,c=u(a.start)?a.start:ya(),d=u(a.duration)?a.duration:1E3,e=u(a.easing)?a.easing:ah;return function(a,g){if(g.time<c)return g.animate=!0,g.viewHints[0]+=1,!0;if(g.time<c+d){var h=1-e((g.time-c)/d),m=b-g.view2DState.resolution;g.animate=!0;g.view2DState.resolution+=h*m;g.viewHints[0]+=1;return!0}return!1}};function gh(a,b,c){this.e=a;this.b=b;this.f=c;this.a=[];this.c=this.d=0}gh.prototype.update=function(a,b){this.a.push(a,b,ya())};function hh(a,b){var c=a.e,d=a.c,e=a.b,f=Math.log(a.b/a.c)/a.e;return dh({source:b,duration:f,easing:function(a){return d*(Math.exp(c*a*f)-1)/(e-d)}})};function ih(a){if("function"==typeof a.ra)return a.ra();if(la(a))return a.split("");if(ka(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Zb(a)}function jh(a,b,c){if("function"==typeof a.forEach)a.forEach(b,c);else if(ka(a)||la(a))Ma(a,b,c);else{var d;if("function"==typeof a.qa)d=a.qa();else if("function"!=typeof a.ra)if(ka(a)||la(a)){d=[];for(var e=a.length,f=0;f<e;f++)d.push(f)}else d=$b(a);else d=void 0;for(var e=ih(a),f=e.length,g=0;g<f;g++)b.call(c,e[g],d&&d[g],a)}};function kh(a,b){this.c={};this.a=[];var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)lh(this,arguments[d],arguments[d+1])}else if(a){a instanceof kh?(c=a.qa(),d=a.ra()):(c=$b(a),d=Zb(a));for(var e=0;e<c.length;e++)lh(this,c[e],d[e])}}l=kh.prototype;l.F=0;l.sd=0;l.pa=k("F");l.ra=function(){mh(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.c[this.a[b]]);return a};l.qa=function(){mh(this);return this.a.concat()};l.V=function(){return 0==this.F};
l.clear=function(){this.c={};this.sd=this.F=this.a.length=0};l.remove=function(a){return nh(this.c,a)?(delete this.c[a],this.F--,this.sd++,this.a.length>2*this.F&&mh(this),!0):!1};function mh(a){if(a.F!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];nh(a.c,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.F!=a.a.length){for(var e={},c=b=0;b<a.a.length;)d=a.a[b],nh(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}}l.get=function(a,b){return nh(this.c,a)?this.c[a]:b};
function lh(a,b,c){nh(a.c,b)||(a.F++,a.a.push(b),a.sd++);a.c[b]=c}l.I=function(){return new kh(this)};function nh(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var oh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?\x3d[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");function ph(a){if(qh){qh=!1;var b=t.location;if(b){var c=b.href;if(c&&(c=(c=ph(c)[3]||null)&&decodeURIComponent(c))&&c!=b.hostname)throw qh=!0,Error();}}return a.match(oh)}var qh=vb;function rh(a){if(a[1]){var b=a[0],c=b.indexOf("#");0<=c&&(a.push(b.substr(c)),a[0]=b=b.substr(0,c));c=b.indexOf("?");0>c?a[1]="?":c==b.length-1&&(a[1]=void 0)}return a.join("")}
function sh(a,b,c){if(ia(b))for(var d=0;d<b.length;d++)sh(a,String(b[d]),c);else null!=b&&c.push("\x26",a,""===b?"":"\x3d",encodeURIComponent(String(b)))}function th(a,b){for(var c in b)sh(c,b[c],a);return a};function uh(a,b){var c;if(a instanceof uh)this.Xa=u(b)?b:a.Xa,vh(this,a.Ma),c=a.fb,wh(this),this.fb=c,c=a.wa,wh(this),this.wa=c,xh(this,a.ub),c=a.va,wh(this),this.va=c,yh(this,a.a.I()),c=a.Ta,wh(this),this.Ta=c;else if(a&&(c=ph(String(a)))){this.Xa=!!b;vh(this,c[1]||"",!0);var d=c[2]||"";wh(this);this.fb=d?decodeURIComponent(d):"";d=c[3]||"";wh(this);this.wa=d?decodeURIComponent(d):"";xh(this,c[4]);d=c[5]||"";wh(this);this.va=d?decodeURIComponent(d):"";yh(this,c[6]||"",!0);c=c[7]||"";wh(this);this.Ta=
c?decodeURIComponent(c):""}else this.Xa=!!b,this.a=new zh(null,0,this.Xa)}l=uh.prototype;l.Ma="";l.fb="";l.wa="";l.ub=null;l.va="";l.Ta="";l.gg=!1;l.Xa=!1;
l.toString=function(){var a=[],b=this.Ma;b&&a.push(Ah(b,Ch),":");if(b=this.wa){a.push("//");var c=this.fb;c&&a.push(Ah(c,Ch),"@");a.push(encodeURIComponent(String(b)));b=this.ub;null!=b&&a.push(":",String(b))}if(b=this.va)this.wa&&"/"!=b.charAt(0)&&a.push("/"),a.push(Ah(b,"/"==b.charAt(0)?Dh:Eh));(b=this.a.toString())&&a.push("?",b);(b=this.Ta)&&a.push("#",Ah(b,Fh));return a.join("")};l.I=function(){return new uh(this)};
function vh(a,b,c){wh(a);a.Ma=c?b?decodeURIComponent(b):"":b;a.Ma&&(a.Ma=a.Ma.replace(/:$/,""))}function xh(a,b){wh(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.ub=b}else a.ub=null}function yh(a,b,c){wh(a);b instanceof zh?(a.a=b,Gh(a.a,a.Xa)):(c||(b=Ah(b,Hh)),a.a=new zh(b,0,a.Xa))}function Ih(a,b,c){wh(a);ia(c)||(c=[String(c)]);Jh(a.a,b,c)}function wh(a){if(a.gg)throw Error("Tried to modify a read-only Uri");}
function Kh(a){return a instanceof uh?a.I():new uh(a,void 0)}
function Lh(a,b){a instanceof uh||(a=Kh(a));b instanceof uh||(b=Kh(b));var c=a,d=b,e=c.I(),f=!!d.Ma;f?vh(e,d.Ma):f=!!d.fb;if(f){var g=d.fb;wh(e);e.fb=g}else f=!!d.wa;f?(g=d.wa,wh(e),e.wa=g):f=null!=d.ub;g=d.va;if(f)xh(e,d.ub);else if(f=!!d.va)if("/"!=g.charAt(0)&&(c.wa&&!c.va?g="/"+g:(c=e.va.lastIndexOf("/"),-1!=c&&(g=e.va.substr(0,c+1)+g))),".."==g||"."==g)g="";else if(-1!=g.indexOf("./")||-1!=g.indexOf("/.")){for(var c=0==g.lastIndexOf("/",0),g=g.split("/"),h=[],m=0;m<g.length;){var n=g[m++];"."==
n?c&&m==g.length&&h.push(""):".."==n?((1<h.length||1==h.length&&""!=h[0])&&h.pop(),c&&m==g.length&&h.push("")):(h.push(n),c=!0)}g=h.join("/")}f?(c=g,wh(e),e.va=c):f=""!==d.a.toString();f?yh(e,d.a.toString()?decodeURIComponent(d.a.toString()):""):f=!!d.Ta;f&&(d=d.Ta,wh(e),e.Ta=d);return e}function Ah(a,b){return la(a)?encodeURI(a).replace(b,Mh):null}function Mh(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Ch=/[#\/\?@]/g,Eh=/[\#\?:]/g,Dh=/[\#\?]/g,Hh=/[\#\?@]/g,Fh=/#/g;
function zh(a,b,c){this.a=a||null;this.c=!!c}function Nh(a){if(!a.R&&(a.R=new kh,a.F=0,a.a))for(var b=a.a.split("\x26"),c=0;c<b.length;c++){var d=b[c].indexOf("\x3d"),e=null,f=null;0<=d?(e=b[c].substring(0,d),f=b[c].substring(d+1)):e=b[c];e=decodeURIComponent(e.replace(/\+/g," "));e=Oh(a,e);a.add(e,f?decodeURIComponent(f.replace(/\+/g," ")):"")}}l=zh.prototype;l.R=null;l.F=null;l.pa=function(){Nh(this);return this.F};
l.add=function(a,b){Nh(this);this.a=null;a=Oh(this,a);var c=this.R.get(a);c||lh(this.R,a,c=[]);c.push(b);this.F++;return this};l.remove=function(a){Nh(this);a=Oh(this,a);return nh(this.R.c,a)?(this.a=null,this.F-=this.R.get(a).length,this.R.remove(a)):!1};l.clear=function(){this.R=this.a=null;this.F=0};l.V=function(){Nh(this);return 0==this.F};l.qa=function(){Nh(this);for(var a=this.R.ra(),b=this.R.qa(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
l.ra=function(a){Nh(this);var b=[];if(a){var c=a;Nh(this);c=Oh(this,c);nh(this.R.c,c)&&(b=Sa(b,this.R.get(Oh(this,a))))}else for(a=this.R.ra(),c=0;c<a.length;c++)b=Sa(b,a[c]);return b};l.get=function(a,b){var c=a?this.ra(a):[];return 0<c.length?String(c[0]):b};function Jh(a,b,c){a.remove(b);0<c.length&&(a.a=null,lh(a.R,Oh(a,b),Ta(c)),a.F+=c.length)}
l.toString=function(){if(this.a)return this.a;if(!this.R)return"";for(var a=[],b=this.R.qa(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.ra(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="\x3d"+encodeURIComponent(String(d[f])));a.push(g)}return this.a=a.join("\x26")};l.I=function(){var a=new zh;a.a=this.a;this.R&&(a.R=this.R.I(),a.F=this.F);return a};function Oh(a,b){var c=String(b);a.c&&(c=c.toLowerCase());return c}
function Gh(a,b){b&&!a.c&&(Nh(a),a.a=null,jh(a.R,function(a,b){var e=b.toLowerCase();b!=e&&(this.remove(b),Jh(this,e,a))},a));a.c=b};function Ph(a,b,c){td.call(this);this.d=a;this.b=c;this.a=b||window;this.c=wa(this.Hd,this)}B(Ph,td);l=Ph.prototype;l.P=null;l.rd=!1;l.start=function(){Qh(this);this.rd=!1;var a=Rh(this),b=Sh(this);a&&!b&&this.a.mozRequestAnimationFrame?(this.P=I(this.a,"MozBeforePaint",this.c),this.a.mozRequestAnimationFrame(null),this.rd=!0):this.P=a&&b?a.call(this.a,this.c):this.a.setTimeout(le(this.c),20)};
function Qh(a){if(null!=a.P){var b=Rh(a),c=Sh(a);b&&!c&&a.a.mozRequestAnimationFrame?K(a.P):b&&c?c.call(a.a,a.P):a.a.clearTimeout(a.P)}a.P=null}l.Hd=function(){this.rd&&this.P&&K(this.P);this.P=null;this.d.call(this.b,ya())};l.w=function(){Qh(this);Ph.B.w.call(this)};function Rh(a){a=a.a;return a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame||a.msRequestAnimationFrame||null}
function Sh(a){a=a.a;return a.cancelRequestAnimationFrame||a.webkitCancelRequestAnimationFrame||a.mozCancelRequestAnimationFrame||a.oCancelRequestAnimationFrame||a.msCancelRequestAnimationFrame||null};var Th;
function Uh(){var a=t.MessageChannel;"undefined"===typeof a&&("undefined"!==typeof window&&window.postMessage&&window.addEventListener)&&(a=function(){var a=document.createElement("iframe");a.style.display="none";a.src="";document.body.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d=b.location.protocol+"//"+b.location.host,a=wa(function(a){if(a.origin==d||a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);
this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a){var b=new a,c={},d=c;b.port1.onmessage=function(){c=c.next;var a=c.Dd;c.Dd=null;a()};return function(a){d.next={Dd:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("script")?function(a){var b=document.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:
function(a){t.setTimeout(a,0)}};function Vh(a){pe.call(this);this.Vb=a||window;this.hc=I(this.Vb,"resize",this.Xf,!1,this);this.Ya=nc(this.Vb||window)}B(Vh,pe);l=Vh.prototype;l.hc=null;l.Vb=null;l.Ya=null;l.w=function(){Vh.B.w.call(this);this.hc&&(K(this.hc),this.hc=null);this.Ya=this.Vb=null};l.Xf=function(){var a=nc(this.Vb||window);a==this.Ya||a&&this.Ya&&a.width==this.Ya.width&&a.height==this.Ya.height||(this.Ya=a,L(this,"resize"))};function Wh(a,b,c,d,e){if(!(E||vb&&Ib("525")))return!0;if(lb&&e)return Xh(a);if(e&&!d||!c&&(17==b||18==b||lb&&91==b))return!1;if(vb&&d&&c)switch(a){case 220:case 219:case 221:case 192:case 186:case 189:case 187:case 188:case 190:case 191:case 192:case 222:return!1}if(E&&d&&b==a)return!1;switch(a){case 13:return!(E&&E&&9<=Kb);case 27:return!vb}return Xh(a)}
function Xh(a){if(48<=a&&57>=a||96<=a&&106>=a||65<=a&&90>=a||vb&&0==a)return!0;switch(a){case 32:case 63:case 107:case 109:case 110:case 111:case 186:case 59:case 189:case 187:case 61:case 188:case 190:case 191:case 192:case 222:case 219:case 220:case 221:return!0;default:return!1}}function Yh(a){switch(a){case 61:return 187;case 59:return 186;case 224:return 91;case 0:return 224;default:return a}};function Zh(a,b){pe.call(this);a&&$h(this,a,b)}B(Zh,pe);l=Zh.prototype;l.Ob=null;l.lc=null;l.Wc=null;l.mc=null;l.W=-1;l.Ja=-1;l.Jc=!1;
var ai={3:13,12:144,63232:38,63233:40,63234:37,63235:39,63236:112,63237:113,63238:114,63239:115,63240:116,63241:117,63242:118,63243:119,63244:120,63245:121,63246:122,63247:123,63248:44,63272:46,63273:36,63275:35,63276:33,63277:34,63289:144,63302:45},bi={Up:38,Down:40,Left:37,Right:39,Enter:13,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,"U+007F":46,Home:36,End:35,PageUp:33,PageDown:34,Insert:45},ci=E||vb&&Ib("525"),di=lb&&ub;
Zh.prototype.a=function(a){vb&&(17==this.W&&!a.Nb||18==this.W&&!a.Y||lb&&91==this.W&&!a.Vc)&&(this.Ja=this.W=-1);-1==this.W&&(a.Nb&&17!=a.xa?this.W=17:a.Y&&18!=a.xa?this.W=18:a.Vc&&91!=a.xa&&(this.W=91));ci&&!Wh(a.xa,this.W,a.ya,a.Nb,a.Y)?this.handleEvent(a):(this.Ja=ub?Yh(a.xa):a.xa,di&&(this.Jc=a.Y))};Zh.prototype.c=function(a){this.Ja=this.W=-1;this.Jc=a.Y};
Zh.prototype.handleEvent=function(a){var b=a.G,c,d,e=b.altKey;E&&"keypress"==a.type?(c=this.Ja,d=13!=c&&27!=c?b.keyCode:0):vb&&"keypress"==a.type?(c=this.Ja,d=0<=b.charCode&&63232>b.charCode&&Xh(c)?b.charCode:0):tb?(c=this.Ja,d=Xh(c)?b.keyCode:0):(c=b.keyCode||this.Ja,d=b.charCode||0,di&&(e=this.Jc),lb&&(63==d&&224==c)&&(c=191));var f=c,g=b.keyIdentifier;c?63232<=c&&c in ai?f=ai[c]:25==c&&a.ya&&(f=9):g&&g in bi&&(f=bi[g]);a=f==this.W;this.W=f;b=new ei(f,d,a,b);b.Y=e;L(this,b)};
function $h(a,b,c){a.mc&&fi(a);a.Ob=b;a.lc=I(a.Ob,"keypress",a,c);a.Wc=I(a.Ob,"keydown",a.a,c,a);a.mc=I(a.Ob,"keyup",a.c,c,a)}function fi(a){a.lc&&(K(a.lc),K(a.Wc),K(a.mc),a.lc=null,a.Wc=null,a.mc=null);a.Ob=null;a.W=-1;a.Ja=-1}Zh.prototype.w=function(){Zh.B.w.call(this);fi(this)};function ei(a,b,c,d){d&&Hd(this,d,void 0);this.type="key";this.xa=a;this.Uc=b;this.a=c}B(ei,Gd);function gi(a,b){pe.call(this);this.a=a;var c=pa(this.a)&&1==this.a.nodeType?this.a:this.a?this.a.body:null;this.e=!!c&&Qc(c);this.c=I(this.a,ub?"DOMMouseScroll":"mousewheel",this,b)}B(gi,pe);
gi.prototype.handleEvent=function(a){var b=0,c=0,d=0;a=a.G;if("mousewheel"==a.type){c=1;if(E||vb&&(mb||Ib("532.0")))c=40;d=hi(-a.wheelDelta,c);u(a.wheelDeltaX)?(b=hi(-a.wheelDeltaX,c),c=hi(-a.wheelDeltaY,c)):c=d}else d=a.detail,100<d?d=3:-100>d&&(d=-3),u(a.axis)&&a.axis===a.HORIZONTAL_AXIS?b=d:c=d;na(this.b)&&(b=Qb(b,-this.b,this.b));na(this.d)&&(c=Qb(c,-this.d,this.d));this.e&&(b=-b);b=new ii(d,a,b,c);L(this,b)};function hi(a,b){return vb&&(lb||ob)&&0!=a%b?a:a/b}
gi.prototype.w=function(){gi.B.w.call(this);K(this.c);this.c=null};function ii(a,b,c,d){b&&Hd(this,b,void 0);this.type="mousewheel";this.detail=a;this.b=c;this.a=d}B(ii,Gd);function ji(a,b,c){yd.call(this,a);this.map=b;this.b=u(c)?c:null}B(ji,yd);function ki(a,b,c){yd.call(this,a);this.a=b;a=u(c)?c:{};this.buttons=li(a);this.fd=mi(a,this.buttons);this.bubbles=F(a,"bubbles",!1);this.cancelable=F(a,"cancelable",!1);this.view=F(a,"view",null);this.detail=F(a,"detail",null);this.screenX=F(a,"screenX",0);this.screenY=F(a,"screenY",0);this.clientX=F(a,"clientX",0);this.clientY=F(a,"clientY",0);this.d=F(a,"ctrlKey",!1);this.b=F(a,"altKey",!1);this.i=F(a,"shiftKey",!1);this.f=F(a,"metaKey",!1);this.button=F(a,"button",0);this.relatedTarget=F(a,"relatedTarget",
null);this.pointerId=F(a,"pointerId",0);this.width=F(a,"width",0);this.height=F(a,"height",0);this.g=F(a,"tiltX",0);this.j=F(a,"tiltY",0);this.pointerType=F(a,"pointerType","");this.e=F(a,"hwTimestamp",0);this.kc=F(a,"isPrimary",!1);b.preventDefault&&(this.preventDefault=function(){b.preventDefault()})}B(ki,yd);function li(a){if(a.buttons||ni)a=a.buttons;else switch(a.which){case 1:a=1;break;case 2:a=4;break;case 3:a=2;break;default:a=0}return a}
function mi(a,b){var c=0;return c=a.fd?a.fd:b?0.5:0}var ni=!1;try{ni=1===(new MouseEvent("click",{buttons:1})).buttons}catch(oi){};function pi(a,b){this.a=a;this.e=b};function qi(a){pi.call(this,a,{mousedown:this.jg,mousemove:this.kg,mouseup:this.ng,mouseover:this.mg,mouseout:this.lg});this.c=a.c;this.b=[]}B(qi,pi);function ri(a,b){for(var c=a.b,d=b.clientX,e=b.clientY,f=0,g=c.length,h;f<g&&(h=c[f]);f++){var m=Math.abs(e-h[1]);if(25>=Math.abs(d-h[0])&&25>=m)return!0}return!1}function si(a){var b=ti(a,a.G),c=b.preventDefault;b.preventDefault=function(){a.preventDefault();c()};b.pointerId=1;b.kc=!0;b.pointerType="mouse";return b}l=qi.prototype;
l.jg=function(a){if(!ri(this,a)){(1).toString()in this.c&&this.cancel(a);var b=si(a);this.c[(1).toString()]=a;ui(this.a,vi,b,a)}};l.kg=function(a){if(!ri(this,a)){var b=si(a);ui(this.a,wi,b,a)}};l.ng=function(a){if(!ri(this,a)){var b=F(this.c,(1).toString());b&&b.button===a.button&&(b=si(a),ui(this.a,xi,b,a),cc(this.c,(1).toString()))}};l.mg=function(a){if(!ri(this,a)){var b=si(a);yi(this.a,b,a)}};l.lg=function(a){if(!ri(this,a)){var b=si(a);zi(this.a,b,a)}};
l.cancel=function(a){var b=si(a);this.a.cancel(b,a);cc(this.c,(1).toString())};function Ai(a){pi.call(this,a,{MSPointerDown:this.sg,MSPointerMove:this.tg,MSPointerUp:this.wg,MSPointerOut:this.ug,MSPointerOver:this.vg,MSPointerCancel:this.rg,MSGotPointerCapture:this.pg,MSLostPointerCapture:this.qg});this.c=a.c;this.b=["","unavailable","touch","pen","mouse"]}B(Ai,pi);function Bi(a,b){var c=b;na(b.G.pointerType)&&(c=ti(b,b.G),c.pointerType=a.b[b.G.pointerType]);return c}l=Ai.prototype;l.sg=function(a){this.c[a.G.pointerId]=a;var b=Bi(this,a);ui(this.a,vi,b,a)};
l.tg=function(a){var b=Bi(this,a);ui(this.a,wi,b,a)};l.wg=function(a){var b=Bi(this,a);ui(this.a,xi,b,a);cc(this.c,a.G.pointerId)};l.ug=function(a){var b=Bi(this,a);zi(this.a,b,a)};l.vg=function(a){var b=Bi(this,a);yi(this.a,b,a)};l.rg=function(a){var b=Bi(this,a);this.a.cancel(b,a);cc(this.c,a.G.pointerId)};l.qg=function(a){L(this.a,new ki("lostpointercapture",a,a.G))};l.pg=function(a){L(this.a,new ki("gotpointercapture",a,a.G))};function Ci(a){pi.call(this,a,{pointerdown:this.Gh,pointermove:this.Hh,pointerup:this.Kh,pointerout:this.Ih,pointerover:this.Jh,pointercancel:this.Fh,gotpointercapture:this.Ff,lostpointercapture:this.hg})}B(Ci,pi);l=Ci.prototype;l.Gh=function(a){Di(this.a,a)};l.Hh=function(a){Di(this.a,a)};l.Kh=function(a){Di(this.a,a)};l.Ih=function(a){Di(this.a,a)};l.Jh=function(a){Di(this.a,a)};l.Fh=function(a){Di(this.a,a)};l.hg=function(a){Di(this.a,a)};l.Ff=function(a){Di(this.a,a)};function Ei(a,b){pi.call(this,a,{touchstart:this.hi,touchmove:this.gi,touchend:this.fi,touchcancel:this.ei});this.c=a.c;this.i=b;this.b=void 0;this.f=0;this.d=void 0}B(Ei,pi);l=Ei.prototype;l.oe=function(){this.f=0;this.d=void 0};
l.di=function(a,b){var c=ti(a,b);c.pointerId=b.identifier+2;c.bubbles=!0;c.cancelable=!0;c.detail=this.f;c.button=0;c.buttons=1;c.width=b.webkitRadiusX||b.radiusX||0;c.height=b.webkitRadiusY||b.radiusY||0;c.fd=b.webkitForce||b.force||0.5;c.kc=this.b===b.identifier;c.pointerType="touch";c.clientX=b.clientX;c.clientY=b.clientY;c.screenX=b.screenX;c.screenY=b.screenY;return c};
function Fi(a,b,c){var d=Ta(b.G.changedTouches),d=Na(d,xa(a.di,b),a);Ma(d,function(a){a.preventDefault=function(){b.preventDefault()}},a);Ma(d,xa(c,b),a)}function Gi(a,b){var c=b.G.touches;if(Yb(a.c)>=c.length){var d=[];Wb(a.c,function(a,b){var g;if(!(g=1==b))a:{g=c.length;for(var h,m=0;m<g;m++)if(h=c[m],h.identifier===b-2){g=!0;break a}g=!1}g||d.push(a.ab)},a);Ma(d,xa(a.Mc,b),a)}}
l.hi=function(a){Gi(this,a);var b=Yb(this.c),c;if(!(c=0===b)){if(b=1===b)b=(1).toString()in this.c;c=b}c&&(this.b=a.G.changedTouches[0].identifier,u(this.d)&&t.clearTimeout(this.d));Hi(this,a);this.f++;Fi(this,a,this.Eh)};l.Eh=function(a,b){this.c[b.pointerId]={target:b.target,ab:b,ke:b.target};var c=this.a;b.bubbles=!0;ui(c,Ii,b,a);c=this.a;b.bubbles=!1;ui(c,Ji,b,a);ui(this.a,vi,b,a)};l.gi=function(a){a.preventDefault();Fi(this,a,this.og)};
l.og=function(a,b){var c=F(this.c,b.pointerId);if(c){var d=c.ab,e=c.ke;ui(this.a,wi,b,a);d&&e!==b.target&&(d.relatedTarget=b.target,b.relatedTarget=e,d.target=e,b.target?(zi(this.a,d,a),yi(this.a,b,a)):(b.target=e,b.relatedTarget=null,this.Mc(a,b)));c.ab=b;c.ke=b.target}};l.fi=function(a){Hi(this,a);Fi(this,a,this.li)};l.li=function(a,b){ui(this.a,xi,b,a);this.a.ab(b,a);var c=this.a;b.bubbles=!1;ui(c,Ki,b,a);cc(this.c,b.pointerId);b.kc&&(this.b=void 0,this.d=t.setTimeout(this.oe,200))};
l.ei=function(a){Fi(this,a,this.Mc)};l.Mc=function(a,b){this.a.cancel(b,a);this.a.ab(b,a);var c=this.a;b.bubbles=!1;ui(c,Ki,b,a);cc(this.c,b.pointerId);b.kc&&(this.b=void 0,this.d=t.setTimeout(this.oe,200))};function Hi(a,b){var c=a.i.b,d=b.G.changedTouches[0];if(a.b===d.identifier){var e=[d.clientX,d.clientY];c.push(e);t.setTimeout(function(){Ra(c,e)},2500)}};function Li(a){pe.call(this);this.d=a;this.c={};this.b={};this.a=[];G.Fe?Mi(this,new Ci(this)):G.Ee?Mi(this,new Ai(this)):(a=new qi(this),Mi(this,a),G.zc&&Mi(this,new Ei(this,a)));a=this.a.length;for(var b,c=0;c<a;c++)b=this.a[c],Ni(this,$b(b.e))}B(Li,pe);function Mi(a,b){var c=$b(b.e);c&&(Ma(c,function(a){var c=b.e[a];c&&(this.b[a]=wa(c,b))},a),a.a.push(b))}Li.prototype.e=function(a){var b=this.b[a.type];b&&b(a)};function Ni(a,b){Ma(b,function(a){I(this.d,a,this.e,!1,this)},a)}
function Oi(a,b){Ma(b,function(a){Yd(this.d,a,this.e,!1,this)},a)}function ti(a,b){for(var c={},d,e=0,f=Pi.length;e<f;e++)d=Pi[e][0],c[d]=a[d]||b[d]||Pi[e][1];return c}Li.prototype.ab=function(a,b){a.bubbles=!0;ui(this,Qi,a,b)};Li.prototype.cancel=function(a,b){ui(this,Ri,a,b)};function zi(a,b,c){a.ab(b,c);b.target.contains(b.relatedTarget)||(b.bubbles=!1,ui(a,Ki,b,c))}function yi(a,b,c){b.bubbles=!0;ui(a,Ii,b,c);b.target.contains(b.relatedTarget)||(b.bubbles=!1,ui(a,Ji,b,c))}
function ui(a,b,c,d){L(a,new ki(b,d,c))}function Di(a,b){L(a,new ki(b.type,b,b.G))}Li.prototype.w=function(){for(var a=this.a.length,b,c=0;c<a;c++)b=this.a[c],Oi(this,$b(b.e));Li.B.w.call(this)};
var wi="pointermove",vi="pointerdown",xi="pointerup",Ii="pointerover",Qi="pointerout",Ji="pointerenter",Ki="pointerleave",Ri="pointercancel",Pi=[["bubbles",!1],["cancelable",!1],["view",null],["detail",null],["screenX",0],["screenY",0],["clientX",0],["clientY",0],["ctrlKey",!1],["altKey",!1],["shiftKey",!1],["metaKey",!1],["button",0],["relatedTarget",null],["buttons",0],["pointerId",0],["width",0],["height",0],["pressure",0],["tiltX",0],["tiltY",0],["pointerType",""],["hwTimestamp",0],["isPrimary",
!1],["type",""],["target",null],["currentTarget",null],["which",0]];function Si(a,b,c,d){ji.call(this,a,b,d);this.a=c;this.originalEvent=c.G;this.coordinate=b.Md(this.originalEvent);this.pixel=b.Sc(this.originalEvent)}B(Si,ji);Si.prototype.preventDefault=function(){Si.B.preventDefault.call(this);this.a.preventDefault()};Si.prototype.za=function(){Si.B.za.call(this);this.a.za()};function Ti(a,b,c,d){Si.call(this,a,b,c.a,d);this.d=c}B(Ti,Si);
function Ui(a){pe.call(this);this.c=a;this.e=0;this.g=!1;this.f=this.i=this.b=null;a=this.c.b;this.n=0;this.k={};this.d=new Li(a);this.a=null;this.i=I(this.d,vi,this.Tf,!1,this);this.j=I(this.d,wi,this.Qh,!1,this)}B(Ui,pe);function Vi(a,b){var c;c=new Ti(Wi,a.c,b);L(a,c);0!==a.e?(t.clearTimeout(a.e),a.e=0,c=new Ti(Xi,a.c,b),L(a,c)):a.e=t.setTimeout(wa(function(){this.e=0;var a=new Ti(Yi,this.c,b);L(this,a)},a),250)}
function Zi(a,b){b.type==$i||b.type==aj?delete a.k[b.pointerId]:b.type==bj&&(a.k[b.pointerId]=!0);a.n=Yb(a.k)}l=Ui.prototype;l.Sd=function(a){Zi(this,a);var b=new Ti($i,this.c,a);L(this,b);0===this.n&&(Ma(this.b,K),this.b=null,xd(this.a),this.a=null);!this.g&&0===a.button&&Vi(this,this.f)};
l.Tf=function(a){Zi(this,a);var b=new Ti(bj,this.c,a);L(this,b);this.f=a;this.g=!1;null===this.b&&(this.a=new Li(document),this.b=[I(this.a,cj,this.Ig,!1,this),I(this.a,$i,this.Sd,!1,this),I(this.d,aj,this.Sd,!1,this)]);a.preventDefault()};l.Ig=function(a){if(a.clientX!=this.f.clientX||a.clientY!=this.f.clientY){this.g=!0;var b=new Ti(dj,this.c,a);L(this,b)}a.preventDefault()};l.Qh=function(a){L(this,new Ti(a.type,this.c,a))};
l.w=function(){null!==this.j&&(K(this.j),this.j=null);null!==this.i&&(K(this.i),this.i=null);null!==this.b&&(Ma(this.b,K),this.b=null);null!==this.a&&(xd(this.a),this.a=null);null!==this.d&&(xd(this.d),this.d=null);Ui.B.w.call(this)};var Yi="singleclick",Wi="click",Xi="dblclick",dj="pointerdrag",cj="pointermove",bj="pointerdown",$i="pointerup",aj="pointercancel",ej={Hi:Yi,wi:Wi,xi:Xi,Ai:dj,Di:cj,zi:bj,Gi:$i,Fi:"pointerover",Ei:"pointerout",Bi:"pointerenter",Ci:"pointerleave",yi:aj};function fj(a,b){this.f=a;this.e=b;this.a=[];this.c=[];this.b={}}fj.prototype.clear=function(){this.a.length=0;this.c.length=0;bc(this.b)};function gj(a){var b=a.a,c=a.c,d=b[0];1==b.length?(b.length=0,c.length=0):(b[0]=b.pop(),c[0]=c.pop(),hj(a,0));b=a.e(d);delete a.b[b];return d}function ij(a,b){var c=a.f(b);Infinity!=c&&(a.a.push(b),a.c.push(c),a.b[a.e(b)]=!0,jj(a,0,a.a.length-1))}fj.prototype.pa=function(){return this.a.length};fj.prototype.V=function(){return 0===this.a.length};
function hj(a,b){for(var c=a.a,d=a.c,e=c.length,f=c[b],g=d[b],h=b;b<e>>1;){var m=2*b+1,n=2*b+2,m=n<e&&d[n]<d[m]?n:m;c[b]=c[m];d[b]=d[m];b=m}c[b]=f;d[b]=g;jj(a,h,b)}function jj(a,b,c){var d=a.a;a=a.c;for(var e=d[c],f=a[c];c>b;){var g=c-1>>1;if(a[g]>f)d[c]=d[g],a[c]=a[g],c=g;else break}d[c]=e;a[c]=f}function kj(a){var b=a.f,c=a.a,d=a.c,e=0,f=c.length,g,h,m;for(h=0;h<f;++h)g=c[h],m=b(g),Infinity==m?delete a.b[a.e(g)]:(d[e]=m,c[e++]=g);c.length=e;d.length=e;for(b=(a.a.length>>1)-1;0<=b;b--)hj(a,b)};function lj(a,b){fj.call(this,function(b){return a.apply(null,b)},function(a){return a[0].d()});this.g=b;this.d=0}B(lj,fj);lj.prototype.i=function(){--this.d;this.g()};function mj(a){return function(b){if(u(b))return[Qb(b[0],a[0],a[2]),Qb(b[1],a[1],a[3])]}}function nj(a){return a};function oj(a){return function(b,c,d){if(u(b))return b=Jf(a,b,d),b=Qb(b+c,0,a.length-1),a[b]}}function pj(a,b,c){return function(d,e,f){if(u(d))return f=0<f?0:0>f?1:0.5,d=Math.floor(Math.log(b/d)/Math.log(a)+f),e=Math.max(d+e,0),u(c)&&(e=Math.min(e,c)),b/Math.pow(a,e)}};function qj(a){if(u(a))return 0}function rj(a,b){if(u(a))return a+b}function sj(a){var b=2*Math.PI/a;return function(a,d){if(u(a))return a=Math.floor((a+d)/b+0.5)*b}}function tj(){var a=Sb(5);return function(b,c){if(u(b))return Math.abs(b+c)<=a?0:b+c}};function uj(a,b,c){this.center=a;this.resolution=b;this.rotation=c};function Q(a){Yg.call(this);a=a||{};var b={};b.center=u(a.center)?a.center:null;b.projection=Rg(a.projection);var c,d,e;if(u(a.resolutions))c=a.resolutions,d=c[0],e=c[c.length-1],c=oj(c);else{d=a.maxResolution;u(d)||(d=a.projection,e=Rg(d).p(),d=(null===e?360*wg.degrees/wg[d.na]:Math.max(e[2]-e[0],e[3]-e[1]))/256);c=a.maxZoom;u(c)||(c=28);var f=a.zoomFactor;u(f)||(f=2);e=d/Math.pow(f,c);c=pj(f,d,c)}this.j=d;this.l=e;(u(a.enableRotation)?a.enableRotation:1)?(d=a.constrainRotation,d=u(d)&&!0!==d?!1===
d?rj:na(d)?sj(d):rj:tj()):d=qj;this.g=new uj(u(a.extent)?mj(a.extent):nj,c,d);u(a.resolution)?b.resolution=a.resolution:u(a.zoom)&&(b.resolution=this.constrainResolution(this.j,a.zoom));b.rotation=u(a.rotation)?a.rotation:0;this.T(b)}B(Q,Yg);Q.prototype.constrainResolution=function(a,b,c){return this.g.resolution(a,b||0,c||0)};Q.prototype.constrainRotation=function(a,b){return this.g.rotation(a,b||0)};Q.prototype.a=function(){return this.get("center")};Q.prototype.getCenter=Q.prototype.a;
Q.prototype.r=function(a){var b=this.a(),c=this.b();return[b[0]-c*a[0]/2,b[1]-c*a[1]/2,b[0]+c*a[0]/2,b[1]+c*a[1]/2]};Q.prototype.n=function(){return this.get("projection")};Q.prototype.getProjection=Q.prototype.n;Q.prototype.b=function(){return this.get("resolution")};Q.prototype.getResolution=Q.prototype.b;function vj(a,b){return Math.max((a[2]-a[0])/b[0],(a[3]-a[1])/b[1])}function wj(a){var b=a.j,c=Math.log(b/a.l)/Math.log(2);return function(a){return b/Math.pow(2,a*c)}}Q.prototype.f=function(){return this.get("rotation")};
Q.prototype.getRotation=Q.prototype.f;function xj(a){var b=a.j,c=Math.log(b/a.l)/Math.log(2);return function(a){return Math.log(b/a)/Math.log(2)/c}}l=Q.prototype;l.M=function(){return this};function yj(a){var b=a.a(),c=a.n(),d=a.b();a=a.f();return{center:b.slice(),projection:u(c)?c:null,resolution:d,rotation:u(a)?a:0}}l.Df=function(){var a,b=this.b();if(u(b)){var c,d=0;do{c=this.constrainResolution(this.j,d);if(c==b){a=d;break}++d}while(c>this.l)}return a};
l.Kd=function(a,b){if(!Df(a)){this.ta(xf(a));var c=vj(a,b),d=this.constrainResolution(c,0,0);d<c&&(d=this.constrainResolution(d,-1,0));this.d(d)}};
l.Xe=function(a,b,c){var d=u(c)?c:{};c=u(d.padding)?d.padding:[0,0,0,0];var e=u(d.constrainResolution)?d.constrainResolution:!0,f=u(d.nearest)?d.nearest:!1,g=u(d.minResolution)?d.minResolution:0,h=a.h,m=this.f(),d=Math.cos(-m),m=Math.sin(-m),n=Infinity,p=Infinity,q=-Infinity,r=-Infinity;a=a.a;for(var s=0,z=h.length;s<z;s+=a)var x=h[s]*d-h[s+1]*m,w=h[s]*m+h[s+1]*d,n=Math.min(n,x),p=Math.min(p,w),q=Math.max(q,x),r=Math.max(r,w);b=vj([n,p,q,r],[b[0]-c[1]-c[3],b[1]-c[0]-c[2]]);b=isNaN(b)?g:Math.max(b,
g);e&&(e=this.constrainResolution(b,0,0),!f&&e<b&&(e=this.constrainResolution(e,-1,0)),b=e);this.d(b);m=-m;f=(n+q)/2+(c[1]-c[3])/2*b;c=(p+r)/2+(c[0]-c[2])/2*b;this.ta([f*d-c*m,c*d+f*m])};l.Ue=function(a,b,c){var d=this.f(),e=Math.cos(-d),d=Math.sin(-d),f=a[0]*e-a[1]*d;a=a[1]*e+a[0]*d;var g=this.b(),f=f+(b[0]/2-c[0])*g;a+=(c[1]-b[1]/2)*g;d=-d;this.ta([f*e-a*d,a*e+f*d])};l.$c=function(){return null!=this.a()&&u(this.b())};l.ta=function(a){this.t("center",a)};Q.prototype.setCenter=Q.prototype.ta;
Q.prototype.q=function(a){this.t("projection",a)};Q.prototype.setProjection=Q.prototype.q;Q.prototype.d=function(a){this.t("resolution",a)};Q.prototype.setResolution=Q.prototype.d;Q.prototype.o=function(a){this.t("rotation",a)};Q.prototype.setRotation=Q.prototype.o;Q.prototype.u=function(a){a=this.constrainResolution(this.j,a,0);this.d(a)};function zj(a){M.call(this);this.element=u(a.element)?a.element:null;this.o=u(a.target)?kc(a.target):null;this.a=null;this.g=[]}B(zj,M);zj.prototype.w=function(){wc(this.element);zj.B.w.call(this)};zj.prototype.N=k("a");zj.prototype.f=ea;zj.prototype.setMap=function(a){null===this.a||wc(this.element);0!=this.g.length&&(Ma(this.g,K),this.g.length=0);this.a=a;null!==this.a&&((null===this.o?a.u:this.o).appendChild(this.element),this.f!==ea&&this.g.push(I(a,"postrender",this.f,!1,this)),a.K())};function Aj(a){a=u(a)?a:{};this.k=rc("UL");var b=oc("DIV",{"class":(u(a.className)?a.className:"ol-attribution")+" ol-unselectable"},this.k);zj.call(this,{element:b,target:a.target});this.j=!0;this.d={};this.b={}}B(Aj,zj);
Aj.prototype.f=function(a){a=a.b;if(null===a)this.j&&(Pc(this.element,!1),this.j=!1);else{var b,c,d,e,f,g,h,m,n,p=a.layerStatesArray,q=ec(a.attributions),r={};b=0;for(c=p.length;b<c;b++)if(d=p[b].layer.a,n=v(d).toString(),m=d.e,null!==m)for(d=0,e=m.length;d<e;d++)if(g=m[d],h=v(g).toString(),!(h in q)){f=a.usedTiles[n];var s;if(s=u(f))a:if(null===g.a)s=!0;else{var z=s=void 0,x=void 0,w=void 0;for(w in f)if(w in g.a)for(x=f[w],s=0,z=g.a[w].length;s<z;++s)if(g.a[w][s].a<=x.d&&g.a[w][s].d>=x.a&&g.a[w][s].b<=
x.c&&g.a[w][s].c>=x.b){s=!0;break a}s=!1}s?(h in r&&delete r[h],q[h]=g):r[h]=g}b=[q,r];a=b[0];b=b[1];for(var C in this.d)C in a?(this.b[C]||(Pc(this.d[C],!0),this.b[C]=!0),delete a[C]):C in b?(this.b[C]&&(Pc(this.d[C],!1),delete this.b[C]),delete b[C]):(wc(this.d[C]),delete this.d[C],delete this.b[C]);for(C in a)c=rc("LI"),c.innerHTML=a[C].c,this.k.appendChild(c),this.d[C]=c,this.b[C]=!0;for(C in b)c=rc("LI"),c.innerHTML=b[C].c,Pc(c,!1),this.k.appendChild(c),this.d[C]=c;C=!ac(this.b);this.j!=C&&(Pc(this.element,
C),this.j=C)}};function Bj(a){a=u(a)?a:{};this.d=rc("UL");var b=oc("DIV",{"class":(u(a.className)?a.className:"ol-logo")+" ol-unselectable"},this.d);zj.call(this,{element:b,target:a.target});this.b=!0;this.j={}}B(Bj,zj);
Bj.prototype.f=function(a){a=a.b;if(null===a)this.b&&(Pc(this.element,!1),this.b=!1);else{var b;a=a.logos;var c=this.j;for(b in c)b in a||(wc(c[b]),delete c[b]);for(var d in a)if(!(d in c)){b=new Image;b.src=d;var e=a[d];""===e?e=b:(e=oc("A",{href:e,target:"_blank"}),e.appendChild(b));b=oc("LI",void 0,e);this.d.appendChild(b);c[d]=b}d=!ac(a);this.b!=d&&(Pc(this.element,d),this.b=d)}};function Cj(a){a=u(a)?a:{};var b=u(a.className)?a.className:"ol-zoom",c=u(a.delta)?a.delta:1,d=u(a.zoomInLabel)?a.zoomInLabel:"+",e=u(a.zoomOutLabel)?a.zoomOutLabel:"\u2212",f=u(a.zoomOutTipLabel)?a.zoomOutTipLabel:"Zoom out",g=oc("SPAN",{role:"tooltip"},u(a.zoomInTipLabel)?a.zoomInTipLabel:"Zoom in"),d=oc("BUTTON",{"class":b+"-in ol-has-tooltip",name:"ZoomIn",type:"button"},g,d),g=new Li(d);wd(this,g);I(g,xi,xa(Cj.prototype.d,c),!1,this);I(d,["mouseout",Ed],function(){this.blur()},!1);f=oc("SPAN",
{role:"tooltip",type:"button"},f);e=oc("BUTTON",{"class":b+"-out  ol-has-tooltip",name:"ZoomOut"},f,e);f=new Li(e);wd(this,f);I(f,xi,xa(Cj.prototype.d,-c),!1,this);I(e,["mouseout",Ed],function(){this.blur()},!1);b=oc("DIV",b+" ol-unselectable",d,e);zj.call(this,{element:b,target:a.target});this.b=u(a.duration)?a.duration:250}B(Cj,zj);
Cj.prototype.d=function(a,b){b.a.preventDefault();var c=this.a,d=c.a().M(),e=d.b();u(e)&&(0<this.b&&c.oa(fh({resolution:e,duration:this.b,easing:$g})),c=d.constrainResolution(e,a),d.d(c))};function Dj(a){a=u(a)?a:{};var b=new N;(u(a.zoom)?a.zoom:1)&&b.push(new Cj(u(a.zoomOptions)?a.zoomOptions:void 0));(u(a.attribution)?a.attribution:1)&&b.push(new Aj(u(a.attributionOptions)?a.attributionOptions:void 0));(u(a.logo)?a.logo:1)&&b.push(new Bj(u(a.logoOptions)?a.logoOptions:void 0));return b};function Ej(){re.call(this);this.g=null}B(Ej,re);Ej.prototype.setMap=function(a){this.g=a};function Fj(a,b,c,d,e){if(null!=c){var f=b.f(),g=b.a();u(f)&&(u(g)&&u(e)&&0<e)&&(a.oa(eh({rotation:f,duration:e,easing:$g})),u(d)&&a.oa(dh({source:g,duration:e,easing:$g})));if(null!=d){var h;a=b.a();u(a)&&(h=[a[0]-d[0],a[1]-d[1]],gf(h,c-b.f()),bf(h,d));b.ta(h)}b.o(c)}}function Gj(a,b,c,d,e){var f=b.b();c=b.constrainResolution(f,c,0);Hj(a,b,c,d,e)}
function Hj(a,b,c,d,e){if(null!=c){var f=b.b(),g=b.a();u(f)&&(u(g)&&u(e)&&0<e)&&(a.oa(fh({resolution:f,duration:e,easing:$g})),u(d)&&a.oa(dh({source:g,duration:e,easing:$g})));if(null!=d){var h;a=b.a();e=b.b();u(a)&&u(e)&&(h=[d[0]-c*(d[0]-a[0])/e,d[1]-c*(d[1]-a[1])/e]);b.ta(h)}b.d(c)}};function Ij(a){a=u(a)?a:{};this.a=u(a.delta)?a.delta:1;Ej.call(this);this.b=u(a.duration)?a.duration:250}B(Ij,Ej);Ij.prototype.ja=function(a){var b=!1,c=a.a;if(a.type==Xi){var b=a.map,d=a.coordinate,c=c.ya?-this.a:this.a,e=b.a().M();Gj(b,e,c,d,this.b);a.preventDefault();b=!0}return!b};function Jj(a){a=a.a;return a.Y&&!a.tb&&a.ya}function Kj(a){return a.type==Yi}function Lj(a){a=a.a;return!a.Y&&!a.tb&&!a.ya}function Mj(a){a=a.a;return!a.Y&&!a.tb&&a.ya}function Nj(a){a=a.a.target.tagName;return"INPUT"!==a&&"SELECT"!==a&&"TEXTAREA"!==a}function Oj(a){return 1==a.d.pointerId};function Pj(){Ej.call(this);this.i=!1;this.n={};this.b=[]}B(Pj,Ej);function Qj(a){for(var b=a.length,c=0,d=0,e=0;e<b;e++)c+=a[e].clientX,d+=a[e].clientY;return[c/b,d/b]}l=Pj.prototype;l.Ia=ea;l.Ba=he;l.Aa=he;
l.ja=function(a){if(!(a instanceof Ti))return!0;var b=!1,c=a.type;if(c===bj||c===dj||c===$i)c=a.d,a.type==$i?delete this.n[c.pointerId]:a.type==bj?this.n[c.pointerId]=c:c.pointerId in this.n&&(this.n[c.pointerId]=c),this.b=Zb(this.n);this.i&&(a.type==dj?this.Ia(a):a.type==$i&&(this.i=this.Ba(a)));a.type==bj&&(this.i=a=this.Aa(a),b=this.ld(a));return!b};l.ld=he;function Rj(a){Pj.call(this);this.a=(u(a)?a:{}).kinetic;this.d=this.e=null;this.j=u(a.condition)?a.condition:Lj;this.f=!1}B(Rj,Pj);Rj.prototype.Ia=function(a){var b=Qj(this.b);if(null!==this.d){this.a&&this.a.update(b[0],b[1]);var c=this.d[0]-b[0],d=b[1]-this.d[1];a=a.map;var e=a.a().M(),f=yj(e),d=c=[c,d],g=f.resolution;d[0]*=g;d[1]*=g;gf(c,f.rotation);bf(c,f.center);c=e.g.center(c);a.K();e.ta(c)}this.d=b};
Rj.prototype.Ba=function(a){a=a.map;var b=a.a().M();if(0===this.b.length){var c;if(c=!this.f)if(c=this.a){c=this.a;var d=ya()-c.f,e=c.a.length-3;if(c.a[e+2]<d)c=!1;else{for(var f=e-3;0<=f&&c.a[f+2]>d;)f-=3;if(0<=f){var d=c.a[e+2]-c.a[f+2],g=c.a[e]-c.a[f],e=c.a[e+1]-c.a[f+1];c.d=Math.atan2(e,g);c.c=Math.sqrt(g*g+e*e)/d;c=c.c>c.b}else c=!1}}c&&(c=(this.a.b-this.a.c)/this.a.e,e=this.a.d,f=b.a(),this.e=hh(this.a,f),a.oa(this.e),f=a.g(f),c=a.ga([f[0]-c*Math.cos(e),f[1]-c*Math.sin(e)]),c=b.g.center(c),
b.ta(c));Zg(b,-1);a.K();return!1}this.d=null;return!0};Rj.prototype.Aa=function(a){if(0<this.b.length&&this.j(a)){var b=a.map,c=b.a().M();this.d=null;this.i||Zg(c,1);b.K();null!==this.e&&Ra(b.D,this.e)&&(c.ta(a.b.view2DState.center),this.e=null);this.a&&(a=this.a,a.a.length=0,a.d=0,a.c=0);this.f=1<this.b.length;return!0}return!1};function Sj(a){a=u(a)?a:{};Pj.call(this);this.d=u(a.condition)?a.condition:Jj;this.a=void 0}B(Sj,Pj);Sj.prototype.Ia=function(a){if(Oj(a)){var b=a.map,c=b.f();a=a.pixel;c=Math.atan2(c[1]/2-a[1],a[0]-c[0]/2);if(u(this.a)){a=c-this.a;var d=b.a().M(),e=yj(d);b.K();Fj(b,d,e.rotation-a)}this.a=c}};Sj.prototype.Ba=function(a){if(!Oj(a))return!0;a=a.map;var b=a.a();Zg(b,-1);var b=b.M(),c=yj(b).rotation,c=b.constrainRotation(c,0);Fj(a,b,c,void 0,250);return!1};
Sj.prototype.Aa=function(a){return Oj(a)&&Jd(a.a)&&this.d(a)?(a=a.map,Zg(a.a(),1),a.K(),this.a=void 0,!0):!1};function Tj(a){this.b=this.c=this.e=this.d=this.a=null;this.f=a}B(Tj,td);function Uj(a){var b=a.e,c=a.c;a=Na([b,[b[0],c[1]],c,[c[0],b[1]]],a.a.ga,a.a);a[4]=a[0].slice();return new pg([a])}Tj.prototype.w=function(){this.setMap(null)};Tj.prototype.i=function(a){var b=this.b,c=this.f;a.vectorContext.$b(Infinity,function(a){a.ma(c.d,c.b);a.$(c.c);a.ib(b,null)})};Tj.prototype.J=k("b");function Vj(a){null===a.a||(null===a.e||null===a.c)||a.a.K()}
Tj.prototype.setMap=function(a){null!==this.d&&(K(this.d),this.d=null,this.a.K(),this.a=null);this.a=a;null!==this.a&&(this.d=I(a,"postcompose",this.i,!1,this),Vj(this))};function Xj(a,b){yd.call(this,a);this.coordinate=b}B(Xj,yd);function Yj(a){Pj.call(this);a=u(a)?a:{};this.d=new Tj(u(a.style)?a.style:null);this.a=null;this.e=u(a.condition)?a.condition:ie}B(Yj,Pj);l=Yj.prototype;l.Ia=function(a){if(Oj(a)){var b=this.d;a=a.pixel;b.e=this.a;b.c=a;b.b=Uj(b);Vj(b)}};l.J=function(){return this.d.J()};l.je=ea;
l.Ba=function(a){if(!Oj(a))return!0;this.d.setMap(null);var b=a.pixel[0]-this.a[0],c=a.pixel[1]-this.a[1];64<=b*b+c*c&&(this.je(a),L(this,new Xj("boxend",a.coordinate)));return!1};l.Aa=function(a){if(Oj(a)&&Jd(a.a)&&this.e(a)){this.a=a.pixel;this.d.setMap(a.map);var b=this.d,c=this.a;b.e=this.a;b.c=c;b.b=Uj(b);Vj(b);L(this,new Xj("boxstart",a.coordinate));return!0}return!1};function Zj(a){a=u(a)?a:{};Yj.call(this,{condition:u(a.condition)?a.condition:Mj,style:u(a.style)?a.style:new Te({stroke:new Re({color:[0,0,255,1]})})})}B(Zj,Yj);Zj.prototype.je=function(){var a=this.g,b=a.a().M(),c=this.J().p(),d=xf(c),c=vj(c,a.f()),c=b.constrainResolution(c,0,void 0);Hj(a,b,c,d,200)};function ak(a){Ej.call(this);a=u(a)?a:{};this.a=u(a.condition)?a.condition:me(Lj,Nj);this.b=u(a.pixelDelta)?a.pixelDelta:128}B(ak,Ej);ak.prototype.ja=function(a){var b=!1;if("key"==a.type){var c=a.a.xa;if(this.a(a)&&(40==c||37==c||39==c||38==c)){var d=a.map,b=d.a(),e=yj(b),f=e.resolution*this.b,g=0,h=0;40==c?h=-f:37==c?g=-f:39==c?g=f:h=f;c=[g,h];gf(c,e.rotation);e=b.a();u(e)&&(u(100)&&d.oa(dh({source:e,duration:100,easing:bh})),d=b.g.center([e[0]+c[0],e[1]+c[1]]),b.ta(d));a.preventDefault();b=!0}}return!b};function bk(a){Ej.call(this);a=u(a)?a:{};this.b=u(a.condition)?a.condition:Nj;this.a=u(a.delta)?a.delta:1;this.d=u(a.duration)?a.duration:100}B(bk,Ej);bk.prototype.ja=function(a){var b=!1;if("key"==a.type){var c=a.a.Uc;if(this.b(a)&&(43==c||45==c)){b=a.map;c=43==c?this.a:-this.a;b.K();var d=b.a().M();Gj(b,d,c,void 0,this.d);a.preventDefault();b=!0}}return!b};function ck(a){a=u(a)?a:{};Ej.call(this);this.a=0;this.i=u(a.duration)?a.duration:250;this.d=null;this.e=this.b=void 0}B(ck,Ej);ck.prototype.ja=function(a){var b=!1;if("mousewheel"==a.type){var b=a.map,c=a.a;this.d=a.coordinate;this.a+=c.a;u(this.b)||(this.b=ya());c=Math.max(80-(ya()-this.b),0);t.clearTimeout(this.e);this.e=t.setTimeout(wa(this.f,this,b),c);a.preventDefault();b=!0}return!b};
ck.prototype.f=function(a){var b=Qb(this.a,-1,1),c=a.a().M();a.K();Gj(a,c,-b,this.d,this.i);this.a=0;this.d=null;this.e=this.b=void 0};function dk(a){Pj.call(this);a=u(a)?a:{};this.d=null;this.e=void 0;this.a=!1;this.f=0;this.j=u(a.threshold)?a.threshold:0.3}B(dk,Pj);dk.prototype.Ia=function(a){var b=0,c=this.b[0],d=this.b[1],c=Math.atan2(d.clientY-c.clientY,d.clientX-c.clientX);u(this.e)&&(b=c-this.e,this.f+=b,!this.a&&Math.abs(this.f)>this.j&&(this.a=!0));this.e=c;a=a.map;c=Kc(a.b);d=Qj(this.b);d[0]-=c.x;d[1]-=c.y;this.d=a.ga(d);this.a&&(c=a.a().M(),d=yj(c),a.K(),Fj(a,c,d.rotation+b,this.d))};
dk.prototype.Ba=function(a){if(2>this.b.length){a=a.map;var b=a.a();Zg(b,-1);if(this.a){var b=b.M(),c=yj(b).rotation,d=this.d,c=b.constrainRotation(c,0);Fj(a,b,c,d,250)}return!1}return!0};dk.prototype.Aa=function(a){return 2<=this.b.length?(a=a.map,this.d=null,this.e=void 0,this.a=!1,this.f=0,this.i||Zg(a.a(),1),a.K(),!0):!1};function ek(a){a=u(a)?a:{};Pj.call(this);this.d=null;this.f=u(a.duration)?a.duration:400;this.a=void 0;this.e=1}B(ek,Pj);ek.prototype.Ia=function(a){var b=1,c=this.b[0],d=this.b[1],e=c.clientX-d.clientX,c=c.clientY-d.clientY,e=Math.sqrt(e*e+c*c);u(this.a)&&(b=this.a/e);this.a=e;1!=b&&(this.e=b);a=a.map;var e=a.a().M(),c=yj(e),d=Kc(a.b),f=Qj(this.b);f[0]-=d.x;f[1]-=d.y;this.d=a.ga(f);a.K();Hj(a,e,c.resolution*b,this.d)};
ek.prototype.Ba=function(a){if(2>this.b.length){a=a.map;var b=a.a();Zg(b,-1);var b=b.M(),c=yj(b).resolution,d=this.d,e=this.f,c=b.constrainResolution(c,0,this.e-1);Hj(a,b,c,d,e);return!1}return!0};ek.prototype.Aa=function(a){return 2<=this.b.length?(a=a.map,this.d=null,this.a=void 0,this.e=1,this.i||Zg(a.a(),1),a.K(),!0):!1};function fk(a){a=u(a)?a:{};var b=new N,c=new gh(-0.005,0.05,100);(u(a.altShiftDragRotate)?a.altShiftDragRotate:1)&&b.push(new Sj);(u(a.doubleClickZoom)?a.doubleClickZoom:1)&&b.push(new Ij({delta:a.zoomDelta,duration:a.zoomDuration}));(u(a.dragPan)?a.dragPan:1)&&b.push(new Rj({kinetic:c}));(u(a.pinchRotate)?a.pinchRotate:1)&&b.push(new dk);(u(a.pinchZoom)?a.pinchZoom:1)&&b.push(new ek({duration:a.zoomDuration}));if(u(a.keyboard)?a.keyboard:1)b.push(new ak),b.push(new bk({delta:a.zoomDelta,duration:a.zoomDuration}));
(u(a.mouseWheelZoom)?a.mouseWheelZoom:1)&&b.push(new ck({duration:a.zoomDuration}));(u(a.shiftDragZoom)?a.shiftDragZoom:1)&&b.push(new Zj);return b};function gk(a){re.call(this);this.n=Sg(a.projection);this.L=u(a.extent)?a.extent:u(a.projection)?this.n.p():null;this.e=u(a.attributions)?a.attributions:null;this.r=a.logo;this.f=u(a.state)?a.state:1}B(gk,re);gk.prototype.k=ea;gk.prototype.p=k("L");gk.prototype.X=k("f");function hk(a,b){a.f=b;a.s()};function S(a){M.call(this);a=ec(a);a.brightness=u(a.brightness)?a.brightness:0;a.contrast=u(a.contrast)?a.contrast:1;a.hue=u(a.hue)?a.hue:0;a.opacity=u(a.opacity)?a.opacity:1;a.saturation=u(a.saturation)?a.saturation:1;a.visible=u(a.visible)?a.visible:!0;a.maxResolution=u(a.maxResolution)?a.maxResolution:Infinity;a.minResolution=u(a.minResolution)?a.minResolution:0;this.T(a)}B(S,M);S.prototype.n=function(){return this.get("brightness")};S.prototype.getBrightness=S.prototype.n;S.prototype.l=function(){return this.get("contrast")};
S.prototype.getContrast=S.prototype.l;S.prototype.r=function(){return this.get("hue")};S.prototype.getHue=S.prototype.r;function ik(a){var b=a.n(),c=a.l(),d=a.r(),e=a.L(),f=a.D(),g=a.g(),h=a.f(),m=a.q(),n=a.u();return{layer:a,brightness:u(b)?Qb(b,-1,1):0,contrast:u(c)?Math.max(c,0):1,hue:u(d)?d:0,opacity:u(e)?Qb(e,0,1):1,saturation:u(f)?Math.max(f,0):1,k:g,visible:u(h)?!!h:!0,maxResolution:u(m)?m:Infinity,minResolution:u(n)?Math.max(n,0):0}}S.prototype.q=function(){return this.get("maxResolution")};
S.prototype.getMaxResolution=S.prototype.q;S.prototype.u=function(){return this.get("minResolution")};S.prototype.getMinResolution=S.prototype.u;S.prototype.L=function(){return this.get("opacity")};S.prototype.getOpacity=S.prototype.L;S.prototype.D=function(){return this.get("saturation")};S.prototype.getSaturation=S.prototype.D;S.prototype.f=function(){return this.get("visible")};S.prototype.getVisible=S.prototype.f;S.prototype.Bc=function(a){this.t("brightness",a)};S.prototype.setBrightness=S.prototype.Bc;
S.prototype.Cc=function(a){this.t("contrast",a)};S.prototype.setContrast=S.prototype.Cc;S.prototype.Dc=function(a){this.t("hue",a)};S.prototype.setHue=S.prototype.Dc;S.prototype.Ec=function(a){this.t("maxResolution",a)};S.prototype.setMaxResolution=S.prototype.Ec;S.prototype.Fc=function(a){this.t("minResolution",a)};S.prototype.setMinResolution=S.prototype.Fc;S.prototype.Gc=function(a){this.t("opacity",a)};S.prototype.setOpacity=S.prototype.Gc;S.prototype.Hc=function(a){this.t("saturation",a)};
S.prototype.setSaturation=S.prototype.Hc;S.prototype.Ic=function(a){this.t("visible",a)};S.prototype.setVisible=S.prototype.Ic;function jk(a){var b=u(a)?a:{};a=ec(b);delete a.layers;b=b.layers;S.call(this,a);this.a=null;I(this,xe("layers"),this.Pf,!1,this);u(b)?ia(b)&&(b=new N(Ta(b))):b=new N;this.b(b)}B(jk,S);l=jk.prototype;l.Rd=function(){this.f()&&this.s()};
l.Pf=function(){null!==this.a&&(Ma(Zb(this.a),K),this.a=null);var a=this.qb();if(null!=a){this.a={add:I(a,"add",this.Of,!1,this),remove:I(a,"remove",this.Qf,!1,this)};var a=a.a,b,c,d;b=0;for(c=a.length;b<c;b++)d=a[b],this.a[v(d).toString()]=I(d,["propertychange","change"],this.Rd,!1,this)}this.s()};l.Of=function(a){a=a.element;this.a[v(a).toString()]=I(a,["propertychange","change"],this.Rd,!1,this);this.s()};l.Qf=function(a){a=v(a.element).toString();K(this.a[a]);delete this.a[a];this.s()};l.qb=function(){return this.get("layers")};
jk.prototype.getLayers=jk.prototype.qb;jk.prototype.b=function(a){this.t("layers",a)};jk.prototype.setLayers=jk.prototype.b;
jk.prototype.fc=function(a){var b=u(a)?a:[],c=b.length;this.qb().forEach(function(a){a.fc(b)});a=ik(this);var d,e;for(d=b.length;c<d;c++)e=b[c],e.brightness=Qb(e.brightness+a.brightness,-1,1),e.contrast*=a.contrast,e.hue+=a.hue,e.opacity*=a.opacity,e.saturation*=a.saturation,e.visible=e.visible&&a.visible,e.maxResolution=Math.min(e.maxResolution,a.maxResolution),e.minResolution=Math.max(e.minResolution,a.minResolution);return b};jk.prototype.g=ca(1);function kk(a){yg.call(this,{code:a,units:"m",extent:lk,global:!0})}B(kk,yg);var mk=6378137*Math.PI,lk=[-mk,-mk,mk,mk],Mg=Na(["EPSG:3857","EPSG:102100","EPSG:102113","EPSG:900913","urn:ogc:def:crs:EPSG:6.18:3:3857"],function(a){return new kk(a)});function Ng(a,b,c){var d=a.length;c=1<c?c:2;u(b)||(b=2<c?a.slice():Array(d));for(var e=0;e<d;e+=c)b[e]=6378137*Math.PI*a[e]/180,b[e+1]=6378137*Math.log(Math.tan(Math.PI*(a[e+1]+90)/360));return b}
function Og(a,b,c){var d=a.length;c=1<c?c:2;u(b)||(b=2<c?a.slice():Array(d));for(var e=0;e<d;e+=c)b[e]=180*a[e]/(6378137*Math.PI),b[e+1]=360*Math.atan(Math.exp(a[e+1]/6378137))/Math.PI-90;return b}kk.prototype.d=function(a,b){return a/((Math.exp(b[1]/6378137)+Math.exp(-(b[1]/6378137)))/2)};function nk(a,b){yg.call(this,{code:a,units:"degrees",extent:ok,axisOrientation:b,global:!0})}B(nk,yg);var ok=[-180,-90,180,90],Pg=[new nk("CRS:84"),new nk("EPSG:4326","neu"),new nk("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new nk("urn:ogc:def:crs:OGC:1.3:CRS84"),new nk("urn:ogc:def:crs:OGC:2:84"),new nk("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new nk("urn:x-ogc:def:crs:EPSG:4326","neu")];nk.prototype.d=aa();function pk(){Hg(Mg);Hg(Pg);Lg()};function qk(a){var b=ec(a);delete b.source;S.call(this,b);this.a=a.source;I(this.a,"change",this.Oa,!1,this)}B(qk,S);qk.prototype.fc=function(a){a=u(a)?a:[];a.push(ik(this));return a};qk.prototype.Na=k("a");qk.prototype.g=function(){return this.a.f};qk.prototype.Oa=function(){this.s()};function rk(a,b,c,d,e){pe.call(this);this.i=e;this.j=a;this.b=c;this.d=b;this.state=d}B(rk,pe);rk.prototype.p=k("j");function sk(a,b,c,d,e,f){rk.call(this,a,b,c,0,d);this.g=e;this.a=new Image;null!==f&&(this.a.crossOrigin=f);this.f={};this.c=null;this.state=0}B(sk,rk);sk.prototype.e=function(a){if(u(a)){var b=v(a);if(b in this.f)return this.f[b];a=ac(this.f)?this.a:this.a.cloneNode(!1);return this.f[b]=a}return this.a};sk.prototype.k=function(){this.state=3;Ma(this.c,K);this.c=null;L(this,"change")};sk.prototype.n=function(){this.state=2;Ma(this.c,K);this.c=null;L(this,"change")};
function tk(a){0==a.state&&(a.state=1,a.c=[Xd(a.a,"error",a.k,!1,a),Xd(a.a,"load",a.n,!1,a)],a.a.src=a.g)};function uk(a){this.minZoom=u(a.minZoom)?a.minZoom:0;this.a=a.resolutions;this.maxZoom=this.a.length-1;this.e=u(a.origin)?a.origin:null;this.i=null;u(a.origins)&&(this.i=a.origins);this.b=null;u(a.tileSizes)&&(this.b=a.tileSizes);this.f=u(a.tileSize)?a.tileSize:null===this.b?256:void 0}var vk=new ab(0,0,0);l=uk.prototype;l.dc=function(a,b,c,d,e){e=wk(this,a,e);for(a=a.a-1;a>=this.minZoom;){if(b.call(c,a,xk(this,e,a,d)))return!0;--a}return!1};l.sf=k("minZoom");
l.Sb=function(a){return null===this.e?this.i[a]:this.e};l.Va=k("a");l.gc=function(a,b,c){return a.a<this.maxZoom?(c=wk(this,a,c),xk(this,c,a.a+1,b)):null};function yk(a,b,c,d){zk(a,b[0],b[1],c,!1,vk);var e=vk.x,f=vk.y;zk(a,b[2],b[3],c,!0,vk);return fb(e,vk.x,f,vk.y,d)}function xk(a,b,c,d){return yk(a,b,a.a[c],d)}function Ak(a,b){var c=a.Sb(b.a),d=a.a[b.a],e=a.ha(b.a);return[c[0]+(b.x+0.5)*e*d,c[1]+(b.y+0.5)*e*d]}
function wk(a,b,c){var d=a.Sb(b.a),e=a.a[b.a];a=a.ha(b.a);var f=d[0]+b.x*a*e;b=d[1]+b.y*a*e;return nf(f,b,f+a*e,b+a*e,c)}function zk(a,b,c,d,e,f){var g=Jf(a.a,d,0),h=d/a.a[g],m=a.Sb(g);a=a.ha(g);b=h*(b-m[0])/(d*a);c=h*(c-m[1])/(d*a);e?(b=Math.ceil(b)-1,c=Math.ceil(c)-1):(b=Math.floor(b),c=Math.floor(c));return bb(g,b,c,f)}l.ha=function(a){return u(this.f)?this.f:this.b[a]};function Bk(a){gk.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection});this.D=u(a.opaque)?a.opaque:!1;this.tileGrid=u(a.tileGrid)?a.tileGrid:null}B(Bk,gk);l=Bk.prototype;l.cd=he;l.Pc=function(a,b,c,d){var e=!0,f,g,h,m;for(h=d.a;h<=d.d;++h)for(m=d.b;m<=d.c;++m)g=this.Ha(c,h,m),a[c]&&a[c][g]||(f=b(c,h,m),null===f?e=!1:(a[c]||(a[c]={}),a[c][g]=f));return e};l.ec=ca(0);l.Ha=cb;l.Va=function(){return this.tileGrid.Va()};l.zf=k("tileGrid");
function Ck(a,b){var c;if(null===a.tileGrid){if(c=b.f,null===c){c=b.p();for(var d=null===c?360*wg.degrees/b.b():Math.max(c[2]-c[0],c[3]-c[1]),e=u(void 0)?void 0:256,f=Array((u(void 0)?NaN:42)+1),d=d/e,g=0,h=f.length;g<h;++g)f[g]=d/Math.pow(2,g);c=new uk({origin:null===c?[0,0]:wf(c),resolutions:f,tileSize:e});b.f=c}}else c=a.tileGrid;return c}l.Mb=function(a,b,c){return Ck(this,c).ha(a)};l.ze=ea;function Dk(a,b){td.call(this);this.e=a;this.a=b}B(Dk,td);Dk.prototype.f=ea;Dk.prototype.n=function(a){2===a.target.state&&Ek(this)};function Ek(a){var b=a.a;b.f()&&1==b.g()&&a.e.f.K()}function Fk(a,b){b.cd()&&a.postRenderFunctions.push(xa(function(a,b,e){b=v(a).toString();a.ce(e.usedTiles[b])},b))}function Gk(a,b){if(null!=b){var c,d,e;d=0;for(e=b.length;d<e;++d)c=b[d],a[v(c).toString()]=c}}function Hk(a,b){var c=b.r;u(c)&&(a.logos[c]="")}
function Ik(a,b,c,d){b=v(b).toString();c=c.toString();b in a?c in a[b]?(a=a[b][c],d.a<a.a&&(a.a=d.a),d.d>a.d&&(a.d=d.d),d.b<a.b&&(a.b=d.b),d.c>a.c&&(a.c=d.c)):a[b][c]=d:(a[b]={},a[b][c]=d)}function Jk(a,b,c,d){return function(e,f,g){e=b.mb(e,f,g,c,d);return a(e)?e:null}}function Kk(a,b,c){return[b*(Math.round(a[0]/b)+c[0]%2/2),b*(Math.round(a[1]/b)+c[1]%2/2)]}
function Lk(a,b,c,d,e,f,g,h,m,n){var p=v(b).toString();p in a.wantedTiles||(a.wantedTiles[p]={});var q=a.wantedTiles[p];a=a.tileQueue;var r=c.minZoom,s,z,x,w,C,A;u(h)||(h=0);for(A=g;A>=r;--A)for(z=xk(c,f,A),x=c.a[A],w=z.a;w<=z.d;++w)for(C=z.b;C<=z.c;++C)g-A<=h?(s=b.mb(A,w,C,d,e),0==s.state&&(q[s.a.toString()]=!0,s.d()in a.b||ij(a,[s,p,Ak(c,s.a),x])),u(m)&&m.call(n,s)):b.ze(A,w,C)};function Mk(a){a=u(a)?a:{};this.b=u(a.anchor)?a.anchor:[0.5,0.5];this.c=u(a.anchorOrigin)?a.anchorOrigin:"top-left";this.d=u(a.anchorXUnits)?a.anchorXUnits:"fraction";this.i=u(a.anchorYUnits)?a.anchorYUnits:"fraction";var b=a.src,c=u(a.crossOrigin)?a.crossOrigin:null,d=Nk.Ga(),e=d.get(b,c);null===e&&(e=new Ok(b,c),d.a[c+":"+b]=e,++d.c);this.a=e;this.g=u(a.size)?a.size:null;Qe.call(this,{opacity:u(a.opacity)?a.opacity:1,rotation:u(a.rotation)?a.rotation:0,scale:u(a.scale)?a.scale:1,ue:void 0,rotateWithView:u(a.rotateWithView)?
a.rotateWithView:!1})}B(Mk,Qe);l=Mk.prototype;l.Lb=function(){var a=this.b,b=this.sb();if("fraction"==this.d||"fraction"==this.i){if(null===b)return null;a=this.b.slice();"fraction"==this.d&&(a[0]*=b[0]);"fraction"==this.i&&(a[1]*=b[1])}if("top-left"!=this.c){if(null===b)return null;a===this.b&&(a=this.b.slice());if("top-right"==this.c||"bottom-right"==this.c)a[0]=-a[0]+b[0];if("bottom-left"==this.c||"bottom-right"==this.c)a[1]=-a[1]+b[1]}return a};l.Rb=function(){return this.a.a};l.he=function(){return this.a.c};
l.ge=function(){var a=this.a;if(null===a.d)if(a.g){var b=a.e[0],c=a.e[1],d=kd(b,c);d.fillRect(0,0,b,c);a.d=d.canvas}else a.d=a.a;return a.d};l.hh=function(){return this.a.f};l.sb=function(){return null===this.g?this.a.e:this.g};l.Vd=function(a,b){return I(this.a,"change",a,!1,b)};l.ie=function(){var a=this.a;if(0==a.c){a.c=1;a.b=[Xd(a.a,"error",a.i,!1,a),Xd(a.a,"load",a.j,!1,a)];try{a.a.src=a.f}catch(b){a.i()}}};l.ye=function(a,b){Yd(this.a,"change",a,!1,b)};
function Ok(a,b){pe.call(this);this.d=null;this.a=new Image;null!==b&&(this.a.crossOrigin=b);this.b=null;this.c=0;this.e=null;this.f=a;this.g=!1}B(Ok,pe);Ok.prototype.i=function(){this.c=3;Ma(this.b,K);this.b=null;L(this,"change")};Ok.prototype.j=function(){this.c=2;this.e=[this.a.width,this.a.height];Ma(this.b,K);this.b=null;var a=kd(1,1);a.drawImage(this.a,0,0);try{a.getImageData(0,0,1,1)}catch(b){this.g=!0}L(this,"change")};function Nk(){this.a={};this.c=0;this.b=32}fa(Nk);
Nk.prototype.clear=function(){this.a={};this.c=0};Nk.prototype.get=function(a,b){var c=b+":"+a;return c in this.a?this.a[c]:null};function Pk(a,b,c,d,e,f,g,h){fd(a);0===b&&0===c||hd(a,b,c);1==d&&1==e||id(a,d,e);0!==f&&jd(a,f);0===g&&0===h||hd(a,g,h);return a}function Qk(a,b){return a[0]==b[0]&&a[1]==b[1]&&a[4]==b[4]&&a[5]==b[5]&&a[12]==b[12]&&a[13]==b[13]}function Rk(a,b,c){var d=a[1],e=a[5],f=a[13],g=b[0];b=b[1];c[0]=a[0]*g+a[4]*b+a[12];c[1]=d*g+e*b+f;return c};function Sk(a,b){td.call(this);this.f=b;this.b={}}B(Sk,td);
function Tk(a){var b=a.view2DState,c=a.coordinateToPixelMatrix;Pk(c,a.size[0]/2,a.size[1]/2,1/b.resolution,-1/b.resolution,-b.rotation,-b.center[0],-b.center[1]);a=a.pixelToCoordinateMatrix;var b=c[0],d=c[1],e=c[2],f=c[3],g=c[4],h=c[5],m=c[6],n=c[7],p=c[8],q=c[9],r=c[10],s=c[11],z=c[12],x=c[13],w=c[14],c=c[15],C=b*h-d*g,A=b*m-e*g,D=b*n-f*g,H=d*m-e*h,P=d*n-f*h,J=e*n-f*m,U=p*x-q*z,X=p*w-r*z,ma=p*c-s*z,sa=q*w-r*x,R=q*c-s*x,qa=r*c-s*w,ja=C*qa-A*R+D*sa+H*ma-P*X+J*U;0!=ja&&(ja=1/ja,a[0]=(h*qa-m*R+n*sa)*
ja,a[1]=(-d*qa+e*R-f*sa)*ja,a[2]=(x*J-w*P+c*H)*ja,a[3]=(-q*J+r*P-s*H)*ja,a[4]=(-g*qa+m*ma-n*X)*ja,a[5]=(b*qa-e*ma+f*X)*ja,a[6]=(-z*J+w*D-c*A)*ja,a[7]=(p*J-r*D+s*A)*ja,a[8]=(g*R-h*ma+n*U)*ja,a[9]=(-b*R+d*ma-f*U)*ja,a[10]=(z*P-x*D+c*C)*ja,a[11]=(-p*P+q*D-s*C)*ja,a[12]=(-g*sa+h*X-m*U)*ja,a[13]=(b*sa-d*X+e*U)*ja,a[14]=(-z*H+x*A-w*C)*ja,a[15]=(p*H-q*A+r*C)*ja)}Sk.prototype.Yb=function(a){return new Dk(this,a)};Sk.prototype.w=function(){Wb(this.b,function(a){xd(a)});Sk.B.w.call(this)};
function Uk(a,b){var c=v(b).toString();if(c in a.b)return a.b[c];var d=a.Yb(b);return a.b[c]=d}Sk.prototype.uc=ea;Sk.prototype.r=function(a,b){for(var c in this.b)if(!(null!==b&&c in b.layerStates)){var d=this.b[c];delete this.b[c];xd(d)}};function Vk(a){a.postRenderFunctions.push(function(){var a=Nk.Ga();if(a.c>a.b){var c=0,d,e;for(d in a.a)e=a.a[d],0!==(c++&3)||ae(e)||(delete a.a[d],--a.c)}})}
function Wk(a,b){for(var c in a.b)if(!(c in b.layerStates)){b.postRenderFunctions.push(wa(a.r,a));break}};function Xk(a){qk.call(this,a)}B(Xk,qk);function Yk(a){qk.call(this,a)}B(Yk,qk);Yk.prototype.b=function(){return this.get("preload")};Yk.prototype.getPreload=Yk.prototype.b;Yk.prototype.j=function(a){this.t("preload",a)};Yk.prototype.setPreload=Yk.prototype.j;Yk.prototype.d=function(){return this.get("useInterimTilesOnError")};Yk.prototype.getUseInterimTilesOnError=Yk.prototype.d;Yk.prototype.o=function(a){this.t("useInterimTilesOnError",a)};Yk.prototype.setUseInterimTilesOnError=Yk.prototype.o;function Zk(a){a=u(a)?a:{};var b=ec(a);delete b.style;qk.call(this,b);this.N=null;this.d=void 0;u(a.style)&&this.j(a.style)}B(Zk,qk);Zk.prototype.Pa=k("N");Zk.prototype.Qa=k("d");Zk.prototype.j=function(a){this.N=a;this.d=Xe(a);this.s()};function $k(a,b,c,d,e){this.O={};this.b=a;this.k=b;this.i=c;this.f=d;this.Ac=e;this.g=this.a=this.c=this.ba=this.N=this.L=null;this.r=this.X=this.u=this.q=0;this.ca=!1;this.j=this.Da=0;this.Ea=!1;this.Na=0;this.d="";this.l=this.U=this.Pa=this.Oa=0;this.D=this.o=this.n=null;this.e=[];this.Qa=bd()}
function al(a,b){if(null!==a.g){var c=Kf(b,2,a.f,a.e),d=a.b,e=a.Qa,f=d.globalAlpha;1!=a.r&&(d.globalAlpha=f*a.r);var g=a.Da;a.ca&&(g+=a.Ac);var h,m;h=0;for(m=c.length;h<m;h+=2){var n=c[h]-a.q,p=c[h+1]-a.u;a.Ea&&(n=n+0.5|0,p=p+0.5|0);if(0!==g||1!=a.j){var q=n+a.q,r=p+a.u;Pk(e,q,r,a.j,a.j,g,-q,-r);d.setTransform(e[0],e[1],e[4],e[5],e[12],e[13])}d.drawImage(a.g,n,p,a.Na,a.X)}0===g&&1==a.j||d.setTransform(1,0,0,1,0,0);1!=a.r&&(d.globalAlpha=f)}}
function bl(a,b,c,d){var e=0;if(null!==a.D&&""!==a.d){null===a.n||cl(a,a.n);null===a.o||dl(a,a.o);var f=a.D,g=a.b,h=a.ba;null===h?(g.font=f.font,g.textAlign=f.textAlign,g.textBaseline=f.textBaseline,a.ba={font:f.font,textAlign:f.textAlign,textBaseline:f.textBaseline}):(h.font!=f.font&&(h.font=g.font=f.font),h.textAlign!=f.textAlign&&(h.textAlign=g.textAlign=f.textAlign),h.textBaseline!=f.textBaseline&&(h.textBaseline=g.textBaseline=f.textBaseline));b=Kf(b,d,a.f,a.e);for(f=a.b;e<c;e+=d){g=b[e]+a.Oa;
h=b[e+1]+a.Pa;if(0!==a.U||1!=a.l){var m=Pk(a.Qa,g,h,a.l,a.l,a.U,-g,-h);f.setTransform(m[0],m[1],m[4],m[5],m[12],m[13])}null===a.o||f.strokeText(a.d,g,h);null===a.n||f.fillText(a.d,g,h)}0===a.U&&1==a.l||f.setTransform(1,0,0,1,0,0)}}function el(a,b,c,d,e){a=a.b;a.moveTo(b[c],b[c+1]);var f;for(f=c+2;f<d;f+=2)a.lineTo(b[f],b[f+1]);e&&a.lineTo(b[c],b[c+1]);return d}function fl(a,b,c,d){var e=a.b,f,g;f=0;for(g=d.length;f<g;++f)c=el(a,b,c,d[f],!0),e.closePath();return c}l=$k.prototype;
l.$b=function(a,b){var c=a.toString(),d=this.O[c];u(d)?d.push(b):this.O[c]=[b]};l.Gb=function(a){if(Cf(this.i,a.p())){if(null!==this.c||null!==this.a){null===this.c||cl(this,this.c);null===this.a||dl(this,this.a);var b=Pf(a,this.f,this.e),c=b[2]-b[0],d=b[3]-b[1],c=Math.sqrt(c*c+d*d),d=this.b;d.beginPath();d.arc(b[0],b[1],c,0,2*Math.PI);null===this.c||d.fill();null===this.a||d.stroke()}""!==this.d&&bl(this,a.bd(),2,2)}};
l.Oc=function(a,b){var c=a.J();if(null!==c&&Cf(this.i,c.p())){var d=b.a;u(d)||(d=0);this.$b(d,function(a){a.ma(b.d,b.b);a.xb(b.e);a.$(b.c);gl[c.A()].call(a,c,null)})}};l.Id=function(a,b){var c=a.a,d,e;d=0;for(e=c.length;d<e;++d){var f=c[d];gl[f.A()].call(this,f,b)}};l.Kb=function(a){var b=a.h;a=a.a;null===this.g||al(this,b);""!==this.d&&bl(this,b,b.length,a)};l.Jb=function(a){var b=a.h;a=a.a;null===this.g||al(this,b);""!==this.d&&bl(this,b,b.length,a)};
l.Hb=function(a){if(Cf(this.i,a.p())){if(null!==this.a){dl(this,this.a);var b=Pf(a,this.f,this.e),c=this.b;c.beginPath();el(this,b,0,b.length,!1);c.stroke()}""!==this.d&&(a=hl(a),bl(this,a,2,2))}};l.Ib=function(a){var b=a.p();if(Cf(this.i,b)){if(null!==this.a){dl(this,this.a);var b=Pf(a,this.f,this.e),c=this.b;c.beginPath();var d=a.d,e=0,f,g;f=0;for(g=d.length;f<g;++f)e=el(this,b,e,d[f],!1);c.stroke()}""!==this.d&&(a=il(a),bl(this,a,a.length,2))}};
l.ib=function(a){if(Cf(this.i,a.p())){var b;if(null!==this.a||null!==this.c){null===this.c||cl(this,this.c);null===this.a||dl(this,this.a);b=Pf(a,this.f,this.e);var c=this.b;c.beginPath();fl(this,b,0,a.d);null===this.c||c.fill();null===this.a||c.stroke()}""!==this.d&&(a=sg(a),bl(this,a,2,2))}};
l.ac=function(a){if(Cf(this.i,a.p())){var b;if(null!==this.a||null!==this.c){null===this.c||cl(this,this.c);null===this.a||dl(this,this.a);b=Pf(a,this.f,this.e);var c=this.b,d=a.d,e=0,f,g;f=0;for(g=d.length;f<g;++f){var h=d[f];c.beginPath();e=fl(this,b,e,h);null===this.c||c.fill();null===this.a||c.stroke()}}""!==this.d&&(a=jl(a),bl(this,a,a.length,2))}};
function kl(a){var b=Na($b(a.O),Number);Xa(b);var c,d,e,f,g;c=0;for(d=b.length;c<d;++c)for(e=a.O[b[c].toString()],f=0,g=e.length;f<g;++f)e[f](a)}function cl(a,b){var c=a.b,d=a.L;null===d?(c.fillStyle=b.fillStyle,a.L={fillStyle:b.fillStyle}):d.fillStyle!=b.fillStyle&&(d.fillStyle=c.fillStyle=b.fillStyle)}
function dl(a,b){var c=a.b,d=a.N;null===d?(c.lineCap=b.lineCap,G.Wb&&c.setLineDash(b.lineDash),c.lineJoin=b.lineJoin,c.lineWidth=b.lineWidth,c.miterLimit=b.miterLimit,c.strokeStyle=b.strokeStyle,a.N={lineCap:b.lineCap,lineDash:b.lineDash,lineJoin:b.lineJoin,lineWidth:b.lineWidth,miterLimit:b.miterLimit,strokeStyle:b.strokeStyle}):(d.lineCap!=b.lineCap&&(d.lineCap=c.lineCap=b.lineCap),G.Wb&&!Za(d.lineDash,b.lineDash)&&c.setLineDash(d.lineDash=b.lineDash),d.lineJoin!=b.lineJoin&&(d.lineJoin=c.lineJoin=
b.lineJoin),d.lineWidth!=b.lineWidth&&(d.lineWidth=c.lineWidth=b.lineWidth),d.miterLimit!=b.miterLimit&&(d.miterLimit=c.miterLimit=b.miterLimit),d.strokeStyle!=b.strokeStyle&&(d.strokeStyle=c.strokeStyle=b.strokeStyle))}
l.ma=function(a,b){if(null===a)this.c=null;else{var c=a.a;this.c={fillStyle:Ie(null===c?Me:c)}}if(null===b)this.a=null;else{var c=b.a,d=b.b,e=b.d,f=b.e,g=b.c,h=b.f;this.a={lineCap:u(d)?d:"round",lineDash:null!=e?e:Ne,lineJoin:u(f)?f:"round",lineWidth:this.k*(u(g)?g:1),miterLimit:u(h)?h:10,strokeStyle:Ie(null===c?Oe:c)}}};
l.xb=function(a){if(null===a)this.g=null;else{var b=a.Lb(),c=a.Rb(1),d=a.j,e=a.k,f=a.e,g=a.f,h=a.sb();a=a.n;this.q=b[0];this.u=b[1];this.X=h[1];this.g=c;this.r=u(d)?d:1;this.ca=u(e)?e:!1;this.Da=u(f)?f:0;this.j=u(g)?g:1;this.Ea=u(a)?a:!1;this.Na=h[0]}};
l.$=function(a){if(null===a)this.d="";else{var b=a.c;null===b?this.n=null:(b=b.a,this.n={fillStyle:Ie(null===b?Me:b)});var c=a.e;if(null===c)this.o=null;else{var b=c.a,d=c.b,e=c.d,f=c.e,g=c.c,c=c.f;this.o={lineCap:u(d)?d:"round",lineDash:null!=e?e:Ne,lineJoin:u(f)?f:"round",lineWidth:this.k*(u(g)?g:1),miterLimit:u(c)?c:10,strokeStyle:Ie(null===b?Oe:b)}}var b=a.a,d=a.j,e=a.k,f=a.b,g=a.d,c=a.f,h=a.i;a=a.g;this.D={font:u(b)?b:"10px sans-serif",textAlign:u(h)?h:"center",textBaseline:u(a)?a:"middle"};
this.d=u(c)?c:"";this.Oa=u(d)?this.k*d:0;this.Pa=u(e)?this.k*e:0;this.U=u(f)?f:0;this.l=this.k*(u(g)?g:1)}};var gl={Point:$k.prototype.Kb,LineString:$k.prototype.Hb,Polygon:$k.prototype.ib,MultiPoint:$k.prototype.Jb,MultiLineString:$k.prototype.Ib,MultiPolygon:$k.prototype.ac,GeometryCollection:$k.prototype.Id,Circle:$k.prototype.Gb};function ll(a,b){Dk.call(this,a,b);this.D=bd()}B(ll,Dk);ll.prototype.l=function(a,b,c){ml(this,"precompose",c,a,void 0);var d=this.o();if(null!==d){var e=this.k();c.globalAlpha=b.opacity;if(0===a.view2DState.rotation){b=e[13];var f=d.width*e[0],g=d.height*e[5];c.drawImage(d,0,0,+d.width,+d.height,Math.round(e[12]),Math.round(b),Math.round(f),Math.round(g))}else c.setTransform(e[0],e[1],e[4],e[5],e[12],e[13]),c.drawImage(d,0,0),c.setTransform(1,0,0,1,0,0)}ml(this,"postcompose",c,a,void 0)};
function ml(a,b,c,d,e){var f=a.a;be(f.S,b)&&(a=u(e)?e:nl(a,d),a=new $k(c,d.pixelRatio,d.extent,a,d.view2DState.rotation),L(f,new Ze(b,f,a,d,c,null)),kl(a))}function nl(a,b){var c=b.view2DState,d=b.pixelRatio;return Pk(a.D,d*b.size[0]/2,d*b.size[1]/2,d/c.resolution,-d/c.resolution,-c.rotation,-c.center[0],-c.center[1])}
var pl=function(){var a=null,b=null;return function(c){if(null===a){a=kd(1,1);b=a.createImageData(1,1);var d=b.data;d[0]=42;d[1]=84;d[2]=126;d[3]=255}var d=a.canvas,e=c[0]<=d.width&&c[1]<=d.height;e||(d.width=c[0],d.height=c[1],d=c[0]-1,c=c[1]-1,a.putImageData(b,d,c),c=a.getImageData(d,c,1,1),e=Za(b.data,c.data));return e}}();function ql(a){gk.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,state:a.state});this.j=u(a.resolutions)?a.resolutions:null}B(ql,gk);ql.prototype.Va=k("j");function rl(a,b){null===a.j||(b=a.j[Jf(a.j,b,0)]);return b};function sl(a,b){ll.call(this,a,b);this.c=null;this.b=bd()}B(sl,ll);sl.prototype.f=function(a,b,c,d){var e=this.a;return e.a.k(b.extent,b.view2DState.resolution,b.view2DState.rotation,a,function(a){return c.call(d,a,e)})};sl.prototype.o=function(){return null===this.c?null:this.c.e()};sl.prototype.k=k("b");
sl.prototype.d=function(a){var b=a.pixelRatio,c=a.view2DState,d=c.center,e=c.resolution,f=c.rotation,g=this.a.a,h=a.viewHints;h[0]||h[1]||(c=g.rb(a.extent,e,b,c.projection),null!==c&&(h=c.state,0==h?(Xd(c,"change",this.n,!1,this),tk(c)):2==h&&(this.c=c)));if(null!==this.c){var c=this.c,h=c.p(),m=c.d,n=c.b,e=b*m/(e*n);Pk(this.b,b*a.size[0]/2,b*a.size[1]/2,e,e,f,n*(h[0]-d[0])/m,n*(d[1]-h[3])/m);Gk(a.attributions,c.i);Hk(a,g)}};function tl(a,b){ll.call(this,a,b);this.c=this.i=null;this.j=!1;this.r=null;this.q=bd();this.u=NaN;this.g=this.b=null}B(tl,ll);tl.prototype.o=k("i");tl.prototype.k=k("q");
tl.prototype.d=function(a){var b=a.pixelRatio,c=a.view2DState,d=c.projection,e=this.a,f=e.a,g=Ck(f,d),h=f.ec(),m=Jf(g.a,c.resolution,0),n=f.Mb(m,a.pixelRatio,d),p=g.a[m],q=p/(n/g.ha(m)),r=c.center,s;p==c.resolution?(r=Kk(r,p,a.size),s=yf(r,p,c.rotation,a.size)):s=a.extent;var z=yk(g,s,p),x=n*(z.d-z.a+1),w=n*(z.c-z.b+1),C,A;null===this.i?(A=kd(x,w),this.i=A.canvas,this.c=[x,w],this.r=A,this.j=!pl(this.c)):(C=this.i,A=this.r,this.c[0]<x||this.c[1]<w||this.j&&(this.c[0]>x||this.c[1]>w)?(C.width=x,C.height=
w,this.c=[x,w],this.j=!pl(this.c),this.b=null):(x=this.c[0],w=this.c[1],m==this.u&&this.b.a<=z.a&&z.d<=this.b.d&&this.b.b<=z.b&&z.c<=this.b.c||(this.b=null)));var D,H;null===this.b?(x/=n,w/=n,D=z.a-Math.floor((x-(z.d-z.a+1))/2),H=z.b-Math.floor((w-(z.c-z.b+1))/2),this.u=m,this.b=new eb(D,D+x-1,H,H+w-1),this.g=Array(x*w),w=this.b):(w=this.b,x=w.d-w.a+1);C={};C[m]={};var P=[],J=wa(f.Pc,f,C,Jk(function(a){return null!==a&&2==a.state},f,b,d)),U=e.d();u(U)||(U=!0);var X=lf(),ma=new eb(0,0,0,0),sa,R,qa;
for(H=z.a;H<=z.d;++H)for(qa=z.b;qa<=z.c;++qa)R=f.mb(m,H,qa,b,d),D=R.state,2==D||4==D||3==D&&!U?C[m][R.a.toString()]=R:(sa=g.dc(R.a,J,null,ma,X),sa||(P.push(R),sa=g.gc(R.a,ma,X),null===sa||J(m+1,sa)));J=0;for(sa=P.length;J<sa;++J)R=P[J],H=n*(R.a.x-w.a),qa=n*(w.c-R.a.y),A.clearRect(H,qa,n,n);P=Na($b(C),Number);Xa(P);var ja=f.D,Vb=Af(wk(g,new ab(m,w.a,w.c),X)),nb,xb,Bh,fg,de,Wj,J=0;for(sa=P.length;J<sa;++J)if(nb=P[J],n=f.Mb(nb,b,d),fg=C[nb],nb==m)for(Bh in fg)R=fg[Bh],xb=(R.a.y-w.b)*x+(R.a.x-w.a),this.g[xb]!=
R&&(H=n*(R.a.x-w.a),qa=n*(w.c-R.a.y),D=R.state,4!=D&&(3!=D||U)&&ja||A.clearRect(H,qa,n,n),2==D&&A.drawImage(R.b(),h,h,n,n,H,qa,n,n),this.g[xb]=R);else for(Bh in nb=g.a[nb]/p,fg)for(R=fg[Bh],xb=wk(g,R.a,X),H=(xb[0]-Vb[0])/q,qa=(Vb[1]-xb[3])/q,Wj=nb*n,de=nb*n,D=R.state,4!=D&&ja||A.clearRect(H,qa,Wj,de),2==D&&A.drawImage(R.b(),h,h,n,n,H,qa,Wj,de),R=xk(g,xb,m,ma),D=Math.max(R.a,w.a),qa=Math.min(R.d,w.d),H=Math.max(R.b,w.b),R=Math.min(R.c,w.c);D<=qa;++D)for(de=H;de<=R;++de)xb=(de-w.b)*x+(D-w.a),this.g[xb]=
void 0;Ik(a.usedTiles,f,m,z);Lk(a,f,g,b,d,s,m,e.b());Fk(a,f);Hk(a,f);Pk(this.q,b*a.size[0]/2,b*a.size[1]/2,b*q/c.resolution,b*q/c.resolution,c.rotation,(Vb[0]-r[0])/q,(r[1]-Vb[1])/q)};var ul=["Polygon","LineString","Image","Text"];function vl(a,b,c){this.X=a;this.u=b;this.e=0;this.resolution=c;this.U=this.r=null;this.c=[];this.coordinates=[];this.N=bd();this.a=[];this.L=[];this.d=lf();this.ba=bd();this.D={}}
function wl(a,b,c,d,e,f){var g=a.coordinates.length,h=a.Rc(),m=[b[c],b[c+1]],n=[NaN,NaN],p=!0,q,r,s;for(q=c+e;q<d;q+=e){n[0]=b[q];n[1]=b[q+1];s=h[1];var z=h[2],x=h[3],w=n[0],C=n[1],A=0;w<h[0]?A=A|16:w>z&&(A=A|4);C<s?A|=8:C>x&&(A|=2);0===A&&(A=1);s=A;s!==r?(p&&(a.coordinates[g++]=m[0],a.coordinates[g++]=m[1]),a.coordinates[g++]=n[0],a.coordinates[g++]=n[1],p=!1):1===s?(a.coordinates[g++]=n[0],a.coordinates[g++]=n[1],p=!1):p=!0;m[0]=n[0];m[1]=n[1];r=s}q===c+e&&(a.coordinates[g++]=m[0],a.coordinates[g++]=
m[1]);f&&(a.coordinates[g++]=b[c],a.coordinates[g++]=b[c+1]);return g}function xl(a,b,c){a.r=[0,b,0];a.c.push(a.r);a.D[a.c.length-1]=c.toString();a.U=[0,b,0];a.a.push(a.U)}
function yl(a,b,c,d,e,f,g,h){var m;Qk(d,a.N)?m=a.L:(m=Kf(a.coordinates,2,d,a.L),ed(a.N,d));d=0;for(var n=g.length,p=0,q,r=a.ba;d<n;){var s=g[d],z,x,w,C;switch(s[0]){case 0:u(F(f,a.D[d]))?d=s[2]:++d;break;case 1:b.beginPath();++d;break;case 2:q=m[p];var A=m[p+1],D=m[p+2]-q,s=m[p+3]-A;b.arc(q,A,Math.sqrt(D*D+s*s),0,2*Math.PI,!0);p+=4;++d;break;case 3:b.closePath();++d;break;case 4:p=s[1];q=s[2];z=s[3];w=s[4]*c;var H=s[5]*c,P=s[6]*c;x=s[7];var A=s[9],D=s[10],J=s[11],U=s[12]*c;for(s[8]&&(A+=e);p<q;p+=
2){s=m[p]-w;C=m[p+1]-H;J&&(s=s+0.5|0,C=C+0.5|0);if(1!=D||0!==A){var X=s+w,ma=C+H;Pk(r,X,ma,D,D,A,-X,-ma);b.setTransform(r[0],r[1],r[4],r[5],r[12],r[13])}X=b.globalAlpha;1!=x&&(b.globalAlpha=X*x);b.drawImage(z,s,C,U,P);1!=x&&(b.globalAlpha=X);1==D&&0===A||b.setTransform(1,0,0,1,0,0)}++d;break;case 5:p=s[1];q=s[2];w=s[3];H=s[4]*c;P=s[5]*c;A=s[6];D=s[7]*c;z=s[8];for(x=s[9];p<q;p+=2){s=m[p]+H;C=m[p+1]+P;if(1!=D||0!==A)Pk(r,s,C,D,D,A,-s,-C),b.setTransform(r[0],r[1],r[4],r[5],r[12],r[13]);x&&b.strokeText(w,
s,C);z&&b.fillText(w,s,C);1==D&&0===A||b.setTransform(1,0,0,1,0,0)}++d;break;case 6:if(u(h)&&(q=s[1],q=h(q,s[2])))return q;++d;break;case 7:b.fill();++d;break;case 8:p=s[1];q=s[2];b.moveTo(m[p],m[p+1]);for(p+=2;p<q;p+=2)b.lineTo(m[p],m[p+1]);++d;break;case 9:b.fillStyle=s[1];++d;break;case 10:b.strokeStyle=s[1];b.lineWidth=s[2]*c;b.lineCap=s[3];b.lineJoin=s[4];b.miterLimit=s[5];G.Wb&&b.setLineDash(s[6]);++d;break;case 11:b.font=s[1];b.textAlign=s[2];b.textBaseline=s[3];++d;break;case 12:b.stroke();
++d;break;default:++d}}}function zl(a){var b=a.a;b.reverse();var c,d=b.length,e,f,g=-1;for(c=0;c<d;++c)if(e=b[c],f=e[0],6==f)g=c;else if(0==f){e[2]=c;e=a.a;for(f=c;g<f;){var h=e[g];e[g]=e[f];e[f]=h;++g;--f}g=-1}}function Al(a,b,c){a.r[2]=a.c.length;a.r=null;a.U[2]=a.a.length;a.U=null;b=[6,b,c];a.c.push(b);a.a.push(b)}vl.prototype.rc=ea;vl.prototype.Rc=k("u");vl.prototype.p=k("d");
function Bl(a,b,c){vl.call(this,a,b,c);this.g=this.q=null;this.O=this.o=this.l=this.n=this.k=this.j=this.i=this.f=this.b=void 0}B(Bl,vl);Bl.prototype.Kb=function(a,b){if(null!==this.g){uf(this.d,a.p());xl(this,a,v(b));var c=a.h,d=this.coordinates.length,c=wl(this,c,0,c.length,a.a,!1);this.c.push([4,d,c,this.g,this.b,this.f,this.i,this.j,this.k,this.n,this.l,this.o,this.O]);this.a.push([4,d,c,this.q,this.b,this.f,this.i,this.j,this.k,this.n,this.l,this.o,this.O]);Al(this,a,b)}};
Bl.prototype.Jb=function(a,b){if(null!==this.g){uf(this.d,a.p());xl(this,a,v(b));var c=a.h,d=this.coordinates.length,c=wl(this,c,0,c.length,a.a,!1);this.c.push([4,d,c,this.g,this.b,this.f,this.i,this.j,this.k,this.n,this.l,this.o,this.O]);this.a.push([4,d,c,this.q,this.b,this.f,this.i,this.j,this.k,this.n,this.l,this.o,this.O]);Al(this,a,b)}};Bl.prototype.rc=function(){zl(this);this.f=this.b=void 0;this.g=this.q=null;this.O=this.o=this.n=this.k=this.j=this.l=this.i=void 0};
Bl.prototype.xb=function(a){var b=a.Lb(),c=a.sb(),d=a.ge(1),e=a.Rb(1);this.b=b[0];this.f=b[1];this.q=d;this.g=e;this.i=c[1];this.j=a.j;this.k=a.k;this.n=a.e;this.l=a.f;this.o=a.n;this.O=c[0]};function Cl(a,b,c){vl.call(this,a,b,c);this.b={Db:void 0,yb:void 0,zb:null,Ab:void 0,Bb:void 0,Cb:void 0,Xc:0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}B(Cl,vl);
function Dl(a,b,c,d,e){var f=a.coordinates.length;b=wl(a,b,c,d,e,!1);f=[8,f,b];a.c.push(f);a.a.push(f);return d}l=Cl.prototype;l.Rc=function(){var a=this.u;this.e&&(a=of(a,this.resolution*(this.e+1)/2));return a};
function El(a){var b=a.b,c=b.strokeStyle,d=b.lineCap,e=b.lineDash,f=b.lineJoin,g=b.lineWidth,h=b.miterLimit;b.Db==c&&b.yb==d&&Za(b.zb,e)&&b.Ab==f&&b.Bb==g&&b.Cb==h||(b.Xc!=a.coordinates.length&&(a.c.push([12]),b.Xc=a.coordinates.length),a.c.push([10,c,g,d,f,h,e],[1]),b.Db=c,b.yb=d,b.zb=e,b.Ab=f,b.Bb=g,b.Cb=h)}
l.Hb=function(a,b){var c=this.b,d=c.lineWidth;u(c.strokeStyle)&&u(d)&&(uf(this.d,a.p()),El(this),xl(this,a,v(b)),this.a.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash],[1]),c=a.h,Dl(this,c,0,c.length,a.a),this.a.push([12]),Al(this,a,b))};
l.Ib=function(a,b){var c=this.b,d=c.lineWidth;if(u(c.strokeStyle)&&u(d)){uf(this.d,a.p());El(this);xl(this,a,v(b));this.a.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash],[1]);var c=a.d,d=a.h,e=a.a,f=0,g,h;g=0;for(h=c.length;g<h;++g)f=Dl(this,d,f,c[g],e);this.a.push([12]);Al(this,a,b)}};l.rc=function(){this.b.Xc!=this.coordinates.length&&this.c.push([12]);zl(this);this.b=null};
l.ma=function(a,b){var c=b.a;this.b.strokeStyle=Ie(null===c?Oe:c);c=b.b;this.b.lineCap=u(c)?c:"round";c=b.d;this.b.lineDash=null===c?Ne:c;c=b.e;this.b.lineJoin=u(c)?c:"round";c=b.c;this.b.lineWidth=u(c)?c:1;c=b.f;this.b.miterLimit=u(c)?c:10;this.e=Math.max(this.e,this.b.lineWidth)};
function Fl(a,b,c){vl.call(this,a,b,c);this.b={Gd:void 0,Db:void 0,yb:void 0,zb:null,Ab:void 0,Bb:void 0,Cb:void 0,fillStyle:void 0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}B(Fl,vl);
function Gl(a,b,c,d,e){var f=a.b,g=[1];a.c.push(g);a.a.push(g);var h,g=0;for(h=d.length;g<h;++g){var m=d[g],n=a.coordinates.length;c=wl(a,b,c,m,e,!0);c=[8,n,c];n=[3];a.c.push(c,n);a.a.push(c,n);c=m}b=[7];a.a.push(b);u(f.fillStyle)&&a.c.push(b);u(f.strokeStyle)&&(f=[12],a.c.push(f),a.a.push(f));return c}l=Fl.prototype;
l.Gb=function(a,b){var c=this.b,d=c.strokeStyle;if(u(c.fillStyle)||u(d)){uf(this.d,a.p());Hl(this);xl(this,a,v(b));this.a.push([9,Ie(Me)]);u(c.strokeStyle)&&this.a.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash]);d=a.h;wl(this,d,0,d.length,a.a,!1);var d=[1],e=[2];this.c.push(d,e);this.a.push(d,e);Al(this,a,b);d=[7];this.a.push(d);u(c.fillStyle)&&this.c.push(d);u(c.strokeStyle)&&(c=[12],this.c.push(c),this.a.push(c))}};
l.ib=function(a,b){var c=this.b,d=c.strokeStyle;if(u(c.fillStyle)||u(d))uf(this.d,a.p()),Hl(this),xl(this,a,v(b)),this.a.push([9,Ie(Me)]),u(c.strokeStyle)&&this.a.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash]),c=a.d,d=rg(a),Gl(this,d,0,c,a.a),Al(this,a,b)};
l.ac=function(a,b){var c=this.b,d=c.strokeStyle;if(u(c.fillStyle)||u(d)){uf(this.d,a.p());Hl(this);xl(this,a,v(b));this.a.push([9,Ie(Me)]);u(c.strokeStyle)&&this.a.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash]);var c=a.d,d=Il(a),e=a.a,f=0,g,h;g=0;for(h=c.length;g<h;++g)f=Gl(this,d,f,c[g],e);Al(this,a,b)}};l.rc=function(){zl(this);this.b=null;var a=this.X;if(0!==a){var b=this.coordinates,c,d;c=0;for(d=b.length;c<d;++c)b[c]=a*Math.round(b[c]/a)}};
l.Rc=function(){var a=this.u;this.e&&(a=of(a,this.resolution*(this.e+1)/2));return a};
l.ma=function(a,b){var c=this.b;if(null===a)c.fillStyle=void 0;else{var d=a.a;c.fillStyle=Ie(null===d?Me:d)}null===b?(c.strokeStyle=void 0,c.lineCap=void 0,c.lineDash=null,c.lineJoin=void 0,c.lineWidth=void 0,c.miterLimit=void 0):(d=b.a,c.strokeStyle=Ie(null===d?Oe:d),d=b.b,c.lineCap=u(d)?d:"round",d=b.d,c.lineDash=null===d?Ne:d.slice(),d=b.e,c.lineJoin=u(d)?d:"round",d=b.c,c.lineWidth=u(d)?d:1,d=b.f,c.miterLimit=u(d)?d:10,this.e=Math.max(this.e,c.lineWidth))};
function Hl(a){var b=a.b,c=b.fillStyle,d=b.strokeStyle,e=b.lineCap,f=b.lineDash,g=b.lineJoin,h=b.lineWidth,m=b.miterLimit;u(c)&&b.Gd!=c&&(a.c.push([9,c]),b.Gd=b.fillStyle);!u(d)||b.Db==d&&b.yb==e&&b.zb==f&&b.Ab==g&&b.Bb==h&&b.Cb==m||(a.c.push([10,d,h,e,g,m,f]),b.Db=d,b.yb=e,b.zb=f,b.Ab=g,b.Bb=h,b.Cb=m)}function Jl(a,b,c){vl.call(this,a,b,c);this.q=this.O=this.o=null;this.g="";this.l=this.n=this.k=this.j=0;this.i=this.f=this.b=null}B(Jl,vl);
Jl.prototype.Fa=function(a,b,c,d,e,f){if(""!==this.g&&null!==this.i&&(null!==this.b||null!==this.f)){vf(this.d,a,b,c,d);if(null!==this.b){var g=this.b,h=this.o;if(null===h||h.fillStyle!=g.fillStyle){var m=[9,g.fillStyle];this.c.push(m);this.a.push(m);null===h?this.o={fillStyle:g.fillStyle}:h.fillStyle=g.fillStyle}}null!==this.f&&(g=this.f,h=this.O,null===h||h.lineCap!=g.lineCap||h.lineDash!=g.lineDash||h.lineJoin!=g.lineJoin||h.lineWidth!=g.lineWidth||h.miterLimit!=g.miterLimit||h.strokeStyle!=g.strokeStyle)&&
(m=[10,g.strokeStyle,g.lineWidth,g.lineCap,g.lineJoin,g.miterLimit,g.lineDash],this.c.push(m),this.a.push(m),null===h?this.O={lineCap:g.lineCap,lineDash:g.lineDash,lineJoin:g.lineJoin,lineWidth:g.lineWidth,miterLimit:g.miterLimit,strokeStyle:g.strokeStyle}:(h.lineCap=g.lineCap,h.lineDash=g.lineDash,h.lineJoin=g.lineJoin,h.lineWidth=g.lineWidth,h.miterLimit=g.miterLimit,h.strokeStyle=g.strokeStyle));g=this.i;h=this.q;if(null===h||h.font!=g.font||h.textAlign!=g.textAlign||h.textBaseline!=g.textBaseline)m=
[11,g.font,g.textAlign,g.textBaseline],this.c.push(m),this.a.push(m),null===h?this.q={font:g.font,textAlign:g.textAlign,textBaseline:g.textBaseline}:(h.font=g.font,h.textAlign=g.textAlign,h.textBaseline=g.textBaseline);xl(this,e,v(f));g=this.coordinates.length;a=wl(this,a,b,c,d,!1);a=[5,g,a,this.g,this.j,this.k,this.n,this.l,null!==this.b,null!==this.f];this.c.push(a);this.a.push(a);Al(this,e,f)}};
Jl.prototype.$=function(a){if(null===a)this.g="";else{var b=a.c;null===b?this.b=null:(b=b.a,b=Ie(null===b?Me:b),null===this.b?this.b={fillStyle:b}:this.b.fillStyle=b);var c=a.e;if(null===c)this.f=null;else{var b=c.a,d=c.b,e=c.d,f=c.e,g=c.c,c=c.f,d=u(d)?d:"round",e=null!=e?e.slice():Ne,f=u(f)?f:"round",g=u(g)?g:1,c=u(c)?c:10,b=Ie(null===b?Oe:b);if(null===this.f)this.f={lineCap:d,lineDash:e,lineJoin:f,lineWidth:g,miterLimit:c,strokeStyle:b};else{var h=this.f;h.lineCap=d;h.lineDash=e;h.lineJoin=f;h.lineWidth=
g;h.miterLimit=c;h.strokeStyle=b}}var m=a.a,b=a.j,d=a.k,e=a.b,g=a.d,c=a.f,f=a.i,h=a.g;a=u(m)?m:"10px sans-serif";f=u(f)?f:"center";h=u(h)?h:"middle";null===this.i?this.i={font:a,textAlign:f,textBaseline:h}:(m=this.i,m.font=a,m.textAlign=f,m.textBaseline=h);this.g=u(c)?c:"";this.j=u(b)?b:0;this.k=u(d)?d:0;this.n=u(e)?e:0;this.l=u(g)?g:1}};function Kl(a,b,c){this.f=a;this.c=b;this.e=c;this.a={};this.b=kd(1,1);this.d=bd()}
function Ll(a,b,c,d,e,f,g){var h=Na($b(a.a),Number);Xa(h);a:{var m=a.c,n=m[0],p=m[1],q=m[2],m=m[3],n=Kf([n,p,n,m,q,m,q,p],2,e);b.save();b.beginPath();b.moveTo(n[0],n[1]);b.lineTo(n[2],n[3]);b.lineTo(n[4],n[5]);b.lineTo(n[6],n[7]);b.closePath();b.clip();for(var r,s,n=0,p=h.length;n<p;++n)for(r=a.a[h[n].toString()],q=0,m=ul.length;q<m;++q)if(s=r[ul[q]],u(s)&&Cf(c,s.p())&&(s=yl(s,b,d,e,f,g,s.c,void 0)))break a;b.restore()}}
function Ml(a,b,c,d,e,f,g,h){var m,n,p,q,r;m=0;for(n=b.length;m<n;++m)for(q in p=a.a[b[m].toString()],p)if(r=p[q],Cf(d,r.p())&&(r=yl(r,c,1,e,f,g,r.a,h)))return r}function Nl(a,b,c,d,e,f,g){var h=a.d;Pk(h,0.5,0.5,1/c,-1/c,-d,-e[0],-e[1]);c=Na($b(a.a),Number);Xa(c,function(a,b){return b-a});var m=a.b;m.clearRect(0,0,1,1);return Ml(a,c,m,b,h,d,f,function(a,b){if(0<m.getImageData(0,0,1,1).data[3]){var c=g(a,b);if(c)return c;m.clearRect(0,0,1,1)}})}
function Ol(a){for(var b in a.a){var c=a.a[b],d;for(d in c)c[d].rc()}}function Pl(a,b,c){var d=u(b)?b.toString():"0";b=a.a[d];u(b)||(b={},a.a[d]=b);d=b[c];u(d)||(d=new Ql[c](a.f,a.c,a.e),b[c]=d);return d}Kl.prototype.V=function(){return ac(this.a)};var Ql={Image:Bl,LineString:Cl,Polygon:Fl,Text:Jl};function Rl(a,b,c){Lf.call(this);this.re(a,u(b)?b:0,c)}B(Rl,Lf);l=Rl.prototype;l.I=function(){var a=new Rl(null),b=this.h.slice();Nf(a,this.b,b);a.s();return a};l.ea=function(a,b,c,d){var e=this.h;a-=e[0];var f=b-e[1];b=a*a+f*f;if(b<d){if(0===b)for(d=0;d<this.a;++d)c[d]=e[d];else for(d=this.be()/Math.sqrt(b),c[0]=e[0]+d*a,c[1]=e[1]+d*f,d=2;d<this.a;++d)c[d]=e[d];c.length=this.a;return b}return d};l.Ra=function(a,b){var c=this.h,d=a-c[0],c=b-c[1];return d*d+c*c<=Sl(this)};
l.bd=function(){return this.h.slice(0,this.a)};l.p=function(a){if(this.e!=this.c){var b=this.h,c=b[this.a]-b[0];this.extent=nf(b[0]-c,b[1]-c,b[0]+c,b[1]+c,this.extent);this.e=this.c}return Ef(this.extent,a)};l.be=function(){return Math.sqrt(Sl(this))};function Sl(a){var b=a.h[a.a]-a.h[0];a=a.h[a.a+1]-a.h[1];return b*b+a*a}l.Wa=function(){return this};l.A=ca("Circle");l.Kg=function(a){var b=this.a,c=this.h[b]-this.h[0],d=a.slice();d[b]=d[0]+c;for(c=1;c<b;++c)d[b+c]=a[c];Nf(this,this.b,d);this.s()};
l.re=function(a,b,c){if(null===a)Nf(this,"XY",null);else{Of(this,c,a,0);null===this.h&&(this.h=[]);c=this.h;a=Yf(c,a);c[a++]=c[0]+b;var d;b=1;for(d=this.a;b<d;++b)c[a++]=c[b];c.length=a}this.s()};l.bi=function(a){this.h[this.a]=this.h[0]+a;this.s()};function Tl(a){De.call(this);this.a=u(a)?a:null;Ul(this)}B(Tl,De);function Vl(a){var b=[],c,d;c=0;for(d=a.length;c<d;++c)b.push(a[c].I());return b}function Wl(a){var b,c;if(null!==a.a)for(b=0,c=a.a.length;b<c;++b)Yd(a.a[b],"change",a.s,!1,a)}function Ul(a){var b,c;if(null!==a.a)for(b=0,c=a.a.length;b<c;++b)I(a.a[b],"change",a.s,!1,a)}l=Tl.prototype;l.I=function(){var a=new Tl(null);a.te(this.a);return a};
l.ea=function(a,b,c,d){if(d<qf(this.p(),a,b))return d;var e=this.a,f,g;f=0;for(g=e.length;f<g;++f)d=e[f].ea(a,b,c,d);return d};l.Ra=function(a,b){var c=this.a,d,e;d=0;for(e=c.length;d<e;++d)if(c[d].Ra(a,b))return!0;return!1};l.p=function(a){if(this.e!=this.c){var b=sf(this.extent),c=this.a,d,e;d=0;for(e=c.length;d<e;++d)uf(b,c[d].p());this.extent=b;this.e=this.c}return Ef(this.extent,a)};l.ff=function(){return Vl(this.a)};
l.Wa=function(a){this.j!=this.c&&(bc(this.f),this.i=0,this.j=this.c);if(0>a||0!==this.i&&a<this.i)return this;var b=a.toString();if(this.f.hasOwnProperty(b))return this.f[b];var c=[],d=this.a,e=!1,f,g;f=0;for(g=d.length;f<g;++f){var h=d[f],m=h.Wa(a);c.push(m);m!==h&&(e=!0)}if(e)return a=new Tl(null),Wl(a),a.a=c,Ul(a),a.s(),this.f[b]=a;this.i=a;return this};l.A=ca("GeometryCollection");l.V=function(){return 0==this.a.length};l.te=function(a){a=Vl(a);Wl(this);this.a=a;Ul(this);this.s()};
l.transform=function(a){var b=this.a,c,d;c=0;for(d=b.length;c<d;++c)b[c].transform(a);this.s()};l.w=function(){Wl(this);Tl.B.w.call(this)};function Xl(a,b,c,d,e){var f=NaN,g=NaN,h=(c-b)/d;if(0!==h)if(1==h)f=a[b],g=a[b+1];else if(2==h)f=0.5*a[b]+0.5*a[b+d],g=0.5*a[b+1]+0.5*a[b+d+1];else{var g=a[b],h=a[b+1],m=0,f=[0],n;for(n=b+d;n<c;n+=d){var p=a[n],q=a[n+1],m=m+Math.sqrt((p-g)*(p-g)+(q-h)*(q-h));f.push(m);g=p;h=q}c=0.5*m;for(var r,g=Ya,h=0,m=f.length;h<m;)n=h+m>>1,p=g(c,f[n]),0<p?h=n+1:(m=n,r=!p);r=r?h:~h;0>r?(c=(c-f[-r-2])/(f[-r-1]-f[-r-2]),b+=(-r-2)*d,f=a[b]+c*(a[b+d]-a[b]),g=a[b+1]+c*(a[b+d+1]-a[b+1])):(f=a[b+r*d],g=a[b+r*d+1])}return null!=
e?(e.push(f,g),e):[f,g]}function Yl(a,b,c,d,e,f){if(c==b)return null;if(e<a[b+d-1])return f?(c=a.slice(b,b+d),c[d-1]=e,c):null;if(a[c-1]<e)return f?(c=a.slice(c-d,c),c[d-1]=e,c):null;if(e==a[b+d-1])return a.slice(b,b+d);b/=d;for(c/=d;b<c;)f=b+c>>1,e<a[(f+1)*d-1]?c=f:b=f+1;c=a[b*d-1];if(e==c)return a.slice((b-1)*d,(b-1)*d+d);f=(e-c)/(a[(b+1)*d-1]-c);c=[];var g;for(g=0;g<d-1;++g)c.push(a[(b-1)*d+g]+f*(a[b*d+g]-a[(b-1)*d+g]));c.push(e);return c}
function Zl(a,b,c,d,e,f){var g=0;if(f)return Yl(a,g,b[b.length-1],c,d,e);if(d<a[c-1])return e?(a=a.slice(0,c),a[c-1]=d,a):null;if(a[a.length-1]<d)return e?(a=a.slice(a.length-c),a[c-1]=d,a):null;e=0;for(f=b.length;e<f;++e){var h=b[e];if(g!=h){if(d<a[g+c-1])break;else if(d<=a[h-1])return Yl(a,g,h,c,d,!1);g=h}}return null};function $l(a,b){Lf.call(this);this.d=null;this.k=this.n=this.g=-1;this.H(a,b)}B($l,Lf);l=$l.prototype;l.Ne=function(a){null===this.h?this.h=a.slice():If(this.h,a);this.s()};l.I=function(){var a=new $l(null);am(a,this.b,this.h.slice());return a};l.ea=function(a,b,c,d){if(d<qf(this.p(),a,b))return d;this.k!=this.c&&(this.n=Math.sqrt(Uf(this.h,0,this.h.length,this.a,0)),this.k=this.c);return Wf(this.h,0,this.h.length,this.a,this.n,!1,a,b,c,d)};
l.Lg=function(a,b){return"XYM"!=this.b&&"XYZM"!=this.b?null:Yl(this.h,0,this.h.length,this.a,a,u(b)?b:!1)};l.v=function(){return ag(this.h,0,this.h.length,this.a)};l.Mg=function(){var a=this.h,b=this.a,c=a[0],d=a[1],e=0,f;for(f=0+b;f<this.h.length;f+=b)var g=a[f],h=a[f+1],e=e+Math.sqrt((g-c)*(g-c)+(h-d)*(h-d)),c=g,d=h;return e};function hl(a){a.g!=a.c&&(a.d=Xl(a.h,0,a.h.length,a.a,a.d),a.g=a.c);return a.d}
l.lb=function(a){var b=[];b.length=cg(this.h,0,this.h.length,this.a,a,b,0);a=new $l(null);am(a,"XY",b);return a};l.A=ca("LineString");l.H=function(a,b){null===a?am(this,"XY",null):(Of(this,b,a,1),null===this.h&&(this.h=[]),this.h.length=Zf(this.h,0,a,this.a),this.s())};function am(a,b,c){Nf(a,b,c);a.s()};function bm(a,b){Lf.call(this);this.d=[];this.g=this.k=-1;this.H(a,b)}B(bm,Lf);l=bm.prototype;l.Oe=function(a){null===this.h?this.h=a.h.slice():If(this.h,a.h.slice());this.d.push(this.h.length);this.s()};l.I=function(){var a=new bm(null);cm(a,this.b,this.h.slice(),this.d.slice());return a};l.ea=function(a,b,c,d){if(d<qf(this.p(),a,b))return d;this.g!=this.c&&(this.k=Math.sqrt(Vf(this.h,0,this.d,this.a,0)),this.g=this.c);return Xf(this.h,0,this.d,this.a,this.k,!1,a,b,c,d)};
l.Og=function(a,b,c){return"XYM"!=this.b&&"XYZM"!=this.b||0===this.h.length?null:Zl(this.h,this.d,this.a,a,u(b)?b:!1,u(c)?c:!1)};l.v=function(){return bg(this.h,0,this.d,this.a)};l.qf=function(a){if(0>a||this.d.length<=a)return null;var b=new $l(null);am(b,this.b,this.h.slice(0===a?0:this.d[a-1],this.d[a]));return b};l.Tc=function(){var a=this.h,b=this.d,c=this.b,d=[],e=0,f,g;f=0;for(g=b.length;f<g;++f){var h=b[f],m=new $l(null);am(m,c,a.slice(e,h));d.push(m);e=h}return d};
function il(a){var b=[],c=a.h,d=0,e=a.d;a=a.a;var f,g;f=0;for(g=e.length;f<g;++f){var h=e[f],d=Xl(c,d,h,a);If(b,d);d=h}return b}l.lb=function(a){var b=[],c=[],d=this.h,e=this.d,f=this.a,g=0,h=0,m,n;m=0;for(n=e.length;m<n;++m){var p=e[m],h=cg(d,g,p,f,a,b,h);c.push(h);g=p}b.length=h;a=new bm(null);cm(a,"XY",b,c);return a};l.A=ca("MultiLineString");
l.H=function(a,b){if(null===a)cm(this,"XY",null,this.d);else{Of(this,b,a,2);null===this.h&&(this.h=[]);var c=$f(this.h,0,a,this.a,this.d);this.h.length=0===c.length?0:c[c.length-1];this.s()}};function cm(a,b,c,d){Nf(a,b,c);a.d=d;a.s()}function dm(a,b){var c="XY",d=[],e=[],f,g;f=0;for(g=b.length;f<g;++f){var h=b[f];0===f&&(c=h.b);If(d,h.h);e.push(d.length)}cm(a,c,d,e)};function em(a,b){Lf.call(this);this.H(a,b)}B(em,Lf);l=em.prototype;l.Qe=function(a){null===this.h?this.h=a.h.slice():If(this.h,a.h);this.s()};l.I=function(){var a=new em(null),b=this.h.slice();Nf(a,this.b,b);a.s();return a};l.ea=function(a,b,c,d){if(d<qf(this.p(),a,b))return d;var e=this.h,f=this.a,g,h,m;g=0;for(h=e.length;g<h;g+=f)if(m=Sf(a,b,e[g],e[g+1]),m<d){d=m;for(m=0;m<f;++m)c[m]=e[g+m];c.length=f}return d};l.v=function(){return ag(this.h,0,this.h.length,this.a)};
l.vf=function(a){var b=null===this.h?0:this.h.length/this.a;if(0>a||b<=a)return null;b=new hg(null);ig(b,this.b,this.h.slice(a*this.a,(a+1)*this.a));return b};l.Od=function(){var a=this.h,b=this.b,c=this.a,d=[],e,f;e=0;for(f=a.length;e<f;e+=c){var g=new hg(null);ig(g,b,a.slice(e,e+c));d.push(g)}return d};l.A=ca("MultiPoint");l.H=function(a,b){null===a?Nf(this,"XY",null):(Of(this,b,a,1),null===this.h&&(this.h=[]),this.h.length=Zf(this.h,0,a,this.a));this.s()};function fm(a,b){Lf.call(this);this.d=[];this.k=-1;this.n=null;this.r=this.l=this.o=-1;this.g=null;this.H(a,b)}B(fm,Lf);l=fm.prototype;l.Re=function(a){if(null===this.h)this.h=a.h.slice(),a=a.d.slice(),this.d.push();else{var b=this.h.length;If(this.h,a.h);a=a.d.slice();var c,d;c=0;for(d=a.length;c<d;++c)a[c]+=b}this.d.push(a);this.s()};l.I=function(){var a=new fm(null);gm(a,this.b,this.h.slice(),this.d.slice());return a};
l.ea=function(a,b,c,d){if(d<qf(this.p(),a,b))return d;if(this.l!=this.c){var e=this.d,f=0,g=0,h,m;h=0;for(m=e.length;h<m;++h)var n=e[h],g=Vf(this.h,f,n,this.a,g),f=n[n.length-1];this.o=Math.sqrt(g);this.l=this.c}e=Il(this);f=this.d;g=this.a;h=this.o;m=0;var n=u(void 0)?void 0:[NaN,NaN],p,q;p=0;for(q=f.length;p<q;++p){var r=f[p];d=Xf(e,m,r,g,h,!0,a,b,c,d,n);m=r[r.length-1]}return d};
l.Ra=function(a,b){var c;a:{c=Il(this);var d=this.d,e=0;if(0!==d.length){var f,g;f=0;for(g=d.length;f<g;++f){var h=d[f];if(kg(c,e,h,this.a,a,b)){c=!0;break a}e=h[h.length-1]}}c=!1}return c};l.Pg=function(){var a=Il(this),b=this.d,c=0,d=0,e,f;e=0;for(f=b.length;e<f;++e)var g=b[e],d=d+Rf(a,c,g,this.a),c=g[g.length-1];return d};l.v=function(){var a=this.h,b=this.d,c=this.a,d=0,e=u(void 0)?void 0:[],f=0,g,h;g=0;for(h=b.length;g<h;++g){var m=b[g];e[f++]=bg(a,d,m,c,e[f]);d=m[m.length-1]}e.length=f;return e};
function jl(a){if(a.k!=a.c){var b=a.h,c=a.d,d=a.a,e=0,f=[],g,h,m=lf();g=0;for(h=c.length;g<h;++g){var n=c[g],m=b,p=n[0],q=d,r=sf(void 0),m=vf(r,m,e,p,q);f.push((m[0]+m[2])/2,(m[1]+m[3])/2);e=n[n.length-1]}b=Il(a);c=a.d;d=a.a;g=0;h=[];n=0;for(m=c.length;n<m;++n)e=c[n],h=lg(b,g,e,d,f,2*n,h),g=e[e.length-1];a.n=h;a.k=a.c}return a.n}l.lf=function(){var a=new em(null),b=jl(this).slice();Nf(a,"XY",b);a.s();return a};
function Il(a){if(a.r!=a.c){var b=a.h,c;a:{c=a.d;var d,e;d=0;for(e=c.length;d<e;++d)if(!ng(b,c[d],a.a)){c=!1;break a}c=!0}if(c)a.g=b;else{a.g=b.slice();c=b=a.g;d=a.d;e=a.a;var f=0,g,h;g=0;for(h=d.length;g<h;++g)f=og(c,f,d[g],e);b.length=f}a.r=a.c}return a.g}l.lb=function(a){var b=[],c=[],d=this.h,e=this.d,f=this.a;a=Math.sqrt(a);var g=0,h=0,m,n;m=0;for(n=e.length;m<n;++m){var p=e[m],q=[],h=dg(d,g,p,f,a,b,h,q);c.push(q);g=p[p.length-1]}b.length=h;d=new fm(null);gm(d,"XY",b,c);return d};
l.wf=function(a){if(0>a||this.d.length<=a)return null;var b;0===a?b=0:(b=this.d[a-1],b=b[b.length-1]);a=this.d[a].slice();var c=a[a.length-1];if(0!==b){var d,e;d=0;for(e=a.length;d<e;++d)a[d]-=b}d=new pg(null);qg(d,this.b,this.h.slice(b,c),a);return d};l.Pd=function(){var a=this.b,b=this.h,c=this.d,d=[],e=0,f,g,h,m;f=0;for(g=c.length;f<g;++f){var n=c[f].slice(),p=n[n.length-1];if(0!==e)for(h=0,m=n.length;h<m;++h)n[h]-=e;h=new pg(null);qg(h,a,b.slice(e,p),n);d.push(h);e=p}return d};l.A=ca("MultiPolygon");
l.H=function(a,b){if(null===a)gm(this,"XY",null,this.d);else{Of(this,b,a,3);null===this.h&&(this.h=[]);var c=this.h,d=this.a,e=this.d,f=0,e=u(e)?e:[],g=0,h,m;h=0;for(m=a.length;h<m;++h)f=$f(c,f,a[h],d,e[g]),e[g++]=f,f=f[f.length-1];e.length=g;c=e[e.length-1];this.h.length=0===c.length?0:c[c.length-1];this.s()}};function gm(a,b,c,d){Nf(a,b,c);a.d=d;a.s()}
function hm(a,b){var c="XY",d=[],e=[],f,g,h;f=0;for(g=b.length;f<g;++f){var m=b[f];0===f&&(c=m.b);var n=d.length;h=m.d;var p,q;p=0;for(q=h.length;p<q;++p)h[p]+=n;If(d,m.h);e.push(h)}gm(a,c,d,e)};function im(a,b){return v(a)-v(b)}function jm(a,b,c,d,e,f,g){var h=!1,m,n;m=c.e;null===m?km(a,b,c,d,e):(n=m.he(),2==n||3==n?(m.ye(f,g),2==n&&km(a,b,c,d,e)):(0==n&&m.ie(),m.Vd(f,g),h=!0));return h}function km(a,b,c,d,e){b=b.J();null!==b&&(d=b.Wa(d),(0,lm[d.A()])(a,d,c,e))}
var lm={Point:function(a,b,c,d){var e=c.e;if(null!==e){var f=Pl(a,c.a,"Image");f.xb(e);f.Kb(b,d)}e=c.c;null!==e&&(a=Pl(a,c.a,"Text"),a.$(e),a.Fa(b.v(),0,2,2,b,d))},LineString:function(a,b,c,d){var e=c.b;if(null!==e){var f=Pl(a,c.a,"LineString");f.ma(null,e);f.Hb(b,d)}e=c.c;null!==e&&(a=Pl(a,c.a,"Text"),a.$(e),a.Fa(hl(b),0,2,2,b,d))},Polygon:function(a,b,c,d){var e=c.d,f=c.b;if(null!==e||null!==f){var g=Pl(a,c.a,"Polygon");g.ma(e,f);g.ib(b,d)}e=c.c;null!==e&&(a=Pl(a,c.a,"Text"),a.$(e),a.Fa(sg(b),0,
2,2,b,d))},MultiPoint:function(a,b,c,d){var e=c.e;if(null!==e){var f=Pl(a,c.a,"Image");f.xb(e);f.Jb(b,d)}e=c.c;null!==e&&(a=Pl(a,c.a,"Text"),a.$(e),c=b.h,a.Fa(c,0,c.length,b.a,b,d))},MultiLineString:function(a,b,c,d){var e=c.b;if(null!==e){var f=Pl(a,c.a,"LineString");f.ma(null,e);f.Ib(b,d)}e=c.c;null!==e&&(a=Pl(a,c.a,"Text"),a.$(e),c=il(b),a.Fa(c,0,c.length,2,b,d))},MultiPolygon:function(a,b,c,d){var e=c.d,f=c.b;if(null!==f||null!==e){var g=Pl(a,c.a,"Polygon");g.ma(e,f);g.ac(b,d)}e=c.c;null!==e&&
(a=Pl(a,c.a,"Text"),a.$(e),c=jl(b),a.Fa(c,0,c.length,2,b,d))},GeometryCollection:function(a,b,c,d){b=b.a;var e,f;e=0;for(f=b.length;e<f;++e)(0,lm[b[e].A()])(a,b[e],c,d)},Circle:function(a,b,c,d){var e=c.d,f=c.b;if(null!==e||null!==f){var g=Pl(a,c.a,"Polygon");g.ma(e,f);g.Gb(b,d)}e=c.c;null!==e&&(a=Pl(a,c.a,"Text"),a.$(e),a.Fa(b.bd(),0,2,2,b,d))}};function mm(a,b,c,d){this.extent=a;this.height=b;this.a=c;this.value=d}function nm(a,b){return a.extent[0]-b.extent[0]}function om(a,b){return a.extent[1]-b.extent[1]}function pm(a,b,c,d){a=a.a;for(d=sf(d);b<c;++b)uf(d,a[b].extent);return d}mm.prototype.remove=function(a,b,c){var d=this.a,e=d.length,f,g;if(1==this.height)for(g=0;g<e;++g){if(f=d[g],f.value===b)return Ka.splice.call(d,g,1),!0}else for(g=0;g<e;++g)if(f=d[g],rf(f.extent,a)){c.push(f);if(f.remove(a,b,c))return!0;c.pop()}return!1};
function qm(a){var b=sf(a.extent);a=a.a;var c,d;c=0;for(d=a.length;c<d;++c)uf(b,a[c].extent)}function rm(a){this.b=Math.max(4,u(a)?a:9);this.d=Math.max(2,Math.ceil(0.4*this.b));this.a=new mm(lf(),1,[],null);this.c={}}function sm(a,b,c){var d=b.a;a=a.d;var e=d.length;Xa(d,c);c=pm(b,0,a);var f=pm(b,e-a,e),g=Bf(c)+zf(c)+(Bf(f)+zf(f));for(b=a;b<e-a;++b)uf(c,d[b].extent),g+=Bf(c)+zf(c);for(b=e-a-1;b>=a;--b)uf(f,d[b].extent),g+=Bf(f)+zf(f);return g}l=rm.prototype;
l.clear=function(){var a=this.a;a.extent=sf(this.a.extent);a.height=1;a.a.length=0;a.value=null;bc(this.c)};l.forEach=function(a,b){return tm(this.a,a,b)};function tm(a,b,c){for(var d=[a],e,f,g;0<d.length;)if(a=d.pop(),e=a.a,1==a.height)for(a=0,f=e.length;a<f;++a){if(g=b.call(c,e[a].value))return g}else d.push.apply(d,e)}function um(a,b,c){vm(a,b,c,void 0)}
function vm(a,b,c,d){a=[a.a];for(var e;0<a.length;)if(e=a.pop(),Cf(b,e.extent))if(null===e.a){if(e=c.call(d,e.value))return e}else if(rf(b,e.extent)){if(e=tm(e,c,d))return e}else a.push.apply(a,e.a)}function wm(a){var b=[];a.forEach(function(a){b.push(a)});return b}function xm(a,b){var c=[];vm(a,b,function(a){c.push(a)},void 0);return c}l.p=function(a){return Ef(this.a.extent,a)};function ym(a,b,c){var d=v(c).toString();zm(a,b,c,a.a.height-1);a.c[d]=pf(b)}
function zm(a,b,c,d){for(var e=[a.a],f=a.a;null!==f.a&&e.length-1!=d;){var g=Infinity,h=Infinity,f=f.a,m=null,n,p;n=0;for(p=f.length;n<p;++n){var q=f[n],r=Bf(q.extent)*zf(q.extent),s=q.extent,z=b,x=Math.min(s[0],z[0]),w=Math.min(s[1],z[1]),C=Math.max(s[2],z[2]),s=Math.max(s[3],z[3]),x=(C-x)*(s-w)-r;x<h?(h=x,g=Math.min(r,g),m=q):x==h&&r<g&&(g=r,m=q)}f=m;e.push(f)}d=f;d.a.push(new mm(b,0,null,c));uf(d.extent,b);for(c=e.length-1;0<=c;--c)if(e[c].a.length>a.b){g=a;h=e;f=c;d=h[f];p=g;m=d;n=sm(p,m,nm);
p=sm(p,m,om);n<p&&Xa(m.a,nm);m=d;n=g.d;p=m.a.length;r=q=Infinity;x=lf();w=lf();C=0;s=void 0;for(s=n;s<=p-n;++s){var x=pm(m,0,s,x),w=pm(m,s,p,w),A=x,D=w,z=Math.max(A[0],D[0]),H=Math.max(A[1],D[1]),P=Math.min(A[2],D[2]),A=Math.min(A[3],D[3]),z=Math.max(0,P-z)*Math.max(0,A-H),H=Bf(x)*zf(x)+Bf(w)*zf(w);z<q?(q=z,r=Math.min(H,r),C=s):z==q&&H<r&&(r=H,C=s)}m=d.a.splice(C);m=new mm(lf(),d.height,m,null);qm(d);qm(m);f?h[f-1].a.push(m):(h=m,f=d.height+1,m=uf(d.extent.slice(),h.extent),g.a=new mm(m,f,[d,h],null))}else break;
for(;0<=c;--c)uf(e[c].extent,b)}l.V=function(){return 0===this.a.a.length};l.remove=function(a){var b=v(a).toString(),c=this.c[b];delete this.c[b];return Am(this,c,a)};function Am(a,b,c){var d=a.a,e=[d];if(b=d.remove(b,c,e))for(c=e.length-1;0<=c;--c)d=e[c],0===d.a.length?0<c?Ra(e[c-1].a,d):a.clear():qm(d);return b}l.update=function(a,b){var c=v(b).toString(),d=this.c[c];tf(d,a)||(Am(this,d,b),zm(this,a,b,this.a.height-1),this.c[c]=pf(a,d))};function Bm(a){a=u(a)?a:{};gk.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,state:a.state});this.a=new rm;this.b={};this.j={};u(a.features)&&this.da(a.features)}B(Bm,gk);l=Bm.prototype;l.de=function(a){Cm(this,a);this.s()};function Cm(a,b){var c=v(b).toString();a.j[c]=[I(b,"change",a.fe,!1,a),I(b,"propertychange",a.fe,!1,a)];c=b.J();null===c?a.b[v(b).toString()]=b:(c=c.p(),ym(a.a,c,b));L(a,new Dm("addfeature",b))}l.Je=function(a){this.da(a);this.s()};
l.da=function(a){var b,c;b=0;for(c=a.length;b<c;++b)Cm(this,a[b])};l.clear=function(){this.a.forEach(this.kd,this);this.a.clear();Wb(this.b,this.kd,this);bc(this.b);this.s()};l.Ye=function(a,b){return this.a.forEach(a,b)};function Em(a,b,c){a.Qc([b[0],b[1],b[0],b[1]],function(a){if(a.J().Ra(b[0],b[1]))return c.call(void 0,a)})}l.Qc=function(a,b,c){return vm(this.a,a,b,c)};l.cc=function(a,b,c,d){return this.Qc(a,c,d)};l.ee=function(){var a=wm(this.a);ac(this.b)||Ua(a,Zb(this.b));return a};
l.cf=function(a){var b=[];Em(this,a,function(a){b.push(a)});return b};l.af=function(a){var b=a[0],c=a[1],d=null,e=[NaN,NaN],f=Infinity,g=[-Infinity,-Infinity,Infinity,Infinity];vm(this.a,g,function(a){var m=a.J(),n=f;f=m.ea(b,c,e,f);f<n&&(d=a,a=Math.sqrt(f),g[0]=b-a,g[1]=c-a,g[2]=b+a,g[3]=c+a)},void 0);return d};l.p=function(){return this.a.p()};
l.fe=function(a){a=a.target;var b=v(a).toString(),c=a.J();null===c?b in this.b||(this.a.remove(a),this.b[b]=a):(c=c.p(),b in this.b?(delete this.b[b],ym(this.a,c,a)):this.a.update(c,a));this.s()};l.V=function(){return this.a.V()&&ac(this.b)};l.Yc=ea;l.dh=function(a){var b=v(a).toString();b in this.b?delete this.b[b]:this.a.remove(a);this.kd(a);this.s()};l.kd=function(a){var b=v(a).toString();Ma(this.j[b],K);delete this.j[b];L(this,new Dm("removefeature",a))};
function Dm(a,b){yd.call(this,a);this.feature=b}B(Dm,yd);function Fm(a,b){ll.call(this,a,b);this.b=!1;this.j=-1;this.g=NaN;this.r=lf();this.c=this.q=null;this.i=kd()}B(Fm,ll);
Fm.prototype.l=function(a,b,c){var d=nl(this,a);ml(this,"precompose",c,a,d);var e=this.c;if(null!==e&&!e.V()){var f;be(this.a.S,"render")?(this.i.canvas.width=c.canvas.width,this.i.canvas.height=c.canvas.height,f=this.i):f=c;f.globalAlpha=b.opacity;Ll(e,f,a.extent,a.pixelRatio,d,a.view2DState.rotation,a.skippedFeatureUids_);f!=c&&(ml(this,"render",f,a,d),c.drawImage(f.canvas,0,0))}ml(this,"postcompose",c,a,d)};
Fm.prototype.f=function(a,b,c,d){if(null!==this.c){var e=this.a;return Nl(this.c,b.extent,b.view2DState.resolution,b.view2DState.rotation,a,b.skippedFeatureUids_,function(a,b){return c.call(d,b,e)})}};Fm.prototype.u=function(){Ek(this)};
Fm.prototype.d=function(a){var b=this.a,c=b.a;Gk(a.attributions,c.e);Hk(a,c);if(this.b||!a.viewHints[0]&&!a.viewHints[1]){var d=a.extent,e=a.view2DState,f=e.projection,g=e.resolution,h=a.pixelRatio;a=b.c;e=b.get("renderOrder");u(e)||(e=im);if(this.b||this.g!=g||this.j!=a||this.q!=e||!rf(this.r,d)){var m=this.r,n=Bf(d)/4,p=zf(d)/4;m[0]=d[0]-n;m[1]=d[1]-p;m[2]=d[2]+n;m[3]=d[3]+p;xd(this.c);this.c=null;this.b=!1;var q=b.d;u(q)||(q=We);var r=new Kl(g/(2*h),m,g);c.Yc(m,g,f);b=function(a){var b=q(a,g);
if(null!=b){var c=g*g/(4*h*h),d,e,f=!1;d=0;for(e=b.length;d<e;++d)f=jm(r,a,b[d],c,a,this.u,this)||f;a=f}else a=!1;this.b=this.b||a};if(null===e)c.cc(m,g,b,this);else{var s=[];c.cc(m,g,function(a){s.push(a)},this);Xa(s,e);Ma(s,b,this)}Ol(r);this.g=g;this.j=a;this.q=e;this.c=r}}};function Gm(a,b){Sk.call(this,0,b);this.i=kd();this.a=this.i.canvas;this.a.style.width="100%";this.a.style.height="100%";this.a.className="ol-unselectable";vc(a,this.a,0);this.c=!0;this.g=bd()}B(Gm,Sk);Gm.prototype.Yb=function(a){return a instanceof Xk?new sl(this,a):a instanceof Yk?new tl(this,a):a instanceof Zk?new Fm(this,a):null};
function Hm(a,b,c){var d=a.f,e=a.i;if(be(d.S,b)){var f=c.view2DState,g=c.pixelRatio;Pk(a.g,a.a.width/2,a.a.height/2,g/f.resolution,-g/f.resolution,-f.rotation,-f.center[0],-f.center[1]);a=new $k(e,g,c.extent,a.g,f.rotation);L(d,new Ze(b,d,a,c,e,null));kl(a)}}
Gm.prototype.uc=function(a){if(null===a)this.c&&(Pc(this.a,!1),this.c=!1);else{var b=this.i,c=a.size[0]*a.pixelRatio,d=a.size[1]*a.pixelRatio;this.a.width!=c||this.a.height!=d?(this.a.width=c,this.a.height=d):b.clearRect(0,0,this.a.width,this.a.height);Tk(a);Hm(this,"precompose",a);var c=a.layerStatesArray,d=a.view2DState.resolution,e,f,g,h;e=0;for(f=c.length;e<f;++e)h=c[e],g=h.layer,g=Uk(this,g),!h.visible||(1!=h.k||d>=h.maxResolution||d<h.minResolution)||(g.d(a,h),g.l(a,h,b));Hm(this,"postcompose",
a);this.c||(Pc(this.a,!0),this.c=!0);Wk(this,a);Vk(a)}};function Im(a,b,c){Dk.call(this,a,b);this.target=c}B(Im,Dk);function Jm(a,b){var c=rc("DIV");c.style.position="absolute";Im.call(this,a,b,c);this.c=null;this.b=dd()}B(Jm,Im);Jm.prototype.f=function(a,b,c,d){var e=this.a;return e.a.k(b.extent,b.view2DState.resolution,b.view2DState.rotation,a,function(a){return c.call(d,a,e)})};
Jm.prototype.d=function(a){var b=a.view2DState,c=b.center,d=b.resolution,e=b.rotation,f=this.c,g=this.a.a,h=a.viewHints;h[0]||h[1]||(b=g.rb(a.extent,d,a.pixelRatio,b.projection),null!==b&&(h=b.state,0==h?(Xd(b,"change",this.n,!1,this),tk(b)):2==h&&(f=b)));if(null!==f){var h=f.p(),m=f.d,b=bd();Pk(b,a.size[0]/2,a.size[1]/2,m/d,m/d,e,(h[0]-c[0])/m,(c[1]-h[3])/m);f!=this.c&&(c=f.e(this),c.style.maxWidth="none",c.style.position="absolute",tc(this.target),this.target.appendChild(c),this.c=f);Qk(b,this.b)||
(pd(this.target,b),ed(this.b,b));Gk(a.attributions,f.i);Hk(a,g)}};function Km(a,b){var c=rc("DIV");c.style.position="absolute";Im.call(this,a,b,c);this.b=!0;this.g=1;this.i=0;this.c={}}B(Km,Im);
Km.prototype.d=function(a,b){if(b.visible){var c=a.pixelRatio,d=a.view2DState,e=d.projection,f=this.a,g=f.a,h=Ck(g,e),m=g.ec(),n=Jf(h.a,d.resolution,0),p=h.a[n],q=d.center,r;p==d.resolution?(q=Kk(q,p,a.size),r=yf(q,p,d.rotation,a.size)):r=a.extent;var p=yk(h,r,p),s={};s[n]={};var z=wa(g.Pc,g,s,Jk(function(a){return null!==a&&2==a.state},g,c,e)),x=f.d();u(x)||(x=!0);var w=lf(),C=new eb(0,0,0,0),A,D,H,P;for(H=p.a;H<=p.d;++H)for(P=p.b;P<=p.c;++P)A=g.mb(n,H,P,c,e),D=A.state,2==D?s[n][A.a.toString()]=
A:4==D||3==D&&!x||(D=h.dc(A.a,z,null,C,w),D||(A=h.gc(A.a,C,w),null===A||z(n+1,A)));var J;if(this.i!=g.c){for(J in this.c)x=this.c[+J],wc(x.target);this.c={};this.i=g.c}w=Na($b(s),Number);Xa(w);var z={},U;H=0;for(P=w.length;H<P;++H){J=w[H];J in this.c?x=this.c[J]:(x=zk(h,q[0],q[1],h.a[J],!1,void 0),x=new Lm(h,x),z[J]=!0,this.c[J]=x);J=s[J];for(U in J)Mm(x,J[U],m);Nm(x)}m=Na($b(this.c),Number);Xa(m);H=bd();U=0;for(w=m.length;U<w;++U)if(J=m[U],x=this.c[J],J in s)if(A=x.i,P=x.f,Pk(H,a.size[0]/2,a.size[1]/
2,A/d.resolution,A/d.resolution,d.rotation,(P[0]-q[0])/A,(q[1]-P[1])/A),Om(x,H),J in z){for(J-=1;0<=J;--J)if(J in this.c){uc(x.target,this.c[J].target);break}0>J&&vc(this.target,x.target,0)}else a.viewHints[0]||a.viewHints[1]||Pm(x,r,C);else wc(x.target),delete this.c[J];b.opacity!=this.g&&(Oc(this.target,b.opacity),this.g=b.opacity);b.visible&&!this.b&&(Pc(this.target,!0),this.b=!0);Ik(a.usedTiles,g,n,p);Lk(a,g,h,c,e,r,n,f.b());Fk(a,g);Hk(a,g)}else this.b&&(Pc(this.target,!1),this.b=!1)};
function Lm(a,b){this.target=rc("DIV");this.target.style.position="absolute";this.target.style.width="100%";this.target.style.height="100%";this.d=a;this.b=b;this.f=Af(wk(a,b));this.i=a.a[b.a];this.c={};this.a=null;this.e=dd()}
function Mm(a,b,c){var d=b.a,e=d.toString();if(!(e in a.c)){var f=a.d.ha(d.a),g=b.b(a),h=g.style;h.maxWidth="none";var m,n;0<c?(m=rc("DIV"),n=m.style,n.overflow="hidden",n.width=f+"px",n.height=f+"px",h.position="absolute",h.left=-c+"px",h.top=-c+"px",h.width=f+2*c+"px",h.height=f+2*c+"px",m.appendChild(g)):(h.width=f+"px",h.height=f+"px",m=g,n=h);n.position="absolute";n.left=(d.x-a.b.x)*f+"px";n.top=(a.b.y-d.y)*f+"px";null===a.a&&(a.a=document.createDocumentFragment());a.a.appendChild(m);a.c[e]=
b}}function Nm(a){null!==a.a&&(a.target.appendChild(a.a),a.a=null)}function Pm(a,b,c){var d=xk(a.d,b,a.b.a,c);b=[];for(var e in a.c)c=a.c[e],d.contains(c.a)||b.push(c);var f,d=0;for(f=b.length;d<f;++d)c=b[d],e=c.a.toString(),wc(c.b(a)),delete a.c[e]}function Om(a,b){Qk(b,a.e)||(pd(a.target,b),ed(a.e,b))};function Qm(a,b){Sk.call(this,0,b);this.a=rc("DIV");this.a.className="ol-unselectable";var c=this.a.style;c.position="absolute";c.width="100%";c.height="100%";vc(a,this.a,0);this.c=!0}B(Qm,Sk);Qm.prototype.Yb=function(a){if(a instanceof Xk)a=new Jm(this,a);else if(a instanceof Yk)a=new Km(this,a);else return null;return a};
Qm.prototype.uc=function(a){if(null===a)this.c&&(Pc(this.a,!1),this.c=!1);else{var b;b=function(a,b){vc(this.a,a,b)};var c=a.layerStatesArray,d,e,f,g;d=0;for(e=c.length;d<e;++d)g=c[d],f=g.layer,f=Uk(this,f),b.call(this,f.target,d),1==g.k&&f.d(a,g);b=a.layerStates;for(var h in this.b)h in b||(f=this.b[h],wc(f.target));this.c||(Pc(this.a,!0),this.c=!0);Tk(a);Wk(this,a);Vk(a)}};function Rm(){}l=Rm.prototype;l.$b=ba();l.Gb=ba();l.Oc=ba();l.Id=ba();l.Kb=ba();l.Hb=ba();l.Ib=ba();l.Jb=ba();l.ac=ba();l.ib=ba();l.Fa=ba();l.ma=ba();l.xb=ba();l.$=ba();function Sm(){this.i=bd();this.c=void 0;this.a=bd();this.d=void 0;this.b=bd();this.f=void 0;this.e=bd();this.j=void 0;this.g=bd()}
function Tm(a,b,c,d,e){var f=!1;u(b)&&b!==a.c&&(f=a.a,fd(f),f[12]=b,f[13]=b,f[14]=b,f[15]=1,a.c=b,f=!0);if(u(c)&&c!==a.d){f=a.b;fd(f);f[0]=c;f[5]=c;f[10]=c;f[15]=1;var g=-0.5*c+0.5;f[12]=g;f[13]=g;f[14]=g;f[15]=1;a.d=c;f=!0}u(d)&&d!==a.f&&(f=Math.cos(d),g=Math.sin(d),cd(a.e,0.213+0.787*f-0.213*g,0.213-0.213*f+0.143*g,0.213-0.213*f-0.787*g,0,0.715-0.715*f-0.715*g,0.715+0.285*f+0.14*g,0.715-0.715*f+0.715*g,0,0.072-0.072*f+0.928*g,0.072-0.072*f-0.283*g,0.072+0.928*f+0.072*g,0,0,0,0,1),a.f=d,f=!0);u(e)&&
e!==a.j&&(cd(a.g,0.213+0.787*e,0.213-0.213*e,0.213-0.213*e,0,0.715-0.715*e,0.715+0.285*e,0.715-0.715*e,0,0.072-0.072*e,0.072-0.072*e,0.072+0.928*e,0,0,0,0,1),a.j=e,f=!0);f&&(f=a.i,fd(f),u(c)&&gd(f,a.b,f),u(b)&&gd(f,a.a,f),u(e)&&gd(f,a.g,f),u(d)&&gd(f,a.e,f));return a.i};function Um(a){this.a=a}function Vm(a){this.a=a}B(Vm,Um);Vm.prototype.A=ca(35632);function Wm(a){this.a=a}B(Wm,Um);Wm.prototype.A=ca(35633);function Xm(){this.a="precision mediump float;varying vec2 a;uniform mat4 f;uniform float g;uniform sampler2D h;void main(void){vec4 texColor\x3dtexture2D(h,a);gl_FragColor.rgb\x3d(f*vec4(texColor.rgb,1.)).rgb;gl_FragColor.a\x3dtexColor.a*g;}"}B(Xm,Vm);fa(Xm);function Ym(){this.a="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position\x3de*vec4(b,0.,1.);a\x3d(d*vec4(c,0.,1.)).st;}"}B(Ym,Wm);fa(Ym);
function Zm(a,b){this.i=a.getUniformLocation(b,"f");this.d=a.getUniformLocation(b,"g");this.e=a.getUniformLocation(b,"e");this.f=a.getUniformLocation(b,"d");this.b=a.getUniformLocation(b,"h");this.a=a.getAttribLocation(b,"b");this.c=a.getAttribLocation(b,"c")};function $m(){this.a="precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor\x3dtexture2D(g,a);gl_FragColor.rgb\x3dtexColor.rgb;gl_FragColor.a\x3dtexColor.a*f;}"}B($m,Vm);fa($m);function an(){this.a="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position\x3de*vec4(b,0.,1.);a\x3d(d*vec4(c,0.,1.)).st;}"}B(an,Wm);fa(an);
function bn(a,b){this.d=a.getUniformLocation(b,"f");this.e=a.getUniformLocation(b,"e");this.f=a.getUniformLocation(b,"d");this.b=a.getUniformLocation(b,"g");this.a=a.getAttribLocation(b,"b");this.c=a.getAttribLocation(b,"c")};function cn(a){this.a=u(a)?a:[]}function dn(a,b,c){if(b!=c){var d=a.a,e=d.length,f;for(f=0;f<e;f+=2)if(b<=d[f]){d.splice(f,0,b,c);en(a);return}d.push(b,c);en(a)}}cn.prototype.clear=function(){this.a.length=0};function en(a){a=a.a;var b=a.length,c=0,d;for(d=0;d<b;d+=2)a[d]!=a[d+1]&&(0<c&&a[c-2]<=a[d]&&a[d]<=a[c-1]?a[c-1]=Math.max(a[c-1],a[d+1]):(a[c++]=a[d],a[c++]=a[d+1]));a.length=c}function fn(a,b){var c=a.a,d=c.length,e;for(e=0;e<d;e+=2)b.call(void 0,c[e],c[e+1])}
cn.prototype.V=function(){return 0===this.a.length};function gn(a,b,c){var d=a.a,e=d.length,f;for(f=0;f<e;f+=2)if(!(c<d[f]||d[f+1]<b)){if(d[f]>c)break;if(b<d[f])if(c==d[f])break;else if(c<d[f+1]){d[f]=Math.max(d[f],c);break}else d.splice(f,2),f-=2,e-=2;else if(b==d[f])if(c<d[f+1]){d[f]=c;break}else if(c==d[f+1]){d.splice(f,2);break}else d.splice(f,2),f-=2,e-=2;else if(c<d[f+1]){d.splice(f,2,d[f],b,c,d[f+1]);break}else if(c==d[f+1]){d[f+1]=b;break}else d[f+1]=b}en(a)};function hn(a,b,c){this.c=u(a)?a:[];this.a=[];this.b=new cn;a=u(b)?b:this.c.length;a<this.c.length&&dn(this.b,a,this.c.length);this.e=this.f=null;this.d=u(c)?c:35044}hn.prototype.add=function(a){var b=a.length,c;a:{c=this.b.a;var d=c.length,e=-1,f,g,h;for(g=0;g<d;g+=2){h=c[g+1]-c[g];if(h==b){c=c[g];break a}h>b&&(-1==e||h<f)&&(e=c[g],f=h)}c=e}gn(this.b,c,c+b);for(d=0;d<b;++d)this.c[c+d]=a[d];a=0;for(d=this.a.length;a<d;++a)dn(this.a[a],c,c+b);return c};
hn.prototype.pa=function(){var a=this.b.a,b=a.length,c=0,d;for(d=0;d<b;d+=2)c+=a[d+1]-a[d];return this.c.length-c};hn.prototype.remove=function(a,b){var c,d;dn(this.b,b,b+a);c=0;for(d=this.a.length;c<d;++c)gn(this.a[c],b,b+a)};function jn(a,b){Dk.call(this,a,b);this.L=new hn([-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,1,1,1]);this.i=this.aa=null;this.g=void 0;this.q=bd();this.u=dd();this.ba=new Sm;this.k=this.j=null}B(jn,Dk);
function kn(a,b,c){var d=a.e.d;if(u(a.g)&&a.g==c)d.bindFramebuffer(36160,a.i);else{b.postRenderFunctions.push(xa(function(a,b,c){a.isContextLost()||(a.deleteFramebuffer(b),a.deleteTexture(c))},d,a.i,a.aa));b=d.createTexture();d.bindTexture(3553,b);d.texImage2D(3553,0,6408,c,c,0,6408,5121,null);d.texParameteri(3553,10240,9729);d.texParameteri(3553,10241,9729);var e=d.createFramebuffer();d.bindFramebuffer(36160,e);d.framebufferTexture2D(36160,36064,3553,b,0);a.aa=b;a.i=e;a.g=c}}
function ln(a,b,c,d){a=a.a;be(a.S,b)&&L(a,new Ze(b,a,new Rm,d,null,c))}jn.prototype.l=function(){this.i=this.aa=null;this.g=void 0};function mn(a,b){jn.call(this,a,b);this.c=null}B(mn,jn);function nn(a,b){var c=b.e(),d=a.e.d,e=d.createTexture();d.bindTexture(3553,e);d.texImage2D(3553,0,6408,6408,5121,c);d.texParameteri(3553,10242,33071);d.texParameteri(3553,10243,33071);d.texParameteri(3553,10241,9729);d.texParameteri(3553,10240,9729);return e}mn.prototype.f=function(a,b,c,d){var e=this.a;return e.a.k(b.extent,b.view2DState.resolution,b.view2DState.rotation,a,function(a){return c.call(d,a,e)})};
mn.prototype.d=function(a){var b=this.e.d,c=a.view2DState,d=c.center,e=c.resolution,f=c.rotation,g=this.c,h=this.aa,m=this.a.a,n=a.viewHints;n[0]||n[1]||(c=m.rb(a.extent,e,a.pixelRatio,c.projection),null!==c&&(n=c.state,0==n?(Xd(c,"change",this.n,!1,this),tk(c)):2==n&&(g=c,h=nn(this,c),null===this.aa||a.postRenderFunctions.push(xa(function(a,b){a.isContextLost()||a.deleteTexture(b)},b,this.aa)))));null!==g&&(b=this.e.e.f,on(this,b.width,b.height,d,e,f,g.p()),d=this.q,fd(d),id(d,1,-1),hd(d,0,-1),this.c=
g,this.aa=h,Gk(a.attributions,g.i),Hk(a,m))};function on(a,b,c,d,e,f,g){b*=e;c*=e;a=a.u;fd(a);id(a,2/b,2/c);jd(a,-f);hd(a,g[0]-d[0],g[1]-d[1]);id(a,(g[2]-g[0])/2,(g[3]-g[1])/2);hd(a,1,1)};function pn(){this.a="precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor\x3dtexture2D(e,a);}"}B(pn,Vm);fa(pn);function qn(){this.a="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position\x3dvec4(b*d.xy+d.zw,0.,1.);a\x3dc;}"}B(qn,Wm);fa(qn);function rn(a,b){this.b=a.getUniformLocation(b,"e");this.d=a.getUniformLocation(b,"d");this.a=a.getAttribLocation(b,"b");this.c=a.getAttribLocation(b,"c")};function sn(a,b){jn.call(this,a,b);this.N=pn.Ga();this.X=qn.Ga();this.c=null;this.D=new hn([0,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0]);this.r=this.b=null;this.o=-1}B(sn,jn);sn.prototype.w=function(){var a=this.e.e,b=a.c,c=v(this.D),d=a.a[c];Ra(d.Cd.a,d.Zb);b.isContextLost()||b.deleteBuffer(d.buffer);delete a.a[c];sn.B.w.call(this)};sn.prototype.l=function(){sn.B.l.call(this);this.c=null};
sn.prototype.d=function(a){var b=this.e,c=b.e,d=b.d,e=a.view2DState,f=e.projection,g=this.a,h=g.a,m=Ck(h,f),n=Jf(m.a,e.resolution,0),p=m.a[n],q=h.Mb(n,a.pixelRatio,f),r=q/m.ha(n),s=p/r,z=h.ec(),x=e.center,w;p==e.resolution?(x=Kk(x,p,a.size),w=yf(x,p,e.rotation,a.size)):w=a.extent;p=yk(m,w,p);if(null!==this.b&&this.b.a==p.a&&(this.b.b==p.b&&this.b.d==p.d&&this.b.c==p.c)&&this.o==h.c)s=this.r;else{var C=[p.d-p.a+1,p.c-p.b+1],C=Math.max(C[0]*q,C[1]*q),A=Math.pow(2,Math.ceil(Math.log(C)/Math.LN2)),C=
s*A,D=m.Sb(n),H=D[0]+p.a*q*s,s=D[1]+p.b*q*s,s=[H,s,H+C,s+C];kn(this,a,A);d.viewport(0,0,A,A);d.clearColor(0,0,0,0);d.clear(16384);d.disable(3042);A=tn(c,this.N,this.X);c.dd(A);null===this.c&&(this.c=new rn(d,A));un(c,this.D);d.enableVertexAttribArray(this.c.a);d.vertexAttribPointer(this.c.a,2,5126,!1,16,0);d.enableVertexAttribArray(this.c.c);d.vertexAttribPointer(this.c.c,2,5126,!1,16,8);d.uniform1i(this.c.b,0);c={};c[n]={};var P=wa(h.Pc,h,c,Jk(function(a){return null!==a&&2==a.state&&vn(b.c,a.d())},
h,r,f)),J=g.d();u(J)||(J=!0);var A=!0,H=lf(),U=new eb(0,0,0,0),X,ma,sa;for(ma=p.a;ma<=p.d;++ma)for(sa=p.b;sa<=p.c;++sa){D=h.mb(n,ma,sa,r,f);X=D.state;if(2==X){if(vn(b.c,D.d())){c[n][D.a.toString()]=D;continue}}else if(4==X||3==X&&!J)continue;A=!1;X=m.dc(D.a,P,null,U,H);X||(D=m.gc(D.a,U,H),null===D||P(n+1,D))}P=Na($b(c),Number);Xa(P);var J=new Float32Array(4),R,qa,ja,Vb,U=0;for(ma=P.length;U<ma;++U)for(qa in ja=c[P[U]],ja)D=ja[qa],R=wk(m,D.a,H),sa=2*(R[2]-R[0])/C,X=2*(R[3]-R[1])/C,Vb=2*(R[0]-s[0])/
C-1,R=2*(R[1]-s[1])/C-1,ad(J,sa,X,Vb,R),d.uniform4fv(this.c.d,J),wn(b,D,q,z*r),d.drawArrays(5,0,4);A?(this.b=p,this.r=s,this.o=h.c):(this.r=this.b=null,this.o=-1,a.animate=!0)}Ik(a.usedTiles,h,n,p);var nb=b.g;Lk(a,h,m,r,f,w,n,g.b(),function(a){var c;(c=2!=a.state)||(c=vn(b.c,a.d()))||(c=a.d()in nb.b);c||ij(nb,[a,Ak(m,a.a),m.a[a.a.a],q,z*r])},this);Fk(a,h);Hk(a,h);d=this.q;fd(d);hd(d,(x[0]-s[0])/(s[2]-s[0]),(x[1]-s[1])/(s[3]-s[1]));0!==e.rotation&&jd(d,e.rotation);id(d,a.size[0]*e.resolution/(s[2]-
s[0]),a.size[1]*e.resolution/(s[3]-s[1]));hd(d,-0.5,-0.5)};function xn(){this.F=0;this.b={};this.c=this.a=null}l=xn.prototype;l.clear=function(){this.F=0;this.b={};this.c=this.a=null};function vn(a,b){return a.b.hasOwnProperty(b)}l.forEach=function(a,b){for(var c=this.a;null!==c;)a.call(b,c.gb,c.nc,this),c=c.ia};l.get=function(a){a=this.b[a];if(a===this.c)return a.gb;a===this.a?(this.a=this.a.ia,this.a.Ka=null):(a.ia.Ka=a.Ka,a.Ka.ia=a.ia);a.ia=null;a.Ka=this.c;this.c=this.c.ia=a;return a.gb};l.pa=k("F");
l.qa=function(){var a=Array(this.F),b=0,c;for(c=this.c;null!==c;c=c.Ka)a[b++]=c.nc;return a};l.ra=function(){var a=Array(this.F),b=0,c;for(c=this.c;null!==c;c=c.Ka)a[b++]=c.gb;return a};l.pop=function(){var a=this.a;delete this.b[a.nc];null!==a.ia&&(a.ia.Ka=null);this.a=a.ia;null===this.a&&(this.c=null);--this.F;return a.gb};function yn(a,b,c){c={nc:b,ia:null,Ka:a.c,gb:c};null===a.c?a.a=c:a.c.ia=c;a.c=c;a.b[b]=c;++a.F};function zn(a,b){this.f=a;this.c=b;this.a={};this.d={};this.b={};this.e=null;I(this.f,"webglcontextlost",this.vh,!1,this);I(this.f,"webglcontextrestored",this.wh,!1,this)}
function un(a,b){var c=a.c,d=b.c,e=v(b);if(e in a.a)e=a.a[e],c.bindBuffer(34962,e.buffer),fn(e.Zb,function(a,b){var e=d.slice(a,b);c.bufferSubData(34962,a,new Float32Array(e))}),e.Zb.clear();else{var f=c.createBuffer();c.bindBuffer(34962,f);c.bufferData(34962,new Float32Array(d),b.d);var g=new cn;b.a.push(g);a.a[e]={Cd:b,buffer:f,Zb:g}}}l=zn.prototype;
l.w=function(){Wb(this.a,function(a){Ra(a.Cd.a,a.Zb)});var a=this.c;a.isContextLost()||(Wb(this.a,function(b){a.deleteBuffer(b.buffer)}),Wb(this.b,function(b){a.deleteProgram(b)}),Wb(this.d,function(b){a.deleteShader(b)}))};l.uh=k("c");function An(a,b){var c=v(b);if(c in a.d)return a.d[c];var d=a.c,e=d.createShader(b.A());d.shaderSource(e,b.a);d.compileShader(e);return a.d[c]=e}
function tn(a,b,c){var d=v(b)+"/"+v(c);if(d in a.b)return a.b[d];var e=a.c,f=e.createProgram();e.attachShader(f,An(a,b));e.attachShader(f,An(a,c));e.linkProgram(f);return a.b[d]=f}l.vh=function(){bc(this.a);bc(this.d);bc(this.b);this.e=null};l.wh=ba();l.dd=function(a){if(a==this.e)return!1;this.c.useProgram(a);this.e=a;return!0};function Bn(a,b){Sk.call(this,0,b);this.a=rc("CANVAS");this.a.style.width="100%";this.a.style.height="100%";this.a.className="ol-unselectable";vc(a,this.a,0);this.n=0;this.l=kd();this.j=!0;this.d=rd(this.a,{antialias:!0,depth:!1,We:!0,preserveDrawingBuffer:!1,stencil:!0});this.e=new zn(this.a,this.d);I(this.a,"webglcontextlost",this.Rg,!1,this);I(this.a,"webglcontextrestored",this.Sg,!1,this);this.c=new xn;this.k=null;this.g=new fj(wa(function(a){var b=a[1];a=a[2];var e=b[0]-this.k[0],b=b[1]-this.k[1];
return 65536*Math.log(a)+Math.sqrt(e*e+b*b)/a},this),function(a){return a[0].d()});this.o=wa(function(){if(!this.g.V()){kj(this.g);var a=gj(this.g);wn(this,a[0],a[3],a[4])}},this);this.i=0;Cn(this)}B(Bn,Sk);
function wn(a,b,c,d){var e=a.d,f=b.d();if(vn(a.c,f))a=a.c.get(f),e.bindTexture(3553,a.aa),9729!=a.Wd&&(e.texParameteri(3553,10240,9729),a.Wd=9729),9729!=a.Xd&&(e.texParameteri(3553,10240,9729),a.Xd=9729);else{var g=e.createTexture();e.bindTexture(3553,g);if(0<d){var h=a.l.canvas,m=a.l;a.n!=c?(h.width=c,h.height=c,a.n=c):m.clearRect(0,0,c,c);m.drawImage(b.b(),d,d,c,c,0,0,c,c);e.texImage2D(3553,0,6408,6408,5121,h)}else e.texImage2D(3553,0,6408,6408,5121,b.b());e.texParameteri(3553,10240,9729);e.texParameteri(3553,
10241,9729);e.texParameteri(3553,10242,33071);e.texParameteri(3553,10243,33071);yn(a.c,f,{aa:g,Wd:9729,Xd:9729})}}l=Bn.prototype;l.Yb=function(a){return a instanceof Xk?new mn(this,a):a instanceof Yk?new sn(this,a):null};function Dn(a,b,c){var d=a.f;be(d.S,b)&&L(d,new Ze(b,d,new Rm,c,null,a.e))}l.w=function(){var a=this.d;a.isContextLost()||this.c.forEach(function(b){null===b||a.deleteTexture(b.aa)});xd(this.e);Bn.B.w.call(this)};
l.Ve=function(a,b){for(var c=this.d,d;1024<this.c.pa()-this.i;){d=this.c.a.gb;if(null===d)if(+this.c.a.nc==b.index)break;else--this.i;else c.deleteTexture(d.aa);this.c.pop()}};l.Rg=function(a){a.preventDefault();this.c.clear();this.i=0;Wb(this.b,function(a){a.l()})};l.Sg=function(){Cn(this);this.f.K()};function Cn(a){a=a.d;a.activeTexture(33984);a.blendFuncSeparate(770,771,1,771);a.disable(2884);a.disable(2929);a.disable(3089);a.disable(2960)}
l.uc=function(a){var b=this.e,c=this.d;if(c.isContextLost())return!1;if(null===a)return this.j&&(Pc(this.a,!1),this.j=!1),!1;this.k=a.focus;yn(this.c,(-a.index).toString(),null);++this.i;var d=[],e=a.layerStatesArray,f=a.view2DState.resolution,g,h,m;g=0;for(h=e.length;g<h;++g)m=e[g],m.visible&&(1==m.k&&f<m.maxResolution&&f>=m.minResolution)&&d.push(m);g=0;for(h=d.length;g<h;++g)m=d[g],e=Uk(this,m.layer),e.d(a,m);g=a.size[0]*a.pixelRatio;h=a.size[1]*a.pixelRatio;if(this.a.width!=g||this.a.height!=
h)this.a.width=g,this.a.height=h;c.bindFramebuffer(36160,null);c.clearColor(0,0,0,0);c.clear(16384);c.enable(3042);c.viewport(0,0,this.a.width,this.a.height);Dn(this,"precompose",a);g=0;for(h=d.length;g<h;++g){m=d[g];c=e=Uk(this,m.layer);e=a;f=b;ln(c,"precompose",f,e);un(f,c.L);var n=f.c,p=m.brightness||1!=m.contrast||m.hue||1!=m.saturation,q=void 0,r=void 0;p?(q=Xm.Ga(),r=Ym.Ga()):(q=$m.Ga(),r=an.Ga());q=tn(f,q,r);r=void 0;p?null===c.j?(r=new Zm(n,q),c.j=r):r=c.j:null===c.k?(r=new bn(n,q),c.k=r):
r=c.k;f.dd(q)&&(n.enableVertexAttribArray(r.a),n.vertexAttribPointer(r.a,2,5126,!1,16,0),n.enableVertexAttribArray(r.c),n.vertexAttribPointer(r.c,2,5126,!1,16,8),n.uniform1i(r.b,0));n.uniformMatrix4fv(r.f,!1,c.q);n.uniformMatrix4fv(r.e,!1,c.u);p&&n.uniformMatrix4fv(r.i,!1,Tm(c.ba,m.brightness,m.contrast,m.hue,m.saturation));n.uniform1f(r.d,m.opacity);n.bindTexture(3553,c.aa);n.drawArrays(5,0,4);ln(c,"postcompose",f,e)}this.j||(Pc(this.a,!0),this.j=!0);Tk(a);1024<this.c.pa()-this.i&&a.postRenderFunctions.push(wa(this.Ve,
this));this.g.V()||(a.postRenderFunctions.push(this.o),a.animate=!0);Dn(this,"postcompose",a);Wk(this,a);Vk(a)};var En=["canvas","webgl","dom"];
function T(a){M.call(this);var b=Fn(a);this.Fc=u(a.pixelRatio)?a.pixelRatio:G.vd;this.Ec=b.ol3Logo;this.r=new Ph(this.Wh,void 0,this);wd(this,this.r);this.Bc=bd();this.Hc=bd();this.Dc=0;this.o=this.N=this.d=null;this.b=oc("DIV","ol-viewport");this.b.style.position="relative";this.b.style.overflow="hidden";this.b.style.width="100%";this.b.style.height="100%";this.b.style.msTouchAction="none";G.zc&&(this.b.className="ol-touch");this.Oa=oc("DIV","ol-overlaycontainer");this.b.appendChild(this.Oa);this.u=
oc("DIV","ol-overlaycontainer-stopevent");I(this.u,["click","dblclick","mousedown","touchstart","MSPointerDown",bj,"mousewheel"],zd);this.b.appendChild(this.u);a=new Ui(this);I(a,Zb(ej),this.ae,!1,this);wd(this,a);this.Na=b.keyboardEventTarget;this.q=new Zh;I(this.q,"key",this.Qd,!1,this);wd(this,this.q);a=new gi(this.b);I(a,"mousewheel",this.Qd,!1,this);wd(this,a);this.k=b.controls;this.Cc=b.deviceOptions;this.j=b.interactions;this.n=b.overlays;this.Da=new b.Yh(this.b,this);wd(this,this.Da);this.He=
new Vh;I(this.He,"resize",this.L,!1,this);this.ca=null;this.D=[];this.Pa=[];this.Qa=new lj(wa(this.Af,this),wa(this.bg,this));this.l=new N;I(this.l,["add","remove"],this.$f,!1,this);wd(this,this.l);this.skippedFeatureUids_={};I(this,xe("layergroup"),this.Lf,!1,this);I(this,xe("view"),this.cg,!1,this);I(this,xe("size"),this.Zf,!1,this);I(this,xe("target"),this.ag,!1,this);this.T(b.mi);this.k.forEach(function(a){a.setMap(this)},this);I(this.k,"add",function(a){a.element.setMap(this)},!1,this);I(this.k,
"remove",function(a){a.element.setMap(null)},!1,this);this.j.forEach(function(a){a.setMap(this)},this);I(this.j,"add",function(a){a.element.setMap(this)},!1,this);I(this.j,"remove",function(a){a.element.setMap(null)},!1,this);this.n.forEach(function(a){a.setMap(this)},this);I(this.n,"add",function(a){a.element.setMap(this)},!1,this);I(this.n,"remove",function(a){a.element.setMap(null)},!1,this)}B(T,M);l=T.prototype;l.Ie=function(a){this.k.push(a)};l.Ke=function(a){this.j.push(a)};l.Le=function(a){this.Ua().qb().push(a)};
l.Me=function(a){this.n.push(a)};l.oa=function(a){this.K();Array.prototype.push.apply(this.D,arguments)};l.w=function(){wc(this.b);T.B.w.call(this)};l.ad=function(a,b,c,d,e){if(null!==this.d){a=this.ga(a);a:{var f=this.Da,g=this.d;c=u(c)?c:null;d=u(d)?d:ie;e=u(e)?e:null;var h=f.f.Ua().fc(),m;for(m=h.length-1;0<=m;--m){var n=h[m],p=n.layer;if(n.visible&&d.call(e,p)&&(n=Uk(f,p).f(a,g,b,c))){b=n;break a}}b=void 0}return b}};l.Md=function(a){return this.ga(this.Sc(a))};
l.Sc=function(a){if(u(a.changedTouches)){a=a.changedTouches.item(0);var b=Kc(this.b);return[a.clientX-b.x,a.clientY-b.y]}a=Jc(a,this.b);return[a.x,a.y]};l.qc=function(){return this.get("target")};T.prototype.getTarget=T.prototype.qc;l=T.prototype;l.ga=function(a){var b=this.d;if(null===b)return null;a=a.slice();return Rk(b.pixelToCoordinateMatrix,a,a)};l.bf=k("k");l.uf=k("n");l.jf=k("j");l.Ua=function(){return this.get("layergroup")};T.prototype.getLayerGroup=T.prototype.Ua;
T.prototype.Gc=function(){var a=this.Ua();if(u(a))return a.qb()};T.prototype.g=function(a){var b=this.d;if(null===b)return null;a=a.slice(0,2);return Rk(b.coordinateToPixelMatrix,a,a)};T.prototype.f=function(){return this.get("size")};T.prototype.getSize=T.prototype.f;T.prototype.a=function(){return this.get("view")};T.prototype.getView=T.prototype.a;l=T.prototype;l.Bf=k("b");
l.Af=function(a,b,c,d){var e=this.d;if(!(null!==e&&b in e.wantedTiles&&e.wantedTiles[b][a.a.toString()]))return Infinity;a=c[0]-e.focus[0];c=c[1]-e.focus[1];return 65536*Math.log(d)+Math.sqrt(a*a+c*c)/d};l.Qd=function(a,b){var c=new Si(b||a.type,this,a);this.ae(c)};l.ae=function(a){if(null!==this.d){this.ca=a.coordinate;a.b=this.d;var b=this.j.a,c;if(!1!==L(this,a))for(c=b.length-1;0<=c&&b[c].ja(a);c--);}};
l.Wf=function(){var a=this.d,b=this.Qa;if(!b.V()){var c=16,d=c,e=0;if(null!==a){var e=a.viewHints,f=this.Cc;e[0]&&(c=!1===f.loadTilesWhileAnimating?0:8,d=2);e[1]&&(c=!1===f.loadTilesWhileInteracting?0:8,d=2);e=Yb(a.wantedTiles)}c*=e;d*=e;if(b.d<c){kj(b);c=Math.min(c-b.d,d,b.pa());for(d=0;d<c;++d)e=gj(b)[0],Xd(e,"change",b.i,!1,b),0==e.state&&(e.state=1,e.e=[Xd(e.c,"error",e.k,!1,e),Xd(e.c,"load",e.n,!1,e)],e.l(e,e.g));b.d+=c}}b=this.Pa;c=0;for(d=b.length;c<d;++c)b[c](this,a);b.length=0};l.Zf=function(){this.K()};
l.$f=function(){this.skippedFeatureUids_={};this.l.forEach(function(a){this.skippedFeatureUids_[v(a).toString()]=!0},this);this.K()};l.ag=function(){var a=this.qc(),a=u(a)?kc(a):null;fi(this.q);null===a?wc(this.b):(a.appendChild(this.b),$h(this.q,null===this.Na?a:this.Na));this.L()};l.bg=function(){this.K()};l.dg=function(){this.K()};l.cg=function(){null!==this.N&&(K(this.N),this.N=null);var a=this.a();null!=a&&(this.N=I(a,"propertychange",this.dg,!1,this));this.K()};l.Mf=function(){this.K()};
l.Nf=function(){this.K()};l.Lf=function(){if(null!==this.o){for(var a=this.o.length,b=0;b<a;++b)K(this.o[b]);this.o=null}a=this.Ua();null!=a&&(this.o=[I(a,"propertychange",this.Nf,!1,this),I(a,"change",this.Mf,!1,this)]);this.K()};l.Xh=function(){var a=this.r;Qh(a);a.Hd()};l.K=function(){null!=this.r.P||this.r.start()};l.Rh=function(a){if(u(this.k.remove(a)))return a};l.Th=function(a){var b;u(this.j.remove(a))&&(b=a);return b};l.Uh=function(a){return this.Ua().qb().remove(a)};l.Vh=function(a){if(u(this.n.remove(a)))return a};
l.Wh=function(a){var b,c,d,e=this.f();b=this.a();var f=u(b)?this.a().M():void 0,g=null;if(u(e)&&0<e[0]&&0<e[1]&&u(f)&&f.$c()){var g=Ta(b.k),h=this.Ua().fc(),m={};b=0;for(c=h.length;b<c;++b)m[v(h[b].layer)]=h[b];d=yj(f);g={animate:!1,attributions:{},coordinateToPixelMatrix:this.Bc,extent:null,focus:null===this.ca?d.center:this.ca,index:this.Dc++,layerStates:m,layerStatesArray:h,logos:{},pixelRatio:this.Fc,pixelToCoordinateMatrix:this.Hc,postRenderFunctions:[],size:e,skippedFeatureUids_:this.skippedFeatureUids_,
tileQueue:this.Qa,time:a,usedTiles:{},view2DState:d,viewHints:g,wantedTiles:{}};this.Ec&&(g.logos["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"]=
"http://ol3js.org/")}a=this.D;b=e=0;for(c=a.length;b<c;++b)f=a[b],f(this,g)&&(a[e++]=f);a.length=e;null!==g&&(g.extent=yf(d.center,d.resolution,d.rotation,g.size));this.d=g;this.Da.uc(g);null!==g&&(g.animate&&this.K(),Array.prototype.push.apply(this.Pa,g.postRenderFunctions),0!==this.D.length||(g.animate||g.viewHints[0]||g.viewHints[1])||L(this,new ji("moveend",this)));L(this,new ji("postrender",this,g));b=d=this.Wf;this&&(b=wa(d,this));oa(t.setImmediate)?t.setImmediate(b):(Th||(Th=Uh()),Th(b))};
l.ai=function(a){this.t("layergroup",a)};T.prototype.setLayerGroup=T.prototype.ai;T.prototype.Ea=function(a){this.t("size",a)};T.prototype.setSize=T.prototype.Ea;T.prototype.Ic=function(a){this.t("target",a)};T.prototype.setTarget=T.prototype.Ic;T.prototype.Ge=function(a){this.t("view",a)};T.prototype.setView=T.prototype.Ge;T.prototype.L=function(){var a=this.qc(),a=u(a)?kc(a):null;null===a?this.Ea(void 0):(a=Rc(a),this.Ea([a.width,a.height]))};
function Fn(a){var b=null;u(a.keyboardEventTarget)&&(b=la(a.keyboardEventTarget)?document.getElementById(a.keyboardEventTarget):a.keyboardEventTarget);var c={},d=u(a.ol3Logo)?a.ol3Logo:!0,e=a.layers instanceof jk?a.layers:new jk({layers:a.layers});c.layergroup=e;c.target=a.target;c.view=u(a.view)?a.view:new Q;var e=Sk,f;u(a.renderer)?ia(a.renderer)?f=a.renderer:la(a.renderer)&&(f=[a.renderer]):f=En;var g,h;g=0;for(h=f.length;g<h;++g){var m=f[g];if("canvas"==m){if(G.xd){e=Gm;break}}else if("dom"==
m){if(G.Ce){e=Qm;break}}else if("webgl"==m&&G.Ad){e=Bn;break}}f=u(a.controls)?ia(a.controls)?new N(Ta(a.controls)):a.controls:Dj();g=u(a.deviceOptions)?a.deviceOptions:{};h=u(a.interactions)?ia(a.interactions)?new N(Ta(a.interactions)):a.interactions:fk();a=u(a.overlays)?ia(a.overlays)?new N(Ta(a.overlays)):a.overlays:new N;return{controls:f,deviceOptions:g,interactions:h,keyboardEventTarget:b,ol3Logo:d,overlays:a,Yh:e,mi:c}}pk();function Gn(a){M.call(this);this.o=u(a.insertFirst)?a.insertFirst:!0;this.u=u(a.stopEvent)?a.stopEvent:!0;this.r=u(a.offsetX)?a.offsetX:0;this.q=u(a.offsetY)?a.offsetY:0;this.b=rc("DIV");this.b.style.position="absolute";this.a={Xb:"",oc:"",vc:"",xc:"",visible:!0};this.d=null;I(this,xe("element"),this.Hf,!1,this);I(this,xe("map"),this.Rf,!1,this);I(this,xe("position"),this.Uf,!1,this);I(this,xe("positioning"),this.Vf,!1,this);u(a.element)&&this.se(a.element);u(a.position)&&this.n(a.position);u(a.positioning)&&
this.l(a.positioning)}B(Gn,M);Gn.prototype.j=function(){return this.get("element")};Gn.prototype.getElement=Gn.prototype.j;Gn.prototype.f=function(){return this.get("map")};Gn.prototype.getMap=Gn.prototype.f;Gn.prototype.k=function(){return this.get("position")};Gn.prototype.getPosition=Gn.prototype.k;Gn.prototype.g=function(){return this.get("positioning")};Gn.prototype.getPositioning=Gn.prototype.g;l=Gn.prototype;l.Hf=function(){tc(this.b);var a=this.j();null!=a&&sc(this.b,a)};
l.Rf=function(){null!==this.d&&(wc(this.b),K(this.d),this.d=null);var a=this.f();null!=a&&(this.d=I(a,"postrender",this.Jg,!1,this),Hn(this),a=this.u?a.u:a.Oa,this.o?vc(a,this.b,0):sc(a,this.b))};l.Jg=function(){Hn(this)};l.Uf=function(){Hn(this)};l.Vf=function(){Hn(this)};l.se=function(a){this.t("element",a)};Gn.prototype.setElement=Gn.prototype.se;Gn.prototype.setMap=function(a){this.t("map",a)};Gn.prototype.setMap=Gn.prototype.setMap;Gn.prototype.n=function(a){this.t("position",a)};
Gn.prototype.setPosition=Gn.prototype.n;Gn.prototype.l=function(a){this.t("positioning",a)};Gn.prototype.setPositioning=Gn.prototype.l;
function Hn(a){var b=a.f(),c=a.k();if(u(b)&&null!==b.d&&u(c)){var c=b.g(c),d=b.f(),b=a.b.style,e=a.g();if("bottom-right"==e||"center-right"==e||"top-right"==e){""!==a.a.oc&&(a.a.oc=b.left="");var f=Math.round(d[0]-c[0])+"px";a.a.vc!=f&&(a.a.vc=b.right=f)}else{""!==a.a.vc&&(a.a.vc=b.right="");f=-a.r;if("bottom-center"==e||"center-center"==e||"top-center"==e)f+=Mc(a.b).width/2;f=Math.round(c[0]-f)+"px";a.a.oc!=f&&(a.a.oc=b.left=f)}if("bottom-left"==e||"bottom-center"==e||"bottom-right"==e)""!==a.a.xc&&
(a.a.xc=b.top=""),c=Math.round(d[1]-c[1])+"px",a.a.Xb!=c&&(a.a.Xb=b.bottom=c);else{""!==a.a.Xb&&(a.a.Xb=b.bottom="");d=-a.q;if("center-left"==e||"center-center"==e||"center-right"==e)d+=Mc(a.b).height/2;c=Math.round(c[1]-d)+"px";a.a.xc!=c&&(a.a.xc=b.top=c)}a.a.visible||(Pc(a.b,!0),a.a.visible=!0)}else a.a.visible&&(Pc(a.b,!1),a.a.visible=!1)};var In=vb?"webkitfullscreenchange":ub?"mozfullscreenchange":E?"MSFullscreenChange":"fullscreenchange";function Jn(){var a=hc().a,b=a.body;return!!(b.webkitRequestFullscreen||b.mozRequestFullScreen&&a.mozFullScreenEnabled||b.msRequestFullscreen&&a.msFullscreenEnabled||b.requestFullscreen&&a.fullscreenEnabled)}
function Kn(a){a.webkitRequestFullscreen?a.webkitRequestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.msRequestFullscreen?a.msRequestFullscreen():a.requestFullscreen&&a.requestFullscreen()}function Ln(){var a=hc().a;return!!(a.webkitIsFullScreen||a.mozFullScreen||a.msFullscreenElement||a.fullscreenElement)};function Mn(a){a=u(a)?a:{};this.b=u(a.className)?a.className:"ol-full-screen";var b=oc("SPAN",{role:"tooltip"},u(a.tipLabel)?a.tipLabel:"Toggle full-screen"),c=oc("BUTTON",{"class":this.b+"-"+Ln()+" ol-has-tooltip"});c.appendChild(b);b=new Li(c);wd(this,b);I(b,xi,this.d,!1,this);I(c,["mouseout",Ed],function(){this.blur()},!1);I(t.document,In,this.j,!1,this);c=oc("DIV",{"class":this.b+" ol-unselectable "+(Jn()?"":"ol-unsupported")},c);zj.call(this,{element:c,target:a.target});this.k=u(a.keys)?a.keys:
!1}B(Mn,zj);Mn.prototype.d=function(a){Jn()&&(a.a.preventDefault(),a=this.a,null!==a&&(Ln()?(a=hc().a,a.webkitCancelFullScreen?a.webkitCancelFullScreen():a.mozCancelFullScreen?a.mozCancelFullScreen():a.msExitFullscreen?a.msExitFullscreen():a.exitFullscreen&&a.exitFullscreen()):(a=a.qc(),a=kc(a),this.k?a.mozRequestFullScreenWithKeys?a.mozRequestFullScreenWithKeys():a.webkitRequestFullscreen?a.webkitRequestFullscreen():Kn(a):Kn(a))))};
Mn.prototype.j=function(){var a=this.b+"-true",b=this.b+"-false",c=xc(this.element),d=this.a;Ln()?Pb(c,b,a):Pb(c,a,b);null===d||d.L()};function Nn(a){a=u(a)?a:{};var b=oc("DIV",{"class":u(a.className)?a.className:"ol-mouse-position"});zj.call(this,{element:b,target:a.target});I(this,xe("projection"),this.L,!1,this);u(a.coordinateFormat)&&this.q(a.coordinateFormat);u(a.projection)&&this.r(Sg(a.projection));this.ca=u(a.undefinedHTML)?a.undefinedHTML:"";this.k=b.innerHTML;this.j=this.d=this.b=null}B(Nn,zj);
Nn.prototype.f=function(a){a=a.b;null===a?this.b=null:this.b!=a.view2DState.projection&&(this.b=a.view2DState.projection,this.d=null);On(this,this.j)};Nn.prototype.L=function(){this.d=null};Nn.prototype.n=function(){return this.get("coordinateFormat")};Nn.prototype.getCoordinateFormat=Nn.prototype.n;Nn.prototype.l=function(){return this.get("projection")};Nn.prototype.getProjection=Nn.prototype.l;Nn.prototype.u=function(a){a=Jc(a,this.a.b);this.j=[a.x,a.y];On(this,this.j)};
Nn.prototype.D=function(){On(this,null);this.j=null};Nn.prototype.setMap=function(a){Nn.B.setMap.call(this,a);null!==a&&(a=a.b,this.g.push(I(a,"mousemove",this.u,!1,this),I(a,"mouseout",this.D,!1,this)))};Nn.prototype.q=function(a){this.t("coordinateFormat",a)};Nn.prototype.setCoordinateFormat=Nn.prototype.q;Nn.prototype.r=function(a){this.t("projection",a)};Nn.prototype.setProjection=Nn.prototype.r;
function On(a,b){var c=a.ca;if(null!==b&&null!==a.b){if(null===a.d){var d=a.l();a.d=u(d)?Bg(a.b,d):Ug}d=a.a.ga(b);null!==d&&(a.d(d,d),c=a.n(),c=u(c)?c(d):d.toString())}u(a.k)&&c==a.k||(a.element.innerHTML=c,a.k=c)};function Pn(a){a=a||{};var b=u(a.className)?a.className:"ol-scale-line";this.j=oc("DIV",{"class":b+"-inner"});this.n=oc("DIV",{"class":b+" ol-unselectable"},this.j);this.l=null;this.k=u(a.minWidth)?a.minWidth:64;this.d=!1;this.u=void 0;this.r="";this.b=null;zj.call(this,{element:this.n,target:a.target});I(this,xe("units"),this.L,!1,this);this.D(a.units||"metric")}B(Pn,zj);var Qn=[1,2,5];Pn.prototype.q=function(){return this.get("units")};Pn.prototype.getUnits=Pn.prototype.q;
Pn.prototype.f=function(a){a=a.b;null===a?this.l=null:this.l=a.view2DState;Rn(this)};Pn.prototype.L=function(){Rn(this)};Pn.prototype.D=function(a){this.t("units",a)};Pn.prototype.setUnits=Pn.prototype.D;
function Rn(a){var b=a.l;if(null===b)a.d&&(Pc(a.n,!1),a.d=!1);else{var c=b.center,d=b.projection,b=d.d(b.resolution,c),e=d.na,f=a.q();"degrees"!=e||"metric"!=f&&"imperial"!=f?"ft"!=e&&"m"!=e||"degrees"!=f?a.b=null:(null===a.b&&(a.b=Bg(d,Sg("EPSG:4326"))),c=Math.cos(Sb(a.b(c)[1])),d=vg.radius,"ft"==e&&(d/=0.3048),b*=180/(Math.PI*c*d)):(a.b=null,c=Math.cos(Sb(c[1])),b*=Math.PI*c*vg.radius/180);c=a.k*b;e="";"degrees"==f?c<1/60?(e="\u2033",b*=3600):1>c?(e="\u2032",b*=60):e="\u00b0":"imperial"==f?0.9144>
c?(e="in",b/=0.0254):1609.344>c?(e="ft",b/=0.3048):(e="mi",b/=1609.344):"nautical"==f?(b/=1852,e="nm"):"metric"==f?1>c?(e="mm",b*=1E3):1E3>c?e="m":(e="km",b/=1E3):"us"==f&&(0.9144>c?(e="in",b*=39.37):1609.344>c?(e="ft",b/=0.30480061):(e="mi",b/=1609.3472));for(var f=3*Math.floor(Math.log(a.k*b)/Math.log(10)),g,h;;){g=Qn[f%3]*Math.pow(10,Math.floor(f/3));h=Math.round(g/b);if(h>=a.k)break;++f}g=g+e;a.r!=g&&(a.j.innerHTML=g,a.r=g);a.u!=h&&(a.j.style.width=h+"px",a.u=h);a.d||(Pc(a.n,!0),a.d=!0)}};function Sn(a){td.call(this);this.c=a;this.a={}}B(Sn,td);var Tn=[];Sn.prototype.Z=function(a,b,c,d,e){ia(b)||(Tn[0]=b,b=Tn);for(var f=0;f<b.length;f++){var g=I(a,b[f],c||this,d||!1,e||this.c||this);this.a[g.key]=g}return this};
Sn.prototype.pd=function(a,b,c,d,e){if(ia(b))for(var f=0;f<b.length;f++)this.pd(a,b[f],c,d,e);else{a:if(e=e||this.c||this,d=!!d,c=Td(c||this),Ld(a))a=a.S.a[b],b=-1,a&&(b=oe(a,c,d,e)),e=-1<b?a[b]:null;else{if(a=Zd(a,b,d))for(b=0;b<a.length;b++)if(!a[b].Ca&&a[b].sa==c&&a[b].capture==d&&a[b].Za==e){e=a[b];break a}e=null}e&&(K(e),delete this.a[e.key])}return this};function Un(a){Wb(a.a,K);a.a={}}Sn.prototype.w=function(){Sn.B.w.call(this);Un(this)};
Sn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};function Vn(a,b,c){pe.call(this);this.target=a;this.handle=b||a;this.c=c||new Bc(NaN,NaN,NaN,NaN);this.b=jc(a);this.a=new Sn(this);wd(this,this.a);I(this.handle,["touchstart","mousedown"],this.ve,!1,this)}B(Vn,pe);var Wn=E||ub&&Ib("1.9.3");l=Vn.prototype;l.clientX=0;l.clientY=0;l.screenX=0;l.screenY=0;l.we=0;l.xe=0;l.nb=0;l.ob=0;l.Jd=!0;l.Sa=!1;l.Td=0;l.ig=0;l.eg=!1;l.qd=!1;
l.w=function(){Vn.B.w.call(this);Yd(this.handle,["touchstart","mousedown"],this.ve,!1,this);Un(this.a);Wn&&this.b.releaseCapture();this.handle=this.target=null};function Xn(a){u(a.e)||(a.e=Qc(a.target));return a.e}
l.ve=function(a){var b="mousedown"==a.type;if(!this.Jd||this.Sa||b&&!Jd(a))L(this,"earlycancel");else{Yn(a);if(0==this.Td)if(L(this,new Zn("start",this,a.clientX,a.clientY,a)))this.Sa=!0,a.preventDefault();else return;else a.preventDefault();var b=this.b,c=b.documentElement,d=!Wn;this.a.Z(b,["touchmove","mousemove"],this.Sf,d);this.a.Z(b,["touchend","mouseup"],this.bc,d);Wn?(c.setCapture(!1),this.a.Z(c,"losecapture",this.bc)):this.a.Z(b?b.parentWindow||b.defaultView:window,"blur",this.bc);E&&this.eg&&
this.a.Z(b,"dragstart",Ad);this.f&&this.a.Z(this.f,"scroll",this.Ch,d);this.clientX=this.we=a.clientX;this.clientY=this.xe=a.clientY;this.screenX=a.screenX;this.screenY=a.screenY;this.qd?(a=this.target,b=a.offsetLeft,c=a.offsetParent,c||"fixed"!=Dc(a,"position")||(c=jc(a).documentElement),c?(ub?(d=Uc(c),b+=d.left):E&&8<=Kb&&(d=Uc(c),b-=d.left),a=Qc(c)?c.clientWidth-(b+a.offsetWidth):b):a=b):a=this.target.offsetLeft;this.nb=a;this.ob=this.target.offsetTop;this.d=zc(hc(this.b));this.ig=ya()}};
l.bc=function(a,b){Un(this.a);Wn&&this.b.releaseCapture();if(this.Sa){Yn(a);this.Sa=!1;var c=$n(this,this.nb),d=ao(this,this.ob);L(this,new Zn("end",this,a.clientX,a.clientY,a,c,d,b||"touchcancel"==a.type))}else L(this,"earlycancel")};function Yn(a){var b=a.type;"touchstart"==b||"touchmove"==b?Hd(a,a.G.targetTouches[0],a.c):"touchend"!=b&&"touchcancel"!=b||Hd(a,a.G.changedTouches[0],a.c)}
l.Sf=function(a){if(this.Jd){Yn(a);var b=(this.qd&&Xn(this)?-1:1)*(a.clientX-this.clientX),c=a.clientY-this.clientY;this.clientX=a.clientX;this.clientY=a.clientY;this.screenX=a.screenX;this.screenY=a.screenY;if(!this.Sa){var d=this.we-this.clientX,e=this.xe-this.clientY;if(d*d+e*e>this.Td)if(L(this,new Zn("start",this,a.clientX,a.clientY,a)))this.Sa=!0;else{this.U||this.bc(a);return}}c=bo(this,b,c);b=c.x;c=c.y;this.Sa&&L(this,new Zn("beforedrag",this,a.clientX,a.clientY,a,b,c))&&(co(this,a,b,c),a.preventDefault())}};
function bo(a,b,c){var d=zc(hc(a.b));b+=d.x-a.d.x;c+=d.y-a.d.y;a.d=d;a.nb+=b;a.ob+=c;b=$n(a,a.nb);a=ao(a,a.ob);return new Tb(b,a)}l.Ch=function(a){var b=bo(this,0,0);a.clientX=this.clientX;a.clientY=this.clientY;co(this,a,b.x,b.y)};function co(a,b,c,d){a.qd&&Xn(a)?a.target.style.right=c+"px":a.target.style.left=c+"px";a.target.style.top=d+"px";L(a,new Zn("drag",a,b.clientX,b.clientY,b,c,d))}
function $n(a,b){var c=a.c,d=isNaN(c.left)?null:c.left,c=isNaN(c.width)?0:c.width;return Math.min(null!=d?d+c:Infinity,Math.max(null!=d?d:-Infinity,b))}function ao(a,b){var c=a.c,d=isNaN(c.top)?null:c.top,c=isNaN(c.height)?0:c.height;return Math.min(null!=d?d+c:Infinity,Math.max(null!=d?d:-Infinity,b))}function Zn(a,b,c,d,e,f,g,h){yd.call(this,a);this.clientX=c;this.clientY=d;this.d=e;this.left=u(f)?f:b.nb;this.top=u(g)?g:b.ob;this.b=b;this.a=!!h}B(Zn,yd);function eo(a){a=u(a)?a:{};this.b=void 0;this.j=fo;this.k=!1;var b=u(a.className)?a.className:"ol-zoomslider";a=oc("DIV",[b+"-thumb","ol-unselectable"]);b=oc("DIV",[b,"ol-unselectable"],a);this.d=new Vn(a);wd(this,this.d);I(this.d,["drag","end"],this.l,void 0,this);I(b,"click",this.n,!1,this);I(a,"click",zd);zj.call(this,{element:b})}B(eo,zj);var fo=0;eo.prototype.setMap=function(a){eo.B.setMap.call(this,a);null===a||a.K()};
eo.prototype.f=function(a){if(null!==a.b){if(!this.k){var b=this.element,c=xc(b),b=Rc(b),d;d=Ic(c);var e=Mc(c);d=new Bc(d.x,d.y,e.width,e.height);var e=Tc(c,"margin"),f=Uc(c),c=b.width-e.left-e.right-f.left-f.right-d.width;d=b.height-e.top-e.bottom-f.top-f.bottom-d.height;b.width>b.height?(this.j=1,b=new Bc(0,0,c,0)):(this.j=fo,b=new Bc(0,0,0,d));this.d.c=b||new Bc(NaN,NaN,NaN,NaN);this.k=!0}a=a.b.view2DState.resolution;a!==this.b&&(this.b=a,a=-1*(xj(this.a.a().M())(a)-1),b=this.d,c=xc(this.element),
1==this.j?Ec(c,b.c.left+b.c.width*a):Ec(c,b.c.left,b.c.top+b.c.height*a))}};eo.prototype.n=function(a){var b=this.a,c=b.a().M();a=go(this,ho(this,a.offsetX,a.offsetY));b.oa(fh({resolution:a,duration:200,easing:$g}));a=c.constrainResolution(a);c.d(a)};function ho(a,b,c){var d=a.d.c,e=0;return e=1===a.j?(b-d.left)/d.width:(c-d.top)/d.height}function go(a,b){b=-1*(Qb(b,0,1)-1);return wj(a.a.a().M())(b)}
eo.prototype.l=function(a){var b=this.a,c=b.a().M();"drag"===a.type?(a=go(this,ho(this,a.left,a.top)),a!==this.b&&(this.b=a,c.d(a))):(b.oa(fh({resolution:this.b,duration:200,easing:$g})),a=c.constrainResolution(this.b),c.d(a))};function io(a){a=u(a)?a:{};this.b=u(a.extent)?a.extent:null;var b=u(a.className)?a.className:"ol-zoom-extent",c=oc("SPAN",{role:"tooltip"},u(a.tipLabel)?a.tipLabel:"Fit to extent"),b=oc("DIV",{"class":b+" ol-unselectable"}),d=oc("BUTTON",{"class":"ol-has-tooltip"});d.appendChild(c);b.appendChild(d);c=new Li(d);wd(this,c);I(c,xi,this.d,!1,this);I(d,["mouseout",Ed],function(){this.blur()},!1);zj.call(this,{element:b,target:a.target})}B(io,zj);
io.prototype.d=function(a){a.a.preventDefault();a=this.a;var b=a.a().M(),c=null===this.b?b.n().p():this.b;b.Kd(c,a.f())};function jo(a){M.call(this);this.a=a;I(this.a,["change","input"],this.k,!1,this);I(this,xe("value"),this.n,!1,this);I(this,xe("checked"),this.j,!1,this)}B(jo,M);jo.prototype.b=function(){return this.get("checked")};jo.prototype.getChecked=jo.prototype.b;jo.prototype.d=function(){return this.get("value")};jo.prototype.getValue=jo.prototype.d;jo.prototype.g=function(a){this.t("value",a)};jo.prototype.setValue=jo.prototype.g;jo.prototype.f=function(a){this.t("checked",a)};jo.prototype.setChecked=jo.prototype.f;
jo.prototype.k=function(){var a=this.a;"checkbox"===a.type||"radio"===a.type?this.f(a.checked):this.g(a.value)};jo.prototype.j=function(){this.a.checked=this.b()};jo.prototype.n=function(){this.a.value=this.d()};function ko(){};var lo;a:if(document.implementation&&document.implementation.createDocument)lo=document.implementation.createDocument("","",null);else{if("undefined"!=typeof ActiveXObject){var mo=new ActiveXObject("MSXML2.DOMDocument");if(mo){mo.resolveExternals=!1;mo.validateOnParse=!1;try{mo.setProperty("ProhibitDTD",!0),mo.setProperty("MaxXMLSize",2048),mo.setProperty("MaxElementDepth",256)}catch(no){}}if(mo){lo=mo;break a}}throw Error("Your browser does not support creating new documents");}var oo=lo;
function po(a,b){return oo.createElementNS(a,b)}function qo(a,b){null===a&&(a="");return oo.createNode(1,b,a)}var ro=document.implementation&&document.implementation.createDocument?po:qo;function so(a){return to(a,!1,[]).join("")}function to(a,b,c){if(4==a.nodeType||3==a.nodeType)b?c.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):c.push(a.nodeValue);else for(a=a.firstChild;null!==a;a=a.nextSibling)to(a,b,c);return c}function uo(a){return a.localName}
function vo(a){var b=a.localName;return u(b)?b:a.baseName}var wo=E?vo:uo;function xo(a){return a instanceof Document}function yo(a){return pa(a)&&9==a.nodeType}var zo=E?yo:xo;function Ao(a){return a instanceof Node}function Bo(a){return pa(a)&&u(a.nodeType)}var Co=E?Bo:Ao;function Do(a,b,c){return a.getAttributeNS(b,c)||""}function Eo(a,b,c){var d="";a=Fo(a,b,c);u(a)&&(d=a.nodeValue);return d}var Go=document.implementation&&document.implementation.createDocument?Do:Eo;
function Ho(a,b,c){return a.getAttributeNodeNS(b,c)}function Io(a,b,c){var d=null;a=a.attributes;for(var e,f,g=0,h=a.length;g<h;++g)if(e=a[g],e.namespaceURI==b&&(f=e.prefix?e.prefix+":"+c:c,f==e.nodeName)){d=e;break}return d}var Fo=document.implementation&&document.implementation.createDocument?Ho:Io;function Jo(a,b,c,d){a.setAttributeNS(b,c,d)}function Ko(a,b,c,d){null===b?a.setAttribute(c,d):(b=a.ownerDocument.createNode(2,c,b),b.nodeValue=d,a.setAttributeNode(b))}
var Lo=document.implementation&&document.implementation.createDocument?Jo:Ko;function Mo(a){return(new DOMParser).parseFromString(a,"application/xml")}function No(a,b){return function(c,d){var e=a.call(b,c,d);u(e)&&Ua(d[d.length-1],e)}}function Oo(a,b){return function(c,d){var e=a.call(b,c,d);u(e)&&d[d.length-1].push(e)}}function Po(a){return function(b,c){var d=a.call(void 0,b,c);u(d)&&(c[c.length-1]=d)}}
function Qo(a){return function(b,c){var d=a.call(void 0,b,c);u(d)&&dc(c[c.length-1],u(void 0)?void 0:b.localName).push(d)}}function V(a,b){return function(c,d){var e=a.call(void 0,c,d);u(e)&&(d[d.length-1][u(b)?b:c.localName]=e)}}function W(a){return function(b,c,d){a.call(void 0,b,c,d);d[d.length-1].node.appendChild(b)}}function Ro(a){var b,c;return function(d,e,f){if(!u(b)){b={};var g={};g[d.localName]=a;b[d.namespaceURI]=g;c=So(d.localName)}To(b,c,e,f)}}
function So(a,b){return function(c,d,e){c=d[d.length-1].node;d=a;u(d)||(d=e);e=b;u(b)||(e=c.namespaceURI);return ro(e,d)}}var Uo=So();function Vo(a,b){for(var c=b.length,d=Array(c),e=0;e<c;++e)d[e]=a[b[e]];return d}function Y(a,b,c){c=u(c)?c:{};var d,e;d=0;for(e=a.length;d<e;++d)c[a[d]]=b;return c}function Wo(a,b,c,d){for(b=b.firstElementChild;null!==b;b=b.nextElementSibling){var e=a[b.namespaceURI];u(e)&&(e=e[b.localName],u(e)&&e.call(d,b,c))}}
function Z(a,b,c,d,e){d.push(a);Wo(b,c,d,e);return d.pop()}function To(a,b,c,d,e,f){for(var g=(u(e)?e:c).length,h,m,n=0;n<g;++n)h=c[n],u(h)&&(m=b.call(f,h,d,u(e)?e[n]:void 0),u(m)&&a[m.namespaceURI][m.localName].call(f,m,h,d))}function Xo(a,b,c,d,e,f){e.push(a);To(b,c,d,e,f,void 0);e.pop()};function Yo(){}B(Yo,ko);l=Yo.prototype;l.A=ca("xml");l.vb=function(a){return zo(a)?Zo(this,a):Co(a)?this.ne(a):la(a)?(a=Mo(a),Zo(this,a)):null};function Zo(a,b){var c=$o(a,b);return 0<c.length?c[0]:null}l.ua=function(a){return zo(a)?$o(this,a):Co(a)?this.wb(a):la(a)?(a=Mo(a),$o(this,a)):[]};function $o(a,b){var c=[],d;for(d=b.firstChild;null!==d;d=d.nextSibling)1==d.nodeType&&Ua(c,a.wb(d));return c}l.gd=function(a){return zo(a)?this.e(a):Co(a)?this.j(a):la(a)?(a=Mo(a),this.e(a)):null};
l.ka=function(a){return zo(a)?this.sc(a):Co(a)?this.jd(a):la(a)?(a=Mo(a),this.sc(a)):null};l.td=function(a){return this.k(a)};l.yc=function(a){return this.n(a)};l.ud=function(a){return this.l(a)};function ap(a){a=so(a);return bp(a)}function bp(a){if(a=/^\s*(true|1)|(false|0)\s*$/.exec(a))return u(a[1])||!1}function cp(a){a=so(a);if(a=/^\s*(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(Z|(?:([+\-])(\d{2})(?::(\d{2}))?))\s*$/.exec(a)){var b=Date.UTC(parseInt(a[1],10),parseInt(a[2],10)-1,parseInt(a[3],10),parseInt(a[4],10),parseInt(a[5],10),parseInt(a[6],10))/1E3;if("Z"!=a[7]){var c="-"==a[8]?-1:1,b=b+60*c*parseInt(a[9],10);u(a[10])&&(b+=3600*c*parseInt(a[10],10))}return b}}
function dp(a){a=so(a);return ep(a)}function ep(a){if(a=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(a))return parseFloat(a[1])}function fp(a){a=so(a);return gp(a)}function gp(a){if(a=/^\s*(\d+)\s*$/.exec(a))return parseInt(a[1],10)}function $(a){a=so(a);return Ba(a)}function hp(a,b){a.appendChild(oo.createTextNode(b.toPrecision()))}function ip(a,b){a.appendChild(oo.createTextNode(b.toString()))}function jp(a,b){a.appendChild(oo.createTextNode(b))};function kp(){}B(kp,Yo);var lp=[null,"http://www.topografix.com/GPX/1/0","http://www.topografix.com/GPX/1/1"];function mp(a,b,c){a.push(parseFloat(b.getAttribute("lon")),parseFloat(b.getAttribute("lat")));"ele"in c?(a.push(F(c,"ele")),cc(c,"ele")):a.push(0);"time"in c?(a.push(F(c,"time")),cc(c,"time")):a.push(0);return a}function np(a,b){var c=b[b.length-1],d=a.getAttribute("href");null!==d&&(c.link=d);Wo(op,a,b)}
function pp(a,b){var c=Z({flatCoordinates:[]},qp,a,b);if(u(c)){var d=F(c,"flatCoordinates");cc(c,"flatCoordinates");var e=new $l(null);am(e,"XYZM",d);d=new Ue(e);d.T(c);return d}}function rp(a,b){var c=Z({flatCoordinates:[],ends:[]},sp,a,b);if(u(c)){var d=F(c,"flatCoordinates");cc(c,"flatCoordinates");var e=F(c,"ends");cc(c,"ends");var f=new bm(null);cm(f,"XYZM",d,e);d=new Ue(f);d.T(c);return d}}
function tp(a,b){var c=Z({},up,a,b);if(u(c)){var d=mp([],a,c),d=new hg(d,"XYZM"),d=new Ue(d);d.T(c);return d}}
var vp={rte:pp,trk:rp,wpt:tp},wp=Y(lp,{rte:Oo(pp),trk:Oo(rp),wpt:Oo(tp)},void 0),op=Y(lp,{text:V($,"linkText"),type:V($,"linkType")},void 0),qp=Y(lp,{name:V($),cmt:V($),desc:V($),src:V($),link:np,number:V(fp),type:V($),rtept:function(a,b){var c=Z({},xp,a,b);u(c)&&mp(F(b[b.length-1],"flatCoordinates"),a,c)}},void 0),xp=Y(lp,{ele:V(dp),time:V(cp)},void 0),sp=Y(lp,{name:V($),cmt:V($),desc:V($),src:V($),link:np,number:V(fp),type:V($),trkseg:function(a,b){var c=b[b.length-1];Wo(yp,a,b);F(c,"ends").push(F(c,
"flatCoordinates").length)}},void 0),yp=Y(lp,{trkpt:function(a,b){var c=Z({},zp,a,b);u(c)&&mp(F(b[b.length-1],"flatCoordinates"),a,c)}},void 0),zp=Y(lp,{ele:V(dp),time:V(cp)},void 0),up=Y(lp,{ele:V(dp),time:V(cp),magvar:V(dp),geoidheight:V(dp),name:V($),cmt:V($),desc:V($),src:V($),link:np,sym:V($),type:V($),fix:V($),sat:V(fp),hdop:V(dp),vdop:V(dp),pdop:V(dp),ageofdgpsdata:V(dp),dgpsid:V(fp)},void 0);
kp.prototype.ne=function(a){if(-1==La(lp,a.namespaceURI))return null;var b=vp[a.localName];if(!u(b))return null;a=b(a,[]);return u(a)?a:null};kp.prototype.wb=function(a){return-1==La(lp,a.namespaceURI)?[]:"gpx"==a.localName&&(a=Z([],wp,a,[]),u(a))?a:[]};kp.prototype.sc=function(){return Sg("EPSG:4326")};kp.prototype.jd=function(){return Sg("EPSG:4326")};function Ap(a,b,c){a.setAttribute("href",b);b=F(c[c.length-1],"properties");Xo({node:a},Bp,Uo,[F(b,"linkText"),F(b,"linkType")],c,Cp)}
function Dp(a,b,c){var d=c[c.length-1],e=d.node.namespaceURI,f=F(d,"properties");Lo(a,null,"lat",b[1]);Lo(a,null,"lon",b[0]);switch(F(d,"geometryLayout")){case "XYZM":0!==b[3]&&(f.time=b[3]);case "XYZ":0!==b[2]&&(f.ele=b[2]);break;case "XYM":0!==b[2]&&(f.time=b[2])}b=Ep[e];d=Vo(f,b);Xo({node:a,properties:f},Fp,Uo,d,c,b)}
var Cp=["text","type"],Bp=Y(lp,{text:W(jp),type:W(jp)}),Gp=Y(lp,"name cmt desc src link number type rtept".split(" ")),Hp=Y(lp,{name:W(jp),cmt:W(jp),desc:W(jp),src:W(jp),link:W(Ap),number:W(ip),type:W(jp),rtept:Ro(W(Dp))}),Ip=Y(lp,"name cmt desc src link number type trkseg".split(" ")),Lp=Y(lp,{name:W(jp),cmt:W(jp),desc:W(jp),src:W(jp),link:W(Ap),number:W(ip),type:W(jp),trkseg:Ro(W(function(a,b,c){Xo({node:a,geometryLayout:b.b,properties:{}},Jp,Kp,b.v(),c)}))}),Kp=So("trkpt"),Jp=Y(lp,{trkpt:W(Dp)}),
Ep=Y(lp,"ele time magvar geoidheight name cmt desc src link sym type fix sat hdop vdop pdop ageofdgpsdata dgpsid".split(" ")),Fp=Y(lp,{ele:W(hp),time:W(function(a,b){var c=new Date(1E3*b),c=c.getUTCFullYear()+"-"+Ia(c.getUTCMonth()+1)+"-"+Ia(c.getUTCDate())+"T"+Ia(c.getUTCHours())+":"+Ia(c.getUTCMinutes())+":"+Ia(c.getUTCSeconds())+"Z";a.appendChild(oo.createTextNode(c))}),magvar:W(hp),geoidheight:W(hp),name:W(jp),cmt:W(jp),desc:W(jp),src:W(jp),link:W(Ap),sym:W(jp),type:W(jp),fix:W(jp),sat:W(ip),
hdop:W(hp),vdop:W(hp),pdop:W(hp),ageofdgpsdata:W(hp),dgpsid:W(ip)});
Y(lp,{rte:W(function(a,b,c){var d=b.kb();a={node:a,properties:d};b=b.J();u(b)&&(a.geometryLayout=b.b,b=b.v(),d.rtept=b);b=Gp[c[c.length-1].node.namespaceURI];d=Vo(d,b);Xo(a,Hp,Uo,d,c,b)}),trk:W(function(a,b,c){var d=b.kb();a={node:a,properties:d};b=b.J();u(b)&&(b=b.Tc(),d.trkseg=b);b=Ip[c[c.length-1].node.namespaceURI];d=Vo(d,b);Xo(a,Lp,Uo,d,c,b)}),wpt:W(function(a,b,c){var d=c[c.length-1],e=b.kb();d.properties=e;b=b.J();u(b)&&(d.geometryLayout=b.b,Dp(a,b.v(),c))})});function Mp(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);};function Np(){}B(Np,ko);function Op(a){return pa(a)?a:la(a)?(a=G.De?JSON.parse(a):Mp(a),u(a)?a:null):null}l=Np.prototype;l.A=ca("json");l.vb=function(a){return Pp(Op(a))};l.ua=function(a){return this.a(Op(a))};l.gd=function(a){a=Op(a);return Qp(a)};l.ka=function(a){return this.d(Op(a))};l.td=function(a){return Rp(a)};l.yc=function(a){var b=[],c,d;c=0;for(d=a.length;c<d;++c)b.push(Rp(a[c]));return{type:"FeatureCollection",features:b}};l.ud=function(a){return this.b(a)};function Sp(a){a=u(a)?a:{};this.c=Sg(a.defaultProjection?a.defaultProjection:"EPSG:4326")}B(Sp,Np);function Qp(a){return null===a?null:(0,Tp[a.type])(a)}function Up(a){return(0,Vp[a.A()])(a)}
var Tp={Point:function(a){return new hg(a.coordinates)},LineString:function(a){return new $l(a.coordinates)},Polygon:function(a){return new pg(a.coordinates)},MultiPoint:function(a){return new em(a.coordinates)},MultiLineString:function(a){return new bm(a.coordinates)},MultiPolygon:function(a){return new fm(a.coordinates)},GeometryCollection:function(a){a=Na(a.geometries,Qp);return new Tl(a)}},Vp={Point:function(a){return{type:"Point",coordinates:a.v()}},LineString:function(a){return{type:"LineString",
coordinates:a.v()}},Polygon:function(a){return{type:"Polygon",coordinates:a.v()}},MultiPoint:function(a){return{type:"MultiPoint",coordinates:a.v()}},MultiLineString:function(a){return{type:"MultiLineString",coordinates:a.v()}},MultiPolygon:function(a){return{type:"MultiPolygon",coordinates:a.v()}},GeometryCollection:function(a){return{type:"GeometryCollection",geometries:Na(a.a,Up)}},Circle:function(){return{type:"GeometryCollection",geometries:[]}}};
function Pp(a){var b=Qp(a.geometry),b=new Ue(b);u(a.id)&&b.b(a.id);u(a.properties)&&b.T(a.properties);return b}Sp.prototype.a=function(a){if("Feature"==a.type)return[Pp(a)];if("FeatureCollection"==a.type){var b=[];a=a.features;var c,d;c=0;for(d=a.length;c<d;++c)b.push(Pp(a[c]));return b}return[]};Sp.prototype.ka=function(a){a=a.crs;return null!=a?"name"==a.type?Sg(a.properties.name):"EPSG"==a.type?Sg("EPSG:"+a.properties.code):null:this.c};
function Rp(a){var b={type:"Feature"},c=a.P;null!=c&&(b.id=c);c=a.J();null!=c&&(c=Up(c),b.geometry=c);a=a.kb();cc(a,"geometry");ac(a)||(b.properties=a);return b}Sp.prototype.b=Up;function Wp(a){a=Xp(a);return Na(a,function(a){return a.b.substring(a.c,a.a)})}function Yp(a,b,c,d){this.b=a;this.c=b;this.a=c;this.d=d}function Xp(a){for(var b=RegExp("\r\n|\r|\n","g"),c=0,d,e=[];d=b.exec(a);)c=new Yp(a,c,d.index,d.index+d[0].length),e.push(c),c=b.lastIndex;c<a.length&&(c=new Yp(a,c,a.length,a.length),e.push(c));return e};function Zp(){}B(Zp,ko);l=Zp.prototype;l.A=ca("text");l.vb=function(a){return $p(this,la(a)?a:"")};l.ua=function(a){a=$p(this,la(a)?a:"");return null===a?[]:[a]};l.gd=function(a){return this.c(la(a)?a:"")};l.ka=function(){return Sg("EPSG:4326")};l.td=function(a){return this.b(a)};l.yc=function(a){return this.d(a)};l.ud=function(a){return this.e(a)};function aq(a){a=u(a)?a:{};this.a=u(a.altitudeMode)?a.altitudeMode:"none"}B(aq,Zp);var bq=/^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/,cq=/^H.([A-Z]{3}).*?:(.*)/,dq=/^HFDTE(\d{2})(\d{2})(\d{2})/;
function $p(a,b){var c=a.a,d=Wp(b),e={},f=[],g=2E3,h=0,m=1,n,p;n=0;for(p=d.length;n<p;++n){var q=d[n],r;if("B"==q.charAt(0)){if(r=bq.exec(q)){var q=parseInt(r[1],10),s=parseInt(r[2],10),z=parseInt(r[3],10),x=parseInt(r[4],10)+parseInt(r[5],10)/6E4;"S"==r[6]&&(x=-x);var w=parseInt(r[7],10)+parseInt(r[8],10)/6E4;"W"==r[9]&&(w=-w);f.push(w,x);"none"!=c&&f.push("gps"==c?parseInt(r[11],10):"barometric"==c?parseInt(r[12],10):0);f.push(Date.UTC(g,h,m,q,s,z)/1E3)}}else if("H"==q.charAt(0))if(r=dq.exec(q))m=
parseInt(r[1],10),h=parseInt(r[2],10)-1,g=2E3+parseInt(r[3],10);else if(r=cq.exec(q))e[r[1]]=Ba(r[2]),dq.exec(q)}d=new $l(null);am(d,"none"==c?"XYM":"XYZM",f);c=new Ue(d);c.T(e);return c};function eq(a){function b(a){return ia(a)?a:la(a)?(!(a in d)&&"#"+a in d&&(a="#"+a),b(d[a])):c}a=u(a)?a:{};var c=u(a.defaultStyle)?a.defaultStyle:fq,d={};this.a=d;this.c=function(){var a=this.get("Style");if(u(a))return a;a=this.get("styleUrl");return u(a)?b(a):c}}B(eq,Yo);
var gq=["http://www.google.com/kml/ext/2.2"],hq=[null,"http://earth.google.com/kml/2.0","http://earth.google.com/kml/2.1","http://earth.google.com/kml/2.2","http://www.opengis.net/kml/2.2"],iq=[255,255,255,1],jq=new Pe({color:iq}),kq=[2,20],lq=[32,32],mq=new Mk({anchor:kq,anchorXUnits:"pixels",anchorYUnits:"pixels",crossOrigin:"anonymous",rotation:0,scale:1,size:lq,src:"https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"}),nq=new Re({color:iq,width:1}),fq=[new Te({fill:jq,image:mq,text:null,
stroke:nq,zIndex:0})],oq={fraction:"fraction",pixels:"pixels"};function pq(a){a=so(a);if(a=/^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(a))return a=a[1],[parseInt(a.substr(6,2),16),parseInt(a.substr(4,2),16),parseInt(a.substr(2,2),16),parseInt(a.substr(0,2),16)/255]}
function qq(a){a=so(a);for(var b=[],c=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i,d;d=c.exec(a);)b.push(parseFloat(d[1]),parseFloat(d[2]),d[3]?parseFloat(d[3]):0),a=a.substr(d[0].length);return""!==a?void 0:b}function rq(a){var b=so(a);return null!=a.baseURI?Lh(a.baseURI,Ba(b)).toString():Ba(b)}function sq(a,b){return Z(null,tq,a,b)}
function uq(a,b){var c=Z({h:[],Ae:[]},vq,a,b);if(u(c)){var d=c.h,c=c.Ae,e,f;e=0;for(f=Math.min(d.length,c.length);e<f;++e)d[4*e+3]=c[e];c=new $l(null);am(c,"XYZM",d);return c}}function wq(a,b){var c=Z(null,xq,a,b);if(u(c)){var d=new $l(null);am(d,"XYZ",c);return d}}function yq(a,b){var c=Z(null,xq,a,b);if(u(c)){var d=new pg(null);qg(d,"XYZ",c,[c.length]);return d}}
function zq(a,b){var c=Z([],Aq,a,b);if(!u(c))return null;if(0===c.length)return new Tl(c);var d=!0,e=c[0].A(),f,g,h;g=1;for(h=c.length;g<h;++g)if(f=c[g],f.A()!=e){d=!1;break}if(d){if("Point"==e){f=c[0];d=f.b;e=f.h;g=1;for(h=c.length;g<h;++g)f=c[g],If(e,f.h);c=new em(null);Nf(c,d,e);c.s();return c}return"LineString"==e?(f=new bm(null),dm(f,c),f):"Polygon"==e?(f=new fm(null),hm(f,c),f):"GeometryCollection"==e?new Tl(c):null}return new Tl(c)}
function Bq(a,b){var c=Z(null,xq,a,b);if(null!=c){var d=new hg(null);ig(d,"XYZ",c);return d}}function Cq(a,b){var c=Z([null],Dq,a,b);if(null!=c&&null!==c[0]){var d=new pg(null),e=c[0],f=[e.length],g,h;g=1;for(h=c.length;g<h;++g)If(e,c[g]),f.push(e.length);qg(d,"XYZ",e,f);return d}}
function Eq(a,b){var c=Z({},Fq,a,b);if(!u(c))return null;var d=F(c,"fillStyle",jq),e=F(c,"fill");u(e)&&!e&&(d=null);var e=F(c,"imageStyle",mq),f=F(c,"strokeStyle",nq),c=F(c,"outline");u(c)&&!c&&(f=null);return[new Te({fill:d,image:e,stroke:f,text:null,zIndex:void 0})]}
var Gq=Y(hq,{value:Po($)},void 0),Iq=Y(hq,{Data:function(a,b){var c=a.getAttribute("name");if(null!==c){var d=Z(void 0,Gq,a,b);u(d)&&(b[b.length-1][c]=d)}},SchemaData:function(a,b){Wo(Hq,a,b)}},void 0),tq=Y(hq,{coordinates:Po(qq)},void 0),Dq=Y(hq,{innerBoundaryIs:function(a,b){var c=Z(void 0,Jq,a,b);u(c)&&b[b.length-1].push(c)},outerBoundaryIs:function(a,b){var c=Z(void 0,Kq,a,b);u(c)&&(b[b.length-1][0]=c)}},void 0),Lq=Y(gq,{coord:function(a,b){var c=b[b.length-1].h,d=so(a);(d=/^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(d))?
c.push(parseFloat(d[1]),parseFloat(d[2]),parseFloat(d[3]),0):c.push(0,0,0,0)}},void 0),vq=Y(hq,{when:function(a,b){var c=b[b.length-1].Ae,d=so(a);if(d=/^\s*(\d{4})($|-(\d{2})($|-(\d{2})($|T(\d{2}):(\d{2}):(\d{2})(Z|(?:([+\-])(\d{2})(?::(\d{2}))?)))))\s*$/.exec(d)){var e=Date.UTC(parseInt(d[1],10),u(d[3])?parseInt(d[3],10)-1:0,u(d[5])?parseInt(d[5],10):1,u(d[7])?parseInt(d[7],10):0,u(d[8])?parseInt(d[8],10):0,u(d[9])?parseInt(d[9],10):0);if(u(d[10])&&"Z"!=d[10]){var f="-"==d[11]?-1:1,e=e+60*f*parseInt(d[12],
10);u(d[13])&&(e+=3600*f*parseInt(d[13],10))}c.push(e)}else c.push(0)}},Lq),xq=Y(hq,{coordinates:Po(qq)},void 0),Mq=Y(hq,{href:V(rq)},void 0),Nq=Y(hq,{Icon:V(function(a,b){var c=Z({},Mq,a,b);return u(c)?c:null}),heading:V(dp),hotSpot:V(function(a){var b=a.getAttribute("xunits"),c=a.getAttribute("yunits");return{x:parseFloat(a.getAttribute("x")),ui:oq[b],y:parseFloat(a.getAttribute("y")),vi:oq[c]}}),scale:V(function(a){a=dp(a);if(u(a))return Math.sqrt(a)})},void 0),Jq=Y(hq,{LinearRing:Po(sq)},void 0),
Oq=Y(hq,{color:V(pq),width:V(dp)},void 0),Aq=Y(hq,{LineString:Oo(wq),LinearRing:Oo(yq),MultiGeometry:Oo(zq),Point:Oo(Bq),Polygon:Oo(Cq)},void 0),Pq=Y(gq,{Track:Oo(uq)},void 0),Kq=Y(hq,{LinearRing:Po(sq)},void 0),Qq=Y(hq,{Style:V(Eq),key:V($),styleUrl:V(function(a){var b=Ba(so(a));return null!=a.baseURI?Lh(a.baseURI,b).toString():b})},void 0),Sq={ExtendedData:function(a,b){Wo(Iq,a,b)},MultiGeometry:V(zq,"geometry"),LineString:V(wq,"geometry"),LinearRing:V(yq,"geometry"),Point:V(Bq,"geometry"),Polygon:V(Cq,
"geometry"),Style:V(Eq),StyleMap:function(a,b){var c=Z(void 0,Rq,a,b);if(u(c)){var d=b[b.length-1];ia(c)?d.Style=c:la(c)&&(d.styleUrl=c)}},address:V($),description:V($),name:V($),open:V(ap),phoneNumber:V($),styleUrl:V(rq),visibility:V(ap)},Tq=Y(gq,{MultiTrack:V(function(a,b){var c=Z([],Pq,a,b);if(u(c)){var d=new bm(null);dm(d,c);return d}},"geometry"),Track:V(uq,"geometry")},void 0),Uq=Y(hq,Sq,Tq),Vq=Y(hq,{color:V(pq),fill:V(ap),outline:V(ap)},void 0),Hq=Y(hq,{SimpleData:function(a,b){var c=a.getAttribute("name");
if(null!==c){var d=$(a);b[b.length-1][c]=d}}},void 0),Fq=Y(hq,{IconStyle:function(a,b){var c=Z({},Nq,a,b);if(u(c)){var d=b[b.length-1],e;e=F(F(c,"Icon",{}),"href");e=u(e)?e:"https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png";var f,g,h,m=F(c,"hotSpot");u(m)?(f=[m.x,m.y],g=m.ui,h=m.vi):"https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"===e?(f=kq,h=g="pixels"):/^http:\/\/maps\.(?:google|gstatic)\.com\//.test(e)&&(f=[0.5,0],h=g="fraction");var n,m=F(c,"heading");u(m)&&(n=Sb(m));
var c=F(c,"scale"),p;"https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"==e&&(p=lq);f=new Mk({anchor:f,anchorOrigin:"bottom-left",anchorXUnits:g,anchorYUnits:h,crossOrigin:"anonymous",rotation:n,scale:c,size:p,src:e});d.imageStyle=f}},LineStyle:function(a,b){var c=Z({},Oq,a,b);u(c)&&(b[b.length-1].strokeStyle=new Re({color:F(c,"color",iq),width:F(c,"width",1)}))},PolyStyle:function(a,b){var c=Z({},Vq,a,b);if(u(c)){var d=b[b.length-1];d.fillStyle=new Pe({color:F(c,"color",iq)});var e=F(c,
"fill");u(e)&&(d.fill=e);c=F(c,"outline");u(c)&&(d.outline=c)}}},void 0),Rq=Y(hq,{Pair:function(a,b){var c=Z({},Qq,a,b);if(u(c)){var d=F(c,"key");u(d)&&"normal"==d&&(d=F(c,"styleUrl"),u(d)&&(b[b.length-1]=d),c=F(c,"Style"),u(c)&&(b[b.length-1]=c))}}},void 0);l=eq.prototype;l.me=function(a,b){wo(a);var c;c={Folder:No(this.me,this),Placemark:Oo(this.hd,this),Style:wa(this.Ph,this),StyleMap:wa(this.Oh,this)};c=Y(hq,c,void 0);c=Z([],c,a,b,this);if(u(c))return c};
l.hd=function(a,b){var c=Z({geometry:null},Uq,a,b);if(u(c)){var d=new Ue,e=a.getAttribute("id");null===e||d.b(e);d.T(c);d.j(this.c);return d}};l.Ph=function(a,b){var c=a.getAttribute("id");if(null!==c){var d=Eq(a,b);u(d)&&(c=null!=a.baseURI?Lh(a.baseURI,"#"+c).toString():"#"+c,this.a[c]=d)}};l.Oh=function(a,b){var c=a.getAttribute("id");if(null!==c){var d=Z(void 0,Rq,a,b);u(d)&&(c=null!=a.baseURI?Lh(a.baseURI,"#"+c).toString():"#"+c,this.a[c]=d)}};
l.ne=function(a){if(-1==La(hq,a.namespaceURI))return null;a=this.hd(a,[]);return u(a)?a:null};l.wb=function(a){if(-1==La(hq,a.namespaceURI))return[];var b;b=wo(a);if("Document"==b||"Folder"==b)return b=this.me(a,[]),u(b)?b:[];if("Placemark"==b)return b=this.hd(a,[]),u(b)?[b]:[];if("kml"==b){b=[];for(a=a.firstElementChild;null!==a;a=a.nextElementSibling){var c=this.wb(a);u(c)&&Ua(b,c)}return b}return[]};
l.Nh=function(a){if(zo(a))return Wq(this,a);if(Co(a))return Xq(this,a);if(la(a))return a=Mo(a),Wq(this,a)};function Wq(a,b){var c;for(c=b.firstChild;null!==c;c=c.nextSibling)if(1==c.nodeType){var d=Xq(a,c);if(u(d))return d}}
function Xq(a,b){var c;for(c=b.firstElementChild;null!==c;c=c.nextElementSibling)if(-1!=La(hq,c.namespaceURI)&&"name"==c.localName)return $(c);for(c=b.firstElementChild;null!==c;c=c.nextElementSibling){var d=wo(c);if(-1!=La(hq,c.namespaceURI)&&("Document"==d||"Folder"==d||"Placemark"==d||"kml"==d)&&(d=Xq(a,c),u(d)))return d}}l.sc=function(){return Sg("EPSG:4326")};l.jd=function(){return Sg("EPSG:4326")};function Yq(){}B(Yq,Yo);function Zq(a,b){var c=a.getAttribute("k"),d=a.getAttribute("v");b[b.length-1].Ub[c]=d}
var $q=[null],ar=Y($q,{nd:function(a,b){b[b.length-1].pb.push(a.getAttribute("ref"))},tag:Zq},void 0),cr=Y($q,{node:function(a,b){var c=b[b.length-1],d=a.getAttribute("id"),e=[parseFloat(a.getAttribute("lon")),parseFloat(a.getAttribute("lat"))];c.Yd[d]=e;var f=Z({Ub:{}},br,a,b);ac(f.Ub)||(e=new hg(e),e=new Ue(e),e.b(d),e.T(f.Ub),c.features.push(e))},way:function(a,b){for(var c=a.getAttribute("id"),d=Z({pb:[],Ub:{}},ar,a,b),e=b[b.length-1],f=[],g=0,h=d.pb.length;g<h;g++)Ua(f,F(e.Yd,d.pb[g]));d.pb[0]==
d.pb[d.pb.length-1]?(g=new pg(null),qg(g,"XY",f,[f.length])):(g=new $l(null),am(g,"XY",f));f=new Ue(g);f.b(c);f.T(d.Ub);e.features.push(f)}},void 0),br=Y($q,{tag:Zq},void 0);Yq.prototype.wb=function(a){return"osm"==a.localName&&(a=Z({Yd:{},features:[]},cr,a,[]),u(a.features))?a.features:[]};Yq.prototype.sc=function(){return Sg("EPSG:4326")};Yq.prototype.jd=function(){return Sg("EPSG:4326")};function dr(a){this.c=Sg((u(a)?a:{}).defaultProjection||"EPSG:4326")}B(dr,Np);function er(a,b){var c=[],d,e,f;e=0;for(f=a.length;e<f;++e)d=a[e],0<e&&c.pop(),d=0<=d?b[d]:b[~d].slice().reverse(),c.push.apply(c,d);e=0;for(f=c.length;e<f;++e)c[e]=c[e].slice();return c}function fr(a,b,c,d){a=a.geometries;var e=[],f,g;f=0;for(g=a.length;f<g;++f)e[f]=gr(a[f],b,c,d);return e}
function gr(a,b,c,d){var e=a.type,f=hr[e];b="Point"===e||"MultiPoint"===e?f(a,c,d):f(a,b);c=new Ue;c.cb(b);u(a.id)&&c.b(a.id);u(a.properties)&&c.T(a.properties);return c}
dr.prototype.a=function(a){if("Topology"==a.type){var b,c=null,d=null;u(a.transform)&&(b=a.transform,c=b.scale,d=b.translate);var e=a.arcs;if(u(b)){b=c;var f=d,g,h;g=0;for(h=e.length;g<h;++g)for(var m=e[g],n=b,p=f,q=0,r=0,s=void 0,z=void 0,x=void 0,z=0,x=m.length;z<x;++z)s=m[z],q+=s[0],r+=s[1],s[0]=q,s[1]=r,ir(s,n,p)}b=[];a=Zb(a.objects);f=0;for(g=a.length;f<g;++f)"GeometryCollection"===a[f].type?(h=a[f],b.push.apply(b,fr(h,e,c,d))):(h=a[f],b.push(gr(h,e,c,d)));return b}return[]};
function ir(a,b,c){a[0]=a[0]*b[0]+c[0];a[1]=a[1]*b[1]+c[1]}dr.prototype.ka=k("c");
var hr={Point:function(a,b,c){a=a.coordinates;null===b||null===c||ir(a,b,c);return new hg(a)},LineString:function(a,b){var c=er(a.arcs,b);return new $l(c)},Polygon:function(a,b){var c=[],d,e;d=0;for(e=a.arcs.length;d<e;++d)c[d]=er(a.arcs[d],b);return new pg(c)},MultiPoint:function(a,b,c){a=a.coordinates;var d,e;if(null!==b&&null!==c)for(d=0,e=a.length;d<e;++d)ir(a[d],b,c);return new em(a)},MultiLineString:function(a,b){var c=[],d,e;d=0;for(e=a.arcs.length;d<e;++d)c[d]=er(a.arcs[d],b);return new bm(c)},
MultiPolygon:function(a,b){var c=[],d,e,f,g,h,m;h=0;for(m=a.arcs.length;h<m;++h){d=a.arcs[h];e=[];f=0;for(g=d.length;f<g;++f)e[f]=er(d[f],b);c[h]=e}return new fm(c)}};var jr={"http://www.opengis.net/gml":{featureMembers:Po(function(a,b){var c=wo(a),d=b[0],e=F(d,"featureType"),f;"FeatureCollection"==c?f=Z(null,jr,a,b):"featureMembers"==c&&(c={},f={},c[e]=Oo(kr),f[F(d,"featureNS")]=c,f=Z([],f,a,b));u(f)||(f=[]);return f})}};function lr(a,b){var c=a.firstElementChild.getAttribute("srsName");b[0].srsName=c;c=Z(null,mr,a,b);if(null!=c)return c}
function kr(a,b){var c,d=a.getAttribute("fid")||Go(a,"http://www.opengis.net/gml","id"),e={},f;for(c=a.firstElementChild;null!==c;c=c.nextElementSibling)if(0===c.childNodes.length||1===c.childNodes.length&&3===c.firstChild.nodeType){var g=so(c);/^[\s\xa0]*$/.test(g)&&(g=void 0);e[wo(c)]=g}else f=wo(c),e[f]=lr(c,b);c=new Ue(e);u(f)&&c.k(f);d&&c.b(d);return c}function nr(a,b){Wo(or,a,b)}function pr(a,b){Wo(qr,a,b)}function rr(a,b){Wo(sr,a,b)}function tr(a,b){Wo(ur,a,b)}function vr(a,b){Wo(wr,a,b)}
function xr(a,b){var c=yr(a,b);if(null!=c){var d=new $l(null);am(d,"XYZ",c);return d}}function zr(a,b){var c=Z([null],Ar,a,b);if(u(c)&&null!==c[0]){var d=new pg(null),e=c[0],f=[e.length],g,h;g=1;for(h=c.length;g<h;++g)If(e,c[g]),f.push(e.length);qg(d,"XYZ",e,f);return d}}function Br(a,b){var c=Z([null],Cr,a,b);if(u(c)&&null!==c[0]){var d=new pg(null),e=c[0],f=[e.length],g,h;g=1;for(h=c.length;g<h;++g)If(e,c[g]),f.push(e.length);qg(d,"XYZ",e,f);return d}}
function Dr(a,b){var c=Z([null],Er,a,b);if(u(c)){var d=new $l(null);am(d,"XYZ",c);return d}}function yr(a,b){return Z(null,Fr,a,b)}
function Gr(a,b){var c=so(a).replace(/^\s*|\s*$/g,""),d=F(b[0],"srsName"),e=a.parentNode.getAttribute("srsDimension"),f="enu";null===d||(f=zg(Sg(d)));c=c.split(/\s+/);d=2;ha(a.getAttribute("srsDimension"))?ha(a.getAttribute("dimension"))?null===e||(d=gp(e)):d=gp(a.getAttribute("dimension")):d=gp(a.getAttribute("srsDimension"));for(var g,h,m=[],n=0,p=c.length;n<p;n+=d)e=parseFloat(c[n]),g=parseFloat(c[n+1]),h=3===d?parseFloat(c[n+2]):0,"en"===f.substr(0,2)?m.push(e,g,h):m.push(g,e,h);return m}
var mr={"http://www.opengis.net/gml":{Point:Po(function(a,b){var c=yr(a,b);if(null!=c){var d=new hg(null);ig(d,"XYZ",c);return d}}),MultiPoint:Po(function(a,b){var c=Z([],Hr,a,b);if(u(c))return new em(c)}),LineString:Po(xr),MultiLineString:Po(function(a,b){var c=Z([],Ir,a,b);if(u(c)){var d=new bm(null);dm(d,c);return d}}),LinearRing:Po(function(a,b){var c=yr(a,b);if(u(c)){var d=new eg(null);gg(d,"XYZ",c);return d}}),Polygon:Po(zr),MultiPolygon:Po(function(a,b){var c=Z([],Jr,a,b);if(u(c)){var d=new fm(null);
hm(d,c);return d}}),Surface:Po(Br),MultiSurface:Po(function(a,b){var c=Z([],Kr,a,b);if(u(c)){var d=new fm(null);hm(d,c);return d}}),Curve:Po(Dr),MultiCurve:Po(function(a,b){var c=Z([],Lr,a,b);if(u(c)){var d=new bm(null);dm(d,c);return d}}),Envelope:Po(function(a,b){var c=Z([null],Mr,a,b);return nf(c[1][0],c[1][1],c[2][0],c[2][1])})}},Fr={"http://www.opengis.net/gml":{pos:Po(function(a,b){for(var c=so(a),d=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*/,e=[],f;f=d.exec(c);)e.push(parseFloat(f[1])),c=c.substr(f[0].length);
if(""===c){c=F(b[0],"srsName");d="enu";null===c||(d=zg(Sg(c)));if("neu"===d)for(c=0,d=e.length;c<d;c+=3)f=e[c],e[c]=e[c+1],e[c+1]=f;c=e.length;2==c&&e.push(0);return 0===c?void 0:e}}),posList:Po(Gr)}},Ar={"http://www.opengis.net/gml":{interior:function(a,b){var c=Z(void 0,Nr,a,b);u(c)&&b[b.length-1].push(c)},exterior:function(a,b){var c=Z(void 0,Nr,a,b);u(c)&&(b[b.length-1][0]=c)}}},Hr={"http://www.opengis.net/gml":{pointMember:Oo(nr),pointMembers:Oo(nr)}},Ir={"http://www.opengis.net/gml":{lineStringMember:Oo(pr),
lineStringMembers:Oo(pr)}},Lr={"http://www.opengis.net/gml":{curveMember:Oo(rr),curveMembers:Oo(rr)}},Kr={"http://www.opengis.net/gml":{surfaceMember:Oo(tr),surfaceMembers:Oo(tr)}},Jr={"http://www.opengis.net/gml":{polygonMember:Oo(vr),polygonMembers:Oo(vr)}},or={"http://www.opengis.net/gml":{Point:Oo(yr)}},qr={"http://www.opengis.net/gml":{LineString:Oo(xr)}},sr={"http://www.opengis.net/gml":{LineString:Oo(xr),Curve:Oo(Dr)}},ur={"http://www.opengis.net/gml":{Polygon:Oo(zr),Surface:Oo(Br)}},wr={"http://www.opengis.net/gml":{Polygon:Oo(zr)}},
Cr={"http://www.opengis.net/gml":{patches:Po(function(a,b){return Z([null],Or,a,b)})}},Er={"http://www.opengis.net/gml":{segments:Po(function(a,b){return Z([null],Pr,a,b)})}},Mr={"http://www.opengis.net/gml":{lowerCorner:Oo(Gr),upperCorner:Oo(Gr)}},Or={"http://www.opengis.net/gml":{PolygonPatch:Po(function(a,b){return Z([null],Ar,a,b)})}},Pr={"http://www.opengis.net/gml":{LineStringSegment:Po(function(a,b){return Z([null],Fr,a,b)})}},Nr={"http://www.opengis.net/gml":{LinearRing:Po(function(a,b){var c=
Z(null,Fr,a,b);if(null!=c)return c})}};function Qr(a,b,c){c=F(c[c.length-1],"srsName");b=b.v();for(var d=b.length,e=Array(d),f,g=0;g<d;++g){f=b[g];var h=e,m=g,n="enu";null!=c&&(n=zg(Sg(c)));h[m]="en"===n.substr(0,2)?f[0]+" "+f[1]:f[1]+" "+f[0]}jp(a,e.join(" "))}
function Rr(a,b,c){var d=F(c[c.length-1],"srsName");null!=d&&a.setAttribute("srsName",d);d=ro(a.namespaceURI,"pos");a.appendChild(d);c=F(c[c.length-1],"srsName");a="enu";null!=c&&(a=zg(Sg(c)));b=b.v();jp(d,"en"===a.substr(0,2)?b[0]+" "+b[1]:b[1]+" "+b[0])}var Sr={"http://www.opengis.net/gml":{lowerCorner:W(jp),upperCorner:W(jp)}};function Tr(a,b,c){var d=F(c[c.length-1],"srsName");null!=d&&a.setAttribute("srsName",d);d=ro(a.namespaceURI,"posList");a.appendChild(d);Qr(d,b,c)}
function Ur(a,b){var c=b[b.length-1],d=c.node,e=F(c,"exteriorWritten");u(e)||(c.exteriorWritten=!0);return ro(d.namespaceURI,u(e)?"interior":"exterior")}
function Vr(a,b,c){var d=F(c[c.length-1],"srsName");"PolygonPatch"!==a.nodeName&&null!=d&&a.setAttribute("srsName",d);"Polygon"===a.nodeName||"PolygonPatch"===a.nodeName?(b=b.Nd(),Xo({node:a,srsName:d},Wr,Ur,b,c)):"Surface"===a.nodeName&&(d=ro(a.namespaceURI,"patches"),a.appendChild(d),a=ro(d.namespaceURI,"PolygonPatch"),d.appendChild(a),Vr(a,b,c))}
function Xr(a,b,c){var d=F(c[c.length-1],"srsName");"LineStringSegment"!==a.nodeName&&null!=d&&a.setAttribute("srsName",d);"LineString"===a.nodeName||"LineStringSegment"===a.nodeName?(d=ro(a.namespaceURI,"posList"),a.appendChild(d),Qr(d,b,c)):"Curve"===a.nodeName&&(d=ro(a.namespaceURI,"segments"),a.appendChild(d),a=ro(d.namespaceURI,"LineStringSegment"),d.appendChild(a),Xr(a,b,c))}
function Yr(a,b,c){var d=c[c.length-1],e=F(d,"srsName"),d=F(d,"surface");null!=e&&a.setAttribute("srsName",e);b=b.Pd();Xo({node:a,srsName:e,surface:d},Zr,$r,b,c)}function as(a,b,c){var d=c[c.length-1],e=F(d,"srsName"),d=F(d,"curve");null!=e&&a.setAttribute("srsName",e);b=b.Tc();Xo({node:a,srsName:e,curve:d},bs,$r,b,c)}function cs(a,b,c){var d=ro(a.namespaceURI,"LinearRing");a.appendChild(d);Tr(d,b,c)}function ds(a,b,c){var d=es(b,c);u(d)&&(a.appendChild(d),Vr(d,b,c))}
function fs(a,b,c){var d=es(b,c);u(d)&&(a.appendChild(d),Xr(d,b,c))}function gs(a,b,c){var d=ec(c[c.length-1]);d.node=a;Xo(d,hs,es,[b],c)}
var Zr={"http://www.opengis.net/gml":{surfaceMember:W(ds),polygonMember:W(ds)}},is={"http://www.opengis.net/gml":{pointMember:W(function(a,b,c){var d=ro(a.namespaceURI,"Point");a.appendChild(d);Rr(d,b,c)})}},bs={"http://www.opengis.net/gml":{lineStringMember:W(fs),curveMember:W(fs)}},Wr={"http://www.opengis.net/gml":{exterior:W(cs),interior:W(cs)}},hs={"http://www.opengis.net/gml":{Curve:W(Xr),MultiCurve:W(as),Point:W(Rr),MultiPoint:W(function(a,b,c){var d=F(c[c.length-1],"srsName");null!=d&&a.setAttribute("srsName",
d);b=b.Od();Xo({node:a,srsName:d},is,So("pointMember"),b,c)}),LineString:W(Xr),MultiLineString:W(as),LinearRing:W(Tr),Polygon:W(Vr),MultiPolygon:W(Yr),Surface:W(Vr),MultiSurface:W(Yr),Envelope:W(function(a,b,c){var d=F(c[c.length-1],"srsName");u(d)&&a.setAttribute("srsName",d);Xo({node:a},Sr,Uo,[b[0]+" "+b[1],b[2]+" "+b[3]],c,["lowerCorner","upperCorner"])})}},js={MultiLineString:"lineStringMember",MultiCurve:"curveMember",MultiPolygon:"polygonMember",MultiSurface:"surfaceMember"};
function $r(a,b){return ro("http://www.opengis.net/gml",js[b[b.length-1].node.nodeName])}function es(a,b){var c=b[b.length-1],d=F(c,"multiSurface"),e=F(c,"surface"),f=F(c,"curve"),c=F(c,"multiCurve"),g;ia(a)?g="Envelope":(g=a.A(),"MultiPolygon"===g&&!0===d?g="MultiSurface":"Polygon"===g&&!0===e?g="Surface":"LineString"===g&&!0===f?g="Curve":"MultiLineString"===g&&!0===c&&(g="MultiCurve"));return ro("http://www.opengis.net/gml",g)};function ks(a){a=u(a)?a:{};this.b=a.featureType;this.a=a.featureNS;this.c=u(a.schemaLocation)?a.schemaLocation:"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"}B(ks,Yo);ks.prototype.wb=function(a){a=Z(null,jr,a,[{featureType:this.b,featureNS:this.a}]);u(a)||(a=[]);return a};ks.prototype.f=function(a){if(zo(a))return ls(a);if(Co(a))return Z({},ms,a,[]);if(la(a))return a=Mo(a),ls(a)};
ks.prototype.d=function(a){if(zo(a))return ns(a);if(Co(a))return os(a);if(la(a))return a=Mo(a),ns(a)};function ns(a){for(a=a.firstChild;null!==a;a=a.nextSibling)if(1==a.nodeType)return os(a)}var ps={"http://www.opengis.net/gml":{boundedBy:V(lr,"bounds")}};function os(a){var b={},c=gp(a.getAttribute("numberOfFeatures"));b.numberOfFeatures=c;return Z(b,ps,a,[])}
var qs={"http://www.opengis.net/wfs":{totalInserted:V(fp),totalUpdated:V(fp),totalDeleted:V(fp)}},rs={"http://www.opengis.net/ogc":{FeatureId:Oo(function(a){return a.getAttribute("fid")})}},ss={"http://www.opengis.net/wfs":{Feature:function(a,b){Wo(rs,a,b)}}},ms={"http://www.opengis.net/wfs":{TransactionSummary:V(function(a,b){return Z({},qs,a,b)},"transactionSummary"),InsertResults:V(function(a,b){return Z([],ss,a,b)},"insertIds")}};
function ls(a){for(a=a.firstChild;null!==a;a=a.nextSibling)if(1==a.nodeType)return Z({},ms,a,[])}var ts={"http://www.opengis.net/wfs":{PropertyName:W(jp)}};function us(a,b){var c=ro("http://www.opengis.net/ogc","Filter"),d=ro("http://www.opengis.net/ogc","FeatureId");c.appendChild(d);d.setAttribute("fid",b);a.appendChild(c)}
var vs={"http://www.opengis.net/wfs":{Insert:W(function(a,b,c){var d=c[c.length-1],d=ro(F(d,"featureNS"),F(d,"featureType"));a.appendChild(d);a=b.P;u(a)&&d.setAttribute("fid",a);a=c[c.length-1];var e=F(a,"featureNS"),f=b.a;u(a.bb)||(a.bb={},a.bb[e]={});var g=b.kb();b=[];var h=[],m;for(m in g){var n=g[m];null!==n&&(b.push(m),h.push(n),m==f?m in a.bb[e]||(a.bb[e][m]=W(gs)):m in a.bb[e]||(a.bb[e][m]=W(jp)))}m=ec(a);m.node=d;Xo(m,a.bb,So(void 0,e),h,c,b)}),Update:W(function(a,b,c){var d=c[c.length-1];
a.setAttribute("typeName",F(d,"featurePrefix")+":"+F(d,"featureType"));d=b.P;if(u(d)){for(var e=b.qa(),f=[],g=0,h=e.length;g<h;g++){var m=b.get(e[g]);u(m)&&f.push({name:e[g],value:m})}Xo({node:a},vs,So("Property"),f,c);us(a,d)}}),Delete:W(function(a,b,c){c=c[c.length-1];a.setAttribute("typeName",F(c,"featurePrefix")+":"+F(c,"featureType"));b=b.P;u(b)&&us(a,b)}),Property:W(function(a,b,c){var d=ro("http://www.opengis.net/wfs","Name");a.appendChild(d);jp(d,b.name);null!=b.value&&(d=ro("http://www.opengis.net/wfs",
"Value"),a.appendChild(d),b.value instanceof De?gs(d,b.value,c):jp(d,b.value))}),Native:W(function(a,b){u(b.ni)&&a.setAttribute("vendorId",b.ni);u(b.Zh)&&a.setAttribute("safeToIgnore",b.Zh);u(b.value)&&jp(a,b.value)})}},ws={"http://www.opengis.net/wfs":{Query:W(function(a,b,c){var d=c[c.length-1],e=F(d,"featurePrefix"),f=F(d,"featureNS"),g=F(d,"propertyNames"),h=F(d,"srsName");a.setAttribute("typeName",(u(e)?e+":":"")+b);u(h)&&a.setAttribute("srsName",h);u(f)&&a.setAttribute("xmlns:"+e,f);b=ec(d);
b.node=a;Xo(b,ts,So("PropertyName"),g,c);d=F(d,"bbox");u(d)&&(g=ro("http://www.opengis.net/ogc","Filter"),b=F(c[c.length-1],"geometryName"),e=ro("http://www.opengis.net/ogc","BBOX"),g.appendChild(e),f=ro("http://www.opengis.net/ogc","PropertyName"),jp(f,b),e.appendChild(f),gs(e,d,c),a.appendChild(g))})}};
ks.prototype.i=function(a){var b=ro("http://www.opengis.net/wfs","GetFeature");b.setAttribute("service","WFS");b.setAttribute("version","1.1.0");u(a)&&(u(a.handle)&&b.setAttribute("handle",a.handle),u(a.outputFormat)&&b.setAttribute("outputFormat",a.outputFormat),u(a.maxFeatures)&&b.setAttribute("maxFeatures",a.maxFeatures),u(a.resultType)&&b.setAttribute("resultType",a.resultType),u(a.ci)&&b.setAttribute("startIndex",a.ci),u(a.count)&&b.setAttribute("count",a.count));Lo(b,"http://www.w3.org/2001/XMLSchema-instance",
"xsi:schemaLocation",this.c);var c=a.featureTypes;a=[{node:b,srsName:a.srsName,featureNS:u(a.featureNS)?a.featureNS:this.a,featurePrefix:a.featurePrefix,geometryName:a.geometryName,bbox:a.bbox,le:u(a.le)?a.le:[]}];var d=ec(a[a.length-1]);d.node=b;Xo(d,ws,So("Query"),c,a);return b};
ks.prototype.g=function(a,b,c,d){var e=[],f=ro("http://www.opengis.net/wfs","Transaction");f.setAttribute("service","WFS");f.setAttribute("version","1.1.0");u(d)&&u(d.handle)&&f.setAttribute("handle",d.handle);Lo(f,"http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.c);null!=a&&Xo({node:f,featureNS:d.featureNS,featureType:d.featureType},vs,So("Insert"),a,e);null!=b&&Xo({node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix},vs,So("Update"),b,e);null!=
c&&Xo({node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix},vs,So("Delete"),c,e);u(d.nativeElements)&&Xo({node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix},vs,So("Native"),d.nativeElements,e);return f};function xs(a){return a.getAttributeNS("http://www.w3.org/1999/xlink","href")};function ys(){}ys.prototype.a=function(a){return zo(a)?zs(this,a):Co(a)?As(this,a):la(a)?(a=Mo(a),zs(this,a)):null};function Bs(){this.version=void 0}B(Bs,ys);function zs(a,b){for(var c=b.firstChild;null!==c;c=c.nextSibling)if(1==c.nodeType)return As(a,c);return null}function As(a,b){a.version=Ba(b.getAttribute("version"));var c=Z({version:a.version},Cs,b,[]);return u(c)?c:null}function Ds(a,b){return Z({},Es,a,b)}function Fs(a,b){return Z({},Gs,a,b)}function Hs(a,b){var c=Ds(a,b);if(u(c)){var d=[gp(a.getAttribute("width")),gp(a.getAttribute("height"))];c.size=d;return c}}function Is(a,b){return Z([],Js,a,b)}
var Ks=[null,"http://www.opengis.net/wms"],Cs=Y(Ks,{Service:V(function(a,b){return Z({},Ls,a,b)}),Capability:V(function(a,b){return Z({},Ms,a,b)})},void 0),Ms=Y(Ks,{Request:V(function(a,b){return Z({},Ns,a,b)}),Exception:V(function(a,b){return Z([],Os,a,b)}),Layer:V(function(a,b){return Z({},Ps,a,b)})},void 0),Ls=Y(Ks,{Name:V($),Title:V($),Abstract:V($),KeywordList:V(Is),OnlineResource:V(xs),ContactInformation:V(function(a,b){return Z({},Qs,a,b)}),Fees:V($),AccessConstraints:V($),LayerLimit:V(fp),
MaxWidth:V(fp),MaxHeight:V(fp)},void 0),Qs=Y(Ks,{ContactPersonPrimary:V(function(a,b){return Z({},Rs,a,b)}),ContactPosition:V($),ContactAddress:V(function(a,b){return Z({},Ss,a,b)}),ContactVoiceTelephone:V($),ContactFacsimileTelephone:V($),ContactElectronicMailAddress:V($)},void 0),Rs=Y(Ks,{ContactPerson:V($),ContactOrganization:V($)},void 0),Ss=Y(Ks,{AddressType:V($),Address:V($),City:V($),StateOrProvince:V($),PostCode:V($),Country:V($)},void 0),Os=Y(Ks,{Format:Oo($)},void 0),Ps=Y(Ks,{Name:V($),
Title:V($),Abstract:V($),KeywordList:V(Is),CRS:Qo($),EX_GeographicBoundingBox:V(function(a,b){var c=Z({},Ts,a,b);if(u(c)){var d=F(c,"westBoundLongitude"),e=F(c,"southBoundLatitude"),f=F(c,"eastBoundLongitude"),c=F(c,"northBoundLatitude");return u(d)&&u(e)&&u(f)&&u(c)?[d,e,f,c]:void 0}}),BoundingBox:Qo(function(a){var b=[ep(a.getAttribute("minx")),ep(a.getAttribute("miny")),ep(a.getAttribute("maxx")),ep(a.getAttribute("maxy"))],c=[ep(a.getAttribute("resx")),ep(a.getAttribute("resy"))];return{crs:a.getAttribute("CRS"),
extent:b,res:c}}),Dimension:Qo(function(a){return{name:a.getAttribute("name"),units:a.getAttribute("units"),unitSymbol:a.getAttribute("unitSymbol"),"default":a.getAttribute("default"),multipleValues:bp(a.getAttribute("multipleValues")),nearestValue:bp(a.getAttribute("nearestValue")),current:bp(a.getAttribute("current")),values:$(a)}}),Attribution:V(function(a,b){return Z({},Us,a,b)}),AuthorityURL:Qo(function(a,b){var c=Ds(a,b);if(u(c)){var d=a.getAttribute("name");c.name=d;return c}}),Identifier:Qo($),
MetadataURL:Qo(function(a,b){var c=Ds(a,b);if(u(c)){var d=a.getAttribute("type");c.type=d;return c}}),DataURL:Qo(Ds),FeatureListURL:Qo(Ds),Style:Qo(function(a,b){return Z({},Vs,a,b)}),MinScaleDenominator:V(dp),MaxScaleDenominator:V(dp),Layer:Qo(function(a,b){var c=b[b.length-1],d=Z({},Ps,a,b);if(u(d)){var e=bp(a.getAttribute("queryable"));u(e)||(e=F(c,"queryable"));d.queryable=u(e)?e:!1;e=gp(a.getAttribute("cascaded"));u(e)||(e=F(c,"cascaded"));d.cascaded=e;e=bp(a.getAttribute("opaque"));u(e)||(e=
F(c,"opaque"));d.opaque=u(e)?e:!1;e=bp(a.getAttribute("noSubsets"));u(e)||(e=F(c,"noSubsets"));d.noSubsets=u(e)?e:!1;e=ep(a.getAttribute("fixedWidth"));u(e)||(e=F(c,"fixedWidth"));d.fixedWidth=e;e=ep(a.getAttribute("fixedHeight"));u(e)||(e=F(c,"fixedHeight"));d.fixedHeight=e;Ma(["Style","CRS","AuthorityURL"],function(a){u(F(c,a))&&dc(d,a)});Ma("EX_GeographicBoundingBox BoundingBox Dimension Attribution MinScaleDenominator MaxScaleDenominator".split(" "),function(a){u(F(d,a))||(d[a]=F(c,a))});return d}})},
void 0),Us=Y(Ks,{Title:V($),OnlineResource:V(xs),LogoURL:V(Hs)},void 0),Ts=Y(Ks,{westBoundLongitude:V(dp),eastBoundLongitude:V(dp),southBoundLatitude:V(dp),northBoundLatitude:V(dp)},void 0),Ns=Y(Ks,{GetCapabilities:V(Fs),GetMap:V(Fs),GetFeatureInfo:V(Fs)},void 0),Gs=Y(Ks,{Format:Qo($),DCPType:Qo(function(a,b){return Z({},Ws,a,b)})},void 0),Ws=Y(Ks,{HTTP:V(function(a,b){return Z({},Xs,a,b)})},void 0),Xs=Y(Ks,{Get:V(Ds),Post:V(Ds)},void 0),Vs=Y(Ks,{Name:V($),Title:V($),Abstract:V($),LegendURL:Qo(Hs),
StyleSheetURL:V(Ds),StyleURL:V(Ds)},void 0),Es=Y(Ks,{Format:V($),OnlineResource:V(xs)},void 0),Js=Y(Ks,{Keyword:Oo($)},void 0);function Ys(a,b){pe.call(this);this.a=new Sn(this);var c=a;b&&(c=jc(a));this.a.Z(c,"dragenter",this.yh);c!=a&&this.a.Z(c,"dragover",this.zh);this.a.Z(a,"dragover",this.Ah);this.a.Z(a,"drop",this.Bh)}B(Ys,pe);l=Ys.prototype;l.Fb=!1;l.w=function(){Ys.B.w.call(this);this.a.Eb()};l.yh=function(a){var b=a.G.dataTransfer;(this.Fb=!(!b||!(b.types&&(0<=La(b.types,"Files")||0<=La(b.types,"public.file-url"))||b.files&&0<b.files.length)))&&a.preventDefault()};
l.zh=function(a){this.Fb&&(a.preventDefault(),a.G.dataTransfer.dropEffect="none")};l.Ah=function(a){this.Fb&&(a.preventDefault(),a.za(),a=a.G.dataTransfer,a.effectAllowed="all",a.dropEffect="copy")};l.Bh=function(a){this.Fb&&(a.preventDefault(),a.za(),a=new Gd(a.G),a.type="drop",L(this,a))};/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
function Zs(a,b){this.b=[];this.f=a;this.e=b||null}l=Zs.prototype;l.jb=!1;l.Pb=!1;l.Kc=!1;l.Te=!1;l.md=!1;l.Lc=0;l.cancel=function(a){if(this.jb)this.c instanceof Zs&&this.c.cancel();else{if(this.a){var b=this.a;delete this.a;a?b.cancel(a):(b.Lc--,0>=b.Lc&&b.cancel())}this.f?this.f.call(this.e,this):this.md=!0;this.jb||(a=new $s(this),at(this),bt(this,!1,a))}};l.Fd=function(a,b){this.Kc=!1;bt(this,a,b)};function bt(a,b,c){a.jb=!0;a.c=c;a.Pb=!b;ct(a)}
function at(a){if(a.jb){if(!a.md)throw new dt(a);a.md=!1}}function et(a,b,c,d){a.b.push([b,c,d]);a.jb&&ct(a)}function ft(a){return Oa(a.b,function(a){return oa(a[1])})}
function ct(a){a.d&&(a.jb&&ft(a))&&(t.clearTimeout(a.d),delete a.d);a.a&&(a.a.Lc--,delete a.a);for(var b=a.c,c=!1,d=!1;a.b.length&&!a.Kc;){var e=a.b.shift(),f=e[0],g=e[1],e=e[2];if(f=a.Pb?g:f)try{var h=f.call(e||a.e,b);u(h)&&(a.Pb=a.Pb&&(h==b||h instanceof Error),a.c=b=h);b instanceof Zs&&(d=!0,a.Kc=!0)}catch(m){b=m,a.Pb=!0,ft(a)||(c=!0)}}a.c=b;d&&(et(b,wa(a.Fd,a,!0),wa(a.Fd,a,!1)),b.Te=!0);c&&(a.d=t.setTimeout(ke(b),0))}function dt(a){za.call(this);this.a=a}B(dt,za);dt.prototype.message="Deferred has already fired";
dt.prototype.name="AlreadyCalledError";function $s(a){za.call(this);this.a=a}B($s,za);$s.prototype.message="Deferred was canceled";$s.prototype.name="CanceledError";function gt(a,b){za.call(this,Aa("Error %s: %s",b,ht(a)));this.code=a}B(gt,za);
function ht(a){switch(a){case 1:return"File or directory not found";case 2:return"Insecure or disallowed operation";case 3:return"Operation aborted";case 4:return"File or directory not readable";case 5:return"Invalid encoding";case 6:return"Cannot modify file or directory";case 7:return"Invalid state";case 8:return"Invalid line-ending specifier";case 9:return"Invalid modification";case 10:return"Quota exceeded";case 11:return"Invalid filetype";case 12:return"File or directory already exists at specified path";
default:return"Unrecognized error"}};function it(a,b){yd.call(this,a.type,b);this.a=a}B(it,yd);function jt(){pe.call(this);this.la=new FileReader;this.la.onloadstart=wa(this.a,this);this.la.onprogress=wa(this.a,this);this.la.onload=wa(this.a,this);this.la.onabort=wa(this.a,this);this.la.onerror=wa(this.a,this);this.la.onloadend=wa(this.a,this)}B(jt,pe);jt.prototype.getError=function(){return this.la.error&&new gt(this.la.error.code,"reading file")};jt.prototype.a=function(a){L(this,new it(a,this))};jt.prototype.w=function(){jt.B.w.call(this);delete this.la};
function kt(a){var b=new Zs;a.addEventListener("loadend",xa(function(a,b){var e=b.la.result,f=b.getError();null==e||f?(at(a),bt(a,!1,f)):(at(a),bt(a,!0,e));b.Eb()},b,a));return b};function lt(a){a=u(a)?a:{};Ej.call(this);this.d=u(a.formatConstructors)?a.formatConstructors:[];this.e=u(a.reprojectTo)?Sg(a.reprojectTo):null;this.b=null;this.a=void 0}B(lt,Ej);l=lt.prototype;l.w=function(){u(this.a)&&K(this.a);lt.B.w.call(this)};l.Gf=function(a){a=a.G.dataTransfer.files;var b,c;b=0;for(c=a.length;b<c;++b){var d=a[b],e=new jt,f=kt(e);e.la.readAsText(d,"");et(f,this.Yf,null,this)}};
l.Yf=function(a){var b=this.g,c=this.e;null===c&&(c=b.a().M().n());var b=this.d,d=[],e,f;e=0;for(f=b.length;e<f;++e){var g=new b[e],h;try{h=g.ua(a)}catch(m){h=null}if(null!==h){var g=g.ka(a),g=Tg(g,c),n,p;n=0;for(p=h.length;n<p;++n){var q=h[n],r=q.J();null===r||r.transform(g);d.push(q)}}}L(this,new mt(nt,this,d,c))};l.ja=ie;
l.setMap=function(a){u(this.a)&&(K(this.a),this.a=void 0);null!==this.b&&(xd(this.b),this.b=null);lt.B.setMap.call(this,a);null!==a&&(this.b=new Ys(a.b),this.a=I(this.b,"drop",this.Gf,!1,this))};var nt="addfeatures";function mt(a,b,c,d){yd.call(this,a,b);this.features=c;this.projection=d}B(mt,yd);function ot(a,b){this.x=a;this.y=b}B(ot,Tb);ot.prototype.I=function(){return new ot(this.x,this.y)};ot.prototype.scale=Tb.prototype.scale;ot.prototype.add=function(a){this.x+=a.x;this.y+=a.y;return this};function pt(a){a=u(a)?a:{};Pj.call(this);this.f=u(a.condition)?a.condition:Mj;this.a=this.d=void 0;this.e=0}B(pt,Pj);pt.prototype.Ia=function(a){if(Oj(a)){var b=a.map,c=b.f();a=a.pixel;a=new ot(a[0]-c[0]/2,c[1]/2-a[1]);c=Math.atan2(a.y,a.x);a=Math.sqrt(a.x*a.x+a.y*a.y);var d=b.a().M(),e=yj(d);b.K();u(this.d)&&Fj(b,d,e.rotation-(c-this.d));this.d=c;u(this.a)&&Hj(b,d,this.a*(e.resolution/a));u(this.a)&&(this.e=this.a/a);this.a=a}};
pt.prototype.Ba=function(a){if(!Oj(a))return!0;a=a.map;var b=a.a();Zg(b,-1);var b=b.M(),c=yj(b),d=this.e-1,e=c.rotation,e=b.constrainRotation(e,0);Fj(a,b,e,void 0,void 0);c=c.resolution;c=b.constrainResolution(c,0,d);Hj(a,b,c,void 0,400);this.e=0;return!1};pt.prototype.Aa=function(a){return Oj(a)&&this.f(a)?(Zg(a.map.a(),1),this.a=this.d=void 0,!0):!1};pt.prototype.ld=aa();function qt(a,b){yd.call(this,a);this.feature=b}B(qt,yd);
function rt(a){Pj.call(this);this.r=null;this.u=u(a.source)?a.source:null;this.q=u(a.features)?a.features:null;this.L=u(a.snapTolerance)?a.snapTolerance:12;this.D=u(a.minPointsPerRing)?a.minPointsPerRing:3;var b=this.l=a.type,c;if("Point"===b||"MultiPoint"===b)c=st;else if("LineString"===b||"MultiLineString"===b)c=tt;else if("Polygon"===b||"MultiPolygon"===b)c=ut;this.a=c;this.d=this.j=this.k=this.f=this.e=null;this.N=4;this.o=new $e({style:u(a.style)?a.style:vt()})}B(rt,Pj);
function vt(){var a=Ye();return function(b){return a[b.J().A()]}}rt.prototype.setMap=function(a){null===a&&wt(this);this.o.setMap(a);rt.B.setMap.call(this,a)};rt.prototype.ja=function(a){var b;b=a.map;if(yc(document,b.b)&&"none"!=b.b.style.display){var c=b.f();null==c||0>=c[0]||0>=c[1]?b=!1:(b=b.a(),b=u(b)&&b.$c()?!0:!1)}else b=!1;if(!b)return!0;b=!0;a.type===cj?b=xt(this,a):a.type===Xi&&(b=!1);return rt.B.ja.call(this,a)&&b};rt.prototype.Aa=function(a){this.r=a.pixel;return!0};
rt.prototype.Ba=function(a){var b=this.r,c=a.pixel,d=b[0]-c[0],b=b[1]-c[1],c=!0;if(d*d+b*b<=this.N){xt(this,a);if(null===this.e)yt(this,a);else if(this.a===st||zt(this,a)){a=wt(this);var e,d=a.J();this.a===st?e=d.v():this.a===tt?(e=d.v(),e.pop(),d.H(e)):this.a===ut&&(this.d[0].pop(),this.d[0].push(this.d[0][0]),d.H(this.d),e=d.v());"MultiPoint"===this.l?a.cb(new em([e])):"MultiLineString"===this.l?a.cb(new bm([e])):"MultiPolygon"===this.l&&a.cb(new fm([e]));null===this.q||this.q.push(a);null===this.u||
this.u.de(a);L(this,new qt("drawend",a))}else e=a.coordinate,a=this.f.J(),this.a===tt?(this.e=e.slice(),d=a.v(),d.push(e.slice()),a.H(d)):this.a===ut&&(this.d[0].push(e.slice()),a.H(this.d)),At(this);c=!1}return c};
function xt(a,b){if(a.a===st&&null===a.e)yt(a,b);else if(null!==a.e){var c=b.coordinate,d=a.f.J(),e,f;a.a===st?(f=d.v(),f[0]=c[0],f[1]=c[1],d.H(f)):(a.a===tt?e=d.v():a.a===ut&&(e=a.d[0]),zt(a,b)&&(c=a.e.slice()),a.k.J().H(c),f=e[e.length-1],f[0]=c[0],f[1]=c[1],a.a===tt?d.H(e):a.a===ut&&(a.j.J().H(e),d.H(a.d)));At(a)}return!0}
function zt(a,b){var c=!1;if(null!==a.f){var d=a.f.J(),e=!1,f=[a.e];a.a===tt?e=2<d.v().length:a.a===ut&&(e=d.v()[0].length>a.D,f=[a.d[0][0],a.d[0][a.d[0].length-2]]);if(e)for(var d=b.map,e=0,g=f.length;e<g;e++){var h=f[e],m=d.g(h),n=b.pixel,c=n[0]-m[0],m=n[1]-m[1];if(c=Math.sqrt(c*c+m*m)<=a.L){a.e=h;break}}}return c}
function yt(a,b){var c=b.coordinate;a.e=c;var d;a.a===st?d=new hg(c.slice()):(a.k=new Ue(new hg(c.slice())),a.a===tt?d=new $l([c.slice(),c.slice()]):a.a===ut&&(a.j=new Ue(new $l([c.slice(),c.slice()])),a.d=[[c.slice(),c.slice()]],d=new pg(a.d)));a.f=new Ue(d);At(a);L(a,new qt("drawstart",a.f))}function wt(a){a.e=null;var b=a.f;null!==b&&(a.f=null,a.k=null,a.j=null,a.o.a.clear());return b}function At(a){var b=[a.f];null===a.j||b.push(a.j);null===a.k||b.push(a.k);a.o.Tb(new N(b))}
var st="Point",tt="LineString",ut="Polygon";function Bt(a){Pj.call(this);this.u=u(a.deleteCondition)?a.deleteCondition:me(Lj,Kj);this.q=this.d=null;this.r=[0,0];this.a=new rm;this.f=u(a.pixelTolerance)?a.pixelTolerance:10;this.o=!1;this.e=null;this.j=new $e({style:u(a.style)?a.style:Ct()});this.k=a.features;this.k.forEach(this.Bd,this);I(this.k,"add",this.Bd,!1,this);I(this.k,"remove",this.Sh,!1,this);this.l={Point:this.si,LineString:this.Be,LinearRing:this.Be,Polygon:this.ti,MultiPoint:this.qi,MultiLineString:this.pi,MultiPolygon:this.ri,
GeometryCollection:this.oi}}B(Bt,Pj);l=Bt.prototype;l.setMap=function(a){this.j.setMap(a);Bt.B.setMap.call(this,a)};l.Bd=function(a){a=a.element;var b=a.J();u(this.l[b.A()])&&this.l[b.A()].call(this,a,b);a=this.g;null===a||Dt(this,this.r,a)};l.si=function(a,b){var c=b.v(),c={feature:a,geometry:b,Q:[c,c]};ym(this.a,b.p(),c)};l.qi=function(a,b){var c=b.v(),d,e,f;e=0;for(f=c.length;e<f;++e)d=c[e],d={feature:a,geometry:b,depth:[e],index:e,Q:[d,d]},ym(this.a,b.p(),d)};
l.Be=function(a,b){var c=b.v(),d,e,f,g;d=0;for(e=c.length-1;d<e;++d)f=c.slice(d,d+2),g={feature:a,geometry:b,index:d,Q:f},ym(this.a,kf(f),g)};l.pi=function(a,b){var c=b.v(),d,e,f,g,h,m,n;g=0;for(h=c.length;g<h;++g)for(d=c[g],e=0,f=d.length-1;e<f;++e)m=d.slice(e,e+2),n={feature:a,geometry:b,depth:[g],index:e,Q:m},ym(this.a,kf(m),n)};
l.ti=function(a,b){var c=b.v(),d,e,f,g,h,m,n;g=0;for(h=c.length;g<h;++g)for(d=c[g],e=0,f=d.length-1;e<f;++e)m=d.slice(e,e+2),n={feature:a,geometry:b,depth:[g],index:e,Q:m},ym(this.a,kf(m),n)};l.ri=function(a,b){var c=b.v(),d,e,f,g,h,m,n,p,q,r;m=0;for(n=c.length;m<n;++m)for(p=c[m],g=0,h=p.length;g<h;++g)for(d=p[g],e=0,f=d.length-1;e<f;++e)q=d.slice(e,e+2),r={feature:a,geometry:b,depth:[g,m],index:e,Q:q},ym(this.a,kf(q),r)};
l.oi=function(a,b){var c,d=b.a;for(c=0;c<d.length;++c)this.l[d[c].A()].call(this,a,d[c])};l.Sh=function(a){var b=a.element;a=this.a;var c,d=[];um(a,b.J().p(),function(a){b===a.feature&&d.push(a)});for(c=d.length-1;0<=c;--c)a.remove(d[c]);null!==this.d&&0===this.k.$a()&&(this.j.pc(this.d),this.d=null)};function Et(a,b){var c=a.d;null===c?(c=new Ue(new hg(b)),a.d=c,a.j.Zd(c)):c.J().H(b)}
l.Aa=function(a){Dt(this,a.pixel,a.map);this.e=[];var b=this.d;if(null!==b){a=[];var b=b.J().v(),c=kf([b]),d=[];vm(this.a,c,function(a){d.push(a)},void 0);for(var c={},e=0,f=d.length;e<f;++e){var g=d[e],h=g.Q;v(g.feature)in c||(c[v(g.feature)]=!0);ff(h[0],b)?this.e.push([g,0]):ff(h[1],b)?this.e.push([g,1]):v(h)in this.q&&a.push([g,b])}for(e=a.length-1;0<=e;--e)this.fg.apply(this,a[e])}return null!==this.d};
l.Ia=function(a){a=a.coordinate;for(var b=0,c=this.e.length;b<c;++b){var d=this.e[b],e=d[0],f=e.depth,g=e.geometry,h=g.v(),m=e.Q,d=d[1];switch(g.A()){case "Point":h=a;m[0]=m[1]=a;break;case "MultiPoint":h[e.index]=a;m[0]=m[1]=a;break;case "LineString":h[e.index+d]=a;m[d]=a;break;case "MultiLineString":h[f[0]][e.index+d]=a;m[d]=a;break;case "Polygon":h[f[0]][e.index+d]=a;m[d]=a;break;case "MultiPolygon":h[f[1]][f[0]][e.index+d]=a,m[d]=a}g.H(h);Et(this,a)}};
l.Ba=function(){for(var a,b=this.e.length-1;0<=b;--b)a=this.e[b][0],this.a.update(kf(a.Q),a)};
l.ja=function(a){var b,c=a.map.a();Ta(c.k)[1]||a.type!=cj||(this.r=a.pixel,Dt(this,a.pixel,a.map));if(null!==this.d&&this.o&&this.u(a)){this.d.J();b=this.e;var c={},d=!1,e,f,g,h,m,n,p,q,r;for(m=b.length-1;0<=m;--m)if(g=b[m],q=g[0],h=q.geometry,f=h.v(),r=v(q.feature),e=p=n=void 0,0===g[1]?(p=q,n=q.index):1==g[1]&&(e=q,n=q.index+1),r in c||(c[r]=[e,p,n]),g=c[r],u(e)&&(g[0]=e),u(p)&&(g[1]=p),u(g[0])&&u(g[1])){e=f;d=!1;p=n-1;switch(h.A()){case "MultiLineString":f[q.depth[0]].splice(n,1);d=!0;break;case "LineString":f.splice(n,
1);d=!0;break;case "MultiPolygon":e=e[q.depth[1]];case "Polygon":e=e[q.depth[0]],4<e.length&&(n==e.length-1&&(n=0),e.splice(n,1),d=!0,0===n&&(e.pop(),e.push(e[0]),p=e.length-1))}d&&(this.a.remove(g[0]),this.a.remove(g[1]),h.H(f),f={depth:q.depth,feature:q.feature,geometry:q.geometry,index:p,Q:[g[0].Q[0],g[1].Q[1]]},ym(this.a,kf(f.Q),f),Ft(this,h,n,q.depth,-1),this.j.pc(this.d),this.d=null)}b=d}return Bt.B.ja.call(this,a)&&!b};
function Dt(a,b,c){function d(a,b){return hf(e,cf(e,a.Q))-hf(e,cf(e,b.Q))}var e=c.ga(b),f=c.ga([b[0]-a.f,b[1]+a.f]),g=c.ga([b[0]+a.f,b[1]-a.f]),f=kf([f,g]),f=xm(a.a,f);if(0<f.length){f.sort(d);var g=f[0].Q,h=cf(e,g),m=c.g(h);if(Math.sqrt(hf(b,m))<=a.f){b=c.g(g[0]);c=c.g(g[1]);b=hf(m,b);c=hf(m,c);a.o=Math.sqrt(Math.min(b,c))<=a.f;a.o&&(h=b>c?g[1]:g[0]);Et(a,h);c={};c[v(g)]=!0;b=1;for(m=f.length;b<m;++b)if(h=f[b].Q,ff(g[0],h[0])&&ff(g[1],h[1])||ff(g[0],h[1])&&ff(g[1],h[0]))c[v(h)]=!0;else break;a.q=
c;return}}null!==a.d&&(a.j.pc(a.d),a.d=null)}
l.fg=function(a,b){var c=a.Q,d=a.feature,e=a.geometry,f=a.depth,g=a.index,h;switch(e.A()){case "MultiLineString":h=e.v();h[f[0]].splice(g+1,0,b);break;case "Polygon":h=e.v();h[f[0]].splice(g+1,0,b);break;case "MultiPolygon":h=e.v();h[f[1]][f[0]].splice(g+1,0,b);break;case "LineString":h=e.v();h.splice(g+1,0,b);break;default:return}e.H(h);h=this.a;h.remove(a);Ft(this,e,g,f,1);var m={Q:[c[0],b],feature:d,geometry:e,depth:f,index:g};ym(h,kf(m.Q),m);this.e.push([m,1]);c={Q:[b,c[1]],feature:d,geometry:e,
depth:f,index:g+1};ym(h,kf(c.Q),c);this.e.push([c,0])};l.ld=aa();function Ft(a,b,c,d,e){um(a.a,b.p(),function(a){a.geometry===b&&((!u(d)||Za(a.depth,d))&&a.index>c)&&(a.index+=e)})}function Ct(){var a=Ye();return function(){return a.Point}};function Gt(a){Ej.call(this);a=u(a)?a:{};this.e=u(a.condition)?a.condition:Kj;this.d=u(a.addCondition)?a.addCondition:he;this.i=u(a.removeCondition)?a.removeCondition:he;this.j=u(a.toggleCondition)?a.toggleCondition:Mj;var b;if(u(a.layerFilter))b=a.layerFilter;else if(u(a.layer)){var c=a.layer;b=function(a){return a===c}}else if(u(a.layers)){var d=a.layers;b=function(a){return-1!=La(d,a)}}else b=ie;this.b=b;this.a=new $e({style:u(a.style)?a.style:Ht()})}B(Gt,Ej);Gt.prototype.f=function(){return this.a.a};
Gt.prototype.ja=function(a){if(!this.e(a))return!0;var b=this.d(a),c=this.i(a),d=this.j(a),e=a.map,f=this.a.a,g=e.l;b||c||d?e.ad(a.pixel,function(a){var e=La(f.a,a);if(-1==e){if(b||d)f.push(a),g.push(a)}else if(c||d)f.tc(e),g.remove(a)},void 0,this.b):(a=e.ad(a.pixel,aa(),void 0,this.b),u(a)&&1==f.$a()&&f.Ld(0)==a||(0!==f.$a()&&(f.forEach(function(a){g.remove(a)}),f.clear()),u(a)&&(f.push(a),g.push(a))));return!1};
Gt.prototype.setMap=function(a){var b=this.g,c=this.a.a;null===b||c.forEach(function(a){b.l.remove(a)});Gt.B.setMap.call(this,a);this.a.setMap(a);null===a||c.forEach(function(b){a.l.push(b)})};function Ht(){var a=Ye();Ua(a.Polygon,a.LineString);Ua(a.GeometryCollection,a.LineString);return function(b){return a[b.J().A()]}};function It(a){a=u(a)?a:{};Zk.call(this,a);this.b=null;I(this,xe("gradient"),this.Da,!1,this);this.ca(u(a.gradient)?a.gradient:Jt);var b=Kt(u(a.radius)?a.radius:8,u(a.blur)?a.blur:15,u(a.shadow)?a.shadow:250),c=Array(256),d=u(a.weight)?a.weight:"weight",e;e=la(d)?function(a){return a.get(d)}:d;this.j(function(a){a=e(a);a=u(a)?Qb(a,0,1):1;var d=255*a|0,h=c[d];u(h)||(h=[new Te({image:new Mk({opacity:a,src:b})})],c[d]=h);return h});this.t("renderOrder",null);I(this,"render",this.Ea,!1,this)}B(It,Zk);
var Jt=["#00f","#0ff","#0f0","#ff0","#f00"];function Kt(a,b,c){var d=a+b+1,e=2*d,e=kd(e,e);e.shadowOffsetX=e.shadowOffsetY=c;e.shadowBlur=b;e.shadowColor="#000";e.beginPath();b=d-c;e.arc(b,b,a,0,2*Math.PI,!0);e.fill();return e.canvas.toDataURL()}It.prototype.o=function(){return this.get("gradient")};It.prototype.getGradient=It.prototype.o;
It.prototype.Da=function(){for(var a=this.o(),b=kd(1,256),c=b.createLinearGradient(0,0,1,256),d=1/(a.length-1),e=0,f=a.length;e<f;++e)c.addColorStop(e*d,a[e]);b.fillStyle=c;b.fillRect(0,0,1,256);this.b=b.getImageData(0,0,1,256).data};It.prototype.Ea=function(a){a=a.context;var b=a.canvas,b=a.getImageData(0,0,b.width,b.height),c=b.data,d,e,f;d=0;for(e=c.length;d<e;d+=4)if(f=4*c[d+3])c[d]=this.b[f],c[d+1]=this.b[f+1],c[d+2]=this.b[f+2];a.putImageData(b,0,0)};
It.prototype.ca=function(a){this.t("gradient",a)};It.prototype.setGradient=It.prototype.ca;function Lt(a){return[a]};function Mt(a,b){var c=b||{},d=c.document||document,e=rc("SCRIPT"),f={qe:e,eb:void 0},g=new Zs(Nt,f),h=null,m=null!=c.timeout?c.timeout:5E3;0<m&&(h=window.setTimeout(function(){Ot(e,!0);var b=new Pt(Qt,"Timeout reached for loading script "+a);at(g);bt(g,!1,b)},m),f.eb=h);e.onload=e.onreadystatechange=function(){e.readyState&&"loaded"!=e.readyState&&"complete"!=e.readyState||(Ot(e,c.Ed||!1,h),at(g),bt(g,!0,null))};e.onerror=function(){Ot(e,!0,h);var b=new Pt(Rt,"Error while loading script "+a);at(g);
bt(g,!1,b)};lc(e,{type:"text/javascript",charset:"UTF-8",src:a});St(d).appendChild(e);return g}function St(a){var b=a.getElementsByTagName("HEAD");return b&&0!=b.length?b[0]:a.documentElement}function Nt(){if(this&&this.qe){var a=this.qe;a&&"SCRIPT"==a.tagName&&Ot(a,!0,this.eb)}}function Ot(a,b,c){null!=c&&t.clearTimeout(c);a.onload=ea;a.onerror=ea;a.onreadystatechange=ea;b&&window.setTimeout(function(){wc(a)},0)}var Rt=0,Qt=1;
function Pt(a,b){var c="Jsloader error (code #"+a+")";b&&(c+=": "+b);za.call(this,c);this.code=a}B(Pt,za);function Tt(a,b){this.c=new uh(a);this.a=b?b:"callback";this.eb=5E3}var Ut=0;Tt.prototype.cancel=function(a){a&&(a.Nc&&a.Nc.cancel(),a.P&&Vt(a.P,!1))};function Wt(a){return function(){Vt(a,!1)}}function Xt(a,b){return function(c){Vt(a,!0);b.apply(void 0,arguments)}}function Vt(a,b){t._callbacks_[a]&&(b?delete t._callbacks_[a]:t._callbacks_[a]=ea)};function Yt(a){return function(b){return null===b?void 0:a.replace("{z}",b.a.toString()).replace("{x}",b.x.toString()).replace("{y}",b.y.toString())}}function Zt(a){return $t(Na(a,Yt))}function $t(a){return 1===a.length?a[0]:function(b,c,d){return null===b?void 0:a[Rb((b.x<<b.a)+b.y,a.length)](b,c,d)}}function au(){}function bu(a,b){var c=new ab(0,0,0);return function(d,e,f){return null===d?void 0:b(a(d,f,c),e,f)}}
function cu(a){var b=[],c=/\{(\d)-(\d)\}/.exec(a)||/\{([a-z])-([a-z])\}/.exec(a);if(c){var d=c[2].charCodeAt(0),e;for(e=c[1].charCodeAt(0);e<=d;++e)b.push(a.replace(c[0],String.fromCharCode(e)))}else b.push(a);return b};function du(a){xn.call(this);this.d=u(a)?a:2048}B(du,xn);function eu(a,b){for(var c,d;a.pa()>a.d&&!(c=a.a.gb,d=c.a.a.toString(),d in b&&b[d].contains(c.a));)a.pop()};function fu(a){Bk.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,opaque:a.opaque,projection:a.projection,tileGrid:a.tileGrid});this.tileUrlFunction=u(a.tileUrlFunction)?a.tileUrlFunction:au;this.crossOrigin=u(a.crossOrigin)?a.crossOrigin:null;this.b=new du;this.tileLoadFunction=u(a.tileLoadFunction)?a.tileLoadFunction:gu;this.wc=u(a.wc)?a.wc:Xg}B(fu,Bk);function gu(a,b){a.b().src=b}l=fu.prototype;l.cd=function(){return this.b.pa()>this.b.d};l.ce=function(a){eu(this.b,a)};
l.mb=function(a,b,c,d,e){var f=this.Ha(a,b,c);if(vn(this.b,f))return this.b.get(f);a=new ab(a,b,c);d=this.tileUrlFunction(a,d,e);d=new this.wc(a,u(d)?0:4,u(d)?d:"",this.crossOrigin,this.tileLoadFunction);yn(this.b,f,d);return d};l.Qb=function(a){this.b.clear();this.tileUrlFunction=a;this.s()};l.ze=function(a,b,c){a=this.Ha(a,b,c);vn(this.b,a)&&this.b.get(a)};function hu(a){var b=Array(a.maxZoom+1),c,d=2*mk/256;for(c=0;c<=a.maxZoom;++c)b[c]=d/Math.pow(2,c);uk.call(this,{minZoom:a.minZoom,origin:[-mk,mk],resolutions:b,tileSize:256})}B(hu,uk);
hu.prototype.c=function(a){a=u(a)?a:{};var b=this.minZoom,c=this.maxZoom,d=u(a.wrapX)?a.wrapX:!0,e=new ab(0,0,0),f=null;if(u(a.extent)){var f=Array(c+1),g;for(g=0;g<=c;++g)f[g]=g<b?null:xk(this,a.extent,g)}return function(a,g,n){g=a.a;if(g<b||c<g)return null;var p=Math.pow(2,g),q=a.x;if(d)q=Rb(q,p);else if(0>q||p<=q)return null;a=a.y;return a<-p||-1<a||null!==f&&(e.a=g,e.x=q,e.y=a,!f[g].contains(e))?null:bb(g,q,-a-1,n)}};
hu.prototype.gc=function(a,b){return a.a<this.maxZoom?fb(2*a.x,2*(a.x+1),2*a.y,2*(a.y+1),b):null};hu.prototype.dc=function(a,b,c,d){d=fb(0,a.x,0,a.y,d);for(a=a.a-1;a>=this.minZoom;--a)if(d.a=d.d>>=1,d.b=d.c>>=1,b.call(c,a,d))return!0;return!1};function iu(a){fu.call(this,{crossOrigin:"anonymous",opaque:!0,projection:Sg("EPSG:3857"),state:0,tileLoadFunction:a.tileLoadFunction});this.a=u(a.culture)?a.culture:"en-us";var b=new uh((sd?"https:":"http:")+"//dev.virtualearth.net/REST/v1/Imagery/Metadata/"+a.imagerySet),b=new Tt(b,"jsonp"),c={include:"ImageryProviders",key:a.key};a=wa(this.d,this);var d=c||null,c="_"+(Ut++).toString(36)+ya().toString(36);t._callbacks_||(t._callbacks_={});var e=b.c.I();if(d)for(var f in d)d.hasOwnProperty&&!d.hasOwnProperty(f)||
Ih(e,f,d[f]);a&&(t._callbacks_[c]=Xt(c,a),Ih(e,b.a,"_callbacks_."+c));f=Mt(e.toString(),{timeout:b.eb,Ed:!0});et(f,null,Wt(c),void 0)}B(iu,fu);var ju=new gb({html:'\x3ca class\x3d"ol-attribution-bing-tos" target\x3d"_blank" href\x3d"http://www.microsoft.com/maps/product/terms.html"\x3eTerms of Use\x3c/a\x3e'});
iu.prototype.d=function(a){if(200!=a.statusCode||"OK"!=a.statusDescription||"ValidCredentials"!=a.authenticationResultCode||1!=a.resourceSets.length||1!=a.resourceSets[0].resources.length)hk(this,2);else{var b=a.brandLogoUri,c=a.resourceSets[0].resources[0],d=new hu({minZoom:c.zoomMin,maxZoom:c.zoomMax,tileSize:c.imageWidth});this.tileGrid=d;var e=this.a;this.tileUrlFunction=bu(d.c(),$t(Na(c.imageUrlSubdomains,function(a){var b=c.imageUrl.replace("{subdomain}",a).replace("{culture}",e);return function(a){return null===
a?void 0:b.replace("{quadkey}",db(a))}})));if(c.imageryProviders){var f=Bg(Sg("EPSG:4326"),this.n);a=Na(c.imageryProviders,function(a){var b=a.attribution,c={};Ma(a.coverageAreas,function(a){var b=a.zoomMin,e=a.zoomMax;a=a.bbox;a=Hf([a[1],a[0],a[3],a[2]],f);var g,h;for(g=b;g<=e;++g)h=g.toString(),b=xk(d,a,g),h in c?c[h].push(b):c[h]=[b]});return new gb({html:b,tileRanges:c})});a.push(ju);this.e=a}this.r=b;hk(this,1)}};function ku(a,b,c){if(oa(a))c&&(a=wa(a,c));else if(a&&"function"==typeof a.handleEvent)a=wa(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:t.setTimeout(a,b||0)};function lu(){}lu.prototype.a=null;function mu(a){var b;(b=a.a)||(b={},nu(a)&&(b[0]=!0,b[1]=!0),b=a.a=b);return b};var ou;function pu(){}B(pu,lu);function qu(a){return(a=nu(a))?new ActiveXObject(a):new XMLHttpRequest}function nu(a){if(!a.c&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.c=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.c}ou=new pu;function ru(a){pe.call(this);this.u=new kh;this.j=a||null;this.a=!1;this.g=this.C=null;this.D=this.l="";this.b=0;this.e="";this.c=this.r=this.n=this.k=!1;this.i=0;this.d=null;this.f=su;this.o=this.L=!1}B(ru,pe);var su="",tu=/^https?$/i,uu=["POST","PUT"];
function vu(a,b){if(a.C)throw Error("[goog.net.XhrIo] Object is active with another request\x3d"+a.l+"; newUri\x3d"+b);a.l=b;a.e="";a.b=0;a.D="GET";a.k=!1;a.a=!0;a.C=a.j?qu(a.j):qu(ou);a.g=a.j?mu(a.j):mu(ou);a.C.onreadystatechange=wa(a.q,a);try{a.r=!0,a.C.open("GET",b,!0),a.r=!1}catch(c){wu(a,c);return}var d=a.u.I(),e=Pa(d.qa(),xu),f=t.FormData&&!1;!(0<=La(uu,"GET"))||(e||f)||lh(d,"Content-Type","application/x-www-form-urlencoded;charset\x3dutf-8");jh(d,function(a,b){this.C.setRequestHeader(b,a)},
a);a.f&&(a.C.responseType=a.f);"withCredentials"in a.C&&(a.C.withCredentials=a.L);try{yu(a),0<a.i&&(a.o=E&&Ib(9)&&na(a.C.timeout)&&u(a.C.ontimeout),a.o?(a.C.timeout=a.i,a.C.ontimeout=wa(a.eb,a)):a.d=ku(a.eb,a.i,a)),a.n=!0,a.C.send(""),a.n=!1}catch(g){wu(a,g)}}function xu(a){return"content-type"==a.toLowerCase()}
ru.prototype.eb=function(){"undefined"!=typeof da&&this.C&&(this.e="Timed out after "+this.i+"ms, aborting",this.b=8,L(this,"timeout"),this.C&&this.a&&(this.a=!1,this.c=!0,this.C.abort(),this.c=!1,this.b=8,L(this,"complete"),L(this,"abort"),zu(this)))};function wu(a,b){a.a=!1;a.C&&(a.c=!0,a.C.abort(),a.c=!1);a.e=b;a.b=5;Au(a);zu(a)}function Au(a){a.k||(a.k=!0,L(a,"complete"),L(a,"error"))}ru.prototype.w=function(){this.C&&(this.a&&(this.a=!1,this.c=!0,this.C.abort(),this.c=!1),zu(this,!0));ru.B.w.call(this)};
ru.prototype.q=function(){if(!this.U&&this.a&&"undefined"!=typeof da&&(!this.g[1]||4!=Bu(this)||2!=Cu(this)))if(this.n&&4==Bu(this))ku(this.q,0,this);else if(L(this,"readystatechange"),4==Bu(this)){this.a=!1;try{if(Du(this))L(this,"complete"),L(this,"success");else{this.b=6;var a;try{a=2<Bu(this)?this.C.statusText:""}catch(b){a=""}this.e=a+" ["+Cu(this)+"]";Au(this)}}finally{zu(this)}}};
function zu(a,b){if(a.C){yu(a);var c=a.C,d=a.g[0]?ea:null;a.C=null;a.g=null;b||L(a,"ready");try{c.onreadystatechange=d}catch(e){}}}function yu(a){a.C&&a.o&&(a.C.ontimeout=null);na(a.d)&&(t.clearTimeout(a.d),a.d=null)}
function Du(a){var b=Cu(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}if(!c){if(b=0===b)a=ph(String(a.l))[1]||null,!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!tu.test(a?a.toLowerCase():"");c=b}return c}function Bu(a){return a.C?a.C.readyState:0}function Cu(a){try{return 2<Bu(a)?a.C.status:-1}catch(b){return-1}}function Eu(a){try{return a.C?a.C.responseText:""}catch(b){return""}}
function Fu(a){try{if(!a.C)return null;if("response"in a.C)return a.C.response;switch(a.f){case su:case "text":return a.C.responseText;case "arraybuffer":if("mozResponseArrayBuffer"in a.C)return a.C.mozResponseArrayBuffer}return null}catch(b){return null}};function Gu(a){Bm.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection});this.format=a.format}B(Gu,Bm);
function Hu(a,b,c,d){var e=new ru;e.f="binary"==a.format.A()&&G.wd?"arraybuffer":"text";I(e,"complete",function(a){a=a.target;if(Du(a)){var b=this.format.A(),e;if("binary"==b&&G.wd)e=Fu(a);else if("json"==b)e=Eu(a);else if("text"==b)e=Eu(a);else if("xml"==b){if(!E)try{e=a.C?a.C.responseXML:null}catch(m){e=null}null!=e||(e=Mo(Eu(a)))}null!=e?c.call(d,this.d(e)):hk(this,2)}else hk(this,2);xd(a)},!1,a);vu(e,b)}
Gu.prototype.d=function(a){var b=this.format,c=b.ua(a);a=b.ka(a);b=this.n;if(null!==b&&a!==b&&(a.na!=b.na||Bg(a,b)!==Kg)){a=Tg(a,b);var d,b=0;for(d=c.length;b<d;++b){var e=c[b].J();null===e||e.transform(a)}}return c};function Iu(a){Gu.call(this,{attributions:a.attributions,extent:a.extent,format:a.format,logo:a.logo,projection:a.projection});u(a.arrayBuffer)&&this.da(this.d(a.arrayBuffer));u(a.doc)&&this.da(this.d(a.doc));u(a.node)&&this.da(this.d(a.node));u(a.object)&&this.da(this.d(a.object));u(a.text)&&this.da(this.d(a.text));if(u(a.url)||u(a.urls))if(hk(this,0),u(a.url)&&Hu(this,a.url,function(a){this.da(a);hk(this,1)},this),u(a.urls)){a=a.urls;var b,c;b=0;for(c=a.length;b<c;++b)Hu(this,a[b],function(a){this.da(a);
hk(this,1)},this)}}B(Iu,Gu);function Ju(a){a=u(a)?a:{};Iu.call(this,{attributions:a.attributions,doc:a.doc,extent:a.extent,format:new kp,logo:a.logo,node:a.node,projection:a.projection,text:a.text,url:a.url,urls:a.urls})}B(Ju,Iu);function Ku(a){a=u(a)?a:{};Iu.call(this,{attributions:a.attributions,extent:a.extent,format:new Sp({defaultProjection:a.defaultProjection}),logo:a.logo,object:a.object,projection:a.projection,text:a.text,url:a.url,urls:a.urls})}B(Ku,Iu);function Lu(a){a=u(a)?a:{};Iu.call(this,{format:new aq({altitudeMode:a.altitudeMode}),projection:a.projection,text:a.text,url:a.url,urls:a.urls})}B(Lu,Iu);function Mu(a,b,c,d,e){rk.call(this,a,b,c,2,d);this.a=e}B(Mu,rk);Mu.prototype.e=k("a");function Nu(a){ql.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,resolutions:a.resolutions,state:a.state});this.q=a.canvasFunction;this.g=null;this.l=0;this.u=u(a.ratio)?a.ratio:1.5}B(Nu,ql);Nu.prototype.rb=function(a,b,c,d){b=rl(this,b);var e=this.g;if(null!==e&&this.l==this.c&&e.d==b&&e.b==c&&rf(e.p(),a))return e;a=a.slice();Ff(a,this.u);d=this.q(a,b,c,[(a[2]-a[0])/b*c,(a[3]-a[1])/b*c],d);null===d||(e=new Mu(a,b,c,this.e,d));this.g=e;this.l=this.c;return e};function Ou(a){var b=u(a.attributions)?a.attributions:null,c=u(a.crossOrigin)?a.crossOrigin:null,d=a.imageExtent,e=(d[3]-d[1])/a.imageSize[1],f=a.url,g=Sg(a.projection);ql.call(this,{attributions:b,extent:a.extent,logo:a.logo,projection:g,resolutions:[e]});this.a=new sk(d,e,1,b,f,c)}B(Ou,ql);Ou.prototype.rb=function(a){return Cf(a,this.a.p())?this.a:null};function Pu(a){this.d=a.source;this.Tg=u(a.style)?Xe(a.style):We;this.D=bd();this.a=kd();this.b=[0,0];this.i=null;Nu.call(this,{attributions:a.attributions,canvasFunction:wa(this.o,this),extent:a.extent,logo:a.logo,projection:a.projection,ratio:a.ratio,resolutions:a.resolutions,state:this.d.f});I(this.d,"change",this.N,void 0,this)}B(Pu,Nu);
Pu.prototype.o=function(a,b,c,d){var e=new Kl(b/(2*c),a,b),f=!1;this.d.cc(a,b,function(a){var d;if(!(d=f))if(d=this.Tg(a,b),null!=d){var m=b*b/(4*c*c),n,p,q=!1;n=0;for(p=d.length;n<p;++n)q=jm(e,a,d[n],m,a,this.Ug,this)||q;d=q}else d=!1;f=d},this);Ol(e);if(f)return null;this.b[0]!=d[0]||this.b[1]!=d[1]?(this.a.canvas.width=d[0],this.a.canvas.height=d[1],this.b[0]=d[0],this.b[1]=d[1]):this.a.clearRect(0,0,d[0],d[1]);d=Pk(this.D,d[0]/2,d[1]/2,c/b,-c/b,0,-xf(a)[0],-xf(a)[1]);Ll(e,this.a,a,c,d,0,{});this.i=
e;return this.a.canvas};Pu.prototype.k=function(a,b,c,d,e){return null===this.i?void 0:Nl(this.i,a,b,0,d,{},function(a,b){return e(b)})};Pu.prototype.Ug=function(){this.s()};Pu.prototype.N=function(){hk(this,this.d.f)};function Qu(a){a=u(a)?a:{};ql.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,resolutions:a.resolutions});this.N=u(a.crossOrigin)?a.crossOrigin:null;this.i=a.url;this.b=a.params;this.d=!0;Ru(this);this.D=a.serverType;this.ba=u(a.hidpi)?a.hidpi:!0;this.a=null;this.g=[0,0];this.l=null;this.q=NaN;this.u=0;this.o=u(a.ratio)?a.ratio:1.5}B(Qu,ql);l=Qu.prototype;
l.Vg=function(a,b,c,d){if(u(this.i)&&null!==this.a&&b==this.q&&(c===this.l||(c.na!=this.l.na?0:Bg(c,this.l)===Kg))){var e=this.a.p(),f=this.a.b,g={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:F(this.b,"LAYERS")};gc(g,this.b,d);b/=f;d=Math.floor((e[3]-a[1])/b);g[this.d?"I":"X"]=Math.floor((a[0]-e[0])/b);g[this.d?"J":"Y"]=d;return Su(this,e,this.g,f,c,g)}};l.Wg=k("b");
l.rb=function(a,b,c,d){if(!u(this.i))return null;b=rl(this,b);1==c||this.ba&&u(this.D)||(c=1);var e=this.a;if(null!==e&&this.u==this.c&&e.d==b&&e.b==c&&rf(e.p(),a))return e;e={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};gc(e,this.b);a=a.slice();var f=(a[0]+a[2])/2,g=(a[1]+a[3])/2;if(1!=this.o){var h=this.o*(a[2]-a[0])/2,m=this.o*(a[3]-a[1])/2;a[0]=f-h;a[1]=g-m;a[2]=f+h;a[3]=g+m}var h=b/c,m=Math.ceil((a[2]-a[0])/h),n=Math.ceil((a[3]-a[1])/h);a[0]=f-h*m/2;a[2]=
f+h*m/2;a[1]=g-h*n/2;a[3]=g+h*n/2;this.g[0]=m;this.g[1]=n;e=Su(this,a,this.g,c,d,e);this.a=new sk(a,b,c,this.e,e,this.N);this.l=d;this.q=b;this.u=this.c;return this.a};
function Su(a,b,c,d,e,f){f[a.d?"CRS":"SRS"]=e.a;"STYLES"in a.b||(f.STYLES=new String(""));if(1!=d)switch(a.D){case "geoserver":f.FORMAT_OPTIONS="dpi:"+(90*d+0.5|0);break;case "mapserver":f.MAP_RESOLUTION=90*d;break;case "carmentaserver":case "qgis":f.DPI=90*d}f.WIDTH=c[0];f.HEIGHT=c[1];c=e.c;f.BBOX=(a.d&&"ne"==c.substr(0,2)?[b[1],b[0],b[3],b[2]]:b).join(",");return rh(th([a.i],f))}l.Xg=function(a){a!=this.i&&(this.i=a,this.a=null,this.s())};l.Yg=function(a){gc(this.b,a);Ru(this);this.a=null;this.s()};
function Ru(a){a.d=0<=Ja(F(a.b,"VERSION","1.3.0"),"1.3")};function Tu(a){a=u(a)?a:{};Iu.call(this,{attributions:a.attributions,doc:a.doc,extent:a.extent,format:new eq({defaultStyle:a.defaultStyle}),logo:a.logo,node:a.node,projection:a.projection,text:a.text,url:a.url,urls:a.urls})}B(Tu,Iu);function Uu(a,b,c){return function(d,e,f){return c(a,b,d,e,f)}}function Vu(){};function Wu(a){ql.call(this,{extent:a.extent,projection:a.projection,resolutions:a.resolutions});this.o=u(a.crossOrigin)?a.crossOrigin:null;this.a=u(a.displayDpi)?a.displayDpi:96;this.g=u(a.url)?Uu(a.url,u(a.params)?a.params:{},wa(this.i,this)):Vu;this.q=u(a.hidpi)?a.hidpi:!0;this.l=u(a.metersPerUnit)?a.metersPerUnit:1;this.d=u(a.ratio)?a.ratio:1;this.u=u(a.useOverlay)?a.useOverlay:!1;this.b=null}B(Wu,ql);
Wu.prototype.rb=function(a,b,c,d){b=rl(this,b);c=this.q?c:1;var e=this.b;if(null!==e&&e.d==b&&e.b==c&&rf(e.p(),a))return e;1!=this.d&&(a=a.slice(),Ff(a,this.d));d=this.g(a,[(a[2]-a[0])/b*c,(a[3]-a[1])/b*c],d);return this.b=e=u(d)?new sk(a,b,c,this.e,d,this.o):null};
Wu.prototype.i=function(a,b,c,d){var e;e=this.l;var f=Bf(c),g=zf(c),h=d[0],m=d[1],n=0.0254/this.a;e=m*f>h*g?f*e/(h*n):g*e/(m*n);c=xf(c);d={OPERATION:this.u?"GETDYNAMICMAPOVERLAYIMAGE":"GETMAPIMAGE",VERSION:"2.0.0",LOCALE:"en",CLIENTAGENT:"ol.source.MapGuide source",CLIP:"1",SETDISPLAYDPI:this.a,SETDISPLAYWIDTH:Math.round(d[0]),SETDISPLAYHEIGHT:Math.round(d[1]),SETVIEWSCALE:e,SETVIEWCENTERX:c[0],SETVIEWCENTERY:c[1]};gc(d,b);return rh(th([a],d))};function Xu(a){var b=u(a.projection)?a.projection:"EPSG:3857",c=new hu({maxZoom:u(a.maxZoom)?a.maxZoom:18});fu.call(this,{attributions:a.attributions,crossOrigin:a.crossOrigin,extent:a.extent,logo:a.logo,projection:b,tileGrid:c,tileLoadFunction:a.tileLoadFunction,tileUrlFunction:au});this.d=c.c({extent:a.extent,wrapX:a.wrapX});u(a.tileUrlFunction)?this.Qb(a.tileUrlFunction):u(a.urls)?this.Qb(Zt(a.urls)):u(a.url)&&this.a(a.url)}B(Xu,fu);Xu.prototype.Qb=function(a){Xu.B.Qb.call(this,bu(this.d,a))};
Xu.prototype.a=function(a){this.Qb(Zt(cu(a)))};function Yu(a){a=u(a)?a:{};var b=sd?"https:":"http:";Xu.call(this,{attributions:u(a.attributions)?a.attributions:Zu,crossOrigin:u(a.crossOrigin)?a.crossOrigin:"anonymous",opaque:!0,maxZoom:a.maxZoom,tileLoadFunction:a.tileLoadFunction,url:u(a.url)?a.url:b+"//{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"})}B(Yu,Xu);
var $u=new gb({html:'Data \x26copy; \x3ca href\x3d"http://www.openstreetmap.org/"\x3eOpenStreetMap\x3c/a\x3e contributors, \x3ca href\x3d"http://www.openstreetmap.org/copyright"\x3eODbL\x3c/a\x3e'}),av=new gb({html:'Tiles \x26copy; \x3ca href\x3d"http://www.openstreetmap.org/"\x3eOpenStreetMap\x3c/a\x3e contributors, \x3ca href\x3d"http://creativecommons.org/licenses/by-sa/2.0/"\x3eCC BY-SA\x3c/a\x3e'}),Zu=[av,$u];function bv(a){a=u(a)?a:{};var b=cv[a.layer];Xu.call(this,{attributions:b.attributions,crossOrigin:"anonymous",logo:"//developer.mapquest.com/content/osm/mq_logo.png",maxZoom:b.maxZoom,opaque:!0,tileLoadFunction:a.tileLoadFunction,url:(sd?"https:":"http:")+"//otile{1-4}-s.mqcdn.com/tiles/1.0.0/"+a.layer+"/{z}/{x}/{y}.jpg"})}B(bv,Xu);
var dv=new gb({html:'Tiles Courtesy of \x3ca href\x3d"http://www.mapquest.com/" target\x3d"_blank"\x3eMapQuest\x3c/a\x3e'}),cv={osm:{maxZoom:28,attributions:[dv,$u]},sat:{maxZoom:18,attributions:[dv,new gb({html:"Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency"})]},hyb:{maxZoom:18,attributions:[dv,$u]}};function ev(a){a=u(a)?a:{};Iu.call(this,{attributions:a.attributions,doc:a.doc,extent:a.extent,format:new Yq,logo:a.logo,node:a.node,projection:a.projection,reprojectTo:a.reprojectTo,text:a.text,url:a.url})}B(ev,Iu);function fv(a){Gu.call(this,{attributions:a.attributions,extent:a.extent,format:a.format,logo:a.logo,projection:a.projection});this.g=new rm;this.l=a.loader;this.o=u(a.strategy)?a.strategy:Lt;this.i={}}B(fv,Gu);fv.prototype.da=function(a){var b=[],c,d;c=0;for(d=a.length;c<d;++c){var e=a[c],f=e.P;f in this.i||(b.push(e),this.i[f]=!0)}fv.B.da.call(this,b)};
fv.prototype.Yc=function(a,b,c){var d=this.g;a=this.o(a,b);var e,f;e=0;for(f=a.length;e<f;++e){var g=a[e];vm(d,g,function(a){return rf(a.extent,g)},void 0)||(this.l.call(this,g,b,c),ym(d,g,{extent:g.slice()}))}};var gv={terrain:{fa:"jpg",opaque:!0},"terrain-background":{fa:"jpg",opaque:!0},"terrain-labels":{fa:"png",opaque:!1},"terrain-lines":{fa:"png",opaque:!1},"toner-background":{fa:"png",opaque:!0},toner:{fa:"png",opaque:!0},"toner-hybrid":{fa:"png",opaque:!1},"toner-labels":{fa:"png",opaque:!1},"toner-lines":{fa:"png",opaque:!1},"toner-lite":{fa:"png",opaque:!0},watercolor:{fa:"jpg",opaque:!0}},hv={terrain:{minZoom:4,maxZoom:18},toner:{minZoom:0,maxZoom:20},watercolor:{minZoom:3,maxZoom:16}};
function iv(a){var b=a.layer.indexOf("-"),b=-1==b?a.layer:a.layer.slice(0,b),c=gv[a.layer],d=sd?"https:":"http:";Xu.call(this,{attributions:jv,crossOrigin:"anonymous",maxZoom:hv[b].maxZoom,opaque:c.opaque,tileLoadFunction:a.tileLoadFunction,url:u(a.url)?a.url:d+"//{a-d}.tile.stamen.com/"+a.layer+"/{z}/{x}/{y}."+c.fa})}B(iv,Xu);
var jv=[new gb({html:'Map tiles by \x3ca href\x3d"http://stamen.com/"\x3eStamen Design\x3c/a\x3e, under \x3ca href\x3d"http://creativecommons.org/licenses/by/3.0/"\x3eCC BY 3.0\x3c/a\x3e.'}),$u];function kv(a,b){Wg.call(this,a,2);this.f=a;this.e=b.ha(a.a);this.c={}}B(kv,Wg);kv.prototype.b=function(a){a=u(a)?v(a):-1;if(a in this.c)return this.c[a];var b=this.e,c=kd(b,b);c.strokeStyle="black";c.strokeRect(0.5,0.5,b+0.5,b+0.5);c.fillStyle="black";c.textAlign="center";c.textBaseline="middle";c.font="24px sans-serif";c.fillText(this.f.toString(),b/2,b/2);return this.c[a]=c.canvas};
function lv(a){Bk.call(this,{extent:a.extent,opaque:!1,projection:a.projection,tileGrid:a.tileGrid});this.a=new du}B(lv,Bk);lv.prototype.cd=function(){return this.a.pa()>this.a.d};lv.prototype.ce=function(a){eu(this.a,a)};lv.prototype.mb=function(a,b,c){var d=this.Ha(a,b,c);if(vn(this.a,d))return this.a.get(d);a=new kv(new ab(a,b,c),this.tileGrid);yn(this.a,d,a);return a};var mv=[];y("grid",function(a){mv.push(a)});function nv(a){fu.call(this,{crossOrigin:a.crossOrigin,projection:Sg("EPSG:3857"),state:0,tileLoadFunction:a.tileLoadFunction});this.Nc=Mt(a.url,{Ed:!0});et(this.Nc,this.a,null,this)}B(nv,fu);
nv.prototype.a=function(){var a=mv.pop(),b=Sg("EPSG:4326"),c;if(u(a.bounds)){var d=Bg(b,this.n);this.L=c=Hf(a.bounds,d)}var e=a.minzoom||0,d=a.maxzoom||22,f=new hu({maxZoom:d,minZoom:e});this.tileGrid=f;this.tileUrlFunction=bu(f.c({extent:c}),Zt(a.tiles));if(u(a.attribution)){b=u(c)?c:b.p();c={};for(var g;e<=d;++e)g=e.toString(),c[g]=[xk(f,b,e)];this.e=[new gb({html:a.attribution,tileRanges:c})]}hk(this,1)};function ov(a){Gu.call(this,{attributions:a.attributions,extent:a.extent,format:a.format,logo:a.logo,projection:a.projection});var b=a.tileGrid;this.l=a.tileGrid;this.i=au;this.o=b.c({extent:a.extent});this.g={};u(a.tileUrlFunction)?(this.i=a.tileUrlFunction,this.s()):u(a.urls)?(this.i=Zt(a.urls),this.s()):u(a.url)&&(this.i=Zt(cu(a.url)),this.s())}B(ov,Gu);ov.prototype.clear=function(){bc(this.g)};
ov.prototype.cc=function(a,b,c,d){var e=this.l,f=this.g;b=Jf(e.a,b,0);a=xk(e,a,b);for(var g,e=a.a;e<=a.d;++e)for(g=a.b;g<=a.c;++g){var h=f[b+"/"+e+"/"+g];if(u(h)){var m,n;m=0;for(n=h.length;m<n;++m){var p=c.call(d,h[m]);if(p)return p}}}};ov.prototype.ee=function(){var a=this.g,b=[],c;for(c in a)Ua(b,a[c]);return b};
ov.prototype.Yc=function(a,b,c){var d=this.o,e=this.l,f=this.i,g=this.g;b=Jf(e.a,b,0);a=xk(e,a,b);var e=new ab(b,0,0),h,m;for(h=a.a;h<=a.d;++h)for(m=a.b;m<=a.c;++m){var n=b+"/"+h+"/"+m;if(!(n in g)){e.a=b;e.x=h;e.y=m;d(e,c,e);var p=f(e,1,c);u(p)&&(g[n]=[],Hu(this,p,xa(function(a,b){g[a]=b;hk(this,1)},n),this))}}};function pv(a){a=u(a)?a:{};var b=u(a.params)?a.params:{};fu.call(this,{attributions:a.attributions,crossOrigin:a.crossOrigin,extent:a.extent,logo:a.logo,opaque:!F(b,"TRANSPARENT",!0),projection:a.projection,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction,tileUrlFunction:wa(this.ah,this)});var c=a.urls;!u(c)&&u(a.url)&&(c=cu(a.url));this.u=c;this.i=u(a.gutter)?a.gutter:0;this.a=b;this.g=NaN;this.d=!0;this.j=a.serverType;this.o=u(a.hidpi)?a.hidpi:!0;this.l="";qv(this);this.q=lf();rv(this)}
B(pv,fu);l=pv.prototype;
l.Zg=function(a,b,c,d){var e=this.g;if(!isNaN(this.g)){var f=this.tileGrid;null===f&&(f=Ck(this,c));b=zk(f,a[0],a[1],b,!1,void 0);if(!(f.Va().length<=b.a)){var g=f.a[b.a],h=wk(f,b,this.q),f=f.ha(b.a),m=this.i;0!==m&&(f+=2*m,h=of(h,g*m,h));1!=e&&(f=f*e+0.5|0);m={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:F(this.a,"LAYERS")};gc(m,this.a,d);d=Math.floor((h[3]-a[1])/(g/e));m[this.d?"I":"X"]=Math.floor((a[0]-h[0])/(g/e));m[this.d?"J":"Y"]=d;return sv(this,
b,f,h,e,c,m)}}};l.ec=k("i");l.Ha=function(a,b,c){return this.l+pv.B.Ha.call(this,a,b,c)};l.$g=k("a");
function sv(a,b,c,d,e,f,g){var h=a.u;if(u(h)&&0!=h.length){g.WIDTH=c;g.HEIGHT=c;g[a.d?"CRS":"SRS"]=f.a;"STYLES"in a.a||(g.STYLES=new String(""));if(1!=e)switch(a.j){case "geoserver":g.FORMAT_OPTIONS="dpi:"+(90*e+0.5|0);break;case "mapserver":g.MAP_RESOLUTION=90*e;break;case "carmentaserver":case "qgis":g.DPI=90*e}c=f.c;a.d&&"ne"==c.substr(0,2)&&(c=d[0],d[0]=d[1],d[1]=c,c=d[2],d[2]=d[3],d[3]=c);g.BBOX=d.join(",");return rh(th([1==h.length?h[0]:h[Rb((b.x<<b.a)+b.y,a.u.length)]],g))}}
l.Mb=function(a,b,c){a=pv.B.Mb.call(this,a,b,c);return 1!=b&&this.o&&u(this.j)?a*b+0.5|0:a};function qv(a){var b=0,c=[],d;for(d in a.a)c[b++]=d+"-"+a.a[d];a.l=c.join("/")}
l.ah=function(a,b,c){var d=this.tileGrid;null===d&&(d=Ck(this,c));if(!(d.Va().length<=a.a)){1==b||this.o&&u(this.j)||(b=1);var e=d.a[a.a],f=wk(d,a,this.q),d=d.ha(a.a),g=this.i;0!==g&&(d+=2*g,f=of(f,e*g,f));e=this.p();if(null===e||Cf(f,e)&&!Gf(f,e))return 1!=b&&(d=d*b+0.5|0),e={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0},gc(e,this.a),this.g=b,sv(this,a,d,f,b,c,e)}};l.bh=function(a){gc(this.a,a);qv(this);rv(this);this.s()};
function rv(a){a.d=0<=Ja(F(a.a,"VERSION","1.3.0"),"1.3")};function tv(a){a=u(a)?a:{};Iu.call(this,{attributions:a.attributions,extent:a.extent,format:new dr({defaultProjection:a.defaultProjection}),logo:a.logo,object:a.object,projection:a.projection,text:a.text,url:a.url})}B(tv,Iu);function uv(a){this.d=a.matrixIds;uk.call(this,{origin:a.origin,origins:a.origins,resolutions:a.resolutions,tileSize:a.tileSize,tileSizes:a.tileSizes})}B(uv,uk);uv.prototype.g=k("d");
function vv(a){var b=[],c=[],d=[],e=[],f=Sg(a.supportedCRS).b();Xa(a.matrixIds,function(a,b){return b.scaleDenominator-a.scaleDenominator});Ma(a.matrixIds,function(a){c.push(a.identifier);d.push(a.topLeftCorner);b.push(2.8E-4*a.scaleDenominator/f);e.push(a.tileWidth)});return new uv({origins:d,resolutions:b,matrixIds:c,tileSizes:e})};var wv="KVP";
function xv(a){function b(a){a=e==wv?rh(th([a],g)):a.replace(/\{(\w+?)\}/g,function(a,b){return b in g?g[b]:a});return function(b){if(null!==b){var c={TileMatrix:f.d[b.a],TileCol:b.x,TileRow:b.y};gc(c,this.a);b=a;return b=e==wv?rh(th([b],c)):b.replace(/\{(\w+?)\}/g,function(a,b){return c[b]})}}}var c=u(a.version)?a.version:"1.0.0",d=u(a.format)?a.format:"image/jpeg";this.a=a.dimensions||{};this.d="";yv(this);var e=u(a.requestEncoding)?a.requestEncoding:wv,f=a.tileGrid,g={Layer:a.layer,style:a.style,
Style:a.style,TileMatrixSet:a.matrixSet};e==wv&&gc(g,{Service:"WMTS",Request:"GetTile",Version:c,Format:d});c=au;d=a.urls;!u(d)&&u(a.url)&&(d=cu(a.url));u(d)&&(c=$t(Na(d,b)));var h=lf(),m=new ab(0,0,0),c=bu(function(b,c){var d=this.tileGrid;if(d.Va().length<=b.a)return null;var e=b.x,f=-b.y-1,g=wk(d,b),x=c.p(),w=u(a.extent)?a.extent:x;null!==w&&(c.j&&w[0]===x[0]&&w[2]===x[2])&&(g=Math.ceil((w[2]-w[0])/(g[2]-g[0])),e=Rb(e,g),m.a=b.a,m.x=e,m.y=b.y,g=wk(d,m,h));return!Cf(g,w)||Gf(g,w)?null:new ab(b.a,
e,f)},c);fu.call(this,{attributions:a.attributions,crossOrigin:a.crossOrigin,extent:a.extent,logo:a.logo,projection:a.projection,tileGrid:f,tileLoadFunction:a.tileLoadFunction,tileUrlFunction:c})}B(xv,fu);xv.prototype.i=k("a");xv.prototype.Ha=function(a,b,c){return this.d+xv.B.Ha.call(this,a,b,c)};function yv(a){var b=0,c=[],d;for(d in a.a)c[b++]=d+"-"+a.a[d];a.d=c.join("/")}xv.prototype.g=function(a){gc(this.a,a);yv(this);this.s()};function zv(a){var b=u(a)?a:b;uk.call(this,{origin:[0,0],resolutions:b.resolutions})}B(zv,uk);zv.prototype.c=function(a){a=u(a)?a:{};var b=this.minZoom,c=this.maxZoom,d=new ab(0,0,0),e=null;if(u(a.extent)){var e=Array(c+1),f;for(f=0;f<=c;++f)e[f]=f<b?null:xk(this,a.extent,f)}return function(a,f,m){f=a.a;if(f<b||c<f)return null;var n=Math.pow(2,f),p=a.x;if(0>p||n<=p)return null;a=a.y;return a<-n||-1<a||null!==e&&(d.a=f,d.x=p,d.y=-a-1,!e[f].contains(d))?null:bb(f,p,-a-1,m)}};function Av(a){a=u(a)?a:{};var b=a.size,c=b[0],d=b[1],e=[],f=256;switch(u(a.tierSizeCalculation)?a.tierSizeCalculation:"default"){case "default":for(;c>f||d>f;)e.push([Math.ceil(c/f),Math.ceil(d/f)]),f+=f;break;case "truncated":for(;c>f||d>f;)e.push([Math.ceil(c/f),Math.ceil(d/f)]),c>>=1,d>>=1}e.push([1,1]);e.reverse();for(var f=[1],g=[0],d=1,c=e.length;d<c;d++)f.push(1<<d),g.push(e[d-1][0]*e[d-1][1]+g[d-1]);f.reverse();var f=new zv({resolutions:f}),h=a.url,b=bu(f.c({extent:[0,0,b[0],b[1]]}),function(a){return null===
a?void 0:h+"TileGroup"+((a.x+a.y*e[a.a][0]+g[a.a])/256|0)+"/"+a.a+"-"+a.x+"-"+a.y+".jpg"});fu.call(this,{attributions:a.attributions,crossOrigin:a.crossOrigin,logo:a.logo,wc:Bv,tileGrid:f,tileUrlFunction:b})}B(Av,fu);function Bv(a,b,c,d,e){Xg.call(this,a,b,c,d,e);this.i={}}B(Bv,Xg);
Bv.prototype.b=function(a){var b=u(a)?v(a).toString():"";if(b in this.i)return this.i[b];a=Bv.B.b.call(this,a);if(2==this.state){if(256==a.width&&256==a.height)return this.i[b]=a;var c=kd(256,256);c.drawImage(a,0,0);return this.i[b]=c.canvas}return a};function Cv(a){a=u(a)?a:{};this.a=a.font;this.b=a.rotation;this.d=a.scale;this.f=a.text;this.i=a.textAlign;this.g=a.textBaseline;this.c=u(a.fill)?a.fill:null;this.e=u(a.stroke)?a.stroke:null;this.j=u(a.offsetX)?a.offsetX:0;this.k=u(a.offsetY)?a.offsetY:0}l=Cv.prototype;l.ef=k("a");l.ph=k("c");l.qh=k("b");l.rh=k("d");l.sh=k("e");l.th=k("f");l.xf=k("i");l.yf=k("g");y("ol.Attribution",gb);y("ol.BrowserFeature",G);G.DEVICE_PIXEL_RATIO=G.vd;G.HAS_CANVAS=G.xd;G.HAS_DEVICE_ORIENTATION=G.yd;G.HAS_GEOLOCATION=G.zd;G.HAS_TOUCH=G.zc;G.HAS_WEBGL=G.Ad;y("ol.Collection",N);N.prototype.clear=N.prototype.clear;N.prototype.extend=N.prototype.xg;N.prototype.forEach=N.prototype.forEach;N.prototype.getArray=N.prototype.yg;N.prototype.getAt=N.prototype.Ld;N.prototype.getLength=N.prototype.$a;N.prototype.insertAt=N.prototype.jc;N.prototype.pop=N.prototype.pop;
N.prototype.push=N.prototype.push;N.prototype.remove=N.prototype.remove;N.prototype.removeAt=N.prototype.tc;N.prototype.setAt=N.prototype.$h;y("ol.DeviceOrientation",Ce);y("ol.Feature",Ue);Ue.prototype.getGeometryName=Ue.prototype.gf;Ue.prototype.getId=Ue.prototype.hf;Ue.prototype.getStyle=Ue.prototype.Eg;Ue.prototype.getStyleFunction=Ue.prototype.Fg;Ue.prototype.setGeometryName=Ue.prototype.k;Ue.prototype.setId=Ue.prototype.b;Ue.prototype.setStyle=Ue.prototype.j;y("ol.FeatureOverlay",$e);
$e.prototype.addFeature=$e.prototype.Zd;$e.prototype.getFeatures=$e.prototype.zg;$e.prototype.getStyle=$e.prototype.Ag;$e.prototype.getStyleFunction=$e.prototype.Bg;$e.prototype.removeFeature=$e.prototype.pc;$e.prototype.setFeatures=$e.prototype.Tb;$e.prototype.setMap=$e.prototype.setMap;$e.prototype.setStyle=$e.prototype.Dg;y("ol.Geolocation",O);Xg.prototype.getImage=Xg.prototype.b;y("ol.Kinetic",gh);y("ol.Map",T);T.prototype.addControl=T.prototype.Ie;T.prototype.addInteraction=T.prototype.Ke;
T.prototype.addLayer=T.prototype.Le;T.prototype.addOverlay=T.prototype.Me;T.prototype.beforeRender=T.prototype.oa;T.prototype.forEachFeatureAtPixel=T.prototype.ad;T.prototype.getControls=T.prototype.bf;T.prototype.getCoordinateFromPixel=T.prototype.ga;T.prototype.getEventCoordinate=T.prototype.Md;T.prototype.getEventPixel=T.prototype.Sc;T.prototype.getInteractions=T.prototype.jf;T.prototype.getLayers=T.prototype.Gc;T.prototype.getOverlays=T.prototype.uf;T.prototype.getPixelFromCoordinate=T.prototype.g;
T.prototype.getViewport=T.prototype.Bf;T.prototype.removeControl=T.prototype.Rh;T.prototype.removeInteraction=T.prototype.Th;T.prototype.removeLayer=T.prototype.Uh;T.prototype.removeOverlay=T.prototype.Vh;T.prototype.render=T.prototype.K;T.prototype.renderSync=T.prototype.Xh;T.prototype.updateSize=T.prototype.L;Si.prototype.preventDefault=Si.prototype.preventDefault;Si.prototype.stopPropagation=Si.prototype.za;y("ol.Object",M);M.prototype.bindTo=M.prototype.Se;M.prototype.get=M.prototype.get;
M.prototype.getProperties=M.prototype.kb;M.prototype.notify=M.prototype.Zc;M.prototype.set=M.prototype.t;M.prototype.setValues=M.prototype.T;M.prototype.unbind=M.prototype.od;M.prototype.unbindAll=M.prototype.ki;y("ol.Observable",re);re.prototype.dispatchChangeEvent=re.prototype.s;re.prototype.on=re.prototype.xh;re.prototype.once=re.prototype.Dh;re.prototype.un=re.prototype.ii;re.prototype.unByKey=re.prototype.ji;y("ol.Overlay",Gn);Wg.prototype.getTileCoord=Wg.prototype.j;ab.prototype.getZXY=ab.prototype.c;
y("ol.View2D",Q);Q.prototype.calculateExtent=Q.prototype.r;Q.prototype.centerOn=Q.prototype.Ue;Q.prototype.constrainResolution=Q.prototype.constrainResolution;Q.prototype.constrainRotation=Q.prototype.constrainRotation;Q.prototype.fitExtent=Q.prototype.Kd;Q.prototype.fitGeometry=Q.prototype.Xe;Q.prototype.getView2D=Q.prototype.M;Q.prototype.getZoom=Q.prototype.Df;Q.prototype.setZoom=Q.prototype.u;
y("ol.animation.bounce",function(a){var b=a.resolution,c=u(a.start)?a.start:ya(),d=u(a.duration)?a.duration:1E3,e=u(a.easing)?a.easing:ch;return function(a,g){if(g.time<c)return g.animate=!0,g.viewHints[0]+=1,!0;if(g.time<c+d){var h=e((g.time-c)/d),m=b-g.view2DState.resolution;g.animate=!0;g.view2DState.resolution+=h*m;g.viewHints[0]+=1;return!0}return!1}});y("ol.animation.pan",dh);y("ol.animation.rotate",eh);y("ol.animation.zoom",fh);y("ol.color.asArray",function(a){return ia(a)?a:Ke(a)});
y("ol.color.asString",Ie);y("ol.control.Attribution",Aj);Aj.prototype.setMap=Aj.prototype.setMap;y("ol.control.Control",zj);zj.prototype.getMap=zj.prototype.N;zj.prototype.setMap=zj.prototype.setMap;y("ol.control.FullScreen",Mn);y("ol.control.Logo",Bj);Bj.prototype.setMap=Bj.prototype.setMap;y("ol.control.MousePosition",Nn);Nn.prototype.setMap=Nn.prototype.setMap;y("ol.control.ScaleLine",Pn);Pn.prototype.setMap=Pn.prototype.setMap;y("ol.control.Zoom",Cj);Cj.prototype.setMap=Cj.prototype.setMap;
y("ol.control.ZoomSlider",eo);y("ol.control.ZoomToExtent",io);y("ol.control.defaults",Dj);y("ol.coordinate.add",bf);y("ol.coordinate.createStringXY",function(a){return function(b){return jf(b,a)}});y("ol.coordinate.format",ef);y("ol.coordinate.fromProjectedArray",function(a,b){var c=b.charAt(0);return"n"===c||"s"===c?[a[1],a[0]]:a});y("ol.coordinate.rotate",gf);y("ol.coordinate.toStringHDMS",function(a){return u(a)?df(a[1],"NS")+" "+df(a[0],"EW"):""});y("ol.coordinate.toStringXY",jf);
y("ol.dom.Input",jo);y("ol.easing.bounce",function(a){a<1/2.75?a*=7.5625*a:a<2/2.75?(a-=1.5/2.75,a=7.5625*a*a+0.75):a<2.5/2.75?(a-=2.25/2.75,a=7.5625*a*a+0.9375):(a-=2.625/2.75,a=7.5625*a*a+0.984375);return a});y("ol.easing.easeIn",function(a){return a*a*a});y("ol.easing.easeOut",$g);y("ol.easing.elastic",function(a){return Math.pow(2,-10*a)*Math.sin((a-0.075)*2*Math.PI/0.3)+1});y("ol.easing.inAndOut",ah);y("ol.easing.linear",bh);y("ol.easing.upAndDown",ch);
y("ol.events.condition.altKeyOnly",function(a){a=a.a;return a.Y&&!a.tb&&!a.ya});y("ol.events.condition.altShiftKeysOnly",Jj);y("ol.events.condition.always",ie);y("ol.events.condition.never",he);y("ol.events.condition.noModifierKeys",Lj);y("ol.events.condition.platformModifierKeyOnly",function(a){a=a.a;return!a.Y&&a.tb&&!a.ya});y("ol.events.condition.shiftKeyOnly",Mj);y("ol.events.condition.targetNotEditable",Nj);y("ol.extent.boundingExtent",kf);y("ol.extent.buffer",of);
y("ol.extent.containsCoordinate",function(a,b){return a[0]<=b[0]&&b[0]<=a[2]&&a[1]<=b[1]&&b[1]<=a[3]});y("ol.extent.containsExtent",rf);y("ol.extent.createEmpty",lf);y("ol.extent.equals",tf);y("ol.extent.extend",uf);y("ol.extent.getBottomLeft",wf);y("ol.extent.getBottomRight",function(a){return[a[2],a[1]]});y("ol.extent.getCenter",xf);y("ol.extent.getHeight",zf);y("ol.extent.getSize",function(a){return[a[2]-a[0],a[3]-a[1]]});y("ol.extent.getTopLeft",Af);
y("ol.extent.getTopRight",function(a){return[a[2],a[3]]});y("ol.extent.getWidth",Bf);y("ol.extent.intersects",Cf);y("ol.extent.isEmpty",Df);y("ol.extent.transform",Hf);y("ol.format.GPX",kp);kp.prototype.readFeature=kp.prototype.vb;kp.prototype.readFeatures=kp.prototype.ua;kp.prototype.readProjection=kp.prototype.ka;kp.prototype.writeFeatures=kp.prototype.yc;y("ol.format.GeoJSON",Sp);Sp.prototype.readFeature=Sp.prototype.vb;Sp.prototype.readFeatures=Sp.prototype.ua;Sp.prototype.readGeometry=Sp.prototype.gd;
Sp.prototype.readProjection=Sp.prototype.ka;Sp.prototype.writeFeature=Sp.prototype.td;Sp.prototype.writeFeatures=Sp.prototype.yc;Sp.prototype.writeGeometry=Sp.prototype.ud;y("ol.format.IGC",aq);aq.prototype.readFeature=aq.prototype.vb;aq.prototype.readFeatures=aq.prototype.ua;aq.prototype.readProjection=aq.prototype.ka;y("ol.format.KML",eq);eq.prototype.readFeature=eq.prototype.vb;eq.prototype.readFeatures=eq.prototype.ua;eq.prototype.readName=eq.prototype.Nh;eq.prototype.readProjection=eq.prototype.ka;
y("ol.format.OSMXML",Yq);y("ol.format.TopoJSON",dr);dr.prototype.readFeatures=dr.prototype.ua;dr.prototype.readProjection=dr.prototype.ka;y("ol.format.WFS",ks);ks.prototype.readFeatureCollectionMetadata=ks.prototype.d;ks.prototype.readFeatures=ks.prototype.ua;ks.prototype.readTransactionResponse=ks.prototype.f;ks.prototype.writeGetFeature=ks.prototype.i;ks.prototype.writeTransaction=ks.prototype.g;y("ol.format.WMSCapabilities",Bs);Bs.prototype.read=Bs.prototype.a;y("ol.geom.Circle",Rl);
Rl.prototype.clone=Rl.prototype.I;Rl.prototype.getCenter=Rl.prototype.bd;Rl.prototype.getExtent=Rl.prototype.p;Rl.prototype.getRadius=Rl.prototype.be;Rl.prototype.getSimplifiedGeometry=Rl.prototype.Wa;Rl.prototype.getType=Rl.prototype.A;Rl.prototype.setCenter=Rl.prototype.Kg;Rl.prototype.setCenterAndRadius=Rl.prototype.re;Rl.prototype.setRadius=Rl.prototype.bi;Rl.prototype.transform=Rl.prototype.transform;y("ol.geom.Geometry",De);De.prototype.getClosestPoint=De.prototype.q;De.prototype.getType=De.prototype.A;
y("ol.geom.GeometryCollection",Tl);Tl.prototype.clone=Tl.prototype.I;Tl.prototype.getExtent=Tl.prototype.p;Tl.prototype.getGeometries=Tl.prototype.ff;Tl.prototype.getSimplifiedGeometry=Tl.prototype.Wa;Tl.prototype.getType=Tl.prototype.A;Tl.prototype.setGeometries=Tl.prototype.te;y("ol.geom.LineString",$l);$l.prototype.appendCoordinate=$l.prototype.Ne;$l.prototype.clone=$l.prototype.I;$l.prototype.getCoordinateAtM=$l.prototype.Lg;$l.prototype.getCoordinates=$l.prototype.v;$l.prototype.getLength=$l.prototype.Mg;
$l.prototype.getType=$l.prototype.A;$l.prototype.setCoordinates=$l.prototype.H;y("ol.geom.LinearRing",eg);eg.prototype.clone=eg.prototype.I;eg.prototype.getArea=eg.prototype.Ng;eg.prototype.getCoordinates=eg.prototype.v;eg.prototype.getType=eg.prototype.A;eg.prototype.setCoordinates=eg.prototype.H;y("ol.geom.MultiLineString",bm);bm.prototype.appendLineString=bm.prototype.Oe;bm.prototype.clone=bm.prototype.I;bm.prototype.getCoordinateAtM=bm.prototype.Og;bm.prototype.getCoordinates=bm.prototype.v;
bm.prototype.getLineString=bm.prototype.qf;bm.prototype.getLineStrings=bm.prototype.Tc;bm.prototype.getType=bm.prototype.A;bm.prototype.setCoordinates=bm.prototype.H;y("ol.geom.MultiPoint",em);em.prototype.appendPoint=em.prototype.Qe;em.prototype.clone=em.prototype.I;em.prototype.getCoordinates=em.prototype.v;em.prototype.getPoint=em.prototype.vf;em.prototype.getPoints=em.prototype.Od;em.prototype.getType=em.prototype.A;em.prototype.setCoordinates=em.prototype.H;y("ol.geom.MultiPolygon",fm);
fm.prototype.appendPolygon=fm.prototype.Re;fm.prototype.clone=fm.prototype.I;fm.prototype.getArea=fm.prototype.Pg;fm.prototype.getCoordinates=fm.prototype.v;fm.prototype.getInteriorPoints=fm.prototype.lf;fm.prototype.getPolygon=fm.prototype.wf;fm.prototype.getPolygons=fm.prototype.Pd;fm.prototype.getType=fm.prototype.A;fm.prototype.setCoordinates=fm.prototype.H;y("ol.geom.Point",hg);hg.prototype.clone=hg.prototype.I;hg.prototype.getCoordinates=hg.prototype.v;hg.prototype.getType=hg.prototype.A;
hg.prototype.setCoordinates=hg.prototype.H;y("ol.geom.Polygon",pg);pg.prototype.appendLinearRing=pg.prototype.Pe;pg.prototype.clone=pg.prototype.I;pg.prototype.getArea=pg.prototype.Qg;pg.prototype.getCoordinates=pg.prototype.v;pg.prototype.getInteriorPoint=pg.prototype.kf;pg.prototype.getLinearRing=pg.prototype.rf;pg.prototype.getLinearRings=pg.prototype.Nd;pg.prototype.getType=pg.prototype.A;pg.prototype.setCoordinates=pg.prototype.H;y("ol.geom.SimpleGeometry",Lf);Lf.prototype.getExtent=Lf.prototype.p;
Lf.prototype.getFirstCoordinate=Lf.prototype.df;Lf.prototype.getLastCoordinate=Lf.prototype.mf;Lf.prototype.getLayout=Lf.prototype.nf;Lf.prototype.getSimplifiedGeometry=Lf.prototype.Wa;Lf.prototype.transform=Lf.prototype.transform;y("ol.inherits",B);y("ol.interaction.DoubleClickZoom",Ij);y("ol.interaction.DragAndDrop",lt);y("ol.interaction.DragBox",Yj);Yj.prototype.getGeometry=Yj.prototype.J;y("ol.interaction.DragPan",Rj);y("ol.interaction.DragRotate",Sj);y("ol.interaction.DragRotateAndZoom",pt);
y("ol.interaction.DragZoom",Zj);y("ol.interaction.Draw",rt);y("ol.interaction.KeyboardPan",ak);y("ol.interaction.KeyboardZoom",bk);y("ol.interaction.Modify",Bt);y("ol.interaction.MouseWheelZoom",ck);y("ol.interaction.PinchRotate",dk);y("ol.interaction.PinchZoom",ek);y("ol.interaction.Select",Gt);Gt.prototype.getFeatures=Gt.prototype.f;Gt.prototype.setMap=Gt.prototype.setMap;y("ol.interaction.defaults",fk);y("ol.layer.Group",jk);y("ol.layer.Heatmap",It);y("ol.layer.Image",Xk);y("ol.layer.Layer",qk);
qk.prototype.getSource=qk.prototype.Na;y("ol.layer.Tile",Yk);y("ol.layer.Vector",Zk);Zk.prototype.getStyle=Zk.prototype.Pa;Zk.prototype.getStyleFunction=Zk.prototype.Qa;Zk.prototype.setStyle=Zk.prototype.j;y("ol.loadingstrategy.all",function(){return[[-Infinity,-Infinity,Infinity,Infinity]]});y("ol.loadingstrategy.bbox",Lt);
y("ol.loadingstrategy.createTile",function(a){return function(b,c){var d=Jf(a.a,c,0),e=xk(a,b,d),f=[],d=new ab(d,0,0);for(d.x=e.a;d.x<=e.d;++d.x)for(d.y=e.b;d.y<=e.c;++d.y)f.push(wk(a,d));return f}});y("ol.proj.METERS_PER_UNIT",wg);y("ol.proj.Projection",yg);yg.prototype.getCode=yg.prototype.g;yg.prototype.getExtent=yg.prototype.p;yg.prototype.getUnits=yg.prototype.n;y("ol.proj.addProjection",Qg);y("ol.proj.common.add",pk);y("ol.proj.configureProj4jsProjection",function(a){return Cg(a)});
y("ol.proj.get",Sg);y("ol.proj.getTransform",Tg);y("ol.proj.getTransformFromProjections",Bg);y("ol.proj.transform",function(a,b,c){return Tg(b,c)(a)});y("ol.proj.transformWithProjections",function(a,b,c){return Bg(b,c)(a)});$k.prototype.drawAsync=$k.prototype.$b;$k.prototype.drawCircleGeometry=$k.prototype.Gb;$k.prototype.drawFeature=$k.prototype.Oc;$k.prototype.drawLineStringGeometry=$k.prototype.Hb;$k.prototype.drawMultiLineStringGeometry=$k.prototype.Ib;$k.prototype.drawMultiPointGeometry=$k.prototype.Jb;
$k.prototype.drawPointGeometry=$k.prototype.Kb;$k.prototype.drawPolygonGeometry=$k.prototype.ib;$k.prototype.setFillStrokeStyle=$k.prototype.ma;$k.prototype.setImageStyle=$k.prototype.xb;$k.prototype.setTextStyle=$k.prototype.$;y("ol.source.BingMaps",iu);iu.TOS_ATTRIBUTION=ju;y("ol.source.GPX",Ju);y("ol.source.GeoJSON",Ku);y("ol.source.IGC",Lu);y("ol.source.ImageCanvas",Nu);y("ol.source.ImageStatic",Ou);y("ol.source.ImageVector",Pu);y("ol.source.ImageWMS",Qu);Qu.prototype.getGetFeatureInfoUrl=Qu.prototype.Vg;
Qu.prototype.getParams=Qu.prototype.Wg;Qu.prototype.setUrl=Qu.prototype.Xg;Qu.prototype.updateParams=Qu.prototype.Yg;y("ol.source.KML",Tu);y("ol.source.MapGuide",Wu);y("ol.source.MapQuest",bv);y("ol.source.OSM",Yu);Yu.DATA_ATTRIBUTION=$u;Yu.TILE_ATTRIBUTION=av;y("ol.source.OSMXML",ev);y("ol.source.ServerVector",fv);fv.prototype.readFeatures=fv.prototype.d;gk.prototype.getExtent=gk.prototype.p;gk.prototype.getState=gk.prototype.X;y("ol.source.Stamen",iv);y("ol.source.StaticVector",Iu);
y("ol.source.Tile",Bk);Bk.prototype.getTileGrid=Bk.prototype.zf;y("ol.source.TileDebug",lv);y("ol.source.TileJSON",nv);y("ol.source.TileVector",ov);y("ol.source.TileWMS",pv);pv.prototype.getGetFeatureInfoUrl=pv.prototype.Zg;pv.prototype.getParams=pv.prototype.$g;pv.prototype.updateParams=pv.prototype.bh;y("ol.source.TopoJSON",tv);y("ol.source.Vector",Bm);Bm.prototype.addFeature=Bm.prototype.de;Bm.prototype.addFeatures=Bm.prototype.Je;Bm.prototype.forEachFeature=Bm.prototype.Ye;
Bm.prototype.forEachFeatureInExtent=Bm.prototype.Qc;Bm.prototype.getClosestFeatureToCoordinate=Bm.prototype.af;Bm.prototype.getExtent=Bm.prototype.p;Bm.prototype.getFeatures=Bm.prototype.ee;Bm.prototype.getFeaturesAtCoordinate=Bm.prototype.cf;Bm.prototype.removeFeature=Bm.prototype.dh;y("ol.source.WMTS",xv);
y("ol.source.WMTS.optionsFromCapabilities",function(a,b){var c=Pa(a.contents.layers,function(a){return a.identifier==b}),d=c.tileMatrixSetLinks[0].tileMatrixSet,e=c.formats[0],f=Qa(c.styles,function(a){return a.isDefault});0>f&&(f=0);var f=c.styles[f].identifier,g={};Ma(c.dimensions,function(a){var b=a.identifier,c=a["default"];u(c)||(c=a.values[0]);g[b]=c});var h=a.contents.tileMatrixSets[d],m=vv(h),h=Sg(h.supportedCRS),n=a.operationsMetadata.GetTile.dcp.http.get,p,q;switch($b(n[0].constraints.GetEncoding.allowedValues)[0]){case "REST":case "RESTful":q=
"REST";p=c.resourceUrls.tile[e];break;case "KVP":q=wv,p=[],Ma(n,function(a){a.constraints.GetEncoding.allowedValues.hasOwnProperty(wv)&&p.push(a.url)})}return{urls:p,layer:b,matrixSet:d,format:e,projection:h,requestEncoding:q,tileGrid:m,style:f,dimensions:g}});xv.prototype.getDimensions=xv.prototype.i;xv.prototype.updateDimensions=xv.prototype.g;y("ol.source.XYZ",Xu);Xu.prototype.setUrl=Xu.prototype.a;y("ol.source.Zoomify",Av);y("ol.style.Circle",Se);Se.prototype.getAnchor=Se.prototype.Lb;
Se.prototype.getFill=Se.prototype.eh;Se.prototype.getImage=Se.prototype.Rb;Se.prototype.getRadius=Se.prototype.fh;Se.prototype.getSize=Se.prototype.sb;Se.prototype.getStroke=Se.prototype.gh;y("ol.style.Fill",Pe);Pe.prototype.getColor=Pe.prototype.c;y("ol.style.Icon",Mk);Mk.prototype.getAnchor=Mk.prototype.Lb;Mk.prototype.getImage=Mk.prototype.Rb;Mk.prototype.getSize=Mk.prototype.sb;Mk.prototype.getSrc=Mk.prototype.hh;y("ol.style.Image",Qe);Qe.prototype.getRotation=Qe.prototype.o;
Qe.prototype.getScale=Qe.prototype.O;y("ol.style.Stroke",Re);Re.prototype.getColor=Re.prototype.ih;Re.prototype.getLineCap=Re.prototype.of;Re.prototype.getLineDash=Re.prototype.jh;Re.prototype.getLineJoin=Re.prototype.pf;Re.prototype.getMiterLimit=Re.prototype.tf;Re.prototype.getWidth=Re.prototype.kh;y("ol.style.Style",Te);Te.prototype.getFill=Te.prototype.lh;Te.prototype.getImage=Te.prototype.mh;Te.prototype.getStroke=Te.prototype.nh;Te.prototype.getText=Te.prototype.oh;Te.prototype.getZIndex=Te.prototype.Cf;
y("ol.style.Text",Cv);Cv.prototype.getFill=Cv.prototype.ph;Cv.prototype.getFont=Cv.prototype.ef;Cv.prototype.getRotation=Cv.prototype.qh;Cv.prototype.getScale=Cv.prototype.rh;Cv.prototype.getStroke=Cv.prototype.sh;Cv.prototype.getText=Cv.prototype.th;Cv.prototype.getTextAlign=Cv.prototype.xf;Cv.prototype.getTextBaseline=Cv.prototype.yf;y("ol.tilegrid.TileGrid",uk);uk.prototype.getMinZoom=uk.prototype.sf;uk.prototype.getOrigin=uk.prototype.Sb;uk.prototype.getResolutions=uk.prototype.Va;
uk.prototype.getTileSize=uk.prototype.ha;y("ol.tilegrid.WMTS",uv);uv.prototype.getMatrixIds=uv.prototype.g;y("ol.tilegrid.XYZ",hu);y("ol.tilegrid.Zoomify",zv);y("ol.webgl.Context",zn);zn.prototype.getGL=zn.prototype.uh;zn.prototype.useProgram=zn.prototype.dd;})();
/*
Copyright © 2013 Adobe Systems Incorporated.

Licensed under the Apache License, Version 2.0 (the “License”);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * See <a href="http://jquery.com">http://jquery.com</a>.
 * @name jquery
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See <a href="http://jquery.com">http://jquery.com</a>
 * @name fn
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf jquery
 */

/**
 * @fileOverview accessibleMegaMenu plugin
 *
 *<p>Licensed under the Apache License, Version 2.0 (the “License”)
 *<br />Copyright © 2013 Adobe Systems Incorporated.
 *<br />Project page <a href="https://github.com/adobe-accessibility/Accessible-Mega-Menu">https://github.com/adobe-accessibility/Accessible-Mega-Menu</a>
 * @version 0.1
 * @author Michael Jordan
 * @requires jquery
 */

/*jslint browser: true, devel: true, plusplus: true, nomen: true */
/*global jQuery */

(function ($, window, document) {
    "use strict";
    var pluginName = "accessibleMegaMenu",
        defaults = {
            uuidPrefix: "accessible-megamenu", // unique ID's are required to indicate aria-owns, aria-controls and aria-labelledby
            menuClass: "accessible-megamenu", // default css class used to define the megamenu styling
            topNavItemClass: "accessible-megamenu-top-nav-item", // default css class for a top-level navigation item in the megamenu
            panelClass: "accessible-megamenu-panel", // default css class for a megamenu panel
            panelGroupClass: "accessible-megamenu-panel-group", // default css class for a group of items within a megamenu panel
            hoverClass: "hover", // default css class for the hover state
            focusClass: "focus", // default css class for the focus state
            openClass: "open" // default css class for the open state
        },
        Keyboard = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            keyMap: {
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9",
                190: "."
            }
        };
    /**
     * @desc Creates a new accessible mega menu instance.
     * @param {jquery} element
     * @param {object} [options] Mega Menu options
     * @param {string} [options.uuidPrefix=accessible-megamenu] - Prefix for generated unique id attributes, which are required to indicate aria-owns, aria-controls and aria-labelledby
     * @param {string} [options.menuClass=accessible-megamenu] - CSS class used to define the megamenu styling
     * @param {string} [options.topNavItemClass=accessible-megamenu-top-nav-item] - CSS class for a top-level navigation item in the megamenu
     * @param {string} [options.panelClass=accessible-megamenu-panel] - CSS class for a megamenu panel
     * @param {string} [options.panelGroupClass=accessible-megamenu-panel-group] - CSS class for a group of items within a megamenu panel
     * @param {string} [options.hoverClass=hover] - CSS class for the hover state
     * @param {string} [options.focusClass=focus] - CSS class for the focus state
     * @param {string} [options.openClass=open] - CSS class for the open state
     * @constructor
     */
    function AccessibleMegaMenu(element, options) {
        this.element = element;

        // merge optional settings and defaults into settings
        this.settings = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.mouseTimeoutID = null;
        this.focusTimeoutID = null;
        this.mouseFocused = false;
        this.justFocused = false;

        this.init();
    }

    AccessibleMegaMenu.prototype = (function () {

        /* private attributes and methods ------------------------ */
        var uuid = 0,
            keydownTimeoutDuration = 1000,
            keydownSearchString = "",
            isTouch = typeof window.hasOwnProperty === "function" && !!window.hasOwnProperty("ontouchstart"),
            _getPlugin,
            _addUniqueId,
            _togglePanel,
            _clickHandler,
            _clickOutsideHandler,
            _DOMAttrModifiedHandler,
            _focusInHandler,
            _focusOutHandler,
            _keyDownHandler,
            _mouseDownHandler,
            _mouseOverHandler,
            _mouseOutHandler,
            _toggleExpandedEventHandlers;

        /**
         * @name jQuery.fn.accessibleMegaMenu~_getPlugin
         * @desc Returns the parent accessibleMegaMenu instance for a given element
         * @param {jQuery} element
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _getPlugin = function (element) {
            return $(element).closest(':data(plugin_' + pluginName + ')').data("plugin_" + pluginName);
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_addUniqueId
         * @desc Adds a unique id and element.
         * The id string starts with the
         * string defined in settings.uuidPrefix.
         * @param {jQuery} element
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _addUniqueId = function (element) {
            element = $(element);
            var settings = this.settings;
            if (!element.attr("id")) {
                element.attr("id", settings.uuidPrefix + "-" + new Date().getTime() + "-" + (++uuid));
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_togglePanel
         * @desc Toggle the display of mega menu panels in response to an event.
         * The optional boolean value 'hide' forces all panels to hide.
         * @param {event} event
         * @param {Boolean} [hide] Hide all mega menu panels when true
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _togglePanel = function (event, hide) {
            var target = $(event.target),
                that = this,
                settings = this.settings,
                menu = this.menu,
                topli = target.closest('.' + settings.topNavItemClass),
                panel = target.hasClass(settings.panelClass) ? target : target.closest('.' + settings.panelClass),
                newfocus;

            _toggleExpandedEventHandlers.call(this, hide);
            $('html').off('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu, pointerup.outside-accessible-megamenu', _clickOutsideHandler);
            menu.find('[aria-expanded].' + this.settings.panelClass).off('DOMAttrModified.accessible-megamenu');

            if (hide) {
                topli = menu.find('.' + settings.topNavItemClass + ' .' + settings.openClass + ':first').closest('.' + settings.topNavItemClass);
                if (!(topli.is(event.relatedTarget) || topli.has(event.relatedTarget).length > 0)) {
                    if ((event.type === 'mouseout' || event.type === 'focusout') && topli.has(document.activeElement).length > 0) {
                        return;
                    }
                    topli.find('[aria-expanded]')
                        .attr('aria-expanded', 'false')
                        .removeClass(settings.openClass)
                        .filter('.' + settings.panelClass)
                        .attr('aria-hidden', 'true');
                    if ((event.type === 'keydown' && event.keyCode === Keyboard.ESCAPE) || event.type === 'DOMAttrModified') {
                        newfocus = topli.find(':tabbable:first');
                        setTimeout(function () {
                            menu.find('[aria-expanded].' + that.settings.panelClass).off('DOMAttrModified.accessible-megamenu');
                            newfocus.focus();
                            that.justFocused = false;
                        }, 99);
                    }
                } else if (topli.length === 0) {
                    menu.find('[aria-expanded=true]')
                        .attr('aria-expanded', 'false')
                        .removeClass(settings.openClass)
                        .filter('.' + settings.panelClass)
                        .attr('aria-hidden', 'true');
                }
            } else {
                clearTimeout(that.focusTimeoutID);
                topli.siblings()
                    .find('[aria-expanded]')
                    .attr('aria-expanded', 'false')
                    .removeClass(settings.openClass)
                    .filter('.' + settings.panelClass)
                    .attr('aria-hidden', 'true');
                topli.find('[aria-expanded]')
                    .attr('aria-expanded', 'true')
                    .addClass(settings.openClass)
                    .filter('.' + settings.panelClass)
                    .attr('aria-hidden', 'false');
                if (event.type === 'mouseover' && target.is(':tabbable') && topli.length === 1 && panel.length === 0 && menu.has(document.activeElement).length > 0) {
                    target.focus();
                    that.justFocused = false;
                }

                _toggleExpandedEventHandlers.call(that);
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_clickHandler
         * @desc Handle click event on mega menu item
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _clickHandler = function (event) {
            var target = $(event.target),
                topli = target.closest('.' + this.settings.topNavItemClass),
                panel = target.closest('.' + this.settings.panelClass);
            if (topli.length === 1
                    && panel.length === 0
                    && topli.find('.' + this.settings.panelClass).length === 1) {
                if (!target.hasClass(this.settings.openClass)) {
                    event.preventDefault();
                    event.stopPropagation();
                    _togglePanel.call(this, event);
                } else {
                    if (this.justFocused) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.justFocused = false;
                    } else if (isTouch) {
                        event.preventDefault();
                        event.stopPropagation();
                        _togglePanel.call(this, event, target.hasClass(this.settings.openClass));
                    }
                }
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_clickOutsideHandler
         * @desc Handle click event outside of a the megamenu
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _clickOutsideHandler = function (event) {
            if (this.menu.has($(event.target)).length === 0) {
                event.preventDefault();
                event.stopPropagation();
                _togglePanel.call(this, event, true);
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_DOMAttrModifiedHandler
         * @desc Handle DOMAttrModified event on panel to respond to Windows 8 Narrator ExpandCollapse pattern
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _DOMAttrModifiedHandler = function (event) {
            if (event.originalEvent.attrName === 'aria-expanded'
                    && event.originalEvent.newValue === 'false'
                    && $(event.target).hasClass(this.settings.openClass)) {
                event.preventDefault();
                event.stopPropagation();
                _togglePanel.call(this, event, true);
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_focusInHandler
         * @desc Handle focusin event on mega menu item.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _focusInHandler = function (event) {
            clearTimeout(this.focusTimeoutID);
            $(event.target)
                .addClass(this.settings.focusClass)
                .on('click.accessible-megamenu', $.proxy(_clickHandler, this));
            this.justFocused = !this.mouseFocused;
            this.mouseFocused = false;
            if (this.panels.filter('.' + this.settings.openClass).length) {
                _togglePanel.call(this, event);
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_focusOutHandler
         * @desc Handle focusout event on mega menu item.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _focusOutHandler = function (event) {
            this.justFocused = false;
            var that = this,
                target = $(event.target),
                topli = target.closest('.' + this.settings.topNavItemClass),
                keepOpen = false;
            target
                .removeClass(this.settings.focusClass)
                .off('click.accessible-megamenu', $.proxy(_clickHandler, this));

            if (window.cvox) {
                // If ChromeVox is running...
                that.focusTimeoutID = setTimeout(function () {
                    window.cvox.Api.getCurrentNode(function (node) {
                        if (topli.has(node).length) {
                            // and the current node being voiced is in
                            // the mega menu, clearTimeout,
                            // so the panel stays open.
                            clearTimeout(that.focusTimeoutID);
                        } else {
                            that.focusTimeoutID = setTimeout(function (scope, event, hide) {
                                _togglePanel.call(scope, event, hide);
                            }, 275, that, event, true);
                        }
                    });
                }, 25);
            } else {
                that.focusTimeoutID = setTimeout(function () {
                    _togglePanel.call(that, event, true);
                }, 300);
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_keyDownHandler
         * @desc Handle keydown event on mega menu.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _keyDownHandler = function (event) {
            var that = (this.constructor === AccessibleMegaMenu) ? this : _getPlugin(this), // determine the AccessibleMegaMenu plugin instance
                settings = that.settings,
                target = $($(this).is('.' + settings.hoverClass + ':tabbable') ? this : event.target), // if the element is hovered the target is this, otherwise, its the focused element
                menu = that.menu,
                topnavitems = that.topnavitems,
                topli = target.closest('.' + settings.topNavItemClass),
                tabbables = menu.find(':tabbable'),
                panel = target.hasClass(settings.panelClass) ? target : target.closest('.' + settings.panelClass),
                panelGroups = panel.find('.' + settings.panelGroupClass),
                currentPanelGroup = target.closest('.' + settings.panelGroupClass),
                next,
                keycode = event.keyCode || event.which,
                start,
                i,
                o,
                label,
                found = false,
                newString = Keyboard.keyMap[event.keyCode] || '',
                regex,
                isTopNavItem = (topli.length === 1 && panel.length === 0);

            if (target.is("input:focus, select:focus, textarea:focus, button:focus")) {
                // if the event target is a form element we should handle keydown normally
                return;
            }

            if (target.is('.' + settings.hoverClass + ':tabbable')) {
                $('html').off('keydown.accessible-megamenu');
            }

            switch (keycode) {
            case Keyboard.ESCAPE:
                _togglePanel.call(that, event, true);
                break;
            case Keyboard.DOWN:
                event.preventDefault();
                if (isTopNavItem) {
                    _togglePanel.call(that, event);
                    found = (topli.find('.' + settings.panelClass + ' :tabbable:first').focus().length === 1);
                } else {
                    found = (tabbables.filter(':gt(' + tabbables.index(target) + '):first').focus().length === 1);
                }

                if (!found && window.opera && opera.toString() === "[object Opera]" && (event.ctrlKey || event.metaKey)) {
                    tabbables = $(':tabbable');
                    i = tabbables.index(target);
                    found = ($(':tabbable:gt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                }
                break;
            case Keyboard.UP:
                event.preventDefault();
                if (isTopNavItem && target.hasClass(settings.openClass)) {
                    _togglePanel.call(that, event, true);
                    next = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last');
                    if (next.children('.' + settings.panelClass).length) {
                        found = (next.children()
                            .attr('aria-expanded', 'true')
                            .addClass(settings.openClass)
                            .filter('.' + settings.panelClass)
                            .attr('aria-hidden', 'false')
                            .find(':tabbable:last')
                            .focus() === 1);
                    }
                } else if (!isTopNavItem) {
                    found = (tabbables.filter(':lt(' + tabbables.index(target) + '):last').focus().length === 1);
                }

                if (!found && window.opera && opera.toString() === "[object Opera]" && (event.ctrlKey || event.metaKey)) {
                    tabbables = $(':tabbable');
                    i = tabbables.index(target);
                    found = ($(':tabbable:lt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                }
                break;
            case Keyboard.RIGHT:
                event.preventDefault();
                if (isTopNavItem) {
                    found = (topnavitems.filter(':gt(' + topnavitems.index(topli) + '):first').find(':tabbable:first').focus().length === 1);
                } else {
                    if (panelGroups.length && currentPanelGroup.length) {
                        // if the current panel contains panel groups, and we are able to focus the first tabbable element of the next panel group
                        found = (panelGroups.filter(':gt(' + panelGroups.index(currentPanelGroup) + '):first').find(':tabbable:first').focus().length === 1);
                    }

                    if (!found) {
                        found = (topli.find(':tabbable:first').focus().length === 1);
                    }
                }
                break;
            case Keyboard.LEFT:
                event.preventDefault();
                if (isTopNavItem) {
                    found = (topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last').find(':tabbable:first').focus().length === 1);
                } else {
                    if (panelGroups.length && currentPanelGroup.length) {
                        // if the current panel contains panel groups, and we are able to focus the first tabbable element of the previous panel group
                        found = (panelGroups.filter(':lt(' + panelGroups.index(currentPanelGroup) + '):last').find(':tabbable:first').focus().length === 1);
                    }

                    if (!found) {
                        found = (topli.find(':tabbable:first').focus().length === 1);
                    }
                }
                break;
            case Keyboard.TAB:
                i = tabbables.index(target);
                if (event.shiftKey && isTopNavItem && target.hasClass(settings.openClass)) {
                    _togglePanel.call(that, event, true);
                    next = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last');
                    if (next.children('.' + settings.panelClass).length) {
                        found = next.children()
                            .attr('aria-expanded', 'true')
                            .addClass(settings.openClass)
                            .filter('.' + settings.panelClass)
                            .attr('aria-hidden', 'false')
                            .find(':tabbable:last')
                            .focus();
                    }
                } else if (event.shiftKey && i > 0) {
                    found = (tabbables.filter(':lt(' + i + '):last').focus().length === 1);
                } else if (!event.shiftKey && i < tabbables.length - 1) {
                    found = (tabbables.filter(':gt(' + i + '):first').focus().length === 1);
                } else if (window.opera && opera.toString() === "[object Opera]") {
                    tabbables = $(':tabbable');
                    i = tabbables.index(target);
                    if (event.shiftKey) {
                        found = ($(':tabbable:lt(' + $(':tabbable').index(target) + '):last').focus().length === 1);
                    } else {
                        found = ($(':tabbable:gt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                    }
                }

                if (found) {
                    event.preventDefault();
                }
                break;
            case Keyboard.SPACE:
                if (isTopNavItem) {
                    event.preventDefault();
                    _clickHandler.call(that, event);
                } else {
                    return true;
                }
                break;
            case Keyboard.ENTER:
                return true;
                break;
            default:
                // alphanumeric filter
                clearTimeout(this.keydownTimeoutID);

                keydownSearchString += newString !== keydownSearchString ? newString : '';

                if (keydownSearchString.length === 0) {
                    return;
                }

                this.keydownTimeoutID = setTimeout(function () {
                    keydownSearchString = '';
                }, keydownTimeoutDuration);

                if (isTopNavItem && !target.hasClass(settings.openClass)) {
                    tabbables = tabbables.filter(':not(.' + settings.panelClass + ' :tabbable)');
                } else {
                    tabbables = topli.find(':tabbable');
                }

                if (event.shiftKey) {
                    tabbables = $(tabbables.get()
                        .reverse());
                }

                for (i = 0; i < tabbables.length; i++) {
                    o = tabbables.eq(i);
                    if (o.is(target)) {
                        start = (keydownSearchString.length === 1) ? i + 1 : i;
                        break;
                    }
                }

                regex = new RegExp('^' + keydownSearchString.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'), 'i');

                for (i = start; i < tabbables.length; i++) {
                    o = tabbables.eq(i);
                    label = $.trim(o.text());
                    if (regex.test(label)) {
                        found = true;
                        o.focus();
                        break;
                    }
                }
                if (!found) {
                    for (i = 0; i < start; i++) {
                        o = tabbables.eq(i);
                        label = $.trim(o.text());
                        if (regex.test(label)) {
                            o.focus();
                            break;
                        }
                    }
                }
                break;
            }
            that.justFocused = false;
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_mouseDownHandler
         * @desc Handle mousedown event on mega menu.
         * @param {event} Event object
         * @memberof accessibleMegaMenu
         * @inner
         * @private
         */
        _mouseDownHandler = function (event) {
            if ($(event.target).is(":tabbable, :focusable, ." + this.settings.panelClass)) {
                this.mouseFocused = true;
            }
            this.mouseTimeoutID = setTimeout(function () {
                clearTimeout(this.focusTimeoutID);
            }, 1);
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_mouseOverHandler
         * @desc Handle mouseover event on mega menu.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _mouseOverHandler = function (event) {
            clearTimeout(this.mouseTimeoutID);
            $(event.target)
                .addClass(this.settings.hoverClass);
            _togglePanel.call(this, event);
            if ($(event.target).is(':tabbable')) {
                $('html').on('keydown.accessible-megamenu', $.proxy(_keyDownHandler, event.target));
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_mouseOutHandler
         * @desc Handle mouseout event on mega menu.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _mouseOutHandler = function (event) {
            var that = this;
            $(event.target)
                .removeClass(that.settings.hoverClass);

            that.mouseTimeoutID = setTimeout(function () {
                _togglePanel.call(that, event, true);
            }, 250);
            if ($(event.target).is(':tabbable')) {
                $('html').off('keydown.accessible-megamenu');
            }
        };

        _toggleExpandedEventHandlers = function (hide) {
            var menu = this.menu;
            if (hide) {
                $('html').off('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu', _clickOutsideHandler);

                menu.find('[aria-expanded].' + this.settings.panelClass).off('DOMAttrModified.accessible-megamenu', _DOMAttrModifiedHandler);
            } else {
                $('html').on('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu', $.proxy(_clickOutsideHandler, this));

                /* Narrator in Windows 8 automatically toggles the aria-expanded property on double tap or click.
                   To respond to the change to collapse the panel, we must add a listener for a DOMAttrModified event. */
                menu.find('[aria-expanded=true].' + this.settings.panelClass).on('DOMAttrModified.accessible-megamenu', $.proxy(_DOMAttrModifiedHandler, this));
            }
        };

        /* public attributes and methods ------------------------- */
        return {
            constructor: AccessibleMegaMenu,

            /**
             * @lends jQuery.fn.accessibleMegaMenu
             * @desc Initializes an instance of the accessibleMegaMenu plugins
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            init: function () {
                var that = this,
                    settings = this.settings,
                    nav = this.nav = $(this.element),
                    menu = this.menu = nav.children().first(),
                    topnavitems = this.topnavitems = menu.children();
                nav.attr("role", "navigation");
                menu.addClass(settings.menuClass);
                topnavitems.each(function (i, topnavitem) {
                    var topnavitemlink, topnavitempanel;
                    topnavitem = $(topnavitem);
                    topnavitem.addClass(settings.topNavItemClass);
                    topnavitemlink = topnavitem.find(":tabbable:first");
                    topnavitempanel = topnavitem.children(":not(:tabbable):last");
                    _addUniqueId.call(that, topnavitemlink);
                    if (topnavitempanel.length) {
                        _addUniqueId.call(that, topnavitempanel);
                        topnavitemlink.attr({
                            "aria-haspopup": true,
                            "aria-owns": topnavitempanel.attr("id"),
                            "aria-controls": topnavitempanel.attr("id"),
                            "aria-expanded": false
                        });

                        topnavitempanel.attr({
                            "role": "group",
                            "aria-expanded": false,
                            "aria-hidden": true
                        })
                            .addClass(settings.panelClass)
                            .not("[aria-labelledby]")
                            .attr("aria-labelledby", topnavitemlink.attr("id"));
                    }
                });

                this.panels = menu.find("." + settings.panelClass);

                menu.on("focusin.accessible-megamenu", ":tabbable, :focusable, ." + settings.panelClass, $.proxy(_focusInHandler, this))
                    .on("focusout.accessible-megamenu", ":tabbable, :focusable, ." + settings.panelClass, $.proxy(_focusOutHandler, this))
                    .on("keydown.accessible-megamenu", $.proxy(_keyDownHandler, this))
                    .on("mouseover.accessible-megamenu", $.proxy(_mouseOverHandler, this))
                    .on("mouseout.accessible-megamenu", $.proxy(_mouseOutHandler, this))
                    .on("mousedown.accessible-megamenu", $.proxy(_mouseDownHandler, this));

                if (isTouch) {
                    menu.on("touchstart.accessible-megamenu",  $.proxy(_clickHandler, this));
                }

                menu.find("hr").attr("role", "separator");
            },

            /**
             * @desc Get default values
             * @example $(selector).accessibleMegaMenu("getDefaults");
             * @return {object}
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            getDefaults: function () {
                return this._defaults;
            },

            /**
             * @desc Get any option set to plugin using its name (as string)
             * @example $(selector).accessibleMegaMenu("getOption", some_option);
             * @param {string} opt
             * @return {string}
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            getOption: function (opt) {
                return this.settings[opt];
            },

            /**
             * @desc Get all options
             * @example $(selector).accessibleMegaMenu("getAllOptions");
             * @return {object}
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            getAllOptions: function () {
                return this.settings;
            },

            /**
             * @desc Set option
             * @example $(selector).accessibleMegaMenu("setOption", "option_name",  "option_value",  reinitialize);
             * @param {string} opt - Option name
             * @param {string} val - Option value
             * @param {boolean} [reinitialize] - boolean to re-initialize the menu.
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            setOption: function (opt, value, reinitialize) {
                this.settings[opt] = value;
                if (reinitialize) {
                    this.init();
                }
            }
        };
    }());

    /* lightweight plugin wrapper around the constructor,
       to prevent against multiple instantiations */

    /**
     * @class accessibleMegaMenu
     * @memberOf jQuery.fn
     * @classdesc Implements an accessible mega menu as a jQuery plugin.
     * <p>The mega-menu It is modeled after the mega menu on {@link http://adobe.com|adobe.com} but has been simplified for use by others. A brief description of the interaction design choices can be found in a blog post at {@link http://blogs.adobe.com/accessibility/2013/05/adobe-com.html|Mega menu accessibility on adobe.com}.</p>
     * <h3>Keyboard Accessibility</h3>
     * <p>The accessible mega menu supports keyboard interaction modeled after the behavior described in the {@link http://www.w3.org/TR/wai-aria-practices/#menu|WAI-ARIA Menu or Menu bar (widget) design pattern}, however we also try to respect users' general expectations for the behavior of links in a global navigation. To this end, the accessible mega menu implementation permits tab focus on each of the six top-level menu items. When one of the menu items has focus, pressing the Enter key, Spacebar or Down arrow will open the submenu panel, and pressing the Left or Right arrow key will shift focus to the adjacent menu item. Links within the submenu panels are included in the tab order when the panel is open. They can also be navigated with the arrow keys or by typing the first character in the link name, which speeds up keyboard navigation considerably. Pressing the Escape key closes the submenu and restores focus to the parent menu item.</p>
     * <h3>Screen Reader Accessibility</h3>
     * <p>The accessible mega menu models its use of WAI-ARIA Roles, States, and Properties after those described in the {@link http://www.w3.org/TR/wai-aria-practices/#menu|WAI-ARIA Menu or Menu bar (widget) design pattern} with some notable exceptions, so that it behaves better with screen reader user expectations for global navigation. We don't use <code class="prettyprint prettyprinted" style=""><span class="pln">role</span><span class="pun">=</span><span class="str">"menu"</span></code> for the menu container and <code class="prettyprint prettyprinted" style=""><span class="pln">role</span><span class="pun">=</span><span class="str">"menuitem"</span></code> for each of the links therein, because if we do, assistive technology will no longer interpret the links as links, but instead, as menu items, and the links in our global navigation will no longer show up when a screen reader user executes a shortcut command to bring up a list of links in the page.</p>
     * @example <h4>HTML</h4><hr/>
&lt;nav&gt;
    &lt;ul class=&quot;nav-menu&quot;&gt;
        &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a href=&quot;?movie&quot;&gt;Movies&lt;/a&gt;
            &lt;div class=&quot;sub-nav&quot;&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=0&quot;&gt;Action &amp;amp; Adventure&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=2&quot;&gt;Children &amp;amp; Family&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=7&quot;&gt;Dramas&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=9&quot;&gt;Foreign&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=14&quot;&gt;Musicals&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=15&quot;&gt;Romance&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        &lt;/li&gt;
        &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a href=&quot;?tv&quot;&gt;TV Shows&lt;/a&gt;
            &lt;div class=&quot;sub-nav&quot;&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=20&quot;&gt;Classic TV&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=21&quot;&gt;Crime TV&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=27&quot;&gt;Reality TV&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=30&quot;&gt;TV Action&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=33&quot;&gt;TV Dramas&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=34&quot;&gt;TV Horror&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;
     * @example <h4>CSS</h4><hr/>
&#47;* Rudimentary mega menu CSS for demonstration *&#47;

&#47;* mega menu list *&#47;
.nav-menu {
    display: block;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 15;
}

&#47;* a top level navigation item in the mega menu *&#47;
.nav-item {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 0;
}

&#47;* first descendant link within a top level navigation item *&#47;
.nav-item &gt; a {
    position: relative;
    display: inline-block;
    padding: 0.5em 1em;
    margin: 0 0 -1px 0;
    border: 1px solid transparent;
}

&#47;* focus/open states of first descendant link within a top level
   navigation item *&#47;
.nav-item &gt; a:focus,
.nav-item &gt; a.open {
    border: 1px solid #dedede;
}

&#47;* open state of first descendant link within a top level
   navigation item *&#47;
.nav-item &gt; a.open {
    background-color: #fff;
    border-bottom: none;
    z-index: 1;
}

&#47;* sub-navigation panel *&#47;
.sub-nav {
    position: absolute;
    display: none;
    top: 2.2em;
    margin-top: -1px;
    padding: 0.5em 1em;
    border: 1px solid #dedede;
    background-color: #fff;
}

&#47;* sub-navigation panel open state *&#47;
.sub-nav.open {
    display: block;
}

&#47;* list of items within sub-navigation panel *&#47;
.sub-nav ul {
    display: inline-block;
    vertical-align: top;
    margin: 0 1em 0 0;
    padding: 0;
}

&#47;* list item within sub-navigation panel *&#47;
.sub-nav li {
    display: block;
    list-style-type: none;
    margin: 0;
    padding: 0;
}
     * @example <h4>JavaScript</h4><hr/>
&lt;!-- include jquery --&gt;
&lt;script src=&quot;http://code.jquery.com/jquery-1.10.1.min.js&quot;&gt;&lt;/script&gt;

&lt;!-- include the jquery-accessibleMegaMenu plugin script --&gt;
&lt;script src=&quot;js/jquery-accessibleMegaMenu.js&quot;&gt;&lt;/script&gt;

&lt;!-- initialize a selector as an accessibleMegaMenu --&gt;
&lt;script&gt;
    $(&quot;nav:first&quot;).accessibleMegaMenu({
        &#47;* prefix for generated unique id attributes, which are required to indicate aria-owns, aria-controls and aria-labelledby *&#47;
        uuidPrefix: &quot;accessible-megamenu&quot;,

        &#47;* css class used to define the megamenu styling *&#47;
        menuClass: &quot;nav-menu&quot;,

        &#47;* css class for a top-level navigation item in the megamenu *&#47;
        topNavItemClass: &quot;nav-item&quot;,

        &#47;* css class for a megamenu panel *&#47;
        panelClass: &quot;sub-nav&quot;,

        &#47;* css class for a group of items within a megamenu panel *&#47;
        panelGroupClass: &quot;sub-nav-group&quot;,

        &#47;* css class for the hover state *&#47;
        hoverClass: &quot;hover&quot;,

        &#47;* css class for the focus state *&#47;
        focusClass: &quot;focus&quot;,

        &#47;* css class for the open state *&#47;
        openClass: &quot;open&quot;
    });
&lt;/script&gt;
     * @param {object} [options] Mega Menu options
     * @param {string} [options.uuidPrefix=accessible-megamenu] - Prefix for generated unique id attributes, which are required to indicate aria-owns, aria-controls and aria-labelledby
     * @param {string} [options.menuClass=accessible-megamenu] - CSS class used to define the megamenu styling
     * @param {string} [options.topNavItemClass=accessible-megamenu-top-nav-item] - CSS class for a top-level navigation item in the megamenu
     * @param {string} [options.panelClass=accessible-megamenu-panel] - CSS class for a megamenu panel
     * @param {string} [options.panelGroupClass=accessible-megamenu-panel-group] - CSS class for a group of items within a megamenu panel
     * @param {string} [options.hoverClass=hover] - CSS class for the hover state
     * @param {string} [options.focusClass=focus] - CSS class for the focus state
     * @param {string} [options.openClass=open] - CSS class for the open state
     */
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new AccessibleMegaMenu(this, options));
            }
        });
    };

    /* :focusable and :tabbable selectors from
       https://raw.github.com/jquery/jquery-ui/master/ui/jquery.ui.core.js */

    /**
     * @private
     */
    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function () {
            return $.css(this, "visibility") === "hidden";
        }).length;
    }

    /**
     * @private
     */
    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img,
            nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false;
            }
            img = $("img[usemap=#" + mapName + "]")[0];
            return !!img && visible(img);
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled :
                "a" === nodeName ?
                        element.href || isTabIndexNotNaN :
                        isTabIndexNotNaN) &&
                            // the element and all of its ancestors must be visible
                            visible(element);
    }

    $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
            return function (elem) {
                return !!$.data(elem, dataName);
            };
        }) : // support: jQuery <1.8
                function (elem, i, match) {
                    return !!$.data(elem, match[3]);
                },

        focusable: function (element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },

        tabbable: function (element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    });
}(jQuery, window, document));
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-53380503-1', 'auto');
ga('send', 'pageview');
/**
 * bootbox.js [v4.3.0]
 *
 * http://bootboxjs.com/license.txt
 */

// @see https://github.com/makeusabrew/bootbox/issues/180
// @see https://github.com/makeusabrew/bootbox/issues/186
(function (root, factory) {

  "use strict";
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    // Browser globals (root is window)
    root.bootbox = factory(root.jQuery);
  }

}(this, function init($, undefined) {

  "use strict";

  // the base DOM structure needed to create a modal
  var templates = {
    dialog:
      "<div class='bootbox modal' tabindex='-1' role='dialog'>" +
        "<div class='modal-dialog'>" +
          "<div class='modal-content'>" +
            "<div class='modal-body'><div class='bootbox-body'></div></div>" +
          "</div>" +
        "</div>" +
      "</div>",
    header:
      "<div class='modal-header'>" +
        "<h4 class='modal-title'></h4>" +
      "</div>",
    footer:
      "<div class='modal-footer'></div>",
    closeButton:
      "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
    form:
      "<form class='bootbox-form'></form>",
    inputs: {
      text:
        "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
      textarea:
        "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
      email:
        "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
      select:
        "<select class='bootbox-input bootbox-input-select form-control'></select>",
      checkbox:
        "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
      date:
        "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
      time:
        "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
      number:
        "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
      password:
        "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
    }
  };

  var defaults = {
    // default language
    locale: "en",
    // show backdrop or not
    backdrop: true,
    // animate the modal in/out
    animate: true,
    // additional class string applied to the top level dialog
    className: null,
    // whether or not to include a close button
    closeButton: true,
    // show the dialog immediately by default
    show: true,
    // dialog container
    container: "body"
  };

  // our public object; augmented after our private API
  var exports = {};

  /**
   * @private
   */
  function _t(key) {
    var locale = locales[defaults.locale];
    return locale ? locale[key] : locales.en[key];
  }

  function processCallback(e, dialog, callback) {
    e.stopPropagation();
    e.preventDefault();

    // by default we assume a callback will get rid of the dialog,
    // although it is given the opportunity to override this

    // so, if the callback can be invoked and it *explicitly returns false*
    // then we'll set a flag to keep the dialog active...
    var preserveDialog = $.isFunction(callback) && callback(e) === false;

    // ... otherwise we'll bin it
    if (!preserveDialog) {
      dialog.modal("hide");
    }
  }

  function getKeyLength(obj) {
    // @TODO defer to Object.keys(x).length if available?
    var k, t = 0;
    for (k in obj) {
      t ++;
    }
    return t;
  }

  function each(collection, iterator) {
    var index = 0;
    $.each(collection, function(key, value) {
      iterator(key, value, index++);
    });
  }

  function sanitize(options) {
    var buttons;
    var total;

    if (typeof options !== "object") {
      throw new Error("Please supply an object of options");
    }

    if (!options.message) {
      throw new Error("Please specify a message");
    }

    // make sure any supplied options take precedence over defaults
    options = $.extend({}, defaults, options);

    if (!options.buttons) {
      options.buttons = {};
    }

    // we only support Bootstrap's "static" and false backdrop args
    // supporting true would mean you could dismiss the dialog without
    // explicitly interacting with it
    options.backdrop = options.backdrop ? "static" : false;

    buttons = options.buttons;

    total = getKeyLength(buttons);

    each(buttons, function(key, button, index) {

      if ($.isFunction(button)) {
        // short form, assume value is our callback. Since button
        // isn't an object it isn't a reference either so re-assign it
        button = buttons[key] = {
          callback: button
        };
      }

      // before any further checks make sure by now button is the correct type
      if ($.type(button) !== "object") {
        throw new Error("button with key " + key + " must be an object");
      }

      if (!button.label) {
        // the lack of an explicit label means we'll assume the key is good enough
        button.label = key;
      }

      if (!button.className) {
        if (total <= 2 && index === total-1) {
          // always add a primary to the main option in a two-button dialog
          button.className = "btn-primary";
        } else {
          button.className = "btn-default";
        }
      }
    });

    return options;
  }

  /**
   * map a flexible set of arguments into a single returned object
   * if args.length is already one just return it, otherwise
   * use the properties argument to map the unnamed args to
   * object properties
   * so in the latter case:
   * mapArguments(["foo", $.noop], ["message", "callback"])
   * -> { message: "foo", callback: $.noop }
   */
  function mapArguments(args, properties) {
    var argn = args.length;
    var options = {};

    if (argn < 1 || argn > 2) {
      throw new Error("Invalid argument length");
    }

    if (argn === 2 || typeof args[0] === "string") {
      options[properties[0]] = args[0];
      options[properties[1]] = args[1];
    } else {
      options = args[0];
    }

    return options;
  }

  /**
   * merge a set of default dialog options with user supplied arguments
   */
  function mergeArguments(defaults, args, properties) {
    return $.extend(
      // deep merge
      true,
      // ensure the target is an empty, unreferenced object
      {},
      // the base options object for this type of dialog (often just buttons)
      defaults,
      // args could be an object or array; if it's an array properties will
      // map it to a proper options object
      mapArguments(
        args,
        properties
      )
    );
  }

  /**
   * this entry-level method makes heavy use of composition to take a simple
   * range of inputs and return valid options suitable for passing to bootbox.dialog
   */
  function mergeDialogOptions(className, labels, properties, args) {
    //  build up a base set of dialog properties
    var baseOptions = {
      className: "bootbox-" + className,
      buttons: createLabels.apply(null, labels)
    };

    // ensure the buttons properties generated, *after* merging
    // with user args are still valid against the supplied labels
    return validateButtons(
      // merge the generated base properties with user supplied arguments
      mergeArguments(
        baseOptions,
        args,
        // if args.length > 1, properties specify how each arg maps to an object key
        properties
      ),
      labels
    );
  }

  /**
   * from a given list of arguments return a suitable object of button labels
   * all this does is normalise the given labels and translate them where possible
   * e.g. "ok", "confirm" -> { ok: "OK, cancel: "Annuleren" }
   */
  function createLabels() {
    var buttons = {};

    for (var i = 0, j = arguments.length; i < j; i++) {
      var argument = arguments[i];
      var key = argument.toLowerCase();
      var value = argument.toUpperCase();

      buttons[key] = {
        label: _t(value)
      };
    }

    return buttons;
  }

  function validateButtons(options, buttons) {
    var allowedButtons = {};
    each(buttons, function(key, value) {
      allowedButtons[value] = true;
    });

    each(options.buttons, function(key) {
      if (allowedButtons[key] === undefined) {
        throw new Error("button key " + key + " is not allowed (options are " + buttons.join("\n") + ")");
      }
    });

    return options;
  }

  exports.alert = function() {
    var options;

    options = mergeDialogOptions("alert", ["ok"], ["message", "callback"], arguments);

    if (options.callback && !$.isFunction(options.callback)) {
      throw new Error("alert requires callback property to be a function when provided");
    }

    /**
     * overrides
     */
    options.buttons.ok.callback = options.onEscape = function() {
      if ($.isFunction(options.callback)) {
        return options.callback();
      }
      return true;
    };

    return exports.dialog(options);
  };

  exports.confirm = function() {
    var options;

    options = mergeDialogOptions("confirm", ["cancel", "confirm"], ["message", "callback"], arguments);

    /**
     * overrides; undo anything the user tried to set they shouldn't have
     */
    options.buttons.cancel.callback = options.onEscape = function() {
      return options.callback(false);
    };

    options.buttons.confirm.callback = function() {
      return options.callback(true);
    };

    // confirm specific validation
    if (!$.isFunction(options.callback)) {
      throw new Error("confirm requires a callback");
    }

    return exports.dialog(options);
  };

  exports.prompt = function() {
    var options;
    var defaults;
    var dialog;
    var form;
    var input;
    var shouldShow;
    var inputOptions;

    // we have to create our form first otherwise
    // its value is undefined when gearing up our options
    // @TODO this could be solved by allowing message to
    // be a function instead...
    form = $(templates.form);

    // prompt defaults are more complex than others in that
    // users can override more defaults
    // @TODO I don't like that prompt has to do a lot of heavy
    // lifting which mergeDialogOptions can *almost* support already
    // just because of 'value' and 'inputType' - can we refactor?
    defaults = {
      className: "bootbox-prompt",
      buttons: createLabels("cancel", "confirm"),
      value: "",
      inputType: "text"
    };

    options = validateButtons(
      mergeArguments(defaults, arguments, ["title", "callback"]),
      ["cancel", "confirm"]
    );

    // capture the user's show value; we always set this to false before
    // spawning the dialog to give us a chance to attach some handlers to
    // it, but we need to make sure we respect a preference not to show it
    shouldShow = (options.show === undefined) ? true : options.show;

    /**
     * overrides; undo anything the user tried to set they shouldn't have
     */
    options.message = form;

    options.buttons.cancel.callback = options.onEscape = function() {
      return options.callback(null);
    };

    options.buttons.confirm.callback = function() {
      var value;

      switch (options.inputType) {
        case "text":
        case "textarea":
        case "email":
        case "select":
        case "date":
        case "time":
        case "number":
        case "password":
          value = input.val();
          break;

        case "checkbox":
          var checkedItems = input.find("input:checked");

          // we assume that checkboxes are always multiple,
          // hence we default to an empty array
          value = [];

          each(checkedItems, function(_, item) {
            value.push($(item).val());
          });
          break;
      }

      return options.callback(value);
    };

    options.show = false;

    // prompt specific validation
    if (!options.title) {
      throw new Error("prompt requires a title");
    }

    if (!$.isFunction(options.callback)) {
      throw new Error("prompt requires a callback");
    }

    if (!templates.inputs[options.inputType]) {
      throw new Error("invalid prompt type");
    }

    // create the input based on the supplied type
    input = $(templates.inputs[options.inputType]);

    switch (options.inputType) {
      case "text":
      case "textarea":
      case "email":
      case "date":
      case "time":
      case "number":
      case "password":
        input.val(options.value);
        break;

      case "select":
        var groups = {};
        inputOptions = options.inputOptions || [];

        if (!inputOptions.length) {
          throw new Error("prompt with select requires options");
        }

        each(inputOptions, function(_, option) {

          // assume the element to attach to is the input...
          var elem = input;

          if (option.value === undefined || option.text === undefined) {
            throw new Error("given options in wrong format");
          }


          // ... but override that element if this option sits in a group

          if (option.group) {
            // initialise group if necessary
            if (!groups[option.group]) {
              groups[option.group] = $("<optgroup/>").attr("label", option.group);
            }

            elem = groups[option.group];
          }

          elem.append("<option value='" + option.value + "'>" + option.text + "</option>");
        });

        each(groups, function(_, group) {
          input.append(group);
        });

        // safe to set a select's value as per a normal input
        input.val(options.value);
        break;

      case "checkbox":
        var values   = $.isArray(options.value) ? options.value : [options.value];
        inputOptions = options.inputOptions || [];

        if (!inputOptions.length) {
          throw new Error("prompt with checkbox requires options");
        }

        if (!inputOptions[0].value || !inputOptions[0].text) {
          throw new Error("given options in wrong format");
        }

        // checkboxes have to nest within a containing element, so
        // they break the rules a bit and we end up re-assigning
        // our 'input' element to this container instead
        input = $("<div/>");

        each(inputOptions, function(_, option) {
          var checkbox = $(templates.inputs[options.inputType]);

          checkbox.find("input").attr("value", option.value);
          checkbox.find("label").append(option.text);

          // we've ensured values is an array so we can always iterate over it
          each(values, function(_, value) {
            if (value === option.value) {
              checkbox.find("input").prop("checked", true);
            }
          });

          input.append(checkbox);
        });
        break;
    }

    if (options.placeholder) {
      input.attr("placeholder", options.placeholder);
    }

    if(options.pattern){
      input.attr("pattern", options.pattern);
    }

    // now place it in our form
    form.append(input);

    form.on("submit", function(e) {
      e.preventDefault();
      // Fix for SammyJS (or similar JS routing library) hijacking the form post.
      e.stopPropagation();
      // @TODO can we actually click *the* button object instead?
      // e.g. buttons.confirm.click() or similar
      dialog.find(".btn-primary").click();
    });

    dialog = exports.dialog(options);

    // clear the existing handler focusing the submit button...
    dialog.off("shown.bs.modal");

    // ...and replace it with one focusing our input, if possible
    dialog.on("shown.bs.modal", function() {
      input.focus();
    });

    if (shouldShow === true) {
      dialog.modal("show");
    }

    return dialog;
  };

  exports.dialog = function(options) {
    options = sanitize(options);

    var dialog = $(templates.dialog);
    var innerDialog = dialog.find(".modal-dialog");
    var body = dialog.find(".modal-body");
    var buttons = options.buttons;
    var buttonStr = "";
    var callbacks = {
      onEscape: options.onEscape
    };

    each(buttons, function(key, button) {

      // @TODO I don't like this string appending to itself; bit dirty. Needs reworking
      // can we just build up button elements instead? slower but neater. Then button
      // can just become a template too
      buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>";
      callbacks[key] = button.callback;
    });

    body.find(".bootbox-body").html(options.message);

    if (options.animate === true) {
      dialog.addClass("fade");
    }

    if (options.className) {
      dialog.addClass(options.className);
    }

    if (options.size === "large") {
      innerDialog.addClass("modal-lg");
    }

    if (options.size === "small") {
      innerDialog.addClass("modal-sm");
    }

    if (options.title) {
      body.before(templates.header);
    }

    if (options.closeButton) {
      var closeButton = $(templates.closeButton);

      if (options.title) {
        dialog.find(".modal-header").prepend(closeButton);
      } else {
        closeButton.css("margin-top", "-10px").prependTo(body);
      }
    }

    if (options.title) {
      dialog.find(".modal-title").html(options.title);
    }

    if (buttonStr.length) {
      body.after(templates.footer);
      dialog.find(".modal-footer").html(buttonStr);
    }


    /**
     * Bootstrap event listeners; used handle extra
     * setup & teardown required after the underlying
     * modal has performed certain actions
     */

    dialog.on("hidden.bs.modal", function(e) {
      // ensure we don't accidentally intercept hidden events triggered
      // by children of the current dialog. We shouldn't anymore now BS
      // namespaces its events; but still worth doing
      if (e.target === this) {
        dialog.remove();
      }
    });

    /*
    dialog.on("show.bs.modal", function() {
      // sadly this doesn't work; show is called *just* before
      // the backdrop is added so we'd need a setTimeout hack or
      // otherwise... leaving in as would be nice
      if (options.backdrop) {
        dialog.next(".modal-backdrop").addClass("bootbox-backdrop");
      }
    });
    */

    dialog.on("shown.bs.modal", function() {
      dialog.find(".btn-primary:first").focus();
    });

    /**
     * Bootbox event listeners; experimental and may not last
     * just an attempt to decouple some behaviours from their
     * respective triggers
     */

    dialog.on("escape.close.bb", function(e) {
      if (callbacks.onEscape) {
        processCallback(e, dialog, callbacks.onEscape);
      }
    });

    /**
     * Standard jQuery event listeners; used to handle user
     * interaction with our dialog
     */

    dialog.on("click", ".modal-footer button", function(e) {
      var callbackKey = $(this).data("bb-handler");

      processCallback(e, dialog, callbacks[callbackKey]);

    });

    dialog.on("click", ".bootbox-close-button", function(e) {
      // onEscape might be falsy but that's fine; the fact is
      // if the user has managed to click the close button we
      // have to close the dialog, callback or not
      processCallback(e, dialog, callbacks.onEscape);
    });

    dialog.on("keyup", function(e) {
      if (e.which === 27) {
        dialog.trigger("escape.close.bb");
      }
    });

    // the remainder of this method simply deals with adding our
    // dialogent to the DOM, augmenting it with Bootstrap's modal
    // functionality and then giving the resulting object back
    // to our caller

    $(options.container).append(dialog);

    dialog.modal({
      backdrop: options.backdrop,
      keyboard: false,
      show: false
    });

    if (options.show) {
      dialog.modal("show");
    }

    // @TODO should we return the raw element here or should
    // we wrap it in an object on which we can expose some neater
    // methods, e.g. var d = bootbox.alert(); d.hide(); instead
    // of d.modal("hide");

   /*
    function BBDialog(elem) {
      this.elem = elem;
    }

    BBDialog.prototype = {
      hide: function() {
        return this.elem.modal("hide");
      },
      show: function() {
        return this.elem.modal("show");
      }
    };
    */

    return dialog;

  };

  exports.setDefaults = function() {
    var values = {};

    if (arguments.length === 2) {
      // allow passing of single key/value...
      values[arguments[0]] = arguments[1];
    } else {
      // ... and as an object too
      values = arguments[0];
    }

    $.extend(defaults, values);
  };

  exports.hideAll = function() {
    $(".bootbox").modal("hide");

    return exports;
  };


  /**
   * standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
   * unlikely to be required. If this gets too large it can be split out into separate JS files.
   */
  var locales = {
    br : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Sim"
    },
    cs : {
      OK      : "OK",
      CANCEL  : "Zrušit",
      CONFIRM : "Potvrdit"
    },
    da : {
      OK      : "OK",
      CANCEL  : "Annuller",
      CONFIRM : "Accepter"
    },
    de : {
      OK      : "OK",
      CANCEL  : "Abbrechen",
      CONFIRM : "Akzeptieren"
    },
    el : {
      OK      : "Εντάξει",
      CANCEL  : "Ακύρωση",
      CONFIRM : "Επιβεβαίωση"
    },
    en : {
      OK      : "OK",
      CANCEL  : "Cancel",
      CONFIRM : "OK"
    },
    es : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Aceptar"
    },
    et : {
      OK      : "OK",
      CANCEL  : "Katkesta",
      CONFIRM : "OK"
    },
    fi : {
      OK      : "OK",
      CANCEL  : "Peruuta",
      CONFIRM : "OK"
    },
    fr : {
      OK      : "OK",
      CANCEL  : "Annuler",
      CONFIRM : "D'accord"
    },
    he : {
      OK      : "אישור",
      CANCEL  : "ביטול",
      CONFIRM : "אישור"
    },
    id : {
      OK      : "OK",
      CANCEL  : "Batal",
      CONFIRM : "OK"
    },
    it : {
      OK      : "OK",
      CANCEL  : "Annulla",
      CONFIRM : "Conferma"
    },
    ja : {
      OK      : "OK",
      CANCEL  : "キャンセル",
      CONFIRM : "確認"
    },
    lt : {
      OK      : "Gerai",
      CANCEL  : "Atšaukti",
      CONFIRM : "Patvirtinti"
    },
    lv : {
      OK      : "Labi",
      CANCEL  : "Atcelt",
      CONFIRM : "Apstiprināt"
    },
    nl : {
      OK      : "OK",
      CANCEL  : "Annuleren",
      CONFIRM : "Accepteren"
    },
    no : {
      OK      : "OK",
      CANCEL  : "Avbryt",
      CONFIRM : "OK"
    },
    pl : {
      OK      : "OK",
      CANCEL  : "Anuluj",
      CONFIRM : "Potwierdź"
    },
    pt : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Confirmar"
    },
    ru : {
      OK      : "OK",
      CANCEL  : "Отмена",
      CONFIRM : "Применить"
    },
    sv : {
      OK      : "OK",
      CANCEL  : "Avbryt",
      CONFIRM : "OK"
    },
    tr : {
      OK      : "Tamam",
      CANCEL  : "İptal",
      CONFIRM : "Onayla"
    },
    zh_CN : {
      OK      : "OK",
      CANCEL  : "取消",
      CONFIRM : "确认"
    },
    zh_TW : {
      OK      : "OK",
      CANCEL  : "取消",
      CONFIRM : "確認"
    }
  };

  exports.init = function(_$) {
    return init(_$ || $);
  };

  return exports;
}));

"use strict"
$(document).ready(function() {

  var offset = 200;
  var duration = 500;

  $(window).scroll(function() {
    if ( $(this).scrollTop() > offset) {
      $('.scroll-to-top').fadeIn(duration);
    } else {
      $('.scroll-to-top').fadeOut(duration);
    }
  });

  $('.scroll-to-top').click(function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, duration);
    return false;
  });

  $('.authorNote').hide();
  $('.modal-content').hide();

  $('.editorialTrigger').popover(
    {
      title: 'Editorial Note',
      placement: 'auto',
      content: function(){
        return $(this).next('.addEditorial').html();
      },
      container: 'body',
      html: true,
    }
  );

  $('.transcription-trigger').click(function(event) {
    event.preventDefault();

    var content = $( this ).parent().next('.transcription-body').html();

    bootbox.dialog({
      title: "Marginalia",
      message: content,
      buttons: {
        main: {
          label: "Close",
          className: "btn-primary",
          callback: function() {
            //
          }
        }
      }
    });
  });

  $('.note').click(function() {
    var footnote = $(this).next('.authorNote');
    footnote.toggle('slow', 'linear');
  });

  $('img.lazy').lazyload({
    effect: "fadeIn",
    failure_limit: 10
  });

  $('img.lazy').popover({
    trigger: 'hover',
    html: true,
    title: 'Preview',
    content: function() {
      var img = $( this ).data( 'original' );
      var large_thumb = img.replace('getThumbnail', 'getScaled?maxWidth=&maxHeight=');
      var img = '<img id="large_thumb" src="' + large_thumb +'" />';
      return img;
    },
    container: 'body',
    placement: 'auto'
  });

  $('#globalnav').accessibleMegaMenu();

  // hack so that the megamenu doesn't show flash of css animation after the page loads.
  setTimeout(function () {
    $('body').removeClass('init');
  }, 500);

});
/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.2.0'

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(150) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.1.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one($.support.transition.end, complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.1.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//











;
