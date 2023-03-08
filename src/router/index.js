const express = require("express");
const userRoute = require("./user.router");
const productsRoute = require("./products.router");

const defaultRoutes = express.Router();


defaultRoutes.use("/user", userRoute);
defaultRoutes.use("/products", productsRoute);
module.exports = defaultRoutes;