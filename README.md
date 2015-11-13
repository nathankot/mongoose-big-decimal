mongoose-big-decimal
=====================

[![Build Status](https://travis-ci.org/lykmapipo/mongoose-big-decimal.svg?branch=master)](https://travis-ci.org/lykmapipo/mongoose-big-decimal)

BigDecimal schema type for [mongoose](https://github.com/Automattic/mongoose) based on [big.js](https://github.com/MikeMcl/big.js/).

## Installation
```sh
$ npm install --save mongoose-big-decimal
```

## Usage

```javascript
var mongoose = require('mongoose');
require('mongoose-big-decimal')(mongoose);

mongoose.Schema({
  price: { type: mongoose.Schema.Types.BigDecimal }
})
```