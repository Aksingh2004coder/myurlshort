//this is the controller for handling URL shortening requests

const shortid = require('shortid');
const { URL } = require('../models/url');

const HandleUrlRequest = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).render('home', {
      shortUrl: null,
      error: 'Original URL is required'
    });
  }

  try {
    const shortUrl = shortid.generate();
    const url = await URL.create({ originalUrl, shortUrl });

    return res.status(201).render('home', {
      shortUrl: url.shortUrl,
      error: null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).render('home', {
      shortUrl: null,
      error: 'Unable to shorten URL'
    });
  }
};

const HandleRedirect = async (req, res) => {
  const url = await URL.findOneAndUpdate(
    { shortUrl: req.params.shortUrl },
    {
      $inc: { visitCount: 1 },
      $set: { lastVisitedAt: new Date() }
    },
    { new: true }
  );
  if (!url) return res.status(404).send('URL not found');
  res.redirect(url.originalUrl);
};

const HandleAnalytics = async (req, res) => {
  const url = await URL.findOne({ shortUrl: req.params.shortUrl });
  if (!url) return res.status(404).json({ error: 'URL not found' });

  res.json({
    originalUrl: url.originalUrl,
    shortUrl: url.shortUrl,
    createdAt: url.createdAt,
    visitCount: url.visitCount,
    lastVisitedAt: url.lastVisitedAt
  });
};

module.exports = {
  HandleUrlRequest,
  HandleRedirect,
  HandleAnalytics
};


