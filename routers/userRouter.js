const express = require('express');
const router = express.Router();

const is_auth = require('../middleware/is_auth');
const userController = require('../controllers/userController');

router.get('/get-users',is_auth,userController.getUsers)

module.exports = router ; 