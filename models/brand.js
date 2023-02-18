const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name:  String,
},
{
  collection:"brand",
  timestamps:true,
  toJSON:{virtuals:true}
}
);

brandSchema.virtual('model',{
  ref:'model',
  localField:'_id',
  foreignField:'brand',
})

const brand = mongoose.model('brand',brandSchema)
module.exports = brand;