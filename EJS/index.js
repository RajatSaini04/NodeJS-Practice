const express = require("express");
const app = express();

const path = require('path')
const staticRoute = require('./routes/staticRouter');

const { connectMongoDB } = require('./connection');
// const { logReqRes } = require('./middlewares');
const urlRouter = require('./routes/url');
const URL = require('./models/url');

// Connection
connectMongoDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => {
        console.log("MongoDB CONNECTED");
    })
    .catch(err => {
        console.log("MOngog Error: ", err);
    })

// Setting EJS Engine here
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


// Middleware
// -support json data
app.use(express.json())
// -support form data
app.use(express.urlencoded({ extended: true }))

// Templating Engine EJS Rotue for SSR
// app.use('/test', async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.render('home', {
//         urls: allUrls,
//     })
// })

// Routes 
app.use('/url', urlRouter)
app.use('/', staticRoute)

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        })
    res.redirect(entry.redirectUrl)
})



app.listen(8000, () => { console.log('Server Started 8000'); })