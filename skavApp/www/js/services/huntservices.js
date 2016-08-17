'use strict';
//make service inject, http, and any other needed tools
var sv=this;

//this service is called for when we make a request to post hunts to start a new hunt
sv.addHunt=function(huntMaster_id, name, expiration){
  //add heroku stuff below
$http.post('http://    /hunts',
{
    huntMaster_id: huntMaster_id,
    name: name,
    expiration: expiration
  })
.then(function(data){
//do somethign here
})
.catch(function(err){
//error handler here
});
};

//this is used to get ONE particular hunt
//my logic may be redundant but this is how I did it in the past and when I have done it other ways it didnt
//work
sv.getHunt=function(hunt){
$http.get('http://   /hunts/'+ hunt.id,
{
  params:{hunt:hunt.id}
})
.then(function(data){
  //do something here
})
.catch(function(err){
  //handle yo shit
});
};

// this is used to get ALL hunts (hence the name)
sv.getAllhunts= function(){
  $http.get('http://   /hunts')
  .then(function(data){
    //use the data
  })
  .then(function(err){
    //handle it
  });
};

sv.deleteHunt= function(hunt){
  $http.delete('http://   /hunts/'+ hunt.id, {
    params:{hunt: hunt.id}
  })
  .then(function(data){

  })
  .catch(function(err){

  });
};

sv.editHunt = function(hunt){
  $http.put('http://  /hunts/'+hunt.id, {
    params:{hunt: hunt.id}
  })
  .then(function(data){

  })
  .catch(function(err){

  });
};
