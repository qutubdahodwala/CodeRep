(function(){
  'use strict';

  angular.module('eliteApp')
    .controller('LeaguesCtrl', ['$state', 'eliteApi', LeaguesCtrl]);

      function LeaguesCtrl($state, eliteApi){
        var vm = this;

        eliteApi.getLeagues().then(function(data){
          vm.leagues = data;
        });

        // console.log('leagues', leagues);
        // console.log('leagueData', eliteApi.leagueData());

        vm.selectLeague = function(leagueId){
          eliteApi.setLeagueId(leagueId);
          $state.go('app.teams');
        };

      };
})();