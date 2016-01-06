if (Meteor.isServer) {
    Meteor.methods({
        //isUserExist: function (username) {
        //    check(username, String);
        //
        //    if (!this.userId) {
        //        throw new Meteor.Error(401, 'you must be logged in!');
        //    }
        //
        //    try {
        //        if (Meteor.users.findOne({username: username})) {
        //            // this  username is not valid.
        //            return false;
        //        } else {
        //            // this username is valid.
        //            return true;
        //        }
        //    } catch (e){
        //        throw new Meteor.Error(500, e);
        //    }
        //},


        isEmailExist: function (email) {
            check(email, String);

            //if (!this.userId) {
            //    throw new Meteor.Error(401, 'you must be logged in!');
            //}

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
        }

    });
}