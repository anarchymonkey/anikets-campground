/* VARIABLES ARE DECLARED HERE */
const express = require("express");
const app = express();
app.set("view engine","ejs");
const bodyParser = require("body-parser");
const request = require("request");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
let playground;
playground = [
  {
    name : "Aniket",
    image : "https://images.pexels.com/photos/35888/amazing-beautiful-breathtaking-clouds.jpg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    name :"Nidhi",
    image : "https://images.pexels.com/photos/15239/flower-roses-red-roses-bloom.jpg?auto=compress&cs=tinysrgb&h=350"
  },
  {
      name: "Anmol Jande",
      image: "https://images.pexels.com/photos/1366881/pexels-photo-1366881.jpeg?auto=compress&cs=tinysrgb&h=350"
  }
];
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
  playground.push(newPlayground);
  res.redirect("/play");

});

app.get("/add",function(req,res){
  res.render("addPlayground");
});
/* ******************************** */
/*         PLAYGROUNDS PAGE         */
/* ******************************** */
app.get("/play",function(req,res){
  console.log("playgrounds page accessed");

  res.render("playgrounds",{playground:playground});
});

/* ******************************** */
/*   listening on port 3000         */
/* ******************************** */
app.listen(3000,function(){
  console.log("SERVER HAS STARTED");
});
