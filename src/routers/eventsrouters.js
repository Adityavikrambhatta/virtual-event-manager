const express = require("express");
const eventRouter = express.Router();

const path = require("path")


eventRouter.get('/', (req,res)=>{
  res.status(200).send("Event Triggered")  
})