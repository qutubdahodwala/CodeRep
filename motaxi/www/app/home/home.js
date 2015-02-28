 (function() {

  var mapLoader = function($scope, mapLocationAPI) {

    console.log("came here atleast 1");

    var myPos;
    var map;
    $scope.searchButtonTitle = "Search";

    var onSearchClick = function() {
      console.log("button click");

      map.setCenter(new google.maps.LatLng(myPos.coords.latitude, myPos.coords.longitude));
    };

    $scope.init =  function() {
      var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
      console.log("came here");
      var mapOptions = {
          center: myLatlng,
          zoom: 16,
          disableDefaultUI: true
      };

      map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var setDefaultPickUp = function() { 
        pickUpMarker.setPosition(new google.maps.LatLng(myPos.coords.latitude, myPos.coords.longitude));
        pickUpMarker.setVisible(true);

        mapLocationAPI.getPlaceByLatLng(myPos.coords.latitude, myPos.coords.longitude).then(function(data) {
          map.controls[google.maps.ControlPosition.TOP_LEFT].j[0].value = data;  
          console.log(data);
        }); 
        
      };
      // var myLocation = new google.maps.Marker({
      //     position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
      //     map: map,
      //     title: "My Location"
      // });

      // var searchButton = document.getElementById("searchButton");

      var newButton = document.createElement('div');
      console.log("createdButton");
      newButton.className = "button button-mapblock button-assertive";
      newButton.innerHTML = "Search Cabs";
      newButton.style.width = "90%";

      google.maps.event.addDomListener(newButton, 'click', onSearchClick);

      newButton.index = 1;
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(newButton);

      var pickUpInput = /** @type {HTMLInputElement} */(
      document.getElementById('pickUp-input'));
      pickUpInput.index = 2;
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(pickUpInput);

      var dropInput = /** @type {HTMLInputElement} */(
      document.getElementById('drop-input'));
      dropInput.index = 3;
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(dropInput);

      var pickUpAutocomplete = new google.maps.places.Autocomplete(pickUpInput);
      var dropAutocomplete = new google.maps.places.Autocomplete(dropInput);

      pickUpAutocomplete.bindTo('bounds', map);
      dropAutocomplete.bindTo('bounds', map);

      navigator.geolocation.getCurrentPosition(function(pos) {
          map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          myPos = pos;

          if(!pickUpAutocomplete.getPlace()) {
              setDefaultPickUp();
          }
      });
      
      var infowindow = new google.maps.InfoWindow();

      var pickUpMarker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29),
        draggable: true
      });

      pickUpMarker.setIcon(/** @type {google.maps.Icon} */({
        url: "img/flag.png",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      }));

      google.maps.event.addListener(pickUpAutocomplete, 'place_changed', function() {
          
        infowindow.close();
        pickUpMarker.setVisible(false);

        var place = pickUpAutocomplete.getPlace();

        if (!place.geometry) {
          return;
        }
        
        pickUpMarker.setPosition(place.geometry.location);
        pickUpMarker.setVisible(true);

        if(!dropMarker.getVisible() || !dropMarker.getPosition()) {
        // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
        } else {
          setMapBounds();
        }
        
        var address = '';
        if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, pickUpMarker);
      });

      var dropMarker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29),
        draggable: true
      });

      dropMarker.setIcon(/** @type {google.maps.Icon} */({
        url: "img/flag.png",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      }));

      google.maps.event.addListener(dropAutocomplete, 'place_changed', function() {
          
        infowindow.close();
        dropMarker.setVisible(false);

        var place = dropAutocomplete.getPlace();

        if (!place.geometry) {
          return;
        }


        dropMarker.setPosition(place.geometry.location);
        dropMarker.setVisible(true);
        // If the place has a geometry, then present it on a map.
        
        if(!pickUpMarker.getVisible() || !pickUpMarker.getPosition()) {
        
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
        } else {
          setMapBounds();
        }

        var address = '';
        if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
        }

        //var cardHTML = mapLocationAPI.getDropInfoWindowContent(place, "onSearchClick()");
        //console.log("html is - " + cardHTML);
        //infowindow.setContent(cardHTML);

        google.maps.event.addListener(infowindow, "click", onSearchClick);
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, dropMarker);
      });

      google.maps.event.addListener(dropMarker, "dragend", function() {
          var markerPosition = dropMarker.getPosition();
          mapLocationAPI.getPlaceByLatLng(markerPosition.lat(), markerPosition.lng()).then(function(data)  {
              map.controls[google.maps.ControlPosition.LEFT_TOP].j[0].value = data;  
          }); 

          setMapBounds();
      });

      google.maps.event.addListener(pickUpMarker, "dragend", function() {
          console.log("dragend for pickupPlace");
          var markerPosition = pickUpMarker.getPosition();
          mapLocationAPI.getPlaceByLatLng(markerPosition.lat(), markerPosition.lng()).then(function(data)  {
              map.controls[google.maps.ControlPosition.TOP_LEFT].j[0].value = data;  
          }); 
      });

      var setMapBounds = function() {

          // var pickupPlace = pickUpAutocomplete.getPlace();
          // var dropPlace = dropAutocomplete.getPlace();

          var bounds = new google.maps.LatLngBounds();
          // bounds.extend(pickupPlace.geometry.location);
          // bounds.extend(dropPlace.geometry.location);

          bounds.extend(pickUpMarker.getPosition());
          bounds.extend(dropMarker.getPosition());

          map.setCenter(bounds.getCenter()); //or use custom center
          map.fitBounds(bounds);

          map.setZoom(map.getZoom()-1); 

          // set a minimum zoom 
          // if you got only 1 marker or all markers are on the same address map will be zoomed too much.
          if(map.getZoom()> 15){
            map.setZoom(15);
          }
      };


      $scope.map = map;
    };
      // google.maps.event.addDomListener(window, 'load',);
  };

  angular.module("motaxi").controller('mapLoader', ['$scope','mapLocationAPI', mapLoader]);

})();