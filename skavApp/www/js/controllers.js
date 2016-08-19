'use strict';
 // sign in controller -------------------------->
app.controller('SignUpController', ['SignUpService', '$state', 'sendMessageService', function(SignUpService, $state, sms){
  var vm=this;
  vm.$state = $state;
  vm.avatar = sms.profilePictureURL;
  vm.signUp= SignUpService.signup;
  vm.takeProfilePicture = sms.takeProfilePicture;
}]);
// Log in controller -------------------------->
app.controller('LogInController',['LogInService', 'sendMessageService','$state',  function(LogInService, sms, $state){
  var vm=this;
  vm.$state = $state;
  vm.login=LogInService.login;
}]);
//log out controller -----------------------------
app.controller('LogoutController', ['LogoutService','$state',  function(LogoutService, $state){
  var vm = this;
  vm.$state = $state;
  vm.logOut = LogoutService.logOut;
}]);
// Hunt in controllers -------------------------->
app.controller('NewHuntController', ['HuntService','UserServices', '$state', '$http', 'UserInfo', function(HuntService, UserServices, $state, $http, UserInfo){
  var vm=this;
  vm.$state=$state;
  vm.getusers = UserServices.users;
  UserServices.getAllUsers();
  vm.create = HuntService.addHunt;
  vm.addUser = HuntService.addUser;
  UserInfo.getInfo();
  vm.currentUserId = UserInfo.userInfo.id;
// (((atob(($window.localStorage.token.split('.'))[1])).split(",")[0]).split(":")[1]).slice(1, -1)

}]);
app.controller('HuntController', ['HuntService','UserServices','$state','$http', function(HuntService, UserServices, $state, $http) {
  var vm = this;
  vm.$state = $state;
  vm.myHunts = HuntService.hunts;
  vm.myMaster = HuntService.master;
  // vm. getAllHunts= function(){
  //   console.log("2");
    // $http.get('https://skavengers.herokuapp.com/hunts')
    // .then(function(data){
    //   vm.hunts=(data.data);
    // })
    // .catch(function(err){
    //   //handle it
    //   vm.message="problems in the oceans";
    // });
  // };
  HuntService.getAllHunts();
  HuntService.masterOf();
  // console.log("infor here " , vm.getAllHunts);
}]);
// Task controllers --------------------------------->
app.controller('AddTaskController', ['$window', '$state', 'TaskService', '$http', '$location', function($window, $state, TaskService, $http, $location, sms){
  var vm = this;
  vm.$state = $state;
  vm.newTask = TaskService.posttask;
  // vm.$state = $state;
  vm.hunt_id=($location.path()).split("/")[2];
  console.log(vm.hunt_id);


  $http.get('https://skavengers.herokuapp.com/hunts/' + vm.hunt_id)
  .then(function(data){
    vm.hunt=data.data;
    console.log(vm.hunt);
    //I need to somehow move this function somwhere that it works
  //   for(var i=0; i<vm.tasks; i++){
  //   if (vm.tasks[i].hunt_id===Number(vm.params)){
  //       console.log("HERE" , vm.tasks[i]);
  //     }
  //   }
  })
  .catch(function (err){
    vm.message(err);
  });
  // vm.newtask=function(TC.name, TC.xp, TC.location)
  // vm.takeAndSubmit = sms.takeAndSubmit;

}]);
app.controller('AlertController', ['$window', '$state', 'AlertService', '$http', '$location', function($window, $state, AlertService, $http, $location){
  var vm = this;
  vm.$state = $state;
  vm.hunt_id = ($location.path()).split("/")[2];
  console.log("it should be ", vm.hunt_id);
}]);

app.controller('TaskController', [ '$window', '$state','HuntService', '$http', '$location', 'sendMessageService', function($window, $state, HuntService, $http, $location, sms){
  var vm = this;
  // vm.$state = $state;
  $http.get('https://skavengers.herokuapp.com/tasks')
  .then(function(data){
    vm.tasks=data.data;
    console.log(vm.tasks);
    vm.params=($location.path()).split("/")[2];
    //I need to somehow move this function somwhere that it works
  //   for(var i=0; i<vm.tasks; i++){
  //   if (vm.tasks[i].hunt_id===Number(vm.params)){
  //       console.log("HERE" , vm.tasks[i]);
  //     }
  //   }
  })
  .catch(function (err){
    vm.message(err);
  });
  // vm.newtask=function(TC.name, TC.xp, TC.location)
  // vm.takeAndSubmit = sms.takeAndSubmit;
}]);
app.controller('HeaderController', ['UserServices','$state','UserInfo', function(UserServices, $state, UserInfo){
  var vm = this;
  vm.$state = $state;
  UserInfo.getInfo();
  vm.username = UserInfo.userInfo.username;
  vm.avatar = UserInfo.userInfo.avatar;
  //the code below takes the user token seperates the user portio and unencrypts it then seperates
  //the values as needed and returns a username and a quoted url for the avatar

}]);
app.controller('FooterController', ['$state', function($state){
  var vm = this;
  vm.$state = $state;
}]);



app.controller('EditHuntController', ['$state', 'HuntService','$location','TaskService','UserServices', function($state, HuntService, $location, TaskService, UserService){
  var vm=this;
  vm.$state=$state;
  vm.EditHunt=HuntService.editHunt;
  // vm.id=$location.path().split("/")[2];
  // vm.currenthunt=HuntService.getHunt;
  vm.hunttoedit=HuntService.hunttoedit;
  vm.tasks=TaskService.users;
  vm.users=UserService.usershunt;
  vm.delete=TaskService.deleteTask;
  vm.deleteUser=UserService.deleteUser;
  TaskService.huntTasks();
  UserService.huntUsers();
  HuntService.getHunt();
}]);

app.controller('SubmitController',['SubmitService', '$state',  '$location', '$http', function(SubmitService, $state, $location, $http){
  var vm=this;
}]);


app.controller('HunterViewController', ['$state', 'hunterViewService', '$location', 'sendMessageService', 'UserInfo', function($state, hvs, $location, sms, UserInfo){
  var vm = this;
  vm.$state = $state;
  vm.tasks = hvs.tasks;
  vm.info = hvs.info;
  vm.takeAndSubmit = sms.takeAndSubmit;
  hvs.hunt_id = ($location.path()).split("/")[2];
  UserInfo.getInfo();
  vm.username = UserInfo.userInfo.username;
  hvs.getTasks();
}]);


app.controller('HuntmasterController', [ '$window', '$state','HuntmasterService', '$http', '$location', function($window, $state, HuntService, $http, $location){
  var vm = this;
  vm.$state = $state;
  vm.params=($location.path()).split("/")[2];
  vm.huntUsers = [];
  vm.getHuntUsers = function(){
    $http.get('https://skavengers.herokuapp.com/hunts/users/' + vm.params)
    .then(function(data) {
      for (var i = 0; i < data.data.length; i++) {
        vm.huntUsers.push(data.data[i]);
      }
      console.log(vm.huntUsers);
    })
    .catch(function(err) {
      console.log(err);
    });
  };
  vm.getHuntUsers();


}]);

app.controller('SubmitController',['SubmitService', '$state',  '$location', '$http', function(SubmitService, $state, $location, $http){
  var vm=this;
  vm.$state = $state;
  vm.hunter=($location.path()).split("/")[2];
  vm.hunt=($location.path()).split("/")[3];
  vm.user = SubmitService.user;
  vm.getTasks = SubmitService.getTasks;
  vm.huntTasks = SubmitService.huntTasks;
  vm.submit = SubmitService.submit;
  SubmitService.getTasks();
}]);
