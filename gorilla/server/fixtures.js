if (Challengers.find().count() === 0) {
	for (var i = 0; i < Meteor.users.find().count(); i++){
		Challengers.insert({
			_id: Meteor.users.find().fetch()[i].username,
			challenged: '',
			match: '',
			wins: 0,
			losses: 0
		});
	}
}
