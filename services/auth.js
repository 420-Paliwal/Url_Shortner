const jwt = require('jsonwebtoken');
const secret = "Harsh@420";

function setUser(user){
    return jwt.sign({
        id : user._id,
        name : user.name,
        email : user.email 
    }, secret);
}

function getUser(token){
    try {
        return jwt.verify(token, secret);
    } catch (err) {
       return null;
    }
}

module.exports = { setUser, getUser }