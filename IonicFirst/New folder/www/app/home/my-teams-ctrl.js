(function(){
  'use strict';

  angular.module('eliteApp')
    .controller('MyTeamsCtrl', ['$state', 'myTeamsService', MyTeamsCtrl]);

      function MyTeamsCtrl($state, myTeamsService, eliteApi){
        var vm = this;

        vm.myTeams = myTeamsService.getFollowedTeams();

        vm.goToTeam = function(team){
          eliteApi.setLeagueId(team.leagueId);
          $state.go('app.team-detail', {id: team.id});
        }

        // var data = eliteApi.getLeagueData();
        // vm.locations = data.locations;
      };
})();