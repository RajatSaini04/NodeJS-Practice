const URL = require('../models/url');
const { nanoid } = require('nanoid');

// Isolated FUNCTIONS
const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ err: 'URL is required' })

    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    })
    const allUrls = await URL.find({});

    return res.render('home', { id: shortId, urls: allUrls })
};


const handleGetAnalytics = async (req, res) => {

    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })

};


module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};