'use strict';

// The root application module for this app
var app = angular.module('landing', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('home', {
      url: "/"
    })
    .state('thanks', {
      url: "/thanks"
    });
});
app.controller('appController', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {
  $scope.$state = $state;

  // Smooth scrolling
  $(document).ready(function() {
    $('a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      var target = this.hash;
      $('html, body').stop().animate({
        'scrollTop':  $(target).offset().top - 80
      }, 900, 'swing', function () {
        window.location.hash = target;
      });
    });
  });

  $scope.toggleNav = function() {
    $('nav ul').toggleClass('open');
  }

  $scope.onSignUp = function() {
    if(signUpForm.$valid) {
      $scope.$state.href('/thanks');
    }
  }
}]);
