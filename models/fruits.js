var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fruitsSchema = new Schema({
    name: String,
    price: Number
});

module.exports = mongoose.model('fruits', fruitsSchema)