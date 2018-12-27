let express = require('express');
let app = express.Router();
let PLAY = require('../models/playground.js');
let middleware = require('../middleware/middleware.js');
app.get("/",function(req,res){
  console.log("home page accessed");
  res.render("index");
});
/* ******************************** */
/*          POST                    */
/* ******************************** */
// Add new PLAYGROUNDS [Restful Routing]
app.post("/play",middleware.isAuthenticated,function(req,res){
  let name = req.body.insertName;
  let image = req.body.insertImage;
  let desc = req.body.insertDesc;
  let author = {id : req.user._id , username : req.user.username};
  let newPlayground = {name : name,image:image,description : desc, author : author}
  //add to databaseModel

  PLAY.create(newPlayground,function(err,playground){
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
app.get("/play/add",middleware.isAuthenticated,function(req,res){
  res.render("playgrounds/addPlayground");
});
/* ******************************** */
/*         PLAYGROUNDS PAGE         */
/* ******************************** */
//INDEX [ Restful Routing ]
app.get("/play",middleware.isAuthenticated,function(req,res)
{
  console.log("playgrounds page accessed");

  //res.render("playgrounds",{playground:playground});
  PLAY.find({},function(err,playground)
{
    if(!err)
    {
        res.render("playgrounds/playgrounds",{playground:playground});
    }
    else
    {

    }
});
});

app.get("/play/:id",function(req,res){
  var id = req.params.id;
  PLAY.findById(id).populate("comments").exec(function(err,ObjectId){
    if(!err)
    {
        res.render("playgrounds/description",{playground : ObjectId});
    }
    else {
      console.log("Error");
    }

  });
});


app.get('/play/:id/update', (req,res)=>{
  PLAY.findById(req.params.id , (err,updated)=>{

    if(err)
    {
      console.log(err);
    }
    res.render('../views/playgrounds/updatePage.ejs',{updated : updated});
  });
});

app.put('/play/:id', (req,res)=>{
  PLAY.findByIdAndUpdate(req.params.id,req.body.desc, (err, update)=>{
     if(err) {
      console.log(err);
     }
     else {
       res.redirect(`/play/${req.params.id}`);
     }
  });
});

app.delete("/play/:id", (req,res) =>{

  PLAY.findByIdAndRemove(req.params.id , (err)=>{
    if(err)
    {
      res.redirect('/play');
    }
    else {
      res.redirect('/play');
    }
  });
});
module.exports = app;
