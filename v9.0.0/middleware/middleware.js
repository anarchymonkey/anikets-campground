let Comment = require('../models/comments.js');
let middlewareObj = {

  isAuthenticated : function(req,res,next){
   if(req.isAuthenticated())
   {
     return next();
   }
   res.redirect('/signin');
  },
  isUser : function(req,res,next){

    Comment.findById(req.params.comment_id, (err,found)=>{
    if(req.user && (found.author.id).equals(req.user._id))
    {
      return next();
    }
    else {
      res.send("You arnt the Commenter! GO BACK -__- ");
    }
  });
  }
}

module.exports = middlewareObj;
