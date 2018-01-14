Meteor.methods({
    insertUser: function (email, pwd) {

        console.log(UserProfile.findOne({email:email}));
        if(!UserProfile.findOne({email: email})){

                let accId = Accounts.createUser({
                    email: email,
                    password: pwd
                });
                initProfile(accId, email, pwd);
                return true;
        }
    }
});

function initProfile(accId, email, pwd) {
    UserProfile.insert({
        user_id: accId,
        password: pwd,
        email: email,
    });
}