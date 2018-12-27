let express = require('express');
let app = express.Router();
let PLAY = require('../models/playground.js');
let Comment = require('../models/comments.js');
app.get('/play/:id/comments/new', isAuthenticated ,  (req,res) =>{
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


app.post('/play/:id/comments', isAuthenticated , (req,res) => {

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


app.get("/play/:id/comments/:comment_id/edit",isAuthenticated,isUser,(req,res)=>{

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

app.put("/play/:id/comments/:comment_id",isUser,(req,res)=>{

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

app.delete('/play/:id/comments/:comment_id',isAuthenticated,isUser,(req,res)=>{

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



 function isAuthenticated(req,res,next){
  if(req.isAuthenticated())
  {
    return next();
  }
  res.redirect('/signin');
}

function isUser(req,res,next){

  Comment.findById(req.params.comment_id, (err,found)=>{
  if((found.author.id).equals(req.user._id))
  {
    return next();
  }
  else {
    res.send("You arnt the Commenter! GO BACK -__- ");
  }
});
}


module.exports = app;
