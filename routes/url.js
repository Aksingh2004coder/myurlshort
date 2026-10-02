
//for shortening purpose
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const {
	HandleUrlRequest,
	HandleRedirect,
	HandleAnalytics
} = require('../controllers/url');

router.post('/', authMiddleware, HandleUrlRequest);
router.get('/analytics/:shortUrl', authMiddleware, HandleAnalytics);

router.get('/:shortUrl', HandleRedirect);

module.exports = router;
