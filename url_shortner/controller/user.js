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

     const token = setUser(user);
     res.cookie("uid", token);

     return res.redirect('/home');
};

module.exports = {
     handleUserSignup,
     handleUserLogin
};