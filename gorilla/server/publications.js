// Meteor.publish("userData", function () {
//     return Meteor.users.find({},
//                              {fields: {'username': 1}});
// });

// Users = Meteor.users;

// Meteor.publish('users', function() {
// 	return Meteor.users.find().fetch();
// });

Meteor.methods({
	'getUsernames' : function(){
		// console.log(Meteor.users.find().fetch())
		return Meteor.users.find().fetch();
	}
})