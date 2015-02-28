angular.module("motaxi",["ionic"])

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
		.state('app', {
			url: "/app",
			templateUrl: "app/home/home-layout.html"
		})

		.state('test', {
			url: "/test",
			templateUrl: "app/home/test.html"
		})

		.state('app.home', {
			url: "/home",
			views: {
				"mainContent": {
					templateUrl: "app/home/home.html"
				}
			}
		});
		

	$urlRouterProvider.otherwise('/app/home');
	// $ionicConfigProvider.platform.android.tabs.positon('bottom');
})

.directive('disableTap', function($timeout) {
  return {
    link: function() {
      $timeout(function() {
        // Find google places div
        _.findIndex(angular.element(document.querySelectorAll('.pac-container')), function(container) {
          // disable ionic data tab
          container.setAttribute('data-tap-disabled', 'true');
          //leave input field if google-address-entry is selected
          container.onclick = function() {
            document.getElementById('pickUp-input').blur();
            document.getElementById('drop-input').blur();
          };
        });
      },500);
    }
  };
});