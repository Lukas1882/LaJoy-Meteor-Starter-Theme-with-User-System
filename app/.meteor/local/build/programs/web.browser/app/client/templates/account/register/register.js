(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/account/register/register.js                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
Template.register.events({                                             // 2
    "submit #form": function (event) {                                 // 3
        // Prevent default browser form submit                         //
        event.preventDefault();                                        // 5
                                                                       //
        // Get value from form element                                 //
        var name = event.target.name.value;                            // 8
        var email = event.target.email.value;                          // 9
        var password = event.target.password.value;                    // 10
                                                                       //
        Meteor.call('isEmailExist', email, function (error, result) {  // 13
            if (error) {                                               // 14
                console.log(error);                                    // 15
                swal("Sorry", "We have system problem", "error");      // 16
                return;                                                // 17
            } else {                                                   //
                // if this name is valid                               //
                if (!result) {                                         // 20
                    swal("Sorry", "This email has been used, please login directly", "error");
                    // 跳转登陆                                            //
                } else {                                               //
                        try {                                          // 24
                            Meteor.call('addAccount', name, email, password, function (error, result) {
                                // if created, logim to the new account
                                if (result == true) {                  // 27
                                    Meteor.loginWithPassword(email, password);
                                    // send confirm email              //
                                }                                      //
                            });                                        //
                        } catch (e) {                                  //
                            console.log(e);                            // 34
                            return;                                    // 35
                        }                                              //
                        swal({                                         // 37
                            title: "Success!",                         // 38
                            text: "Thanks for your register. We have send one email to your email \"" + email + "\" please verify your email address first.",
                            type: "success",                           // 40
                            confirmButtonColor: "#50E1AE",             // 41
                            confirmButtonText: "OK!",                  // 42
                            closeOnConfirm: false                      // 43
                        }, function (isConfirm) {                      //
                            window.location = "/";                     // 46
                        });                                            //
                    }                                                  //
            }                                                          //
        });                                                            //
    }                                                                  //
});                                                                    //
Template.register.onRendered(function () {                             // 53
    $('.ui.form').form({                                               // 54
        on: 'blur',                                                    // 56
        fields: {                                                      // 57
            name: {                                                    // 58
                identifier: 'name',                                    // 59
                rules: [{                                              // 60
                    type: 'empty',                                     // 62
                    prompt: 'Please enter your username'               // 63
                }]                                                     //
            },                                                         //
            email: {                                                   // 67
                identifier: 'email',                                   // 68
                rules: [{                                              // 69
                    type: 'email',                                     // 72
                    prompt: 'Please enter a valid e-mail'              // 73
                }]                                                     //
            },                                                         //
                                                                       //
            password: {                                                // 78
                identifier: 'password',                                // 79
                rules: [{                                              // 80
                    type: 'minLength[6]',                              // 82
                    prompt: 'Your password must be at least {ruleValue} characters'
                }]                                                     //
            },                                                         //
            repassword: {                                              // 87
                identifier: 'repassword',                              // 88
                rules: [{                                              // 89
                    type: 'match[password]',                           // 91
                    prompt: 'Your confirm passward does not match your password'
                }]                                                     //
            },                                                         //
            terms: {                                                   // 96
                identifier: 'terms',                                   // 97
                rules: [{                                              // 98
                    type: 'checked',                                   // 100
                    prompt: 'You must agree to the terms and conditions'
                }]                                                     //
            }                                                          //
        }                                                              //
    });                                                                //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
