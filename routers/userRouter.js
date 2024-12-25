const express = require('express');
const router = express.Router();

const is_auth = require('../middleware/is_auth');
const is_admin = require('../middleware/is_admin');
const userController = require('../controllers/userController');

router.get('/get',
is_auth,
userController.getUsers)

router.post('/search',
is_auth,
userController.searchUser);

module.exports = router ; 