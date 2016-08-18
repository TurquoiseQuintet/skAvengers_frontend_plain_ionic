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

app.controller('HuntController', ['HuntService','$state', function(HuntService, $state) {
  var vm = this;
  vm.$state = $state;
  vm.myHunts = HuntService.hunts;
  vm.master = HuntService.master;

  HuntService.getAllHunts();
  HuntService.masterOf();
  console.log(vm.myHunts);
}]);

// Task controllers --------------------------------->

app.controller('TaskController', [ '$window', '$state', function($window, $state, sms){
  var vm = this;
  vm.$state = $state;
  vm.takeAndSubmit = sms.takeAndSubmit;
  vm.user=($window.localStorage.token.split('.'))[1];
  // vm.user=vm.user;
  vm.userinfo=atob(vm.user);
  vm.userinfo1=(vm.userinfo).split(",")[0];
  vm.name=vm.userinfo1.split(":")[1];
  console.log(vm.name[1]);
  // console.log(vm.userinfo);
}]);

app.controller('HeaderController', ['UserServices','$state', function(UserServices, $state){
  var vm = this;
  vm.$state = $state;
  vm.user = UserServices.loggedInUser;
  vm.username = vm.user.name;
  vm.avatar = vm.user.avater;
}]);

app.controller('FooterController', ['$state', function($state){
  var vm = this;
  vm.$state = $state;
}]);
