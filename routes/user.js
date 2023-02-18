var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT');
const isAdmin = require('../middleware/checkAdmin');

/* GET users listing. */
router.get('/',[passportJWT.isLogIn],[isAdmin.isAdmin], userController.index);

router.post('/',[
    body('name').not().isEmpty().withMessage("กรุณากรอกชื่อ-สกุลด้วย"),
    body('email').not().isEmpty().withMessage("กรุณาใส่อีเมลด้วย").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณาใส่รหัสผ่านด้วย").isLength({min:5}).withMessage("รหัสผ่านต้อง5ตัวอักษรขึ้นไป"),
],userController.register);

router.post('/login',[
    body('email').not().isEmpty().withMessage("กรุณาใส่อีเมลด้วย").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณาใส่รหัสผ่านด้วย").isLength({min:5}).withMessage("รหัสผ่านต้อง5ตัวอักษรขึ้นไป"),
],userController.login);

router.get('/me',[passportJWT.isLogIn],userController.profile);

module.exports = router;
