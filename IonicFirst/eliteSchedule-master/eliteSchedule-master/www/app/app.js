angular.module('eliteApp', ['ionic', 'angular-data.DSCacheFactory', 'google-maps'.ns()])

.run(function($ionicPlatform, DSCacheFactory) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    DSCacheFactory("leagueDataCache", {storageMode: "localStorage", maxAge: 5000, deleteOnExpire: "aggressive"});
    DSCacheFactory("leaguesCache", {storageMode: "localStorage", maxAge: 5000, deleteOnExpire: "aggressive"});
    DSCacheFactory("myTeamsCache", {storageMode: "localStorage"});
    DSCacheFactory("staticCache", {storageMode: "localStorage"});
  });
})

.config(function($stateProvider, $urlRouterProvider){

  $stateProvider

    .state('home', {
      abstract: true,
      url: '/home',
      templateUrl: 'app/home/home.html'
    })

    .state('home.leagues', {
      url: '/leagues',
      views: {
        "tab-leagues": {
          templateUrl: 'app/home/leagues.html'
        }
      }
    })

    .state('home.myteams', {
      url: '/myteams',
      views: {
        "tab-myteams": {
          templateUrl: 'app/home/myteams.html'
        }
      }
    })

    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'app/layout/menu-layout.html'
    })

    .state('app.teams', {
      url: '/teams',
      views: {
        "mainContent": {
          templateUrl: 'app/teams/teams.html'
        }
      }
    })

    .state('app.team-detail', {
      url: '/teams/:id',
      views: {
        "mainContent": {
          templateUrl: 'app/teams/team-detail.html'
        }
      }
    })

    .state('app.game', {
      url: '/game/:id',
      views: {
        "mainContent": {
          templateUrl: 'app/game/game.html'
        }
      }
    })

    .state('app.standings', {
      url: '/standings',
      views: {
        "mainContent": {
          templateUrl: 'app/standings/standings.html'
        }
      }
    })

    .state('app.locations', {
      url: '/locations',
      views: {
        "mainContent": {
          templateUrl: 'app/locations/locations.html'
        }
      }
    })

    .state('app.rules', {
      url: '/rules',
      views: {
        "mainContent": {
          templateUrl: 'app/rules/rules.html'
        }
      }
    })

    .state('app.location-map', {
      url: '/location-map/:id',
      views: {
        "mainContent": {
          templateUrl: 'app/locations/location-map.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/app/teams');
});