const express = require('express')
const app = express()
const port = 8000
const path = require('path')
const urlRoute = require('./routes/url')
const mongoose = require('mongoose')
const Url = require("./models/url")
const staticRoute = require('./routes/staticrouter')
const userRoute = require('./routes/user')
mongoose.connect('mongodb://localhost:27017/urlShortner', {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))                   

app.use(express.json())                                    
app.use(express.urlencoded({extended: true}))


app.use('/url', urlRoute)
app.use('/', staticRoute)
app.use('/user', userRoute)

app.listen(port , () => {
    console.log('Server is running on port' + port)
})