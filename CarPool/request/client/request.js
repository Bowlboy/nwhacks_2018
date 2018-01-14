Template.request.onCreated(function(){
    
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: {lat: position.coords.latitude, lng: position.coords.longitude}
        });
        var marker = new google.maps.Marker({
          position:{lat: position.coords.latitude, lng: position.coords.longitude},
          map: map,
          title: 'Current Location'
        });

        var geocoder = new google.maps.Geocoder();
        document.getElementById('send_location').addEventListener('click', function() {
          //geocodeAddress(geocoder, map);
          var address = document.getElementById('address').value;
          var id = Meteor.userId();
          geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
            console.log('Hi' + results[0].geometry.location)
            Meteor.call('insertDestinationMarker',id,results[0].geometry.location)
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        })
        });

        })
      }
})