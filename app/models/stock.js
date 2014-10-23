/**
 * stock.js Created by Taro on 2014/10/21.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Stock', StockSchema);