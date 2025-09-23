const shortId = require('shortid');
const Url = require('../models/url');

async function getUrl(req, res) {
    const shortIdParams = req.params.shortId;
    const originalUrl = await Url.findOne({
        shortId : shortIdParams
    })
    console.log(originalUrl.redirectURL);
    res.status(302).json({ redirectURL : originalUrl.redirectURL });
}

async function shortenUrl(req, res) {
    const originalUrl = req.body.url;
    if(!originalUrl) {
        return res.status(400).json({ error : 'URL is required' });
    }
    const shortUrl = shortId();
    await Url.create({
        shortId : shortUrl,
        redirectURL : originalUrl,
        visitedHistory : [] 
    }).then(() => {
        console.log('URL shortened successfully');
    }).catch((err) => {
        console.error('Error shortening URL', err);
        return res.status(500).json({ error : 'Internal Server Error' });
        })
    return res.status(201).json({ shortUrl : `http://localhost:8000/${shortUrl}` });
}

module.exports = { shortenUrl, getUrl };