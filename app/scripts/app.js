'use strict';

/**
 * @ngdoc overview
 * @name urbanClapMemoryGameApp
 * @description
 * # urbanClapMemoryGameApp
 *
 * Main module of the application.
 */
angular
  .module('urbanClapMemoryGameApp', [
    'ngStorage',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl',
        controllerAs: 'game'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
