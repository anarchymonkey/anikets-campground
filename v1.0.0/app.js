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
  var playground = [
    {
      name : "Aniket",
      image : "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144292f0c17daee5b6_340.jpg"
    },
    {
      name :"Nidhi",
      image : "https://vignette.wikia.nocookie.net/barbie-movies/images/4/43/Princess_Lumina_of_Seagundia.png/revision/latest?cb=20140508152719"
    },
    {
        name: "Anmol Jande",
        image: "https://i.ebayimg.com/images/g/RssAAOSw9NxTvk0o/s-l300.jpg"
    }
  ];
  res.render("playgrounds",{playground:playground});
});
/* ******************************** */
/*   listening on port 3000         */
/* ******************************** */
app.listen(3000,function(){
  console.log("SERVER HAS STARTED");
});
