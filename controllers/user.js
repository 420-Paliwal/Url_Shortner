const user = require('../models/user')
const { getAllUrls } = require('./url')

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
    console.log(req)
    const { email, password } = req.body
    console.log(email, password)
    const existingUser = await user.findOne({email, password})
    if(existingUser){
        getAllUrls(req, res)
    }
    else{
        res.render('login', {message : "Invalid Credentials"})
    }
}

module.exports = { getAllUsers, createUser, loginUser}