# BigDecimal Mongoose Schema Type

When fixed precision is not enough.

## Usage

```javascript
var mongoose = require('mongoose');
require('mongoose-big-decimal')(mongoose);

mongoose.Schema({
  price: { type: mongoose.Schema.Types.BigDecimal }
})
```
