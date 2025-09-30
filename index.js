const express = require('express')
const app = express()
const port = 8000
const path = require('path')
const urlRoute = require('./routes/url')
const mongoose = require('mongoose')
const Url = require("./models/url")
const staticRoute = require('./routes/staticrouter')

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
app.use(express.urlencoded({extended: false}))
app.use('/url', urlRoute)
app.use('/', staticRoute)

app.listen(port , () => {
    console.log('Server is running on port' + port)
})