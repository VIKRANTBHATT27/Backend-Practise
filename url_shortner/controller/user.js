const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.js');
const { setUser } = require('../service/auth.js');

const handleUserSignup = async (req, res) => {
     const { username, password, email } = req.body;

     await User.create({
          name: username,
          email,
          password,
     });

     return res.redirect('/home');
};

const handleUserLogin = async (req, res) => {
     const { email, password } = req.body;

     const user = await User.findOne({ email, password });

     if (!user) return res.render('login.ejs', {
          error: "Invalid username or password",
     });

     const sessionId = uuidv4();
     setUser(sessionId, user);

     res.cookie("uid", sessionId);

     return res.redirect('/home');
};

module.exports = {
     handleUserSignup,
     handleUserLogin
};