function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

// 1st way
module.exports = {
    add,
    sub
}
// 2nd way
exports.addfn = (a, b) => { a + b };
exports.subfn = (a, b) => { a - b };