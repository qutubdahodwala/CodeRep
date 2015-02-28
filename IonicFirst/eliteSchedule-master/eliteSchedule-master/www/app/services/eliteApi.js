(function(){
  'use strict';

  angular.module('eliteApp')
    .factory('eliteApi', ['$http', '$q', '$ionicLoading', 'DSCacheFactory', eliteApi]);

      function eliteApi($http, $q, $ionicLoading, DSCacheFactory){
        
        self.leaguesCache = DSCacheFactory.get("leaguesCache");
        self.leagueDataCache = DSCacheFactory.get("leagueDataCache");

        self.leaguesCache.setOptions({
          onExpire: function(key, value){
            getLeagues()
              .then(function(){
                console.log("Leagues Cache was automatically refreshed", new Date());
              }, function(){
                console.log("Error getting data. Putting expired item back in the cache", new date());
                self.leaguesCache.put(key, value);
              });
          }
        });

        self.leagueDataCache.setOptions({
          onExpire: function(key, value){
            getLeagueData()
              .then(function(){
                console.log("League Data Cache was automatically refreshed", new Date());
              }, function(){
                console.log("Error getting data. Putting expired item back in the cache", new date());
                self.leagueDataCache.put(key, value);
              });
          }
        });

        self.staticCache = DSCacheFactory.get("staticCache");

        function setLeagueId(leagueId){
          self.staticCache.put("currentLeagueId", leagueId);
        }

        function getLeagueId(){
          return self.staticCache.get('currentLeagueId');
        }

        function getLeagues(){

          var deferred = $q.defer();
          var cacheKey = "leagues";
          var leaguesData = self.leaguesCache.get(cacheKey);

          if(leaguesData){
            console.log("Found data inside cache", leaguesdata);
            deferred.resolve(leaguesdata);
          } else {
            $http.get("http://elite-schedule.net/api/leaguedata")
              .success(function(data){
                self.leaguesCache.put(cacheKey);
                deferred.resolve(data);
              })
              .error(function(){
                console.log("Error while making HTTP call.");
                deferred.reject();
              });
          }
          return deferred.promise;
        }

        function getLeagueData(forceRefresh){

          var deferred = $q.defer();
          var cacheKey = "leagueData-" + getLeagueId();
          var leagueData = null;

          if(!forceRefresh){
            leagueData = self.leagueDataCache.get(cacheKey);
          };

          if(leagueData){
            console.log("Found data inside cache", leaguedata);
            deferred.resolve(leagueData);
          } else {
            $ionicLoading.show({template: "Loading ..."});

            $http.get("http://elite-schedule.net/api/leaguedata/"+ getLeagueId())
              .success(function(data, status){
                console.log("Received data", data, status);
                self.leagueDataCache.put(cacheKey, data)
                $ionicLoading.hide();
                deferred.resolve(data);
              })
              .error(function(){
                console.log("Error while making HTTP call.");
                $ionicLoading.hide();
                deferred.reject();
              });
          }
          return deferred.promise;

        }

        return {
          getLeagues: getLeagues,
          getLeagueData: getLeagueData,
          setLeagueId: setLeagueId
        };
      };
})();