Meteor.subscribe("users");

Template.usersList.helpers({
	users: function(){
		// var data = Meteor.call('getUsernames', function(error, result){
		// 	// console.log(result);
		// 	return result;
		// });
		return Meteor.users.find();
	}
});