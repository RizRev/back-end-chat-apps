const express = require("express");
const router = express.Router();
const { usersController } = require("../controller/users");
const { protect } = require("../middlewares/auth");
// const protect = require("../middlewares/jwt-auth");

router.post("/register", usersController.insert);
router.get("/verification/:email/:otp", usersController.verif);
router.post("/login", usersController.login);
router.get("/profile",protect,usersController.profile)
router.get("/all",usersController.getAll)

module.exports = router