const express = require("express")
const router = express.Router()
const authController = require(".././controllers/auth")
const checkTokenMiddleware = require(`../middleware/checkToken`)
const User = require(".././models/User")

router.post("/login", authController.login(User))
router.post("/register", authController.register(User))
router.post("/refreshToken", authController.refreshToken())

router.post("/user", checkTokenMiddleware, authController.user())
router.post("/logout", checkTokenMiddleware, authController.logout())

module.exports = router
