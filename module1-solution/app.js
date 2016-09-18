(function() {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    
    function LunchCheckController($scope) {
        $scope.lunchItens = '';
        $scope.message = '';
        $scope.messageClass = '';
        $scope.textBoxClass = '';
        
        $scope.checkIfToMuch = function () {
            if (!$scope.lunchItens) {
                $scope.messageClass = 'error-message';
                $scope.textBoxClass = 'error-text-box';
                $scope.message = 'Please enter data first';
            }
            else {
                $scope.messageClass = 'ok-message';
                $scope.textBoxClass = 'ok-text-box';
                var itens = $scope.lunchItens.split(',');

                if (countNonEmptyItens(itens) > 3)
                    $scope.message = 'Too much!';
                else
                    $scope.message = 'Enjoy!';                
            }
        };

        function countNonEmptyItens(array) {
            var count = 0;

            for (var i = 0; i < array.length; i++) {
                if (array[i])
                    count++;
            }

            return count;
        }
    }
})();