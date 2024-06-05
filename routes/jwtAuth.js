const router = require("express").Router()
const authorazation = require("../middleware/authorization");
const authController = require("../controllers/authController");

// Register

router.post("/registerUser", authController.registerUser);

router.post("/login", authController.login);

router.get("/verifyToken", authorazation, authController.verifyToken);

router.get("/getCurrentUser", authorazation. authController.getCurrentUser);

module.exports = router;