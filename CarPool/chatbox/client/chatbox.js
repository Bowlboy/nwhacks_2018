Template.messages.helpers({
    messages: function() {
    return Messages.find({}, { sort: { time: 1}});
  },
  'receiver': function() {
    receiverId = Session.get('receiverId');
    console.log(UserProfile.findOne({user_id: receiverId.user_id}));
    return UserProfile.findOne({user_id: receiverId.user_id}).email;
  },
  'receiverId': function() {
    receiverId = Session.get('receiverId');
    return receiverId;
  }
});

  Template.input.events = {
    'keydown input#message' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      if (Meteor.user())

        var sender = UserProfile.findOne({user_id: Meteor.userId()});
        var receiver = UserProfile.findOne({user_id: receiverId.user_id});

        var message = document.getElementById('message');
        if (message.value != '') {
          Messages.insert({
            name: sender.email,
            receiver: receiver.email,
            message: message.value,
            time: Date.now(),
          });

          document.getElementById('message').value = '';
          message.value = '';
        }
      }
    }
  }