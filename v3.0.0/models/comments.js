var mongoose  = require('mongoose');
mongoose.connect("mongodb://localhost/anikets_campground",{ useNewUrlParser: true });
var commentSchema = new mongoose.Schema({
    author : String,
    typed : String
  }
);


module.exports = mongoose.model("Comment",commentSchema);
