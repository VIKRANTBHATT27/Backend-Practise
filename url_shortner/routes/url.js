const express = require('express');
const router = express.Router();
 
const { 
     handleGenerateShortUrl,
     handleRedirectingUrl,
     handleGetAnalytics
} = require('../controller/url');

router.post('/', handleGenerateShortUrl);
router.get('/:url', handleRedirectingUrl);

router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;