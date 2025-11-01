const fs = require('fs');

// CREATE 
// Sync
fs.writeFileSync('sample.txt', 'THis is Just a sample file created with Fs module')

// Async -  returns a callback
fs.writeFile('sample2.txt', 'This is Async file created', (err) => {
    if (err) console.log(err);
})

// ====== READ

const result = fs.readFileSync('sample.txt', 'utf-8')
console.log(result);

fs.readFile('sample2.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log('File data: ', data);
    }
})

// ======= APPEND

fs.appendFileSync('sample.txt', '\nAdded text from append')

// sync
fs.appendFile('sample2.txt', '\nHello from async append!\n', (err) => {
    if (err) {
        console.error('Error while appending:', err);
        return;
    }
    console.log('✅ Data appended asynchronously!');
});

// async
try {
    fs.appendFileSync('sample.txt', '\nHello from sync append!\n');
    console.log('✅ Data appended synchronously!');
} catch (err) {
    console.error('Error while appending:', err);
}

// ==========copy 

// fs.cpSync('sample.txt', './Copied-sample.txt')

// ======Delete
// fs.unlinkSync('Copied-sample.txt')

// ====== Stats
fs.statSync('sample.txt')
