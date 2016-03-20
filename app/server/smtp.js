Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://[username]:[password]@smtp.sendgrid.net:587';
});