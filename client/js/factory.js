angular.module('shopListFactory', [])
   .factory('shopListFactory', function($http) {
      var urlBase = '/api/shopping';
      var _shopListService = {};

      _shopListService.getList = function() {
         return $http.get(urlBase);
      };

      _shopListService.saveList = function( list) {
         return $http.post(urlBase, list);
      };

      _shopListService.updateList = function(list) {
         return $http.put(urlBase, list);
      };

      _shopListService.deleteList = function(id) {
         return $http.delete(urlBase + '/' + id );
      };

      return _shopListService;
   });