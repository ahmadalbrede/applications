const express = require('express');
const router = express.Router();

const is_auth = require('../middleware/is_auth');
const is_admin = require('../middleware/is_admin');
const invitationController = require('../controllers/invitationController');
const {groupIdValidation} = require('../util/validations/authValidation')
const {acceptValidation , sendValidation} = require('../util/validations/invitationValidation')
router.post('/send',
is_auth,
groupIdValidation,
is_admin,
sendValidation ,
invitationController.sendInvitation);

router.get('/view',
is_auth,
invitationController.getInvitationForUser);

router.put('/accept',(req, res) => {
    res.status(400).json({ message: 'Invitation ID is required in the URL' });
});

router.put('/accept/:invitationId',
is_auth,
acceptValidation,
invitationController.ecceptInvitation);

module.exports = router ;