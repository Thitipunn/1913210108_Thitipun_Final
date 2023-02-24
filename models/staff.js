const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name:  String,
  role:{type:String},
  salary:{type:Number}
},
{collection:"staff"});

const staff = mongoose.model('staff',staffSchema)
module.exports = staff;