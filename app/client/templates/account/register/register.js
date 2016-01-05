


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