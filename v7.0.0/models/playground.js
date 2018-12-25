var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/anikets_campground",{ useNewUrlParser: true });
let databaseSchema = new mongoose.Schema({
  name  : String,
  image : String,
  description : String,
  author :{
    id:{      type : mongoose.Schema.Types.ObjectId,
              ref :  "authentication"
      } ,
      username : String
  },
  comments : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});
module.exports =  mongoose.model("playground",databaseSchema);
