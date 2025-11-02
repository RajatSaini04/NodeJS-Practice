const express = require('express');
const app = express();
// const fs = require('fs');

const users = require('./MOCK_DATA.json');

app.use(express.urlencoded({ extended: false }))

// Middleware 1 - 
app.use((req, res, next) => {
    // 1 - execute the code 
    console.log("MIDDLEWARE 1");
    // 2 - changes to req-res object
    req.myname = 'rajat';
    // 3 - call the next middleware fn in the stack
    next()
    // 4 - ENd the req-res cycle
    // return res.json({ msg: "Ended MID 1" })
})

app.use((req, res, next) => {
    // 1 - execute the code & 2 - we can pass the changes to object
    console.log("MIDDLEWARE 2", req.myname);
    // 3 - call the next middleware fn in the stack
    next()
    // 4 - END the req-res cycle
    // return res.json({ msg: "Ended MID 2" })
})

app.get('/', (req, res) => {
    res.send('HOMEPAGE - GO to /users or /api/users');
})

// Routes
// if using diff. device - uses hybrid request
app.get('/api/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => {
        `<li>${user.first_name}  </li>`
    }).join("")}
    </ul>`;

    res.send(html)
})

// === REST API
// GET -  ALL USER -using browser ye HTML dega - 
app.get('/users', (req, res) => {
    res.json(users)
})

// GET- PUT - DELETE -- all 3 uses the same route
app.route('/api/users/:id').get(
    (req, res) => {
        let id = Number(req.params.id)
        let user = users.find((user) => user.id === id)

        return res.json(user)
    }
)

app.listen(8000, () => { console.log('Server Started'); })