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

    const token= authheader.split(" ")[1];

    const decoded= jwt.verify(token, JWTSecretkey)

    req.user= decoded;
    
    next()

}


module.exports=authenticate;