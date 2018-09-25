/* VARIABLES ARE DECLARED HERE */
const express = require("express");
const app = express();
app.set("view engine","ejs");
const bodyParser = require("body-parser");
const request = require("request");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/anikets_campground",{ useNewUrlParser: true });
let databaseSchema = new mongoose.Schema({
  name  : String,
  image : String
});

let databaseModel = mongoose.model("playground",databaseSchema);
//Add data and show


/* ******************************** */
/*         Home Page                */
/* ******************************** */
app.get("/",function(req,res){
  console.log("home page accessed");
  res.render("index");
});
/* ******************************** */
/*          POST                    */
/* ******************************** */
app.post("/play",function(req,res){
  let name = req.body.insertName;
  let image = req.body.insertImage;
  let newPlayground = {name : name,image:image}
  //add to databaseModel

  databaseModel.create(newPlayground,function(err,playground){
    if(!err)
    {
        console.log("Data added");
        console.log(playground);
        res.redirect("/play");
    }
    else
    {
        console.log(err);
    }

  });


});

app.get("/add",function(req,res){
  res.render("addPlayground");
});
/* ******************************** */
/*         PLAYGROUNDS PAGE         */
/* ******************************** */
app.get("/play",function(req,res)
{
  console.log("playgrounds page accessed");

  //res.render("playgrounds",{playground:playground});
  databaseModel.find({},function(err,playground)
{
    if(!err)
    {
        res.render("playgrounds",{playground:playground});
    }
    else
    {

    }
});
});

/* ******************************** */
/*   listening on port 3000         */
/* ******************************** */
app.listen(3000,function(){
  console.log("SERVER HAS STARTED");
});
