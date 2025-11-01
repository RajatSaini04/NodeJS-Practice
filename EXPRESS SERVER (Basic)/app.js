const express = require('express');
// Handler fn for express
const app = express();

app.get('/', (req, res) => {
    res.send('This is a Home PAge');
})

app.get('/about', (req, res) => {
    res.send(`THis is ABout page ${req.query.name}`);
})
app.listen('8000', () => { console.log('server started 8000'); })