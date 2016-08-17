'use strict';

//make userService inject $http and $window and any other needed things
var sv=this;

sv.deleteUser=function(user){
  $http.delete('https://skavengers.herokuapp.com/users/'+user.id)
  .then(function(data){

  })
  .catch(function(err){

  });
};

sv.editUser=function(user){
  $http.put('https://skavengers.herokuapp.com/users/'+user.id)
  .then(function(data){

  })
  .catch(function(err){

  });
};

sv.getAllUsers=function(){
  http.get('https://skavengers.herokuapp.com/users')
  .then(function(data){

  })
  .catch(function(err){

  });
};

sv.getUser=function(user){
  http.get('https://skavengers.herokuapp.com/user/'+user.id)
  .then(function(data){

  })
  .catch(function(err){

  });
};
