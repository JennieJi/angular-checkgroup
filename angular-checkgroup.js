/**
 * @name 			angular-checkgroup
 * @description		build your custom radio and checkbox
 * @version 		0.1.3
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
	var directiveUpdate = false;

	this.checkedValue = [];
	this.multiple = false;
	this.model = null;
	this.last = -1;
	this.index = -1;

	this.registerCheck = function(checkScope) {
		var group = checks;
		if( ctrl.multiple ){
			switch(checkScope.checkType) {
				case 'all':
					group = allChecks;
					break;
				case 'none':
					group = noneChecks;
					break;
			}
		}

		checkScope.$on('$destroy', function() {
			var index = group ? group.indexOf(checkScope) : -1;
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
	this.uncheckOthers = function(checkedScope) {
		angular.forEach(checks, function(check){
			check.isChecked = angular.equals(check, checkedScope);
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
	this.checkedLengthUpdate = function( length ) {
		this.groupCheck(allChecks, length === checks.length);
		this.groupCheck(noneChecks, length === 0);
	};
	this.updateValue = function() {
		ctrl.checkedValue = [];
		angular.forEach(checks, function(check){
			if( !check.isChecked ) { return; }
			if( !ctrl.multiple && ctrl.checkedValue.length>0 ) {
				check.isChecked = false;
				return;
			}
			ctrl.checkedValue.push( check.value );
		});
		this.checkedLengthUpdate( ctrl.checkedValue.length );

		directiveUpdate = true;
		$scope.checkgroup = ctrl.checkedValue;
	};

	$scope.$watch('checkgroup', function(newVal) {
		if( directiveUpdate || !angular.isArray(newVal) ) {
			directiveUpdate = false;
			return;
		}
		angular.forEach(checks, function(check) {
			check.isChecked = ctrl.multiple ? ( newVal.indexOf( check.value ) >= 0 ) : ( newVal[0] === check.value );
		});
		ctrl.checkedLengthUpdate( ctrl.multiple ? newVal.length : newVal.length ? 1 : 0 );
	});

}])
.directive('checkgroup', function () {
	return {
		restrict: 'AE',
		scope: {
			checkgroup: '=checkgroup'
		},
		controller: 'checkgroupController',
		compile: function(){
			return {
				pre: function(scope, element, attrs, ctrl){
					ctrl.model = attrs.checkgroup;
					ctrl.last = element.find('check').length + element.find('[check]').length - 1;
					ctrl.multiple = attrs.checkMultiple || false;
				}
			};
		}
	};
})
.directive('check', [function () {
	return {
		restrict: 'EA',
		scope: {
			value: '@',
			isChecked: '@checked',
			isDisabled: '=?checkDisabled'
		},
		transclude: true,
		require: '^checkgroup',
		template: '<div class="check" ng-class="{checked:isChecked}" ng-mouseup="toggleCheck();" ng-transclude></div>',
		link: function (scope, element, attrs, ctrl) {
			scope.checkType = attrs.checkType;

			scope.toggleCheck = function() {
				if( scope.isDisabled ) { return; }
				scope.isChecked = ctrl.multiple ? !scope.isChecked : true;
			};

			scope.$watch('isChecked', function(newVal) {
				if( scope.isDisabled ) { return; }
				if( newVal ) {
					if( ctrl.multiple ) {
						switch( scope.checkType ) {
							case 'all':
								ctrl.checkAll( true );
								break;
							case 'none':
								ctrl.checkAll( false );
								break;
						}
					} else {
						ctrl.uncheckOthers(scope);
					}
				}
				ctrl.updateValue();
			});

			ctrl.registerCheck(scope);
		}
	};
}]);