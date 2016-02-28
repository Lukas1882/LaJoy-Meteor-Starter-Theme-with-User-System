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
                                // if created, login to the new account
                                if (result == true) {                  // 27
                                    Meteor.loginWithPassword(email, password);
                                    // send confirm email              //
                                }                                      //
                            });                                        //
                        } catch (e) {                                  //
                            console.log(e);                            // 35
                            return;                                    // 36
                        }                                              //
                        swal({                                         // 38
                            title: "Success!",                         // 39
                            text: "Thanks for your register. We have send one email to your email \"" + email + "\" please verify your email address first.",
                            type: "success",                           // 41
                            confirmButtonColor: "#50E1AE",             // 42
                            confirmButtonText: "OK!",                  // 43
                            closeOnConfirm: false                      // 44
                        },                                             //
                        // Redirect to home page.                      //
                        function (isConfirm) {                         // 47
                            window.location = "/";                     // 48
                        });                                            //
                    }                                                  //
            }                                                          //
        });                                                            //
    }                                                                  //
});                                                                    //
                                                                       //
Template.register.onRendered(function () {                             // 56
    $('.ui.form').form({                                               // 57
        on: 'blur',                                                    // 59
        fields: {                                                      // 60
            name: {                                                    // 61
                identifier: 'name',                                    // 62
                rules: [{                                              // 63
                    type: 'empty',                                     // 65
                    prompt: 'Please enter your username'               // 66
                }]                                                     //
            },                                                         //
            email: {                                                   // 70
                identifier: 'email',                                   // 71
                rules: [{                                              // 72
                    type: 'email',                                     // 75
                    prompt: 'Please enter a valid e-mail'              // 76
                }]                                                     //
            },                                                         //
                                                                       //
            password: {                                                // 81
                identifier: 'password',                                // 82
                rules: [{                                              // 83
                    type: 'minLength[6]',                              // 85
                    prompt: 'Your password must be at least {ruleValue} characters'
                }]                                                     //
            },                                                         //
            repassword: {                                              // 90
                identifier: 'repassword',                              // 91
                rules: [{                                              // 92
                    type: 'match[password]',                           // 94
                    prompt: 'Your confirm passward does not match your password'
                }]                                                     //
            },                                                         //
            terms: {                                                   // 99
                identifier: 'terms',                                   // 100
                rules: [{                                              // 101
                    type: 'checked',                                   // 103
                    prompt: 'You must agree to the terms and conditions'
                }]                                                     //
            }                                                          //
        }                                                              //
    });                                                                //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
