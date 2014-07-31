
/**
 * Module requirements.
 */

//var markdown = require('markdown').markdown;

/**
 * Escape a string with html entities
 *
 * @param {String} string to escape
 * @api public
 */

exports.escape = function(str){
  return str
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
};

/**
 * Unescape a string
 *
 * @param {String} str to unescape
 * @api public
 */

exports.unescape = function(str){
  return str
    .replace(/&amp;/g, '&')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"');
};

/**
 * Makes a string uppercase according to english name conventions
 *
 * @param {String} str
 * @api public
 */

exports.namize = function(str){
  return str.toLowerCase().replace(/\b[a-z]|(\-[a-z])/g, function(match){
    return match.toUpperCase();
  }).replace(/(\bMc[a-z])|(\-Mc[a-z])/g, function(match){
    return match.substr(0, match.length - 1) + match.substr(-1).toUpperCase();
  });
};
  
/**
 * Replaces special characters with their ascii standard equivalents
 *
 * @param {String} str
 * @api public
 */

var special = ['À','à','Á','á','Â','â','Ã','ã','Ä','ä','Å','å','Ă','ă','Ą','ą','Ć'
             , 'ć','Č','č','Ç','ç','Ď','ď','Đ','đ', 'È','è','É','é','Ê','ê','Ë','ë'
             , 'Ě','ě','Ę','ę','Ğ','ğ','Ì','ì','Í','í','Î','î','Ï','ï', 'Ĺ','ĺ','Ľ'
             , 'ľ','Ł','ł','Ñ','ñ','Ň','ň','Ń','ń','Ò','ò','Ó','ó','Ô','ô','Õ','õ'
             , 'Ö','ö','Ø','ø','ő','Ř','ř','Ŕ','ŕ','Š','š','Ş','ş','Ś','ś','Ť','ť'
             , 'Ť','ť','Ţ','ţ','Ù','ù','Ú','ú','Û','û','Ü','ü','Ů','ů','Ÿ','ÿ','ý'
             , 'Ý','Ž','ž','Ź','ź','Ż','ż','Þ','þ','Ð','ð','ß','Œ','œ','Æ','æ','µ']

  , standard = ['A','a','A','a','A','a','A','a','Ae','ae','A','a','A','a','A','a'
              , 'C','c','C','c','C','c','D','d','D','d', 'E','e','E','e','E','e'
              , 'E','e','E','e','E','e','G','g','I','i','I','i','I','i','I','i','L'
              , 'l','L','l','L','l','N','n','N','n','N','n', 'O','o','O','o','O'
              , 'o','O','o','Oe','oe','O','o','o','R','r','R','r','S','s','S','s'
              , 'S','s','T','t','T','t','T','t','U','u','U','u','U','u','Ue','ue'
              , 'U','u','Y','y','Y','y','Z','z','Z','z','Z','z','TH','th','DH','dh'
              , 'ss','OE','oe','AE','ae','u'];

exports.standarize = function(str){
  var text = str;
  for (var i = 0, l = special.length; i < l; i++){
    if (typeof special[i] == 'string') special[i] = new RegExp(special[i], 'g');
    text = text.replace(special[i], standard[i]);
  }
  return text;
};

/**
 * Capitalize a string
 *
 * @param {String} str
 * @api public
 */

exports.capitalize = function(str){
  return str.replace(/\b[a-z]/g, function(match){
    return match.toUpperCase();
  });
};

String.prototype.__defineGetter__('capitalized', function(){
  return exports.capitalize(this);
});
                                                                                                     
/**
 * Slugize a string
 *
 * @param {String} str
 * @api public
 */

exports.slugize = function(str){
  return exports.standarize(exports.namize(str)).toLowerCase()
        .replace(/[^A-Z^a-z^0-9]+/g, '-');
};

/**
 * Substitutes tokens with values
 *
 * @param {String} str
 * @param {Object} object
 * @param {RegExp} regexp, defaults to {} replacement
 */

exports.substitute = function(str, object, regexp){
  return str.replace(regexp || (/\\?\{([^{}]+)\}/g), function(match, name){
    if (match.charAt(0) == '\\') return match.slice(1);
    return (object[name] != undefined) ? object[name] : '';
  });
};
  
/**
 * Clears html tags from a string
 *
 * @param {String} str
 * @api public
 */

exports.clearHTML = function(str){
  return str.unescaped.replace(/<\/?[^>]+(>|$)/g, '');
};

/**
 * Converts \n to <br>
 *
 * @param {String} str
 * @api public
 */

exports.nl2br = function(str){
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ '<br>' +'$2');
};

