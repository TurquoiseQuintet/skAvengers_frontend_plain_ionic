'use strict';

//make userService inject $http and $window and any other needed things
var sv=this;

sv.deleteUser=function(user){
  $http.delete('https://skavengers.herokuapp.com/users/'+user.id)
  .then(function(data){
    sv.result="that user is trashed";
  })
  .catch(function(err){
    sv.message="That user will remain. Make ure you have permissions to delete them";
  });
};

sv.editUser=function(user){
  $http.put('https://skavengers.herokuapp.com/users/'+user.id)
  .then(function(data){
    $window.path('/user');
  })
  .catch(function(err){
    sv.message="You don't have permission to edit that user";
  });
};

sv.getAllUsers=function(){
  http.get('https://skavengers.herokuapp.com/users')
  .then(function(data){
    sv.users=data.data;
  })
  .catch(function(err){
    sv.message="problems getting users";
  });
};

sv.getUser=function(user){
  http.get('https://skavengers.herokuapp.com/user/'+user.id)
  .then(function(data){

  })
  .catch(function(err){

  });
};
