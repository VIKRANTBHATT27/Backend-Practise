const express = require('express');
const router = express.Router();

const urlModel = require('../models/url.js');

router.get('/dashboard', async (req, res) => {
     const DATA = await urlModel.find({});
     
     return res.render("dashboard.ejs", {
          arr: DATA
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