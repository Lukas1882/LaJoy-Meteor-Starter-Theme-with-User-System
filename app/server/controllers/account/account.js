if (Meteor.isServer) {
    Meteor.methods({
        isEmailExist: function (email) {
            check(email, String);
            try {
                if (Accounts.findUserByEmail(email)) {
                    // this  username is not valid.
                    return false;
                } else {
                    // this username is valid.
                    return true;
                }
            } catch (e){
                throw new Meteor.Error(500, e);
            }
        },

        addAccount: function (username,email,password) {
            check(username, String);
            check(email, String);
            check(password, String);
            if (!Meteor.call('isEmailExist',email)) {
                throw new Meteor.Error(500, 'This email has been used!');
            } else {
                // Create the user
                Accounts.createUser({
                    username: username,
                    email: email,
                    password: password
                });
                // Send the Confirmation Email
                Meteor.call('sendEmail', email, 'test@lyl1.com', 'Hello World, '+ username, 'This is a test of Email, Please confirme your email');
                return true;
            }
        }
    });
}