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
            $localStorage.gridSize = $scope.gridSize;
            $location.path('/game');
        };
    });
