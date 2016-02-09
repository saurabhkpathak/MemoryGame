'use strict';

/**
 * @ngdoc function
 * @name urbanClapMemoryGameApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the urbanClapMemoryGameApp
 */
angular.module('urbanClapMemoryGameApp')
    .controller('GameCtrl', function($localStorage, $scope, $timeout, $location) {

        function Grid(value, status, visibleValue) {
            this.value = value;
            this.visibleValue = visibleValue;
            this.status = status; //locked, visible, unlocked
        }

        // function that shuffles an array
        function shuffle(oldArray) {
            var array = oldArray;
            var currentIndex = array.length,
                temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        // function for creating the grid
        var createGrid = function() {
            $scope.gameEnd = false;
            $scope.gridSize = $localStorage.gridSize;
            $scope.click1 = $localStorage.click1 ? $localStorage.click1 : null;
            if ($localStorage.gameStatus) {
                $scope.gameStatus = $localStorage.gameStatus;
            } else {
                var start = 1,
                    gridValues = [],
                    gridCount = ($scope.gridSize.row * $scope.gridSize.column) / 2;
                while (start <= gridCount) {
                    gridValues.push(start);
                    start++;
                }
                gridValues = gridValues.concat(gridValues);
                $scope.gridValues = shuffle(gridValues);
                populateGrid();
            }
        };

        var populateGrid = function() {
            $scope.gameStatus = [];
            var counter = 0;
            for (var i = 0; i < $scope.gridSize.column; i++) {
                for (var j = 0; j < $scope.gridSize.row; j++) {
                    if (j === 0) {
                        $scope.gameStatus[i] = [];
                    }
                    $scope.gameStatus[i][j] = new Grid($scope.gridValues[counter], 'locked', null);
                    counter++;
                }
            }
            $localStorage.gameStatus = $scope.gameStatus;
        };

        $scope.createArray = function(n) {
            return new Array(n);
        };

        $scope.redirectToMain = function() {
            delete $localStorage.click1;
            delete $localStorage.gameStatus;
            delete $localStorage.gridSize;
            $location.path('/');
        };

        $scope.showGridValue = function(row, column) {
            if ($scope.gameStatus[row][column].status !== 'locked') {
                return;
            }
            $scope.gameStatus[row][column].status = 'visible';
            $scope.gameStatus[row][column].visibleValue = $scope.gameStatus[row][column].value;
            if (JSON.stringify($scope.gameStatus).indexOf('"locked"') < 0) {
                $scope.gameEnd = true;
                $scope.message = 'Game Ended';
                return;
            }

            // comparison functionality
            if ($scope.click1) {
                if ($scope.gameStatus[row][column].value === $scope.click1.value) {
                    $scope.gameStatus[$scope.click1.row][$scope.click1.column].status = 'unlocked';
                    $scope.gameStatus[row][column].status = 'unlocked';
                    $scope.click1 = null;

                    // update local storage
                    $localStorage.gameStatus = $scope.gameStatus;
                    $localStorage.click1 = $scope.click1;
                } else {
                    $timeout(function() {
                        $scope.gameStatus[$scope.click1.row][$scope.click1.column].status = 'locked';
                        $scope.gameStatus[row][column].status = 'locked';
                        $scope.gameStatus[$scope.click1.row][$scope.click1.column].visibleValue = null;
                        $scope.gameStatus[row][column].visibleValue = null;
                        $scope.click1 = null;
                        $localStorage.click1 = $scope.click1;
                        $localStorage.gameStatus = $scope.gameStatus;
                    }, 500);
                }
            } else {
                $scope.click1 = {
                    value: $scope.gameStatus[row][column].value,
                    row: row,
                    column: column
                };
                $localStorage.click1 = $scope.click1;
            }
        };

        // calling initial functions
        createGrid();
        if (JSON.stringify($scope.gameStatus).indexOf('"locked"') < 0) {
            $scope.gameEnd = true;
            $scope.message = 'Game Ended';
            return;
        }
    });
