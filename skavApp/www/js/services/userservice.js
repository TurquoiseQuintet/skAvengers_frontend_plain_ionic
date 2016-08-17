'use strict';

//make userService inject $http and $window and any other needed things
var sv=this;

sv.deleteUser=function(user){
  $http.delete('http://   /users/'+user.id)
  .then(function(data){

  })
  .catch(function(err){

  });
};

sv.editUser=function(user){
  $http.put('http://   /users/'+user.id)
  .then(function(data){

  })
  .catch(function(err){

  });
};

sv.getAllUsers=function(){
  http.get('http://   /users')
  .then(function(data){

  })
  .catch(function(err){

  });
};

sv.getUser=function(user){
  http.get('http:// /user/'+user.id)
  .then(function(data){

  })
  .catch(function(err){

  });
};
