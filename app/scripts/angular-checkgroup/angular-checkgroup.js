/**
 * @name 			angular-checkgroup
 * @description		build your custom radio and checkbox
 * @version 		0.1.0
 * @author			Jennie Ji
 * https://github.com/JennieJi/angular-checkgroup
 */
'use strict';

angular.module('checkgroup', [])
.controller('checkgroupController', ['$scope', function ($scope) {
	var checks = [],
		allChecks = [],
		noneChecks = [];
	var ctrl = this;

	this.checkedValue = [];
	this.multiple = false;
	this.model = null;
	this.last = 0;
	this.index = -1;

	this.registerCheck = function(checkScope) {
		var group = [];
		switch(checkScope.checkType) {
			case 'all':
				if( ctrl.multiple ){
					group = allChecks;
				}
				break;
			case 'none':
				if( ctrl.multiple ) {
					group = noneChecks;
				}
				break;
			default:
				group = checks;
		}

		checkScope.$on('$destroy', function() {
			var index = group.indexOf(checkScope);
		    if ( index <0 ) { return; }
	      	group.splice(index, 1);
	      	ctrl.index--;
	      	ctrl.last--;   	
		});

		group.push(checkScope);
		if( ++ctrl.index === ctrl.last || checkScope.$last ) {
			ctrl.updateValue();
		}
	};
	this.uncheckOthers = function(checkedScopes) {
		var multipleScopes = angular.isArray(checkedScopes);
		angular.forEach(checks, function(check){
			if( multipleScopes ) {
				var index = checkedScopes.indexOf(check);
	    		check.isChecked = index >=0;
			} else {
				check.isChecked = angular.equals(check, checkedScopes);
			}
		});
	};
	this.groupCheck = function(group, checked) {
		if( !ctrl.multiple ) { return; }
		angular.forEach(group, function(check){
			check.isChecked = checked;
		});
	};
	this.checkAll = function(checked) {
		this.groupCheck(checks, checked);
	};
	this.updateValue = function() {
		var checkedLength = 0;
		ctrl.checkedValue = [];
		angular.forEach(checks, function(check){
			if( !check.isChecked ) { return; }
			if( !ctrl.multiple && ctrl.checkedValue.length>0 ) {
				check.isChecked = false;
				return;
			}
			ctrl.checkedValue.push( check.value );
		});
		checkedLength = ctrl.checkedValue.length;

		if( !ctrl.multiple && checkedLength === 0 && checks.length>0 ) {
			ctrl.checkedValue.push( checks[0].value );
			checks[0].isChecked = true;
			checkedLength = 1;
		}

		ctrl.groupCheck(allChecks, checkedLength === checks.length);
		ctrl.groupCheck(noneChecks, checkedLength === 0);

		$scope[ctrl.model] = ctrl.checkedValue;
	};
}])
.directive('checkgroup', function () {
	return {
		restrict: 'AE',
		controller: 'checkgroupController',
		compile: function(){
			return {
				pre: function(scope, element, attrs, ctrl){
					ctrl.last = element.find('check').length + element.find('[check]').length - 1;
				},
				post: function (scope, element, attrs, ctrl) {
					ctrl.multiple = attrs.checkMultiple || false;
					ctrl.model = attrs.checkgroup;
				}
			};
		}
	};
})
.directive('check', function () {
	return {
		restrict: 'EA',
		scope: {
			value: '@'
		},
		transclude: true,
		require: '^checkgroup',
		templateUrl: 'templates/check.html',
		link: function (scope, element, attrs, ctrl) {
			scope.isChecked = !!attrs.checked;
			scope.checkType = attrs.checkType;

			switch( attrs.checkType ) {
				case 'all':
					scope.toggleCheck = function() {
						ctrl.checkAll( !scope.isChecked );
						ctrl.updateValue();
					};
					break;
				case 'none':
					scope.toggleCheck = function() {
						ctrl.checkAll( scope.isChecked );
						ctrl.updateValue();
					};
					break;
				default:
					scope.toggleCheck = function() {
						if( ctrl.multiple ) {
							scope.isChecked = !scope.isChecked;
						} else {
							ctrl.uncheckOthers(scope);
						}
						ctrl.updateValue();
					};
			}
			ctrl.registerCheck(scope);
		}
	};
});