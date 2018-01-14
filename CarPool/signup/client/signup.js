Template.signup.events({
    'click #signupbtn': function (event) {
        event.preventDefault();

        let email = $('#email').val();

        let pwd = $('#psw').val();
        let pwdRepeat = $('#psw-repeat').val();

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


//
//    function insertUser(email, pwd) {
//
//        console.log(UserProfile.findOne({email:email}));
//        if(!UserProfile.findOne({email: email})){
//
//                let accId = Accounts.createUser({
//                    email: email,
//                    password: pwd
//                });
//                initProfile(accId, email, pwd);
//                return true;
//        }
//    }
//
//
//function initProfile(accId, email, pwd) {
//    UserProfile.insert({
//        user_id: accId,
//        password: pwd,
//        email: email,
//    });
//}