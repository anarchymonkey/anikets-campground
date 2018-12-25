/* VARIABLES ARE DECLARED HERE */
const express =                         require("express"),
      passport =                        require("passport"),
      LocalStrategy =                   require("passport-local"),
      localStrategyMongoose =           require("passport-local-mongoose"),
      expressSession =                  require("express-session"),
      bodyParser =                      require("body-parser"),
      mongoose =                        require("mongoose")
      PLAY =                            require('./models/playground.js'),
      seeds =                           require('./seeds'),
      Comment =                         require('./models/comments.js'),
      User   =                          require('./models/user.js')


const app = express();
app.set("view engine","ejs");
app.use(express.static(__dirname + "public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressSession({
  secret : "Aniket is a good guy ",
  resave : false,
  saveUninitialized : false
}));
passport.use(new LocalStrategy(User.authenticate()));
//initializing passport auth and session , user authentication
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); //
/* ================================================================================= */
//seeding the database : clearing and reentering data
seeds();
app.use((req,res,next) =>{
  res.locals.currUser = req.user;
  next();
});
/* ================================================================================== */

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
// Add new PLAYGROUNDS [Restful Routing]
app.post("/play",function(req,res){
  let name = req.body.insertName;
  let image = req.body.insertImage;
  let desc = req.body.insertDesc;
  let newPlayground = {name : name,image:image,description : desc}
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
app.get("/play/add",function(req,res){
  res.render("playgrounds/addPlayground");
});
/* ******************************** */
/*         PLAYGROUNDS PAGE         */
/* ******************************** */
//INDEX [ Restful Routing ]
app.get("/play",function(req,res)
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

/* ******************************** */
/*   addding a new comment nigga         */
/* ******************************** */
// arrow functions are sexy arnt they?

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
            playgroundData.comments.push(theComment);
            playgroundData.save();
            res.redirect(`/play/${playgroundData._id}`);
          }
        });
      }

  });

});


/* SIGNIN AND SIGNUP */

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



/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ******************************** */
/*   listening on port 3000         */
/* ******************************** */
app.listen(3000,function(){
  console.log("SERVER HAS STARTED");
});
