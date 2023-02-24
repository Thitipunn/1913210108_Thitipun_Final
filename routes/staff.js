var express = require('express');
var router = express.Router();
const staffController = require('../controllers/staffController')
const passportJWT = require('../middleware/passportJWT');
const isAdmin = require('../middleware/checkAdmin');

router.get('/',[passportJWT.isLogIn],[isAdmin.isAdmin],staffController.index);

router.get('/:id',[passportJWT.isLogIn],[isAdmin.isAdmin], staffController.Show);

router.post('/',[passportJWT.isLogIn],[isAdmin.isAdmin], staffController.insert);

router.delete('/:id',[passportJWT.isLogIn],[isAdmin.isAdmin], staffController.remove);

router.put('/:id',[passportJWT.isLogIn],[isAdmin.isAdmin], staffController.update);

module.exports = router;