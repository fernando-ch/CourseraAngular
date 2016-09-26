(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.itens = ShoppingListCheckOffService.getToBuyItens();

    toBuy.buyItem = function(itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.itens = ShoppingListCheckOffService.getBoughtItens();
  }

  function ShoppingListCheckOffService() {

    var service = this;

    var toBuyItens = [
      {
        name: 'chocolate cookies',
        quantity: 100
      },
      {
        name: 'cream cookies',
        quantity: 200
      },
      {
        name: 'milk',
        quantity: 10
      },
      {
        name: 'soda',
        quantity: 5
      },
      {
        name: 'chips',
        quantity: 50
      }
    ];

    var boughtItens = [];

    service.getToBuyItens = function() {
      return toBuyItens;
    };

    service.getBoughtItens = function() {
      return boughtItens;
    };

    service.buyItem = function(itemIndex) {
      var item = toBuyItens[itemIndex];
      toBuyItens.splice(itemIndex, 1);
      boughtItens.push(item);
    };
  }
})();