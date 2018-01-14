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

Template.userProfile.events({
    'click .clientBtn' : function (){
        Router.go('/request');
    },
    'click .driverBtn' : function (event){

            Session.set('notclicked', false);
    },
})

Template.userProfile.onRendered(function() {
    Session.set('notclicked', true);

})

Template.userProfile.helpers( {
    'notclicked': function(event){
        return Session.get('notclicked');
    }
})

