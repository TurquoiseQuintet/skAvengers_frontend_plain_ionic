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
