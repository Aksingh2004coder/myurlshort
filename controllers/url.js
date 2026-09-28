
//this is the controller for handling URL shortening requests

const shortid = require('shortid');
const { URL } = require('../models/url');

const HandleUrlRequest = (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  const shortUrl = shortid.generate();

  URL.create({ originalUrl, shortUrl })
    .then(url => {
      res.status(201).json({
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl
      });
    });
};

const HandleRedirect = async (req, res) => {
  const url = await URL.findOne({ shortUrl: req.params.shortUrl });
  if (!url) return res.status(404).send('URL not found');
  res.redirect(url.originalUrl);
};

module.exports = {
  HandleUrlRequest,
  HandleRedirect
};


