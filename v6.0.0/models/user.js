let mongoose = require('mongoose'),
    passportMongoose = require('passport-local-mongoose')
    let LoginSchema = new mongoose.Schema({
      username : String,
      password : String,
      email : String
    });

    LoginSchema.plugin(passportMongoose);
    let LoginModel = mongoose.model('authentication', LoginSchema);


    module.exports = LoginModel;
