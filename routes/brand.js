var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController')
const passportJWT = require('../middleware/passportJWT');
const isAdmin = require('../middleware/checkAdmin');

router.get('/',brandController.index);

router.get('/model',brandController.model);

router.get('/:id', brandController.Show);

router.post('/',[passportJWT.isLogIn],[isAdmin.isAdmin], brandController.insert);

router.delete('/:id',[passportJWT.isLogIn],[isAdmin.isAdmin], brandController.remove);

router.put('/:id',[passportJWT.isLogIn],[isAdmin.isAdmin], brandController.update);

module.exports = router;