(function() {

  var app = angular.module("firstModule", ["ngRoute"]);

  app.config(function($routeProvider) {
    $routeProvider
      .when("/main", {
        templateUrl: "main.html",
        controller: "MainController"
      })
      .when("/users/:username", {
        templateUrl: "userDetails.html",
        controller: "UserController"
      })
      .when("/users/:username/:reposName", {
        templateUrl: "reposDetails.html",
        controller: "ReposController"
      })
      .otherwise({
        redirectTo: "/main"
      });

  });

}());