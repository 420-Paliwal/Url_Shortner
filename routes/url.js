const express = require('express');
const router = express.Router();
const Url = require('../models/url');
const { shortenUrl, getUrl} = require('../controllers/url');

router.get('/:shortId', getUrl)
router.post('/', shortenUrl)

module.exports = router;