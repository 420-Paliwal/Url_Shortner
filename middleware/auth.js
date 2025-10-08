const {setUser, getUser} = require('../services/auth'); 

async function restrictToLoggedinUserOnly(req, res, next) {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        return res.redirect('/login')
    }
    const user = getUser(sessionId)
    if (!user) {
        return res.redirect('/login')
    }
    req.user = user
    next()
}

module.exports = { restrictToLoggedinUserOnly }