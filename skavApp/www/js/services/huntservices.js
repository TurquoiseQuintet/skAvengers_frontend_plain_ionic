'use strict';
//make service inject, http, and any other needed tools
var sv=this;

//this service is called for when we make a request to post hunts to start a new hunt
sv.addHunt=function(huntMaster_id, name, expiration){
  //add heroku stuff below
$http.post('https://skavengers.herokuapp.com/hunts',
{
    huntMaster_id: huntMaster_id,
    name: name,
    expiration: expiration
  })
.then(function(data){
  $location.path('/user');
})
.catch(function(err){
sv.message="problems with creating hunt";
});
};

//this is used to get ONE particular hunt
//my logic may be redundant but this is how I did it in the past and when I have done it other ways it didnt
//work
sv.getHunt=function(hunt){
$http.get('https://skavengers.herokuapp.com/hunts/'+ hunt.id,
{
  params:{hunt:hunt.id}
})
.then(function(data){
  sv.hunt=data.data;
})
.catch(function(err){
  //handle yo shit
  sv.message="What a dilemma the hunt could not be found";
});
};

// this is used to get ALL hunts (hence the name)
sv.getAllhunts= function(){
  $http.get('https://skavengers.herokuapp.com/hunts')
  .then(function(data){
    //use the data
    sv.hunts=data.data;
  })
  .then(function(err){
    //handle it
    sv.message="problems in the oceans";
  });
};

sv.deleteHunt= function(hunt){
  $http.delete('https://skavengers.herokuapp.com/hunts/'+ hunt.id, {
    params:{hunt: hunt.id}
  })
  .then(function(data){
    $location.path('/user');
  })
  .catch(function(err){
    sv.message("a problem with the delete. Make sure you own the hunt");
  });
};

sv.editHunt = function(hunt){
  $http.put('https://skavengers.herokuapp.com/hunts/'+hunt.id, {
    params:{hunt: hunt.id}
  })
  .then(function(data){
    $location.path('user');
  })
  .catch(function(err){
    sv.message("Make sure you own the hunt you are trying to edit");
  });
};
