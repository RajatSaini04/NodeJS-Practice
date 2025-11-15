const { getUser } = require("../service/auth");

const restrictToLoggedinUserOnly = async (req, res, next) => {
    // HEADER
    const userUid = req.headers['Authorization'];

    if (!userUid) return res.redirect('/login')

    // Header - code for corss platform
    const token = userUid.split('Bearer')[1];
    const user = getUser(token);

    
    if (!user) return res.redirect("/login")
    req.user = user;
    next()
};

async function checkAuth(req, res, next) {
    // const userUid = req.cookies?.uid;



    const user = getUser(userUid);
    req.user = user;
    next()
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
}