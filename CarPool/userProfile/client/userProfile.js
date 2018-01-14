Template.userProfile.events({
    'click #signoutbtn': function(event) {
        event.preventDefault();
        Meteor.logout();
    }
})