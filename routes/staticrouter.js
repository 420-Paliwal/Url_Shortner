const express = require('express');
const router = express.Router();
const Url = require('../models/url')


router.get('/', async (req, res) => {
    const allUrls = await Url.find({})
    return res.render('home', {allUrls : allUrls})
})

module.exports = router;