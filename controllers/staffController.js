const Staff = require('../models/staff');

exports.index = async (req, res, next) => {

    const staff = await Staff.find();

    res.status(200).json({
        data:staff
  })
};

exports.Show = async (req,res,next) => {
    try {
        const { id } = req.params;
    
        const staff = await Staff.findOne({
          _id: id,
        });
    
        if (!staff) {
          const error = new Error("Staff not found")
          error.statusCode = 400
          throw error
        } else {
          res.status(200).json({
            data: staff,
          });
        }
      } catch (error) {
        next(error)
      }
}  

exports.insert = async (req,res,next) => {
    const { name,role,salary } = req.body;
  
    let staff = new Staff({
      name: name,
      role:role,
      salary:salary
    });
  
    await staff.save();
  
    res.status(200).json({
      message: "Staff has been added",
    });
}

exports.remove = async(req,res,next)=>{
    try {
        const { id } = req.params;
    
        const staff = await Staff.deleteOne({
          _id: id,
        });
    
        if (staff.deletedCount === 0) {
          const error = new Error("Staff not found")
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
        const { name,role,salary } = req.body;
    
         const staff = await Staff.findByIdAndUpdate(id,{
            name: name,
            role:role,
            salary:salary
         })
         if(!staff){
          const error = new Error("Staff not found")
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