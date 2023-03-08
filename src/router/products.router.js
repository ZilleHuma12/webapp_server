const express = require("express");
const userRoute = express.Router();
const { productsController } = require("../controller");
const { userMiddleware } = require("../middleware");

userRoute.post("/addproduct", productsController.addProduct);
userRoute.get("/getproducts", productsController.getProducts);

module.exports = userRoute;