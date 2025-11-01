const http = require('http');
const fs = require('fs');
const url = require('url');

const myserver = http.createServer((req, res) => {

    const log = `${Date.now()} : ${req.url} : New Request Received\n`;
    if (req.url === '/favicon.ico') return res.end()

    const myurl = url.parse(req.url, true);
    console.log(myurl);
    fs.appendFile('log.txt', log, (err) => {
        switch (myurl.pathname) {
            case '/':
                res.end('HOMEPAGE')
                break;
            case '/about':
                const username = myurl.query.myname;
                res.end(`hi, ${username}`)
                break;
            default:
                res.end('404 Not Found')
                break;
        }
    })

});

myserver.listen(8000, () => { console.log('Server Started'); })