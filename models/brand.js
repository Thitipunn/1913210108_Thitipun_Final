const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
},{collection:"brand"});

const brand = mongoose.model('brand',brandSchema)
module.exports = brand;