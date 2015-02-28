angular.module("eliteApp",["ionic","ion-google-place"])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		//hide the accessory bar by default (remove this to show the accessory bar)
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			//org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	
	$stateProvider
		.state('home', {
			abstract: true,
			url: "/home",
			templateUrl: "app/home/home.html"
		})
		
		.state('home.leagues', {
			url: "/leagues",
			views: {
				"tab-leagues": {
					templateUrl: "app/home/leagues.html"
				}
			}
		})
		
		.state('home.myteams', {
			url: "/myteams",
			views: {
				"tab-teams": {
					templateUrl: "app/home/myteams.html"
				}
			}			
		})
		
		.state('home.leagues.app', {
			url: "/app",
			abstract: true,
			views: {
				"tab-leagues@home": {
					templateUrl: "app/layout/menu-layout.html"
				}
			}
		})

		.state('home.leagues.app.teams', {
			url: "/teams",
			views: {
				"mainContent" : {
					templateUrl: "app/teams/teams.html"
				}
			}
		})

		.state('home.leagues.app.team-detail', {
			url: "/teams/:id",
			views: {
				"mainContent" : {
					templateUrl: "app/teams/team-detail.html"
				}
			}
		})

		.state('home.leagues.app.standings', {
			url: "/standings",
			views: {
				"mainContent" : {
					templateUrl: "app/standings/standings.html"
				}
			}
		})

		.state('home.leagues.app.game', {
			url: "/games/:id",
			views: {
				"mainContent" : {
					templateUrl: "app/games/game.html"
				}
			}
		})

		.state('home.leagues.app.locations', {
			url: "/locations ",
			views: {
				"mainContent" : {
					templateUrl: "app/locations/locations.html"
				}
			}
		})

		.state('home.leagues.app.rules', {
			url: "/rules",
			views: {
				"mainContent" : {
					templateUrl: "app/rules/rules.html"
				}
			}
		});
	
	// if none of the above states are matched, use this as the fall back.
	$urlRouterProvider.otherwise('home/leagues/app/teams');
	$ionicConfigProvider.platform.android.tabs.position('bottom');
});