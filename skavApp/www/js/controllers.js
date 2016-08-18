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
  vm.takeAndSubmit = sms.takeAndSubmit;
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
  HuntService.getAllHunts();
  vm.myHunts = [{
  expiration: "2016-01-01T08:30:00.000Z",
  huntMaster_id: 1,
  id: 1,
  name: "Swimming Pool",
  xp_to_level_up: 100}];
}]);

// Task controllers --------------------------------->
app.controller('TaskController', ['sendMessageService','$state',  function(sms, $state){
  var vm = this;
  vm.$state = $state;
  vm.takeAndSubmit = sms.takeAndSubmit;
}]);
