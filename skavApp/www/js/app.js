'use strict';

var app = angular.module('skavApp', ['ionic']);
app.config(function($stateProvider, $locationProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: '/templates/landing.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/templates/login.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/templates/register.html'
  })
  .state('huntmaster-view',{
    url: '/admin',
    templateUrl: '/templates/huntmaster-view.html'
  })
  .state('hunter-view', {
    url: '/user',
    templateUrl: '/templates/hunter-view.html'
  })
  .state('new-task', {
    url: '/new-task',
    templateUrl: "/templates/new-task.html"
  })
  .state('user', {
    url: '/user',
    templateUrl: "/templates/user.html"
  })
  .state('new-hunt', {
    url: '/new-hunt',
    templateUrl: "/templates/new-hunt.html"
  })
  .state('edit-task', {
    url: '/edit-task',
    templateUrl: "/templates/edit-task.html"
  });
  // $locationProvider.html5Mode(true);
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
    }
    // if (window.StatusBar) {
    //     // org.apache.cordova.statusbar required
    //     StatusBar.styleDefault();
    // }
  });
});