/**
 * Trims whitespace or other characters from the left
 *
 * @param {String} str
 * @param {String} character to replace
 * @param {Boolean} insensitive or not
 * @api public
 */

exports.ltrim = function(str, chr, ins){
  var _chr = chr || ' ';
  return str.replace(new RegExp('^' + _chr + '+', ins !== false ? 'gi' : 'g'), '');
};

/**
 * Trims whitespace or other characters from the right
 *
 * @param {String} str
 * @param {String} character to replace
 * @param {Boolean} insensitive or not
 * @api public
 */

exports.rtrim = function(str, chr, ins){
  var _chr = chr || ' ';
  return str.replace(new RegExp(_chr + '+$', ins !== false ? 'gi' : 'g'), '');
};

/**
 * Stems the string
 *
 * @param {String} str
 * @api public
 */

//var stemmer = require('../../support/stemmer')

exports.stem = function(str){
  return stemmer(str).toLowerCase();
};

/**
 * Stems the entire phrase
 *
 * @api {String} phrase
 * @return {Array} array of stemmed words
 * @api public
 */

exports.phraseStem = function(str){
  return str.split(' ').map(function(k){
    return exports.stem(k);
  });
};

/**
 * Stems a phrase a returns an index
 *
 * @param {String} phrase
 * @return {Object} index
 * @api public
 */

exports.index = function(str){
  return array.unique(exports.phraseStem(str).concat(str.split(' ')));
};

/**
 * Highlights an occurrence in a phrase
 *
 * @param {String} phrase
 * @param {String} phrase to highlight
 * @param {String} replacement html
 * @api public
 */

exports.highlight = function(str, phrase, highlighter){
  if (phrase === null || phrase === undefined || phrase === '') return str;
  return str.replace(new RegExp('('+ exports.escapeRegExp(phrase) +')', 'gi')
                  , highlighter || '<strong class="highlight">$1</strong>');
};

String.prototype.highlight = function(){
  var args = Array.prototype.slice.call(arguments);
  return exports.highlight.apply(null, [this].concat(args))
}

/**
 * Produces an excerpt from a string
 *
 * @param {String} phrase
 * @param {String} search string
 * @param {Number} radius of characters
 * @param {String} '…' string
 * @param {Boolean} whether to consider whitespace
 * @api public
 */

exports.excerpt = function(str, search, radius, excerptString, onWhitespace){
  if (str == '' || search == '') return '';
  
  var pos = str.toLowerCase().indexOf(search.toLowerCase()),
      ret = '',
      radius = radius || 100,
      excerptString = excerptString || '…';
  
  if (pos !== -1){
    var start = Math.max(pos - radius, 0),
        end = Math.min(pos + search.length + radius, str.length),
        excerpt = str.substr(start, end - start),
        prefix = start > 0 ? excerptString : '',
        postfix = end < str.length ? excerptString : '';
    
    if (onWhitespace){
      if (prefix) excerpt = excerpt.replace(/^(\S+)?\s+?/, ' ');
      if (postfix) excerpt = excerpt.replace(/\s+?(\S+)?$/, ' ');
    }
    
    ret = prefix + excerpt + postfix;
  }
  
  return ret;
};

String.prototype.excerpt = function(search, radius, excerptString, onWhitespace){
  var args = Array.prototype.slice.call(arguments);
  return exports.excerpt.apply(null, [this].concat(args))
};

/**
 * Truncates a string and appends a … character
 *
 * @param {String} str
 * @param {Number} length of chars
 * @param {String} character to add (…)
 * @api public
 */

exports.truncate = function(str, length, chr){
  chr = chr || '…';
  if (str.length <= length) return str;
  return str.substr(0, length - chr.length) + chr;
};

String.prototype.truncate = function(length, chr){
  var args = Array.prototype.slice.call(arguments);
  return exports.truncate.apply(null, [this].concat(args))
};

/**
 * Masks a phone number
 *
 * @param {String} phone number
 * @api public
 * @deprecate Internationalize this
 */

exports.phoneMask = function(str){
  if(str.search('-') < 0)
    return str.substring(0, 3) + '-' + str.substring(3, 6) + '-' + str.substring(6);
  return str;
};

String.prototype.phoneMask = function(){
  return exports.phoneMask(this);
};

/**
 * Escapes characters to inject a string into a regular expression
 *
 * @param {String} str
 * @api public
 */

exports.escapeRegExp = function(str){
  return str.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
};

/**
 * Transforms a markdown string into HTML
 *
 * @param {String} markdown
 * @return {String} HTML
 * @api public
 */

exports.markdown = function(str){
  return markdown.toHTML(str);
};
