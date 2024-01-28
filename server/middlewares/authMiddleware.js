const jwt = require('jsonwebtoken');

//decode token

module.exports = function(req, res, next){
    // if nothing happens, we are going to the next, which would be usersRoute
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.jwt_secret); // whatever secret code you used while encrypting has to be used for decrypting as well.
        req.body.userId = decoded.userId; // so that we can later use this in usersRoute GetUserInfo
        next();
    }catch(error){
        res.send({
            message: error.message,
            success: false,
        })
    }
}