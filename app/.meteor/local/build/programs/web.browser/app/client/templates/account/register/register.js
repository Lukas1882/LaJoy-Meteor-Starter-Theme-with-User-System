(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/account/register/register.js                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
Template.register.events({                                             // 2
    "submit #registerForm": function (event) {                         // 3
        // Prevent default browser form submit                         //
        event.preventDefault();                                        // 5
        // Get value from form element                                 //
        var name = event.target.name.value;                            // 7
        var email = event.target.email.value;                          // 8
        var password = event.target.password.value;                    // 9
                                                                       //
        Meteor.call('isEmailExist', email, function (error, result) {  // 12
            if (error) {                                               // 13
                console.log(error);                                    // 14
                swal("Sorry", "We have system problem", "error");      // 15
                return;                                                // 16
            } else {                                                   //
                // if this name is valid                               //
                if (!result) {                                         // 19
                    swal("Sorry", "This email has been used, please login directly", "error");
                    // 跳转登陆                                            //
                } else {                                               //
                        try {                                          // 23
                            Meteor.call('addAccount', name, email, password, function (error, result) {
                                // if created, login to the new account
                                if (result == true) {                  // 26
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
                        },                                             //
                        // Redirect to home page.                      //
                        function (isConfirm) {                         // 46
                            window.location = "/";                     // 47
                        });                                            //
                    }                                                  //
            }                                                          //
        });                                                            //
    }                                                                  //
});                                                                    //
                                                                       //
Template.register.onRendered(function () {                             // 55
    $('.ui.form').form({                                               // 56
        on: 'blur',                                                    // 58
        fields: {                                                      // 59
            name: {                                                    // 60
                identifier: 'name',                                    // 61
                rules: [{                                              // 62
                    type: 'empty',                                     // 64
                    prompt: 'Please enter your username'               // 65
                }]                                                     //
            },                                                         //
            email: {                                                   // 69
                identifier: 'email',                                   // 70
                rules: [{                                              // 71
                    type: 'email',                                     // 74
                    prompt: 'Please enter a valid e-mail'              // 75
                }]                                                     //
            },                                                         //
                                                                       //
            password: {                                                // 80
                identifier: 'password',                                // 81
                rules: [{                                              // 82
                    type: 'minLength[6]',                              // 84
                    prompt: 'Your password must be at least {ruleValue} characters'
                }]                                                     //
            },                                                         //
            repassword: {                                              // 89
                identifier: 'repassword',                              // 90
                rules: [{                                              // 91
                    type: 'match[password]',                           // 93
                    prompt: 'Your confirm passward does not match your password'
                }]                                                     //
            },                                                         //
            terms: {                                                   // 98
                identifier: 'terms',                                   // 99
                rules: [{                                              // 100
                    type: 'checked',                                   // 102
                    prompt: 'You must agree to the terms and conditions'
                }]                                                     //
            }                                                          //
        }                                                              //
    });                                                                //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
