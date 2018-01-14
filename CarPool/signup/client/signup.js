Template.signup.onRendered(function() {
        Session.set('notYetAUser', true);

})

Template.signup.helpers( {
    'notYetAUser': function(event){
        return Session.get('notYetAUser');
    }
})

Template.signup.events({
    'click #signupbtn': function (event) {
        event.preventDefault();

        let email = $('#signupEmail').val();

        let pwd = $('#signupPwd').val();
        let pwdRepeat = $('#pwd-repeat').val();

        let apos = email.indexOf("@");
        let dotpos = email.lastIndexOf(".");

        if (email !== '' && pwd !== '') {
            if (pwd.length >= 6) {
                if (pwd === pwdRepeat) {
                    if (apos > 1 && dotpos > apos + 2 && dotpos + 2 <= email.length) {

                        Meteor.call('insertUser', email, pwd, function (error, result) {

                            if (result) {

                                Meteor.loginWithPassword(email, pwd);

                                Session.set('currentUser', $('#email').val());

                            } else if (UserProfile.findOne({email:email})) {

                                sAlert.error('Email already exist', {effect: 'slide', position: 'top', timeout: 'none', onRouteClose: true, timeout: 1000});
                            } else {

                                sAlert.error('something is wrong, Try again later', {effect: 'slide', position: 'top', timeout: 'none', onRouteClose: true, timeout: 1000});
                            }
                        })
                    }
                    else {

                        sAlert.error('email invalid', {effect: 'slide', position: 'top', timeout: 'none', onRouteClose: true, timeout: 1000});

                    }
                }
                else {
                    sAlert.error('Password mismatch', {effect: 'slide', position: 'top', timeout: 'none', onRouteClose: true, timeout: 1000});

                }
            }
            else {
                sAlert.error('password needs at least 6 characters', {effect: 'slide', position: 'top', timeout: 'none', onRouteClose: true, timeout: 1000});
            }
        }
        else {
            sAlert.error('All fields are required', {effect: 'slide', position: 'top', timeout: 'none', onRouteClose: true, timeout: 1000});
        }
    },
    'click #alreadyAUser': function(event) {
        Session.set('notYetAUser', false);
    },
    'click #notYetAUser': function(event) {
        Session.set('notYetAUser', true);
    },
    'click #loginbtn': function(event) {
        event.preventDefault();
        let email = $('#loginEmail').val();
        let pwd = $('#loginPwd').val();

        Meteor.loginWithPassword(email, pwd, function(err){
            if(UserProfile.findOne({email: email})) {
                user = UserProfile.findOne({email: email});
                if (user.password != pwd) {
                    sAlert.error('Incorrect password', {effect: 'slide', position: 'top', timeout: 'none', onRouteClose: true, timeout: 1000});
                }

            }
            else {

                sAlert.error('User does not exist', {effect: 'slide', position: 'top', timeout: 'none', onRouteClose: true, timeout: 1000});
            }

        });
    }
});

