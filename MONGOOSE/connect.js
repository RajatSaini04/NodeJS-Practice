const express = require("express");
const app = express();
const mongoose = require('mongoose');
const users = require('./MOCK_DATA.json');

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
app.get('/users', async (req, res) => {

    // getting user from the DB we Created
    const allDbUsers = await User.find({});
    res.json(allDbUsers)
})

app.route('/api/users/:id').get(
    async (req, res) => {
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ status: 'PEnding' })
        return res.json(user)

    }
)

//  POST - 
app.post('/api/users', async (req, res) => {
    const body = req.body;

    if (!body.firstName || !body.email) {
        return res.status(400).json({ msg: 'ALL feild req..' })
    }
    // Creating a user with help of modal 
    const result = await User.create({
        firstName: body.firstName,
        email: body.email,
    });
    console.log(result);
    return res.status(201).json({ msg: "success" })

})

app.listen(8000, () => { console.log('Server Started'); })