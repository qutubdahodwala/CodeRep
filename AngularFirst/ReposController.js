(function() {

  var module = angular.module("firstModule");

  var ReposController = function($scope, $location, $routeParams, gitHub) {

    var onPopulate = function(data) {
      $scope.reposName = $routeParams.reposName;
      $scope.collaborators = data;
    };

    var onError = function(reason) {
      $scope.error = reason;
    };

    console.log("here");
    gitHub.getCollaborators($routeParams.username, $routeParams.reposName).then(onPopulate, onError);

  };

  module.controller("ReposController", ReposController);

}());