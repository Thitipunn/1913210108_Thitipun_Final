const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  model:  String,
  price:{type:Number},
  type:{type:String},
  color:{type:String},
  brand:{type:Schema.Types.ObjectId,ref: 'brand'}
},
{collection:"Model",});

const model = mongoose.model('model',modelSchema)
module.exports = model;