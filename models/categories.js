let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let categoriesSchema = new Schema({
  key : String,
  name: String
});

module.exports = mongoose.model('categories', categoriesSchema);