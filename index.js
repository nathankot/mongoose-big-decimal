'use strict';

var Big = require('big.js');

module.exports= function BigDecimal (mongoose) {

  var Schema = mongoose.Schema,
      SchemaType = mongoose.SchemaType,
      Types = mongoose.Types,
      mongo = mongoose.mongo;


  /**
   *
   * BigDecimal Constructor
   *
   * @inherits SchemaType
   * @param {String} key
   * @param {Object} options
   */
  function BigDecimal(key, options) {
    SchemaType.call(this, key, options);
  };

  /*!
   * inherits
   */
  BigDecimal.prototype.__proto__ = SchemaType.prototype;

  /**
   * Check required method.
   *
   * @param {any} val
   * @return {Boolean}
   */
  BigDecimal.prototype.checkRequired = function(val) {
    return !!val;
  };

  /**
   * Casting.
   *
   * @param {any} val
   * @param {Object} doc
   * @param {Boolean} init
   * @return {Big|null}
   */
  BigDecimal.prototype.cast = function(val, doc, init) {
    try {
      return new Big(val);
    } catch(e) {}

    throw new SchemaType.CastError('BigDecimal', val);
  };

  /**
   * Cast it back to Big on retrieve
   *
   * @param {any} val
   * @param {Object} doc
   */
  BigDecimal.prototype.applyGetters = function(val, doc) {
    return new Big(val);
  };

  Schema.Types.BigDecimal = BigDecimal;
  Types.BigDecimal = BigDecimal;

  return BigDecimal;

};
