var express = require('express');
var router = express.Router();
const modelController = require('../controllers/modelController')
//const passportJWT = require('../middleware/passportJWT');
//const isAdmin = require('../middleware/checkAdmin');

router.get('/',modelController.index);

//router.get('/',[passportJWT.isLogIn],[isAdmin.isAdmin], brandController.index);

//router.get('/:id', brandController.Show);

router.post('/', modelController.insert);

router.delete('/:id', modelController.remove);

router.put('/:id', modelController.update);

module.exports = router;