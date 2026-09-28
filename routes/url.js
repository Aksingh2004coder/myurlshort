
const express = require('express');
const router = express.Router();

const { HandleUrlRequest, HandleRedirect } = require('../controllers/url');

router.post('/', HandleUrlRequest);
router.get('/:shortUrl', HandleRedirect);

module.exports = router;