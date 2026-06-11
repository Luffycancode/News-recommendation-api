const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWTSecretkey = process.env.JWTSecretkey;


function authenticate(req, res, next) {

    const authheader= req.headers.authorization;


    if(!authheader)
    {
        return res.status(401).json({
        message: 'Unauthorized'
        })
    }
    
    next()


}


module.exports=authenticate;