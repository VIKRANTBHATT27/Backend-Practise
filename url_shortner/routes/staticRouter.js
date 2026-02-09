const express = require('express');
const router = express.Router();
const { getUser } = require("../service/auth");

const urlModel = require('../models/url.js');

router.get('/dashboard', async (req, res) => {    //checking authentication and returning only generated urls by the user._id
     const userUID = req.cookies?.uid || null;
     const user = getUser(userUID);

     if (!user) return res.redirect('/login');

     const allData = await urlModel.find({ createdBy: user._id });
     
     return res.render("dashboard.ejs", {
          arr: allData
     });
});

router.get('/home', (req, res) => {
     return res.render("home.ejs")
});

router.get('/signup', (req, res) => {
     return res.render("signup.ejs");
});

router.get('/login', (req, res) => {
     return res.render("login.ejs");
})

module.exports = router;