
if (Meteor.isClient) {
    var MAP_ZOOM = 15;
    var id = Meteor.userId();
    //var COUNT = 0;

    Meteor.startup(function() {
        GoogleMaps.load();
    });

    Template.map.onCreated(function() {
        var self = this;


        GoogleMaps.ready('map', function(map) {
            // Create and move the marker when latLng changes.
            //self.autorun(function() {
            Meteor.setInterval(function() {
                var latLng = Geolocation.latLng();
                var lom;
                console.log(latLng);
                console.log(id);
                if (! latLng)
                    return;

                // If the marker doesn't yet exist, create it.
                Meteor.call('checkMarker', id, function (error, result) {
                   if (result == 0) {
                       Meteor.call('insertMarker', id, latLng);
                       console.log("callback if");
                       //console.log(result);
                   }
                   else {
                       //latLng = {lat: 0, lng: 0};
                       //console.log(latLng);
                       Meteor.call('updateMarker', id, latLng);
                       console.log("callback else");
                       //console.log(result);
                   }

                   //something both must do
                    Meteor.call('getMarker', function (error1, result1) {
                        //console.log(result1);
                        lom = result1;
                        //console.log(lom);
                        for (i = 0; i < lom.length; i++) {
                            //console.log(lom[i]);
                            var text = lom[i].lat.toString().concat(",", lom[i].lng.toString());
                            //change this to the user's destination and contact
                            if(latLng.lat == lom[i].lat && latLng.lng == lom[i].lng) {
                                text = "you're here";
                            }
                            var marker = new google.maps.Marker({
                                position: new google.maps.LatLng(lom[i].lat, lom[i].lng),
                                map: map.instance,
                                title: text
                            });
                        }


                    });

                });

                // Center and zoom the map view onto the current position.
                map.instance.setCenter(new google.maps.LatLng(latLng.lat, latLng.lng));
                map.instance.setZoom(MAP_ZOOM);

                //COUNT = COUNT + 1;
                //console.log(COUNT);
            }, 10000); // change number > for more delay per function call
        });
    });

    Template.map.helpers({
        geolocationError: function() {
            var error = Geolocation.error();
            return error && error.message;
        },
        mapOptions: function() {
            var latLng = Geolocation.latLng();
            // Initialize the map once we have the latLng.
            if (GoogleMaps.loaded() && latLng) {
                return {
                    center: new google.maps.LatLng(latLng.lat, latLng.lng),
                    zoom: MAP_ZOOM
                };
            }
        }
    });
}

