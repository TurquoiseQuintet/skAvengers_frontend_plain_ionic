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

app.controller('HuntController', ['HuntService','$state','$http', function(HuntService, $state, $http) {
  var vm = this;
  vm.$state = $state;
  vm.myHunts = HuntService.hunts;
  vm.master = HuntService.master;
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
