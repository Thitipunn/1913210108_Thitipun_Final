const User = require("../models/user");
const { validationResult } = require('express-validator');
const { findOne } = require("../models/user");
const user = require("../models/user");
const jwt = require('jsonwebtoken');
const config = require("../config/index");

exports.index = async (req, res, next) => {

  const user = await User.find();

    res.status(200).json({
        data:user
  })
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง")
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    const existEmail = await User.findOne({ email: email });
    
    if (existEmail) {
      const error = new Error("อีเมลนี้มีผู้ใช้งานในระบบแล้ว")
      error.statusCode = 400
      throw error;
    }

    let user = new User();
    user.name = name;
    user.email = email;
    user.password = await user.encryptPassword(password);

    await user.save();

    res.status(201).json({
      message: "ลงทะเบียนเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req,res,next) => {
  try{
    const{ email,password } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง")
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    //check email is exist
    const user = await User.findOne({email:email})
    if(!user){
      const error = new Error("ไม่พบผู้ใช้งาน")
      error.statusCode = 404;
      throw error;
    }

    const isValid = await user.checkPassword(password)
    if(!isValid){
      const error = new Error("รหัสผ่านไม่ถูกต้อง")
      error.statusCode = 401
      throw error;
    }

    //login token
    const token = await jwt.sign({
      id:user._id,
      role:user.role,
    },config.SECRETKEY,
    {expiresIn:"5 days"})

    const expire_in = jwt.decode(token);

    res.status(200).json({
      access_token:token,
      expire_in:expire_in.exp,
      token_type:'Bearer',
    });
  }
  catch(error){
    next(error)
  }
}

exports.profile = (req, res, next) => {
  const{name,email,role} = req.user
  res.status(200).json({
    name:name,
    email:email,
    role:role,
  });
};