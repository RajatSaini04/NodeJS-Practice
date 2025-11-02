const express = require('express');
const app = express();
const fs = require('fs');

const users = require('./MOCK_DATA.json');

app.use(express.urlencoded({ extended: false }))
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
    .patch((req, res) => {
        let id = Number(req.params.id)
        const body = req.body;

        let userIndex = users.findIndex((user) => user.id === id)
        if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

        // Update user data
        users[userIndex] = [...users[userIndex], ...body]

        // update
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => { if (err) console.log(err); })

        return res.json({ status: 'UPdated ', })
    })

    .delete((req, res) => {
        let id = Number(req.params.id)
        let user = users.find((user) => user.id === id)

        // delete
        users.splice(user, 1)

        // update
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => { if (err) console.log(err); })

        return res.json({ status: 'Deleted', })
    })


//  POST - 
app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({ id: users.length + 1, ...body })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) console.log(err);
    })
    return res.json({ status: 'success', id: users.length })
})


app.listen(8000, () => { console.log('Server Started'); })