
Template.register.events({
    "submit #form": function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        var name = event.target.name.value;
        var email = event.target.email.value;
        var password = event.target.password.value;


        Meteor.call('isEmailExist',email, function(error, result){
            alert(error);
            if (error){
                swal("Sorry", "We have system problem", "error");
                return;
            } else {
                // if this name is valid
                if(!result){
                    swal("Sorry", "This email has been used, please login directly", "error");
                    // 跳转登陆
                    return;
                }
            }
        });


        try {
            Accounts.createUser({
                username: name,
                email: email,
                password: password
            });
        } catch(e){
            alert(e);
            return;
        }
        swal("Success!","Thanks for your register. We have send one email to your email \""+ email +"\" please verify your email address first.","success");

        swal({
                title: "Success!",
                text: "Thanks for your register. We have send one email to your email \""+ email +"\" please verify your email address first.",
                type: "success",
                confirmButtonColor: "#50E1AE",
                confirmButtonText: "OK!",
                closeOnConfirm: false,
            },
            function(isConfirm){
                window.location = "/";
            });



    }
});
Template.register.onRendered(function () {
    $('.ui.form')
        .form({
            on: 'blur',
            fields: {
                name: {
                    identifier: 'name',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter your username'
                        }
                    ]
                },
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
                repassword: {
                    identifier: 'repassword',
                    rules: [
                        {
                            type   : 'match[password]',
                            prompt : 'Your confirm passward does not match your password'
                        }
                    ]
                },
                terms: {
                    identifier : 'terms',
                    rules: [
                        {
                            type   : 'checked',
                            prompt : 'You must agree to the terms and conditions'
                        }
                    ]
                }
            }
        })



});