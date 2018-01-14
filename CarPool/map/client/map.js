
if (Meteor.isClient) {
    var MAP_ZOOM = 15;
    var id = "T";//Meteor.userId();

    Meteor.startup(function() {
        GoogleMaps.load();
    });

    Template.map.onCreated(function() {
        var self = this;


        GoogleMaps.ready('map', function(map) {
            var lom;
            var marker;
            // Create and move the marker when latLng changes.
            //self.autorun(function() {
                var latLng = Geolocation.latLng();
                console.log(latLng);
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
                            console.log(lom[i]);
                            marker = new google.maps.Marker({
                                position: new google.maps.LatLng(lom[i].lat, lom[i].lng),
                                map: map.instance
                            });
                        }
                    });

                });
                //console.log(Meteor.call('checkMarker', id));
                if (! MarkersList.find({ uid: id}).fetch()) {
                    console.log("went to to if");
                    //console.log(id);
                    //Meteor.call('insertMarker', id, latLng);
                    lom = MarkersList.find().fetch();
                    console.log(lom);
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latLng.lat, latLng.lng),
                        map: map.instance
                    });

                }
                // The marker already exists, so we'll just change its position.
                else {
                    //console.log(id);
                    console.log("went to else");
                    //marker.setPosition(latLng);

                }

                // Center and zoom the map view onto the current position.
                map.instance.setCenter(new google.maps.LatLng(latLng.lat, latLng.lng));
                map.instance.setZoom(MAP_ZOOM);
            });
        //});
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

