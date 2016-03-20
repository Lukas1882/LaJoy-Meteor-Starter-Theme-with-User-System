
Template.login.events({
    "submit #loginForm": function (event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        var email = event.target.email.value;
        var password = event.target.password.value;
        try {
            Meteor.loginWithPassword(email, password, function(error, result){
                if (error){
                    swal("Sorry", "Please try again for your email and password", "error");
                    return;
                } else {
                    Router.go('home');
                }
            });
        } catch(e){
            swal("Sorry", "This email has been used, please login directly", "error");
            console.log(e);
            return;
        }
    }
});



Template.login.onRendered(function () {
    $('.ui.form')
        .form({
            on: 'blur',
            fields: {
                email: {
                    identifier  : 'email',
                    rules: [

                        {
                            type   : 'email',
                            prompt : 'Please enter a valid e-mail'
                        }
                    ]
                },

                password: {
                    identifier: 'password',
                    rules: [
                        {
                            type   : 'minLength[6]',
                            prompt : 'Your password must be at least {ruleValue} characters'
                        }
                    ]
                },
            }
        })
});