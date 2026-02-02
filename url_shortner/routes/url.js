const express = require('express');
const { 
     handleGenerateShortUrl,
     handleRedirectingUrl,
     handleGetAnalytics,
     handleServerSideRendering
} = require('../controller/url');

const router = express.Router();

// server side renering
router.get('/testing', handleServerSideRendering);

router.post('/url', handleGenerateShortUrl);
router.get('/url/:url', handleRedirectingUrl);

router.get('/url-analytics/:shortId', handleGetAnalytics);

module.exports = {
     router
}