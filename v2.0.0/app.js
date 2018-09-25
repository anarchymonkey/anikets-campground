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
  image : String,
  description : String
});

let databaseModel = mongoose.model("playground",databaseSchema);
//Add data and show

/*databaseModel.create(
  {
    name: "Nidhi",
    image : "https://images.pexels.com/photos/1428685/pexels-photo-1428685.jpeg?auto=compress&cs=tinysrgb&h=350",
    description : "hey this is Aniket, he rocks"
  },
  function(err,playground)
  {
    if(!err)
    {
        console.log("Data added");
        console.log(playground);
        //res.redirect("/play");
    }
    else
    {
        console.log(err);
    }

  });
  */

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
// Add new PLAYGROUNDS [Restful Routing]
app.post("/play",function(req,res){
  let name = req.body.insertName;
  let image = req.body.insertImage;
  let desc = req.body.insertDesc;
  let newPlayground = {name : name,image:image,description : desc}
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

//NEW -> show form to add new playground
app.get("/play/add",function(req,res){
  res.render("addPlayground");
});
/* ******************************** */
/*         PLAYGROUNDS PAGE         */
/* ******************************** */
//INDEX [ Restful Routing ]
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

app.get("/play/:id",function(req,res){
  var id = req.params.id;
  databaseModel.findById(id,function(err,ObjectId){
    if(!err)
    {
        res.render("description",{playground : ObjectId});
    }
    else {
      console.log("Error");
    }

  });
});

/* ******************************** */
/*   listening on port 3000         */
/* ******************************** */
app.listen(3000,function(){
  console.log("SERVER HAS STARTED");
});
