'use strict';

/**
 * @ngdoc function
 * @name angularCheckgroupApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularCheckgroupApp
 */
angular.module('angularCheckgroupSample')
  .controller('demoController', ['$scope', function ($scope) {
  	$scope.select = function(item, value) {
  		$scope[item] = value;
  	};
  }]);
