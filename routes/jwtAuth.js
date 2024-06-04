const router = require("express").Router()
const pool = require("../db")
const bcrypt = require('bcrypt');
const jwtGenerator = require("../utils/jwtGenerator");
const authorazation = require("../middleware/authorization");

// Register

router.post("/register", async (req, res) => {
    try {

        const { email, password, first_name, last_name } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length !== 0) {
            return res.status(500).send("User already exist");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPwd = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
            [email, bcryptPwd, first_name, last_name]);

        const token = jwtGenerator(newUser.rows[0].user_id);
        const respObj = {
            user: newUser.rows[0],
            token: token
        }
        res.json(respObj);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Please enter correct email and password");
        }

        const validPwd = await bcrypt.compare(password, user.rows[0].password);
        if(!validPwd) {
            return res.status(401).json("Please enter correct email and password");
        }

        const token = jwtGenerator(user.rows[0].user_id);
        const respObj = {
            token: token
        }
        res.json(respObj);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/verifyToken", authorazation,  async (req, res) => {
    try {
        console.log(req.user);
        res.json(req.user);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/getCurrentUser", authorazation,  async (req, res) => {
    try {
        const user = await pool.query("SELECT first_name, last_name, email FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0]);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;