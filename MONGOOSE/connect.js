const express = require("express");
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/DEMO_DAY')
    .then(() => {
        console.log("MongoDB CONNECTED");
    })
    .catch(err => {
        console.log("MOngog Error: ", err);
    })

const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const User = mongoose.model('user', userschema);

app.use(express.urlencoded({ extended: true }))

// === REST API
// GET -  ALL USER -using browser ye HTML dega - 
app.get('/users', (req, res) => {
    res.json(users)
})

//  POST - 
app.post('/api/users', (req, res) => {
    const body = req.body;

    if (!body.firstName || !body.email) {
        return res.status(400).json({ msg: 'ALL feild req..' })
    }

    const result = User.create({
        firstName: body.firstName,
        email: body.email,
    });

    return res.status(201).json({ msg: "success" })

})


app.listen(8000, () => { console.log('Server Started'); })