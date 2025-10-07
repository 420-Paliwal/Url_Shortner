const express = require('express');
const router = express.Router();
const Url = require('../models/url');
const {getAllUrls, getUrl, shortenUrl} = require('../controllers/url');


router.get('/:shortId', getUrl)
router.get('/', getAllUrls)
router.post('/', shortenUrl)

module.exports = router;