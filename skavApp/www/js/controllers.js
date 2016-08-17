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
  vm.myHunts=HuntService.myHunts;
  HuntService.getAllhunts();
}]);

// Task controllers --------------------------------->
app.controller('TaskController', [function(){
  var vm = this;
}]);
