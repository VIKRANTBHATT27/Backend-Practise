const express = require('express');
const router = express.Router();

const urlModel = require('../models/url.js');
const { getUser } = require("../service/auth");
const { checkforAuthorization } = require('../middlewares/auth.js');

router.get('/admin-dashboard', checkforAuthorization(['ADMIN']), async (req, res) => {    //checking authentication and returning only generated urls by the user._id
     const allData = await urlModel.find({ });
     console.log(allData);
     return res.render("dashboard.ejs", {
          arr: allData
     });
});

router.get('/dashboard', checkforAuthorization(['USER', 'ADMIN']), async (req, res) => {    //checking authentication and returning only generated urls by the user._id
     const allData = await urlModel.find({ createdBy: req.user._id });
     
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