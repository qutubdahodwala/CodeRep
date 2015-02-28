(function() {

	var teamsController = function($scope) {

		console.log($scope.location);
	};
	console.log("is here atleast");

	angular.module("eliteApp").controller("teamsController", ["$scope", teamsController]);

})();