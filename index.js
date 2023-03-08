const express = require('express')
const {client }= require("./src/modals");
const defaultRoutes = require("./src/router");
const bodyParser = require("body-parser");
var cors = require("cors");
var dotenv = require('dotenv')

const app = express()
dotenv.config()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", defaultRoutes)
client.connect();
app.listen(3001, async (req, res)=>{
    console.log("listening");
   
})