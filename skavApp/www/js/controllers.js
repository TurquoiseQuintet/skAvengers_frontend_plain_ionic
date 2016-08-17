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

// Hunt in controllers -------------------------->

app.controller('HuntController', ['HuntService', function(HuntService) {
  var vm = this;
  vm.myHunts=HuntService.myHunts;
  HuntService.getAllhunts();
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
