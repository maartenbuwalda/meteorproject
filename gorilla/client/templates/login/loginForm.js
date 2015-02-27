Template.loginForm.events({
    'submit form': function(event, template){
        event.preventDefault();
        var username = template.find('#login-username').value;
        var password = template.find('#login-password').value;
        Meteor.loginWithPassword(username, password, function(error){
        if (error)
			console.log(error)
        else
          	console.log("Login: Great success!")
     	});
    }
});