(function() {


	var mapLocationAPI = function($http, $q) {

		
		var getDropInfoWindow = function(place, callbackName) {
			
			var address = '';

			if (place.address_components) {
			  address = [
			    (place.address_components[0] && place.address_components[0].short_name || ''),
			    (place.address_components[1] && place.address_components[1].short_name || ''),
			    (place.address_components[2] && place.address_components[2].short_name || '')
			  ].join(' ');
			}

			return getLocationCard(place, "Drop Location", callbackName);
		};

		var getLocationCard = function(place, title, callbackName) {
			var card = document.createElement("div");
			card.setAttribute("class", "card card-infoWindow");

			var heading = document.createElement("div");
			heading.setAttribute("class", "item item-divider item-energized");
			heading.innerHTML = title;

			card.appendChild(heading);

			var cardContent = document.createElement("a");
			cardContent.setAttribute("class", "item item-text-wrap item-icon-right");
			cardContent.setAttribute("ng-click", callbackName);
			cardContent.innerHTML = place.name;

			var cardIcon = document.createElement("i");
			cardIcon.setAttribute("class", "icon ion-edit");

			cardContent.appendChild(cardIcon);
			card.appendChild(cardContent);

			return card.outerHTML;
		};

		console.log("first");

		var getPlaceByLatLng = function(latitude, longitude) {
			var deferred = $q.defer();

			$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&location_type=ROOFTOP&result_type=street_address&key=AIzaSyBaUFhQ0qijGsbTfKM7ImGV37CoONu9CdA")
				.success(function(data, status) {
					console.log("getPlaceByLatLng"+status);
					deferred.resolve(data.results[0].formatted_address);
				})
				.error(function() {
					console.log("error in getPlaceByLatLng");
					deferred.reject();
				});

			return deferred.promise;
		};

		console.log("second");

		return {
			getDropInfoWindowContent: getDropInfoWindow,
			getPlaceByLatLng: getPlaceByLatLng
		};	
	};

	angular.module("motaxi").factory('mapLocationAPI', ['$http', '$q', mapLocationAPI]);


})();