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

        function checkForExistingGames() {
            $scope.gameExists = ($localStorage.gameStatus) ? true : false;
        }

        $scope.createGridAndRedirect = function() {
            var numberRegex = /^[0-9]*$/;
            if (!numberRegex.test($scope.gridSize.row) || !numberRegex.test($scope.gridSize.column)) {
                $scope.error = 'The value for row and column can only be an integer.';
                return;
            } else if (($scope.gridSize.row * $scope.gridSize.column) % 2 !== 0) {
                $scope.error = 'The product of row and column should be an even integer.';
                return;
            }
            delete $localStorage.click1;
            delete $localStorage.gameStatus;
            $localStorage.gridSize = $scope.gridSize;
            $location.path('/game');
        };

        $scope.redirectToGame = function() {
            $location.path('/game');
        };

        // calling initial functions
        checkForExistingGames();
    });
