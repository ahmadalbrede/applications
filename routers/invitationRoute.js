const express = require('express');
const router = express.Router();

const is_auth = require('../middleware/is_auth');
const is_admin = require('../middleware/is_admin');
const invitationController = require('../controllers/invitationController');

router.post('/send',
// is_auth,
// is_admin,
invitationController.sendInvitation);

router.get('/view',
is_auth,
invitationController.getInvitationForUser);

router.post('/accept',
is_auth,
invitationController.ecceptInvitation);

module.exports = router ;