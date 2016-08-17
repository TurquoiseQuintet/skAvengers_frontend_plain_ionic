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
  HuntService.getAllHunts();
  vm.myHunts = [{
  expiration: "2016-01-01T08:30:00.000Z",
  huntMaster_id: 1,
  id: 1,
  name: "Swimming Pool",
  xp_to_level_up: 100}];
}]);

// Task controllers --------------------------------->
app.controller('TaskController', [function(){
  var vm = this;
}]);
