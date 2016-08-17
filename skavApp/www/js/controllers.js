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
app.controller('HuntController', [function(){
  var vm = this;
}]);



// Task controllers --------------------------------->
app.controller('TaskController', [function(){
  var vm = this;
}]);
