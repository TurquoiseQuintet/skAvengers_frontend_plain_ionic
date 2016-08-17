'use strict';

//make userService inject $http and $window and any other needed things
var sv=this;

sv.deleteUser=function(user){
  $http.delete('http://skavengers.heroku.com/users/'+user.id)
  .then(function(data){

  })
  .catch(function(err){

  });
};

sv.editUser=function(user){
  $http.put('http://skavengers.heroku.com/users/'+user.id)
  .then(function(data){

  })
  .catch(function(err){

  });
};

sv.getAllUsers=function(){
  http.get('http://skavengers.heroku.com/users')
  .then(function(data){

  })
  .catch(function(err){

  });
};

sv.getUser=function(user){
  http.get('http://skavengers.heroku.com/user/'+user.id)
  .then(function(data){

  })
  .catch(function(err){

  });
};
