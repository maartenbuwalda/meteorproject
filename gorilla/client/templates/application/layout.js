Template.layout.helpers({
	checkMatch: function() {
		var matches = Matches.find().fetch();
		for (var i = 1; i < matches.length; i++){
			if(matches[i].challenger === Meteor.user().username || matches[i].challenged === Meteor.user().username){
				return true;
			}
		}
	}
});