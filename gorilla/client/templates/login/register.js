Template.registerForm.events({
'submit form': function(event, template){
	    event.preventDefault();
	    var username = template.find('#account-username').value;
	    var password = template.find('#account-password').value;
	    var color = template.find('#account-color').value;
	    console.log(username, password, color);

	    Accounts.createUser({
		    username: username,
		    password: password,
		    profile: {
		    	color: color
		    }
		});

		Challengers.insert({
			_id: username,
			challenged: '',
			losses: 0,
			wins: 0
		});
	}
});