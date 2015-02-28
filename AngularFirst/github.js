(function() {

  var module = angular.module("firstModule");

  var gitHub = function($http) {

    var getUser = function(username) {

      return $http.get("https://api.github.com/users/" + username).then(function(response) {
        return response.data;
      });

    };

    var getRepos = function(user) {

      return $http.get(user.repos_url).then(function(response) {
        return response.data;
      });

    };
    
    var getCollaborators = function(username, reposName){
      return $http.get("https://api.github.com/repos/"+username + "/" + reposName).then(function(response){
        return response.data;
      });
    };

    return {
      getUser: getUser,
      getRepos: getRepos,
      getCollaborators: getCollaborators
    };
  };

  module.factory("gitHub", gitHub);

}());