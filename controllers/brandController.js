const Brand = require('../models/brand');


exports.index = async (req, res, next) => {

    const brand = await Brand.findOne();

    res.status(200).json({
        data: brand
    })
  };