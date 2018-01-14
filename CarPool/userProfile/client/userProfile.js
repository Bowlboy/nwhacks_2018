Template.userProfile.events({
    'click #signoutbtn': function(event) {
        event.preventDefault();
        Meteor.logout();
    }
})

Template.userProfile.helpers({
    'user': function(event){
        return UserProfile.findOne({user_id:Meteor.userId()});
    }
})