'use strict';

//make controller, inject taskService and any other needed things
var vm=this;

// this calls a service that makes an http request to /tasks in order to get all tasks
vm.getAlltasks=taskService.getAlltasks;

//this calls a service that makes an http request to /tasks/:id in order to
//delete a specific task
vm.deletetask=taskServices.deletetask;

//this calls a service that makes an http request to /tasks/:id to get a
//specific task
vm.gettask=taskServices.gettask;

//calls service that makes http post to /tasks to add a new task
vm.posttask=taskServices.posttask;

//this calls a service that makes an http request to /tasks/:id to
//edit a specific id
vm.edittask=taskServices.edittask;
