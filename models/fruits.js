let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let fruitsSchema = new Schema({
    name:       String,
    price:      Number,
    categoryId: String
});

module.exports = mongoose.model('fruits', fruitsSchema)