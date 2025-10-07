const express = require('express');
const router = express.Router();
const Url = require('../models/url')
const { getAllUsers, createUser, loginUser } = require('../controllers/user');

router.get('/', (req, res) => {
    const allUrls = Url.find({})
    return res.render('home', {
        urls : allUrls
    })
})
router.get('/login', (req, res) => {
    return res.render('login')
})
router.get('/signup', (req, res) => {
    return res.render('signup')
})

module.exports = router;