var mongoose  = require('mongoose');
var commentSchema = new mongoose.Schema({
  typed : String,
  author : {
      id : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "authentication"
          },
          username : String
          }
            });
module.exports = mongoose.model("Comment",commentSchema);
