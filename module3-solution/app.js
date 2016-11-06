(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowItCtrl = this;

        narrowItCtrl.searchTerm = null;
        narrowItCtrl.items = null

        narrowItCtrl.narrowItDown = function () {
            if (narrowItCtrl.searchTerm && narrowItCtrl.searchTerm.trim() != '') {
                MenuSearchService.getMatchedMenuItems(narrowItCtrl.searchTerm)
                    .then(function (items) {
                        narrowItCtrl.items = items;
                    });
            }
            else {
                narrowItCtrl.items = [];
            }
        };

        narrowItCtrl.removeItem = function (itemIndex) {
            narrowItCtrl.items.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
            }).then(function (result) {
                var items = result.data.menu_items;
                var foundItems = [];

                for (var i = 0; i < items.length; i++) {
                    if (items[i].description.toLowerCase().includes(searchTerm)){
                        foundItems.push(items[i]);
                    }
                }

                return foundItems;
            });
        }
    }

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;
    }
})();
