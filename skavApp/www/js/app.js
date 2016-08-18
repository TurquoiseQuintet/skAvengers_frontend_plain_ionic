'use strict';


var app = angular.module('skavApp', ['ionic', 'ngCordova']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: './templates/landing.html',
    controller: 'LogInController',
    controllerAs: 'LIC'
  })
  .state('login', {
    url: '/login',
    templateUrl: './templates/login.html',
    controller: 'LogInController',
    controllerAs: 'LIC'
  })
  .state('register', {
    url: '/register',
    templateUrl: './templates/register.html',
    controller: 'SignUpController',
    controllerAs: 'SUC'
  })
  .state('huntmaster-view',{
    url: '/huntmaster-view',
    templateUrl: './templates/huntmaster-view.html',
    controller: 'TaskController',
    controllerAs: 'TC'
  })
  .state('hunter-view', {
    url: '/hunter-view',
    templateUrl: './templates/hunter-view.html',
    controller: 'TaskController',
    controllerAs: 'TC'
  })
  .state('new-task', {
    url: '/new-task',
    templateUrl: './templates/new-task.html',
    controller: 'TaskController',
    controllerAs: 'TC'
  })
  .state('user', {
    url: '/user',
    templateUrl: './templates/user.html',
    controller: 'HuntController',
    controllerAs: 'HC'
  })
  .state('new-hunt', {
    url: '/new-hunt',
    templateUrl: './templates/new-hunt.html',
    controller: 'NewHuntController',
    controllerAs: 'NHC'
  })
  .state('tasks', {
    url: '/tasks/:id',
    templateUrl: './templates/tasks.html',
    controller: 'TaskController',
    controllerAs: 'TC'
  })
  .state('edit-task', {
    url: '/edit-task',
    templateUrl: './templates/edit-task.html',
    controller: 'TaskController',
    controllerAs: 'TC'
  })
  .state('edit-hunt', {
    url:'/edit-hunt',
    templateUrl: './templates/edit-hunt.html',
    controller: 'HuntController',
    controllerAs: 'HC'
  });
  $urlRouterProvider.otherwise('/');
});

app.config(['$httpProvider', function($httpProvider){
  $httpProvider.interceptors.push('authInterceptor');
}]);
