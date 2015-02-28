(function() {
  
  var UserController = function($scope, gitHub, $routeParams, $location) {
  
    var populate = function(data) {
      $scope.user = data;
      $scope.repos = gitHub.getRepos($scope.user).then(onRepos, onError);
      
    };
    
    var onRepos = function(data){
      $scope.repos = data;
    };
    
    var onError = function(reason) {
      console.log("error" + reason);
    };
    
    $scope.goToRepo = function(repos) {
      console.log(repos.name);
      $location.path("/users/" + $routeParams.username + "/" + repos.name);
    };
    
    gitHub.getUser($routeParams.username).then(populate, onError);
    
    $scope.columns = ["stargazers_count", "language", "name"];
    $scope.reposSortOrder = $scope.columns[0];
    
  };

  var apps = angular.module("firstModule");
  apps.controller("UserController", UserController);
  
}());