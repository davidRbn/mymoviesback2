const jwt = require('jsonwebtoken')
require('dotenv').config();

const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET


module.exports= {
    generateTokenForUser: userData => {
        return jwt.sign({
            userId:userData.id,
            isAdmin:userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
        
    },
    parseAuthorization : authorization => {
        return (authorization != null) ? authorization.replace('Bearer','') : null
    },
    getUserId : authorization => {
        console.log(authorization);
        let userId = -1
        const token = module.exports.parseAuthorization(authorization)
        if(token != null){
            console.log(jwt.verify(token, JWT_SIGN_SECRET));
                const jwtToken = jwt.verify(token, JWT_SIGN_SECRET)
                if(jwtToken != null){
                   userId = jwtToken.userId
                }
        }return userId
    }
}