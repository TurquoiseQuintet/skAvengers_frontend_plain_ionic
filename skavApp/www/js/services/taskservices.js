'use strict';

//make task service inject http location... whatever else needed

var sv=this;
//this function makes an http request to get all tasks
sv.getAlltasks= function(){
  $http.get('http://skavengers.heroku.com/tasks')
  .then(function(data){

  })
  .catch(function (err){

  });
};

sv.deletetask=function(task){
  $http.delete('http://skavengers.heroku.com/tasks/'+task.id, {
    params:{task:task.id}
  })
  .then(function(data){

  })
  .catch(function(err){

  });
};

sv.gettask=function(task){
  $http.put('http://skavengers.heroku.com/tasks/'+ task.id, {
    params:{task:task.id}
  })
  .then(function(data){

  })
  .catch(function (err){

  });
};

sv.posttask=function(hunt_id, name, xp, level_available, completed, unique, location, expiration_time){
  $http.post('http://skavengers.heroku.com/tasks', {
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
  $http.put('http://skavengers.heroku.com/tasks/'+task.id, {
            id:task.id,
            name: name,
            xp: xp,
            level_available: level_available,
            completed: completed,
            location: location,
            expiration_time: expiration_time
  })
  .then(function(data){

  })
  .catch(function(err){

  });
};
