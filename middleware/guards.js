const auth = require("./auth");

function isAuth(){
    return (req, res, next) => {
        console.log(req.user)
        if (req.user) {
            next();
        } else{
            res.status(401).json({message: `Please sign in`});
        }
    }
}

function isGuest(){
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else{
            res.status(400).json({message: `You are already sign in`});
        }
    }
}

function isOwner(){
    return (req, res, next) => {
        if (req.user && req.user._id == res.locals.trip.owner) {
            next();
        } else{
            res.status(403).json({message: `You can not modify this record`});
        }
    }
}

module.exports = {
    isAuth,
    isGuest,
    isOwner
}
