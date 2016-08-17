'use strict';

//make task service inject http location... whatever else needed

var sv=this;
//this function makes an http request to get all tasks
sv.getAlltasks= function(){
  $http.get('https://skavengers.herokuapp.com/tasks')
  .then(function(data){
    sv.tasks=data.data;
  })
  .catch(function (err){
    sv.message(err);
  });
};

sv.deletetask=function(task){
  $http.delete('https://skavengers.herokuapp.com/tasks/'+task.id, {
    params:{task:task.id}
  })
  .then(function(data){
    sv.result("deleted");
  })
  .catch(function(err){
    sv.message("make sure you own the hunt to delete the task");
  });
};

sv.gettask=function(task){
  $http.put('https://skavengers.herokuapp.com/tasks/'+ task.id, {
    params:{task:task.id}
  })
  .then(function(data){
    sv.task=data.data;

  })
  .catch(function (err){
    sv. message="troubling waters";
  });
};

sv.posttask=function(hunt_id, name, xp, level_available, completed, unique, location, expiration_time){
  $http.post('https://skavengers.herokuapp.com/tasks', {
    hunt_id: hunt_id,
        name: name,
        xp: xp,
        level_available: xp,
        completed: completed,
        unique: unique,
        location: location,
        expiration_time: expiration_time

  })
  .then(function(data){


  })
  .catch(function(err){

  });
};


sv.edittask=function(name, xp, level_available, completed, location, expiration_time, task){
  $http.put('https://skavengers.herokuapp.com/tasks/'+task.id, {
            id:task.id,
            name: name,
            xp: xp,
            level_available: level_available,
            completed: completed,
            location: location,
            expiration_time: expiration_time
  })
  .then(function(data){
    //where do I want this to go?
    // $window.path('/')
  })
  .catch(function(err){
    sv.message="you do not have permission to edit that";
  });
};
