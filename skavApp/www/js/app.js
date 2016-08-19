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
    url: '/huntmaster-view/:hunt_id',
    templateUrl: './templates/huntmaster-view.html',
    controller: 'HuntmasterController',
    controllerAs: 'TC'
  })
  .state('hunter-view', {
    url: '/hunter-view/:hunt_id',
    templateUrl: './templates/hunter-view.html',
    controller: 'HunterViewController',
    controllerAs: 'HVC'
  })
  .state('new-task', {
    url: '/new-task/:hunt_id',
    templateUrl: './templates/new-task.html',
    controller: 'AddTaskController',
    controllerAs: 'ATC'
  })
  .state('alert', {
    url: '/alert/:hunt_id',
    templateUrl: './templates/alert.html',
    controller: 'AlertController',
    controllerAs: 'AC'
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
  .state('review-hunter', {
    url: '/review-hunter/:hunter_id/:hunt_id/:xp',
    templateUrl: './templates/review-hunter.html',
    controller: 'SubmitController',
    controllerAs: 'SC'
  })
  .state('edit-hunt', {
    url:'/edit-hunt/:hunt_id',
    templateUrl: './templates/edit-hunt.html',
    controller: 'EditHuntController',
    controllerAs: 'EHC'
  });
  $urlRouterProvider.otherwise('/');
});

app.config(['$httpProvider', function($httpProvider){
  $httpProvider.interceptors.push('authInterceptor');
}]);
