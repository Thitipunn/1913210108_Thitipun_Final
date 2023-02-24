var express = require('express');
var router = express.Router();
const modelController = require('../controllers/modelController')
const passportJWT = require('../middleware/passportJWT');
const isAdmin = require('../middleware/checkAdmin');

router.get('/',modelController.index);

router.post('/',[passportJWT.isLogIn],[isAdmin.isAdmin], modelController.insert);

router.delete('/:id',[passportJWT.isLogIn],[isAdmin.isAdmin], modelController.remove);

router.put('/:id',[passportJWT.isLogIn],[isAdmin.isAdmin], modelController.update);

module.exports = router;