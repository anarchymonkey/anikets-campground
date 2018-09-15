/* VARIABLES ARE DECLARED HERE */
const express = require("express");
const app = express();
app.set("view engine","ejs");
const bodyParser = require("body-parser");
const request = require("request");
app.use(bodyParser.urlencoded({extended : true}));
/* ******************************** */
/*         Home Page                */
/* ******************************** */
app.get("/",function(req,res){
  console.log("home page accessed");
  res.render("index");
});
/* ******************************** */
/*         PLAYGROUNDS PAGE         */
/* ******************************** */
app.get("/play",function(req,res){
  console.log("playgrounds page accessed");
  res.render("playgrounds");
});
/* ******************************** */
/*   listening on port 3000         */
/* ******************************** */
app.listen(3000,function(){
  console.log("SERVER HAS STARTED");
});
