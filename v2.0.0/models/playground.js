var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/anikets_campground",{ useNewUrlParser: true });
let databaseSchema = new mongoose.Schema({
  name  : String,
  image : String,
  description : String
});

let databaseModel = mongoose.model("playground",databaseSchema);

module.exports = databaseModel;
