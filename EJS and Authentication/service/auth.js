const sessionIdToUseMap = new Map();

function setUser(id, user) {
    sessionIdToUseMap.set(id, user)
}
function getUser(id, user) {
    return sessionIdToUseMap.get(id)
}

module.exports = {
    setUser,
    getUser,
}