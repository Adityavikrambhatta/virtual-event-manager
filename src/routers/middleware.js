const path = require("path")
const jwt = require('jsonwebtoken')
const User = require(path.join("..","models","user.js"))

const verifyToken =(req, res, next)=>{
    if ( req.headers && req.headers.authorization){
        jwt.verify(req.headers.authorization, process.env.API_SECRET, function(err, decode){
            if(err) {
                req.user = undefined;
                req.messasge =  "Header verification failed. ";
                next();
            } else {
                 User.findOne({
                    _id : decode.id
                 }).then(user => {
                    req.user = user;
                    req.message = "Successfully found the user. "
                    next()
                 }).catch(err => {
                    req.user = undefined;
                    req.message = "Unable to find user in the DB. "
                    next()
                 })
            }
        })

    } else {
        req.user = undefined
        req.messasge = "Authorization header not found. "
        next();
    }
}
module.exports = verifyToken;