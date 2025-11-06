const express = require("express");
const app = express();

const { connectMongoDB } = require('./connection');
const { logReqRes } = require('./middlewares');
const userRouter = require('./routes/user');

// Connection
connectMongoDB('mongodb://127.0.0.1:27017/DEMO_DAY')
    .then(() => {
        console.log("MongoDB CONNECTED");
    })
    .catch(err => {
        console.log("MOngog Error: ", err);
    })

// Middleware - Plugin
app.use(express.urlencoded({ extended: true }))
app.use(logReqRes('log.txt'))

// Routes 
app.use('/api/users', userRouter)

app.listen(8000, () => { console.log('Server Started 8000'); })