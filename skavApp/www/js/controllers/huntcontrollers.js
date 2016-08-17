'use strict';

//make controller, inject huntService and any other needed things
var vm=this;

//this is used to call a service which makes an http post request to /hunts in order to
// add a new hunt
vm.addHunt=huntService.addHunt

//this is used to call a service which makes an http get request to /hunts/:id in order to
//get a specific hunt
vm.getHunt=huntService.getHunt;

// this is used to call a service which makes an http get request to /hunts in order to
//get all hunts
vm.getAllhunts=huntService.getAllhunts;

// this is used to call a service which makes an http request to /hunts/:id in order to
//delete a specific hunt
vm.deleteHunt=huntService.deleteHunt;
