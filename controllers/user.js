const {v4 : uuidv4} = require('uuid')
const user = require('../models/user')
const { getAllUrls } = require('./url')
const { setUser, getUser } = require('../services/auth')

async function getAllUsers(req , res){  
   const users = await user.find({})
    res.status(200).json({ urls : users })
}

async function createUser(req, res){
    console.log(req.body)
    const {name, email, password} = req.body
    const newUser = await user.create({
        name : name,
        email : email,
        password : password        
    })
    if(newUser){
        getAllUrls(req, res)
    }
}

async function loginUser(req, res){
    const { email, password } = req.body
    console.log(email, password)
    const existingUser = await user.findOne({email, password})
    if(existingUser){
        const sessionId = uuidv4()
        setUser(sessionId, existingUser)
        res.cookie('sessionId', sessionId)
        console.log("User Logged In", sessionId , existingUser)
        getAllUrls(req, res)
    }
    else{
        res.render('login', {message : "Invalid Credentials"})
    }
}

module.exports = { getAllUsers, createUser, loginUser}