const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async (req, res, next) => {
    try{
        const jwtToken = req.header("token");

        if(!jwtToken) {
            return res.status(403).json('Not Authorize')
        }
        // console.log(jwtToken);
        // console.log(process.env.jwtSecret);
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        // console.log(payload);
         req.user = payload.user;
         next();

    } catch (err) {
        console.log(err.message);
        return res.status(403).json('Not Authorize (Invalid Token)')
    }
}