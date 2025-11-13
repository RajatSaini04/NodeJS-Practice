const jwt = require('jsonwebtoken');
const secretkey = 'Rajat@$11@'
function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secretkey)
}
function getUser(token) {
    if (!token) return null;
    return jwt.verify(token, secretkey)
}

module.exports = {
    setUser,
    getUser,
}