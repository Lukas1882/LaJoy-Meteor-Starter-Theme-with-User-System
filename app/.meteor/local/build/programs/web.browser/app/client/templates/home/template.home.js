(function(){
Template.__checkName("Home");
Template["Home"] = new Template("Template.Home", (function() {
  var view = this;
  return HTML.Raw('<div class="ui container">\n        <div class="ui one column grid" style="padding-top:50px">\n            <h1>Meteor User-Account Starter</h1>\n        </div>\n        <br>\n        <br>\n        <div class="ui segment">\n            This is a simple Meteor Web-APP Starter, also my first Meteor APP.\n            <br>\n            User can sign-up and login. SendGrid is used to send the confirmation email. You can find more details about the plugins and tools by the "Meteor List", which I included in the README.\n            <br>\n            <br>\n            You may noticed there is a "sign in" plugin at the top right corner. Yes, it is the login plugin from Meteor. I put it there for monitor and debug my own login system. Go ahead and play with it.\n        </div>\n        <br>\n        <br>\n        <button onclick="location.href=\'register\'" class="ui blue button">Sign Up</button>\n        <button onclick="location.href=\'login\'" class="ui green button">Sign in</button>\n\n    </div>');
}));

}).call(this);
