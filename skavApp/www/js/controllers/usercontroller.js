'use strict';

// make controller inject the userService
var vm=this;

vm.deleteUser=userService.deleteUser;

vm.editUser=userService.editUser;

vm.getAllUsers=userService.getAllUsers;

vm.getUser=userService.getUser;
