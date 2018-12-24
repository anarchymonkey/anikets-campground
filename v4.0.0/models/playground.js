var mongoose = require('mongoose');
let databaseSchema = new mongoose.Schema({
  name  : String,
  image : String,
  description : String,
  comments : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});
module.exports =  mongoose.model("playground",databaseSchema);
