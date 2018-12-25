var mongoose = require('mongoose');
var playground = require('./models/playground');
var comments  = require ("./models/comments");

var data = [{name : "Kashmir" , image: "https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500 " , description :  "Soak your memories in a warm cup of Kahwah Tea, while indulging in the varied landscapes of Kashmir. Take in the crisp misty air, while gorging on warm Kashmiri pulao and home-made Rista. Feel your heart synchronize with the gushing waters that travel from the glaciers above. Dust the snow off your shoulders after a long trek up a hill and watch the sun-kissed, snow-capped mountains. A valley between the Great Himalayan range and the Pir Panjal mountain range, Kashmir is a place of beautiful simplicity and pristine natural beauty. Kashmir is painted with a unique culture that keeps you intrigued throughout your journey, from Srinagar to Sonamarg and Gulmarg till Pahalgam."}];

var removeData = () =>{
  playground.remove({},function(err){

  
  if(err)
  {
    console.log("SYSTEM ERROR",err);
  }

    console.log("ALL PLAYGROUNDS removed");

            data.forEach( (seed) => {

                playground.create(seed,(err,play) => {

                      if(err){
                        console.log(err);
                      }
                      else
                      {
                              console.log("created data");
                                comments.create( {author : "Kashmir" , typed : "A very beautiful place indeed"} , (err,comment) => {
                                  if(err)
                                  {
                                    console.log(err);
                                  }
                                  else {
                                    play.comments.push(comment);
                                    play.save();
                                    console.log('commentsss added');
                                  }
                                });
                        }

                });
            });


  });
}


module.exports = removeData;
