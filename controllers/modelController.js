const Model = require('../models/model');

exports.index = async (req, res, next) => {

    const model = await Model.find();

    res.status(200).json({
        data: model
  })
};

exports.insert = async (req,res,next) => {
    const { model,type,color,price,brand } = req.body;
  
    let models = new Model({
      model: model,
      type: type,
      color:color,
      price:price,
      brand:brand
    });
  
    await models.save();
  
    res.status(200).json({
      message: "Badminton Racquet Model has been added",
    });
}

exports.remove = async(req,res,next)=>{
    try {
        const { id } = req.params;
    
        const model = await Model.deleteOne({
          _id: id,
        });
    
        if (model.deletedCount === 0) {
          const error = new Error("Model not found")
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
        const { model,type,color,price,brand } = req.body;
    
         const models = await Model.findByIdAndUpdate(id,{
            model : model,
            type: type,
            color:color,
            price:price,
            brand:brand
         })
         if(!models){
          const error = new Error("Model not found")
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