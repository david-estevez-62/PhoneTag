var User = require('../models/users.js');


var userController = {


      locate: function (req, res) {
          var data = req.body;
          var date = new Date();
          var username = req.user.username;


          User.findOne({username:username}, function(err, user) {
            if (err) return handleErr(err);

            find = {
              coordinates: [data.longitude, data.latitude],
              datetime: date
            };

            user.location = find;
            user.save();

          });

  },


  scan: function (req, res) {

    var date = new Date();
    var minusmin = date.setMinutes(date.getMinutes() - 20);


    User.find({ "location.datetime": {$gte: minusmin}}, function (err, user) {

      if (err) return handleErr(err);


      for (var i = 0; i < user.length; i++) {

        //return users other than current user
        if(req.user.username !== user[i].username){


          
          // User.find({ username: user[i].username, $nearSphere: { $geometry: { type: "Point", coordinates: [ req.user.location.coordinates[0], req.user.location.coordinates[1] ]}, "$maxDistance": 300} }, function(err, data) {
          User.find({ username: user[i].username, "location.coordinates": { $nearSphere: { $geometry: { type: "Point", coordinates: [ req.user.location.coordinates[0], req.user.location.coordinates[1] ]}, $maxDistance: 8 } } }, function(err, data){
              if (err) return handleErr(err);

              console.log(data);



          });


        }

          
      }

      res.send(user);

    });

  }
}





module.exports = userController;