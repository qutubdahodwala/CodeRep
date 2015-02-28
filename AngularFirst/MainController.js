(function() {

  var apps = angular.module("firstModule");

  var MainController = function($scope, $interval, $location) {

    var decrementCountDown = function() {
      $scope.countDown -= 1;

      if ($scope.countDown === 0) {
        $scope.search($scope.username);
      }
    };

    var countDownInterval = null;

    var startCountDown = function() {
      countDownInterval = $interval(decrementCountDown, 1000, $scope.countDown);
    };

    $scope.search = function(username) {
      if (countDownInterval) {
        $interval.cancel(countDownInterval);
        $scope.countDown = "";
      }
      
      $location.path("/users/"+username);
    };

    $scope.countDown = 100;
    startCountDown();

  };

  apps.controller("MainController", MainController);

}());