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
      User   =                          require('./models/user.js'),
      methodOverride =                  require('method-override');

      var playgroundRoutes = require('./routes/playgrounds.js'),
          commentRoutes    = require('./routes/comments.js'),
          authRoutes       = require('./routes/auth.js');


const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
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
app.use(methodOverride("_method"));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); //
/* ================================================================================= */
//seeding the database : clearing and reentering data
//seeds();
app.use((req,res,next) =>{
  res.locals.currUser = req.user;
  next();
});
app.use(playgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);
/*   listening on port 3000         */
/* ******************************** */
app.listen(3000,function(){
  console.log("SERVER HAS STARTED");
});
