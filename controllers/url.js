const shortId = require('shortid');
const Url = require('../models/url');

async function getAllUrls(req, res) {
    const allUrls = await Url.find({});
    res.render('home', {
        urls : allUrls
    })
}
async function getUrl(req, res) {
    const shortIdParams = req.params.shortId;
    const originalUrl = await Url.findOne({
        shortId : shortIdParams
    })
    originalUrl.visitedHistory.push({ timestamp : new Date() });
    await originalUrl.save();
    if(originalUrl) {
        return res.redirect(originalUrl.redirectURL);
    } else {
        return res.status(404).json({ error : 'URL not found' });
    }
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
        getAllUrls(req, res)
    }).catch((err) => {
        console.error('Error shortening URL', err);
        return res.status(500).json({ error : 'Internal Server Error' });
        })

}

module.exports = {getAllUrls, getUrl , shortenUrl};