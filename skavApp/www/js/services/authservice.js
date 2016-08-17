'use strict';

app.service('SignUpService', ['$http', '$window', function($http, $window){
  var sv=this;
sv.signup= function(username, password, email, avatar){
<<<<<<< HEAD
  $http.post('http://skavengers.heroku.com/register', {username:username, password:password, email:email, avatar:avatar})
=======
  $http.post('http://skavenger.heroku.com/register', {username:username, password:password, email:email, avatar:avatar})
>>>>>>> f3e73a172a21a36709799beac068b4c6f5d63229
  .then(function(response){
    console.log(response);
    //path to login or does signup log you in and path to user home?
    $window.path('/user');
  })
  .catch(function(err){
    console.log(err);
    //need to add section for thorough error handling
  });
};
}]);

app.service("LogInService", ['$http', '$window','$location', function($http, $window, $location){
  var sv=this;
  sv.login= function(username, password){
    $http.post('http://skavengers.heroku.com/login', {username:username, password:password})
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
      sv.message="trouble logging in";
    });
  };
}]);
