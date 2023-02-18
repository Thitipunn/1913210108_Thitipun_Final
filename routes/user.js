var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController')
//const passportJWT = require('../middleware/passportJWT');
//const isAdmin = require('../middleware/checkAdmin');

router.get('/',brandController.index);

//router.get('/model',brandController.model);

//router.get('/',[passportJWT.isLogIn],[isAdmin.isAdmin], brandController.index);

//router.get('/:id', brandController.Show);

//router.post('/', brandController.insert);

//router.delete('/:id', brandController.remove);

//router.put('/:id', brandController.update);

module.exports = router;