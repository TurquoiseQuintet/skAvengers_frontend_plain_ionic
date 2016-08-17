'use strict';
 // sign in controller -------------------------->
app.controller('SignUpController', ['SignUpService', function(SignUpService){
  var vm=this;
  vm.signUp= SignUpService.signup;
}]);

// Log in controller -------------------------->
app.controller('LogInController',['LogInService', function(LogInService){
  var vm=this;
  vm.login=LogInService.login;
}]);
//log out controller -----------------------------
app.controller('LogoutController', ['LogoutService', function(LogoutService){
  var vm = this;
  vm.logOut = LogoutService.logOut;
}]);

// Hunt in controllers -------------------------->

app.controller('HuntController', ['HuntService', function(HuntService) {
  var vm = this;
  vm.myHunts = HuntService.hunts;
  vm.master = HuntService.master;
  HuntService.getAllHunts();
  HuntService.masterOf();
  console.log(vm.myHunts);
}]);

// Task controllers --------------------------------->
app.controller('TaskController', [ '$window', function($window){
  var vm = this;
  vm.user=($window.localStorage.token.split('.'))[1];
  // vm.user=vm.user;
  vm.userinfo=atob(vm.user);
  vm.userinfo1=(vm.userinfo).split(",")[0];
  vm.name=vm.userinfo1.split(":")[1];
  console.log(vm.name[1]);
  // console.log(vm.userinfo);
}]);
