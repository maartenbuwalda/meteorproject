Template.layout.helpers({
	// If there is a match, the layout will be changed to the match layout
	checkMatch: function() {
			var matches = Matches.find().fetch();
			for (var i = 0; i < matches.length; i++){
				if(matches[i].challenger === Meteor.user().username || matches[i].challenged === Meteor.user().username){
					return true;
			}
		}
	}
});