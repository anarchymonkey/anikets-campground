let express = require('express');
let app = express.Router();
let PLAY = require('../models/playground.js');
let Comment = require('../models/comments.js');
let middleware = require('../middleware/middleware.js');
app.get('/play/:id/comments/new', middleware.isAuthenticated ,  (req,res) =>{
  console.log("comments page accessed");
  PLAY.findById(req.params.id, (err,associatedData) =>{

    if(err)
    {
      console.log(err);
    }
    else {

      res.render('comments/newComment',{playground : associatedData});
    }

  });
});


app.post('/play/:id/comments', middleware.isAuthenticated , (req,res) => {

  PLAY.findById(req.params.id, (err,playgroundData) => {

      if(err){
        console.log(err);
        res.redirect("/play");
      }
      else {
        console.log(req.body.comment);

        Comment.create(req.body.comment, (err,theComment) =>{
          if(err)
          {
            console.log(err);
          }
          else {
            //add username and id to comment
            theComment.author.id = req.user._id;
            theComment.author.username = req.user.username;
            theComment.save();
            console.log("The comment object here " + theComment.author.username);
            console.log(req.user);
            playgroundData.comments.push(theComment);
            playgroundData.save();
            res.redirect(`/play/${playgroundData._id}`);
          }
        });
      }

  });

});


app.get("/play/:id/comments/:comment_id/edit",middleware.isAuthenticated,middleware.isUser,(req,res)=>{

  Comment.findById(req.params.comment_id , (err,foundComment) => {
    if(err)
    {
      res.redirect(`/play/${req.params.id}`);
    }
    else {
      res.render("./comments/editComment",{playground : req.params.id, comment : foundComment});
    }
  });
});

app.put("/play/:id/comments/:comment_id",middleware.isUser,(req,res)=>{

  Comment.findByIdAndUpdate(req.params.comment_id , req.body.comment, (err,updatedComment)=>{

      if(err)
      {
        res.redirect(`/play/${req.params.id}`);
      }
      else{
        res.redirect(`/play/${req.params.id}`);
      }
  });
});

app.delete('/play/:id/comments/:comment_id',middleware.isAuthenticated,middleware.isUser,(req,res)=>{

  Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
    if(err)
    {
      res.redirect(`/play/${req.params.id}`);
    }
    else{
      res.redirect(`/play/${req.params.id}`);
    }
  });
});


module.exports = app;
