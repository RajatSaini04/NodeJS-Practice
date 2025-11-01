const http = require('http');
const fs = require('fs');

const myserver = http.createServer((req, res) => {

    const log = `${Date.now()} : ${req.url} : New Request Received\n`;
    if (req.url==='/favicon.ico') return res.end()
    fs.appendFile('log.txt', log, (err) => {
        switch (req.url) {
            case '/':
                res.end('HOMEPAGE')
                break;
            case '/about':
                res.end('Hi, Rajat this side')
                break;
            default:
                res.end('404 Not Found')
                break;
        }
    })

});

myserver.listen(8000, () => { console.log('Server Started'); })