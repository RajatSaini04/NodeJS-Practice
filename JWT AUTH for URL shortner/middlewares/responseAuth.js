const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
    const AuthorizationHeadervalue = req.headers["authorization"];
    if (!authorization || !AuthorizationHeadervalue.startsWith("Bearer")) {
        return next();
    }
    const token = AuthorizationHeadervalue.split("Bearer ")[1];
    const user = getUser()
    return next()

}

function restrictTo(roles){
    return function(req,res,next){
        if (!req.user) {
            return res.redirect("/login")
        }
    }
}

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