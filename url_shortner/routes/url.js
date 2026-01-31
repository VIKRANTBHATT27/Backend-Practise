const express = require('express');
const { 
     handleGenerateShortUrl,
     handleRedirectingUrl,
     handleGetAnalytics
} = require('../controller/url');

const router = express.Router();

router.post('/url', handleGenerateShortUrl);
router.get('/:url', handleRedirectingUrl);
router.get('/url-analytics/:shortId', handleGetAnalytics);

module.exports = {
     router
}