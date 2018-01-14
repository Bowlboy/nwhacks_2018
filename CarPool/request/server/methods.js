Meteor.methods({
    insertDestinationMarker : function ( id, latLng) {
        MarkersList.insert( {
            uid: id,
            destLat: latLng.lat,
            destLng: latLng.lng
        });
    },
});