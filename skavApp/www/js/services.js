'use strict';
// sign up service ---------------------------->
app.service('SignUpService', ['$http', '$window', function($http, $window){
  var sv=this;
sv.signup= function(username, password, email, avatar){
  $http.post('https://skavengers.herokuapp.com/register', {username:username, password:password, email:email, avatar:avatar})
  .then(function(response){
    console.log(response);
    //path to login or does signup log you in and path to user home?
    $location.path('/user');
  })
  .catch(function(err){
    console.log(err);
    //need to add section for thorough error handling
  });
};
}]);
// log in service --------------------------------->
app.service("LogInService", ['$http', '$window','$location', function($http, $window, $location){
  var sv=this;
  sv.login= function(username, password){
    $http.post('https://skavengers.herokuapp.com/login', {
      username:username,
      password:password
    })
    .then(function(response){
      console.log(response);
      //localstorage
      $window.sessionStorage.token=response.data.token;
      // path somewhere...to their page with their hunts?
      $location.path('/user');
    })
    .catch(function(err){
			console.log(err.message);
      delete $window.sessionStorage.token;
      //handle error
    });
  };
}]);

// hunt services -------------------------------------->
app.service("HuntService", ['$http', '$window', '$location', function($http, $window, $location) {
  var sv=this;
  sv.getAllhunts= function(){
    $http.get('https://skavengers.herokuapp.com/hunts/all')
    .then(function(data){
      sv.myHunts = data;
      return $http.get('https://skavengers.herokuapp.com/hunts/mine');
    })
    .then(function(data) {
      sv.Master = data;
      //now what?
    })
    .then(function(err){
      //handle it
      sv.message="problems in the oceans";
    });
  };

}])



// task controller --------------------------->



// user services -------------------------------->

//picture services ------------------------------->
'use strict';
app.service('sendMessage', ['$cordovaCamera', '$http', '$cordovaSms', function($cordovaCamera, $http, $cordovaSms){
  var sv = this;
  //this method will open the camera app. after a photo is taken the user will crop it into a square. It returns a promise with the data being the base64 encoded image
  sv.takePicture = function(){

    var options = {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 500
    };
     return $cordovaCamera.getPicture(options)
     .then(function(data){
       return 'data:image/jpeg;base64,' + data;
     });
  };
  //this method uploads the image passed into it as base64 and returns a promise where the data is an object of information about the image. the url can be accessed at data.data.secure_url
  sv.uploadPicture = function(imageInfo){
    return $http.post('https://api.cloudinary.com/v1_1/dppfalbij/auto/upload', {
        file: imageInfo,
        upload_preset: 'addub85x'
      });
  };

//this method sends a text to the given number with a message, and the imageURL passed in.
  sv.sendPicture = function(number, message){
    var options = {
          replaceLineBreaks: true, // true to replace \n by a new line, false by default
          android: {
            intent: ''
          }
        };
         return $cordovaSms.send(number, message, options)
  }
}]);
