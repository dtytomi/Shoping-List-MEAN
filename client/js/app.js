angular.module("shopList", ['ngRoute','shopListFactory', 'shopListCtrl'])
   .config(function($routeProvider){
      $routeProvider
         .when('/', { templateUrl: '/partials/list.html',
               controller: 'shopCtrl'})
         .otherwise({ redirectTo: '/'});
      });