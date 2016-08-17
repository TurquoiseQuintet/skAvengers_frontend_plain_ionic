'use strict';
// sign up service ---------------------------->
app.service('SignUpService', ['$http', '$window', function($http, $window){
  var sv=this;
sv.signup= function(username, password, email, avatar){
  $http.post('https://skavengers.herokuapp.com/register', {username:username, password:password, email:email, avatar:avatar})
  .then(function(response){
    console.log(response);
    //path to login or does signup log you in and path to user home?
    $window.path('/users/:id');
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
      $window.localStorage.token=response.data.token;
      // path somewhere...to their page with their hunts?
      $location.path('/');
    })
    .catch(function(err){
			console.log(err.message);
      delete $window.sessionStorage.token;
      //handle error
    });
  };
}]);

// hunt services -------------------------------------->



// task controller --------------------------->



// user services -------------------------------->
