
const express = require('express');
const router = express.Router();

const {
	HandleUrlRequest,
	HandleRedirect,
	HandleAnalytics
} = require('../controllers/url');

router.post('/', HandleUrlRequest);
router.get('/analytics/:shortUrl', HandleAnalytics);

router.get('/:shortUrl', HandleRedirect);

module.exports = router;

