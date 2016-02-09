'use strict';

/**
 * @ngdoc function
 * @name urbanClapMemoryGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the urbanClapMemoryGameApp
 */
angular.module('urbanClapMemoryGameApp')
    .controller('MainCtrl', function($scope, $location, $localStorage) {
        $scope.createGridAndRedirect = function() {
            if (($scope.gridSize.row * $scope.gridSize.column) % 2 !== 0) {
                return;
            }
            delete $localStorage.click1;
            delete $localStorage.gameStatus;
            $localStorage.gridSize = $scope.gridSize;
            $location.path('/game');
        };
    });
