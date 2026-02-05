const express = require("express");
const router = express.Router();

const { handleUserSignup, handleUserLogin } = require("../controller/user.js");


/*
1. Login 
2. Signup
*/

router.post('/', handleUserSignup);
router.post('/login', handleUserLogin);


module.exports = router;