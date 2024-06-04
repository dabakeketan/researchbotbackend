const jwt = require("jsonwebtoken");
require('dotenv').config();


function jwtGenerator(userId) {
    const payload = {
        user: userId
    }
    // console.log(process.env.jwtSecret);
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 60 * 60})
}

module.exports = jwtGenerator;