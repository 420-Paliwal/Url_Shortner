const express = require('express')
const app = express()
const port = 8000
const urlRoute = require('./routes/url')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/urlShortner', {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.use(express.json())
app.use('/', urlRoute)

app.listen(port , () => {
    console.log('Server is running on port' + port)
})