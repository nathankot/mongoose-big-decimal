'use strict';

var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Big = require('big.js');

var BigDecimal = require('../index.js')(mongoose);

var ProductSchema = Schema({
  price: { type: BigDecimal, required: true }
})

var Product = mongoose.model('Product', ProductSchema);

describe('Big Decimal Type', function() {

  it('should add the type to mongoose', function() {
    expect(mongoose.Schema.Types).to.have.property('BigDecimal');
    expect(mongoose.Types).to.have.property('BigDecimal');
  });

  it('the type should be a function', function() {
    expect(mongoose.Types.BigDecimal).to.be.a('function');
  });

  it('should have a cast method', function() {
    expect(mongoose.Types.BigDecimal.prototype.cast).to.be.a('function');
  });

  describe('setting the field and not saving', function() {

    it('should store as a Big.js hash', function() {
      var product = new Product({ price: new Big('1221.332') });
      expect(product.price.toString()).to.equal(new Big('1221.332').toString());
    });

    it('should try to cast strings to a big hash', function() {
      var product = new Product({ price: '1221.332' });
      expect(product.price.toString()).to.equal(new Big('1221.332').toString());
    });

    it('should try to cast integers to a big hash', function() {
      var product = new Product({ price: 1221 });
      expect(product.price.toString()).to.equal(new Big('1221').toString());
    });

    it('should try to cast decimals to a big hash', function() {
      var product = new Product({ price: 1221.322 });
      expect(product.price.toString()).to.equal(new Big('1221.322').toString());
    });

  });

  describe('setting the field and saving', function() {

    before(function() {
      mongoose.connect('localhost', 'mongoose_big_decimal_test');
    });

    after(function() {
      mongoose.connection.db.dropDatabase();
    });

    it('should retrieve the value as a big decimal', function(done) {
      var product = new Product({ price: 1221.322 });
      product.save(function(err, product) {
        Product.findOne({ _id: product._id }, function(err, product) {
          expect(product.price.toString()).to.equal('1221.322');
          done();
        });
      });
    });

    it('should return cast error on a string', function(done) {
      var product = new Product({ price: 'not a number' });
      product.save(function(err, product) {
        expect(err.name).to.equal('CastError');
        expect(err.type).to.equal('BigDecimal');
        done();
      });
    });

    describe('required validation works', function(done) {
      var product = new Product();
      product.save(function(err, product) {
        expect(err.name).to.equal('ValidationError')
        done();
      });
    });

  });

});


