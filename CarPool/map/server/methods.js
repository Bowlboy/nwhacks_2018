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
    },

    sendEmail: function (to, subject, text) {
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        // and here is where you can throttle the number of emails this user
        // is allowed to send per day

        process.env.MAIL_URL= "smtp://postmaster@sandboxaee015ba664c4635884173e48a5aee81.mailgun.org:25833fb30b3a32edcbc86776de97136b@smtp.mailgun.org:587";
        //process.env.MAIL_URL = "sandboxaee015ba664c4635884173e48a5aee81.mailgun.org";

        Email.send({
            to: to,
            from: Meteor.user().emails[0].address,
            subject: subject,
            text: text
        });
    }
});