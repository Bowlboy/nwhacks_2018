//meteor.subscribe('user_profile');

Template.signup.events({
    'click #signupbtn': function (event) {
        event.preventDefault();

        let email = $('#email').val();
        let pwd = $('#psw').val();
        let pwdRepeat = $('#psw-repeat').val();

        let atpos = email.indexOf("@");
        let dotpos = email.lastIndexOf(".");

        if (email !== '' && pwd !== '') {
            if (pwd.length >= 6) {
                if (pwd === pwdRepeat) {
                    if (atpos > 1 && dotpos > atpos + 2 && dotpos + 2 <= email.length) {
                        Meteor.call('insertUser', email, pwd, function (error, result) {
                            if (result) {
                                Meteor.loginWithPassword(email, pwd);


                                Session.set('currentUser', $('#email').val());
                                Router.go('/');
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
    }
});
