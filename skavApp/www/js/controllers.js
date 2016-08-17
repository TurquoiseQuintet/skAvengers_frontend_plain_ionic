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
}]);

// Task controllers --------------------------------->
app.controller('TaskController', [function(){
  var vm = this;
}]);
