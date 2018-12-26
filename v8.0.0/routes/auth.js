let express = require('express');
let app = express.Router();
let User = require('../models/user.js');
let passport = require('passport');

app.get("/signup", (req,res) =>{
  res.render("./Authenticate/register")
});

app.post('/signup', (req,res)=>{

  let newUser = new User({
    username : req.body.username,
    email : req.body.email
  });

  let newPassword = req.body.password;
  User.register(newUser,newPassword, (err,user)=>{

    if(err)
    {
      console.log(err);
      return res.render('./Authenticate/register');
    }

    passport.authenticate("local")(req,res,()=>{
      res.redirect("/play");
    });
  });
});

app.get('/signin', (req,res) => {
  res.render("./Authenticate/login")
});

app.post('/signin',passport.authenticate("local",{
  successRedirect : "/play",
  failureRedirect : "/signup"
}) , (req,res) =>{
  console.log("authenticated");
});

app.get("/logout", (req,res)=>{
  req.logout();
  res.redirect("/signin");
});

  function isAuthenticated(req,res,next){
  if(req.isAuthenticated())
  {
    return next();
  }
  res.redirect('/signin');
}
module.exports = app;
