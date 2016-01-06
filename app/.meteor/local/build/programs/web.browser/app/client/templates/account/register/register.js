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
            alert(error);                                              // 14
            if (error) {                                               // 15
                swal("Sorry", "We have system problem", "error");      // 16
                return;                                                // 17
            } else {                                                   //
                // if this name is valid                               //
                if (!result) {                                         // 20
                    swal("Sorry", "This email has been used, please login directly", "error");
                    // 跳转登陆                                            //
                    return;                                            // 23
                }                                                      //
            }                                                          //
        });                                                            //
                                                                       //
        try {                                                          // 29
            Accounts.createUser({                                      // 30
                username: name,                                        // 31
                email: email,                                          // 32
                password: password                                     // 33
            });                                                        //
        } catch (e) {                                                  //
            alert(e);                                                  // 36
            return;                                                    // 37
        }                                                              //
        swal("Success!", "Thanks for your register. We have send one email to your email \"" + email + "\" please verify your email address first.", "success");
                                                                       //
        swal({                                                         // 41
            title: "Success!",                                         // 42
            text: "Thanks for your register. We have send one email to your email \"" + email + "\" please verify your email address first.",
            type: "success",                                           // 44
            confirmButtonColor: "#50E1AE",                             // 45
            confirmButtonText: "OK!",                                  // 46
            closeOnConfirm: false                                      // 47
        }, function (isConfirm) {                                      //
            window.location = "/";                                     // 50
        });                                                            //
    }                                                                  //
});                                                                    //
Template.register.onRendered(function () {                             // 57
    $('.ui.form').form({                                               // 58
        on: 'blur',                                                    // 60
        fields: {                                                      // 61
            name: {                                                    // 62
                identifier: 'name',                                    // 63
                rules: [{                                              // 64
                    type: 'empty',                                     // 66
                    prompt: 'Please enter your username'               // 67
                }]                                                     //
            },                                                         //
            email: {                                                   // 71
                identifier: 'email',                                   // 72
                rules: [{                                              // 73
                    type: 'email',                                     // 76
                    prompt: 'Please enter a valid e-mail'              // 77
                }]                                                     //
            },                                                         //
                                                                       //
            password: {                                                // 82
                identifier: 'password',                                // 83
                rules: [{                                              // 84
                    type: 'minLength[6]',                              // 86
                    prompt: 'Your password must be at least {ruleValue} characters'
                }]                                                     //
            },                                                         //
            repassword: {                                              // 91
                identifier: 'repassword',                              // 92
                rules: [{                                              // 93
                    type: 'match[password]',                           // 95
                    prompt: 'Your confirm passward does not match your password'
                }]                                                     //
            },                                                         //
            terms: {                                                   // 100
                identifier: 'terms',                                   // 101
                rules: [{                                              // 102
                    type: 'checked',                                   // 104
                    prompt: 'You must agree to the terms and conditions'
                }]                                                     //
            }                                                          //
        }                                                              //
    });                                                                //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
