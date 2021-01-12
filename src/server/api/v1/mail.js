const router = require('express').Router();
const { testMailHandler } = require('../../handlers/mail');

router.post('/', testMailHandler);

module.exports = router;
