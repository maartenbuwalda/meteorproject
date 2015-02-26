Template.login.events({
  'click #logout': function () {
  		Meteor.logout(function(err) {
		  // callback
		  Session.set("ses",false);
		});
	}
});