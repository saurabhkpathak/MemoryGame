'use strict';

/**
 * @ngdoc function
 * @name urbanClapMemoryGameApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the urbanClapMemoryGameApp
 */
angular.module('urbanClapMemoryGameApp')
    .controller('GameCtrl', function($localStorage, $scope) {

        function Grid(value, status, visibleValue) {
            this.value = value;
            this.visibleValue = visibleValue;
            this.status = status; //locked, visible, unlocked
        }

        // functioan that shuffles an array
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
            $scope.gridSize = $localStorage.gridSize;
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
        };

        $scope.createArray = function(n) {
            return new Array(n);
        };

        $scope.showGridValue = function(row, column) {
            if ($scope.gameStatus[row][column].status !== 'locked') {
                return;
            }
            $scope.gameStatus[row][column].status = 'visible';
            $scope.gameStatus[row][column].visibleValue = $scope.gameStatus[row][column].value;
            console.log($scope.gameStatus);
        };

        // calling initial functions
        createGrid();
        $scope.click1 = null;
        $scope.click2 = null;
    });
