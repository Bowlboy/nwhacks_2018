Meteor.methods({
    insertMarker : function ( id, latLng) {
        MarkersList.insert( {
            uid: id,
            lat: latLng.lat,
            lng: latLng.lng
        });
    },

    updateMarker : function (id, latLng) {
        MarkersList.update({uid: id}, { $set: { lat: latLng.lat } });
        MarkersList.update({uid: id}, { $set: { lng: latLng.lng } });
    },

    checkMarker : function (id) {
        return MarkersList.find({ uid: id}).fetch().length;
    },

    getMarker : function () {
        return MarkersList.find().fetch();
    }
});