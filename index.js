'use strict';
var BSON = require('bson');
var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a)
      , arrB = isArray(b)
      , i
      , length
      , key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date
      , dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp
      , regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var bsonRegexpA = a instanceof BSON.BSONRegExp
      , bsonRegexpB = b instanceof BSON.BSONRegExp;
    if (bsonRegexpA && bsonRegexpB)
      bsonRegexpA.pattern == bsonRegexpB.pattern && equal(bsonRegexpA.options, bsonRegexpB.options);

    var objectIdA = a instanceof BSON.ObjectId
      , objectIdB = b instanceof BSON.ObjectId;
    if (objectIdA && objectIdB) return objectIdA.equals(objectIdB);

    var int32a = a instanceof BSON.Int32
      , int32b = b instanceof BSON.Int32;
    if (int32a && int32b) return a.valueOf() == b.valueOf();

    var longA = a instanceof BSON.Long
      , longB = b instanceof BSON.Long;
    if (longA && longB) return a.equals(b);

    var decimal128a = a instanceof BSON.Decimal128
      , decimal128b = b instanceof BSON.Decimal128;
    if (decimal128a && decimal128b) return a.toString() == b.toString();

    var timestampA = a instanceof BSON.Timestamp
      , timestampB = b instanceof BSON.Timestamp;
    if (timestampA && timestampB) return a.equals(b);

    var maxKeyA = a instanceof BSON.MaxKey
      , maxKeyB = b instanceof BSON.MaxKey;
    if (maxKeyA && maxKeyB) return true;

    var minKeyA = a instanceof BSON.MinKey
      , minKeyB = b instanceof BSON.MinKey;
    if (minKeyA && minKeyB) return true;

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length)
      return false;

    for (i = length; i-- !== 0;)
      if (!hasProp.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a!==a && b!==b;
};
