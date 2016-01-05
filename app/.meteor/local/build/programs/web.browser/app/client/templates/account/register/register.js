(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/account/register/register.js                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
                                                                       //
Template.register.onRendered(function () {                             // 4
    $('.ui.form').form({                                               // 5
        on: 'blur',                                                    // 7
        fields: {                                                      // 8
            name: {                                                    // 9
                identifier: 'name',                                    // 10
                rules: [{                                              // 11
                    type: 'empty',                                     // 13
                    prompt: 'Please enter your username'               // 14
                }]                                                     //
            },                                                         //
            email: {                                                   // 18
                identifier: 'email',                                   // 19
                rules: [{                                              // 20
                    type: 'email',                                     // 23
                    prompt: 'Please enter a valid e-mail'              // 24
                }]                                                     //
            },                                                         //
                                                                       //
            password: {                                                // 29
                identifier: 'password',                                // 30
                rules: [{                                              // 31
                    type: 'minLength[6]',                              // 33
                    prompt: 'Your password must be at least {ruleValue} characters'
                }]                                                     //
            },                                                         //
            repassword: {                                              // 38
                identifier: 'repassword',                              // 39
                rules: [{                                              // 40
                    type: 'match[password]',                           // 42
                    prompt: 'Your confirm passward does not match your password'
                }]                                                     //
            },                                                         //
            terms: {                                                   // 47
                identifier: 'terms',                                   // 48
                rules: [{                                              // 49
                    type: 'checked',                                   // 51
                    prompt: 'You must agree to the terms and conditions'
                }]                                                     //
            }                                                          //
        }                                                              //
    });                                                                //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
