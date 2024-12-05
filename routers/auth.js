const express = require('express'); 
const router = express.Router();
const authController = require('../controllers/authintication');
const authValidation = require('../util/validations/authValidation');

router.post('/register', 
// authValidation.registerValidation,
authController.register);

router.post('/login',
authValidation.loginValidation,
authController.login);

module.exports = router ;