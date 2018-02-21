let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let categoriesSchema = new Schema({
  name: String
});

module.exports = mongoose.model('categories', categoriesSchema);