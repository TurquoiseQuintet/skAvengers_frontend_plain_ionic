'use strict';

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
