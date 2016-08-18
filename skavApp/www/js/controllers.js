'use strict';
 // sign in controller -------------------------->
app.controller('SignUpController', ['SignUpService', '$state', function(SignUpService, $state){
  var vm=this;
  vm.$state = $state;
  vm.signUp= SignUpService.signup;
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

app.controller('NewHuntController', ['UserServices', '$state', '$http', function(UserServices, $state, $http){
  var vm=this;
  vm.$state=$state;
  vm.getusers = UserServices.users;
  UserServices.getAllUsers();
}]);

app.controller('HuntController', ['HuntService','UserServices','$state','$http', function(HuntService, UserServices, $state, $http) {
  var vm = this;
  console.log("HuntController load");
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


app.controller('TaskController', [ '$window', '$state','HuntService', '$http', '$location', function($window, $state, HuntService, $http, $location){
  var vm = this;
  vm.$state = $state;
  vm.params=($location.path()).split("/")[2];
  vm.huntUser = [];
  $http.get('https://skavengers.herokuapp.com/hunts/users/' + vm.params)
  .then(function(data) {
    for (var i = 0; i < data.data.length; i++) {
      vm.huntUser.push(data.data[i]);
    }
    console.log(vm.huntUser);
  })
  .catch(function(err) {
    console.log(err);
  });

}]);

app.controller('AddTaskController', ['$window', '$state', 'TaskService', '$http', '$location', function($window, $state, TaskService, $http, $location, sms){
  var vm = this;
  vm.$state = $state;
  vm.newTask = TaskService.posttask;
  // vm.$state = $state;
  vm.hunt_id=($location.path()).split("/")[2];

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


app.controller('HeaderController', ['UserServices','$state', '$window', function(UserServices, $state, $window){
  var vm = this;
  vm.$state = $state;

  //the code below takes the user token seperates the user portio and unencrypts it then seperates
  //the values as needed and returns a username and a quoted url for the avatar
  vm.username=(((atob(($window.localStorage.token.split('.'))[1])).split(",")[0]).split(":")[1]).slice(1, -1);
  vm.avatar=((atob(($window.localStorage.token.split('.'))[1])).split(",")[3].split(":"))[1]+((atob(($window.localStorage.token.split('.'))[1])).split(",")[3].split(":"))[2];

}]);

app.controller('FooterController', ['$state', function($state){
  var vm = this;
  vm.$state = $state;
}]);

app.controller('EditHuntController', ['$state', 'HuntService','$location', function($state, HuntService, $location){
  console.log("ehc loaded");
  var vm=this;
  vm.$state=$state;
  vm.EditHunt=HuntService.edit;
  vm.id=$location.path().split("/")[2];
  console.log(vm.id);
}]);

app.controller('SubmitController',['SubmitService', '$state',  function(SubmitService, $state){
  var vm=this;
  vm.$state = $state;
  
}]);
