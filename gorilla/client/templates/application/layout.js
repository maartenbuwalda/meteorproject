Template.layout.helpers({
	checkMatch: function() {
		console.log('test')
			var matches = Matches.find().fetch();
			for (var i = 0; i < matches.length; i++){
				console.log('test 2')
				if(matches[i].challenger === Meteor.user().username || matches[i].challenged === Meteor.user().username){
					return true;
			}
		}
	}
});