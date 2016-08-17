'use strict';

app.service('SignUpService', ['$http', function($http){
  var sv=this;
sv.signup= function(username, password, email, avatar){
  $http.post('http://skavenger.heroku.com/', {username:username, password:password, email:email, avatar:avatar})
  .then(function(response){
    console.log(response);
  })
  .catch(function(err){
    console.log(err);
    //need to add section for thorough error handling
  });
};
}]);

app.service("LogInService", ['$http', '$window','$location', function($http, $window, $location){
  var sv=this;
  sv.login= function(user, password){
    $http.get('http://skavenger.heroku.com/')
    .then(function(response){
      console.log(response);
      //localstorage
      $window.sessionStorage.token=response.data.token;
      $location.path('/home');
    })
    .catch(function(err){
			console.log(err.message);
      delete $window.sessionStorage.token;
      //handle error
    });
  };
}]);
