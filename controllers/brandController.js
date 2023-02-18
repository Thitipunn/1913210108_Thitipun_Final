const Brand = require('../models/brand');
const Model = require('../models/model')


exports.index = async (req, res, next) => {

    const brand = await Brand.find();

    res.status(200).json({
        data: brand
  })
};

exports.model = async (req, res, next) => {

    const model = await Model.find().populate('brand')

    res.status(200).json({
        data: model
    })
};

exports.Show = async (req,res,next) => {
    try {
        const { id } = req.params;
    
        const brand = await Brand.findOne({
          _id: id,
        });
    
        if (!brand) {
          const error = new Error("Brand not found")
          error.statusCode = 400
          throw error
        } else {
          res.status(200).json({
            data: brand,
          });
        }
      } catch (error) {
        next(error)
      }
}  

exports.insert = async (req,res,next) => {
    const { name } = req.body;
  
    let brand = new Brand({
      name: name,
    });
  
    await brand.save();
  
    res.status(200).json({
      message: "Badminton Brand has been added",
    });
}

exports.remove = async(req,res,next)=>{
    try {
        const { id } = req.params;
    
        const brand = await Brand.deleteOne({
          _id: id,
        });
    
        if (brand.deletedCount === 0) {
          const error = new Error("Brand not found")
          error.statusCode = 400
          throw error
        } else {
          res.status(200).json({
            message: "ลบข้อมูลเรียบร้อยแล้ว",
          });
        }
      } catch (error) {
        next(error)
      }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
    
         const brand = await Brand.findByIdAndUpdate(id,{
            name: name,
         })
         if(!brand){
          const error = new Error("Brand not found")
          error.statusCode = 400
          throw error
         }
    
        res.status(200).json({
          message: "Data has been updated",
        });
    } catch (error) {
      next(error)
    }
};