const router = require("express").Router()
const pool = require("../db")

// Register

router.post("/registration", async(req,res) => {
try{
    // destructure the req.body to get the name, email and password
    const {name, email, password: string} = req.body;

    // Checking the existance of the user(if yes then throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1",[
        email
    ]);

    res.json(user.rows) 
    // if the user is new then decrypt the password

    // Enter new user in the database

    // Generating jwt token
}
catch (err){
    console.error(err.message);
    res.status(500).send("Server Error lol");
}
});
module.exports = router;