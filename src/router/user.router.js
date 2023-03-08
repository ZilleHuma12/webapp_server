const express = require("express");
const userRoute = express.Router();
const { userController } = require("../controller");
const { userMiddleware } = require("../middleware");

userRoute.post("/signup", userController.signup);
userRoute.post("/login", userController.login);
userRoute.post('/check/:token', userController.auth)
userRoute.post('/getuser/:token', userController.getUser)

module.exports = userRoute;