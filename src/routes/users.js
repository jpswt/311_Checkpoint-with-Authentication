let express = require('express');
const router = new express.Router();
let userController = require('../controllers/users');

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
