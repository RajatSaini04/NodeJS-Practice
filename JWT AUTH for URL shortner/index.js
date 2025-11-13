const express = require("express");
const app = express();

const path = require('path')
const cookieParser = require('cookie-parser')
const { restrictToLoggedinUserOnly, checkAuth } = require('./middlewares/auth');

const { connectMongoDB } = require('./connection');

const URL = require('./models/url');
const urlRouter = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

// Connection
connectMongoDB('mongodb://127.0.0.1:27017/shortUrl')
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
// parse the cookies
app.use(cookieParser())

// Routes 
// inline middleware
app.use('/url', restrictToLoggedinUserOnly, urlRouter)
app.use('/', checkAuth, staticRoute)

app.use('/user', userRoute)

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