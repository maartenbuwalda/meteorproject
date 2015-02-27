Meteor.subscribe("challengers");

Template.userItem.helpers({
	// Because users and challengers are two different collections, 
	// we have to return the challengers to add their score to the userlist
	challengers: function() {
		var challengers = Challengers.find().fetch();

		for(var i = 0; i < challengers.length; i++){
			if(challengers[i]._id === this.username){
				return challengers[i];
			}
		}
	},
	// Check if this user is the current user. If so, add 'This is you'
	checkUser: function () {
		if(Meteor.user().username === this.username){
			return true;
		}
	},
	// Check who you have challenged
	checkOwnChallenge: function() {
		var challengers = Challengers.find().fetch();

		for(var i = 0; i < challengers.length; i++){
			if(challengers[i]._id === Meteor.user().username && challengers[i].challenged === this.username){
				return true;
			}
		}
	},
	// Check who the enemy has challenged. If this is you, an 'accept' button will be showed
	checkEnemyChallenge: function() {
		var challengers = Challengers.find().fetch();

		for(var i = 0; i < challengers.length; i++){
			if(challengers[i]._id === this.username && challengers[i].challenged === Meteor.user().username){
				return true;
			}
		}
	}
});

Template.userItem.events({
	// Set the click events for the user list: challenge, cancel, accept
  'click #challenge-btn': function () {
  		Challengers.update(
		   { _id: Meteor.user().username },
		   { $set:
		      {
		      	challenged: this.username
		      }
		   }
		)
	},
	// On cancel, clear the challenged field
	'click #cancel-btn': function () {
  		Challengers.update(
		   { _id: Meteor.user().username },
		   { $set:
		      {
		      	challenged: ''
		      }
		   }
		)
	},
	// On accept, insert and set a match. 
	// The 'challenged' fields are wiped, because there is already a match.
	'click #accept-btn': function () {
		Matches.insert({
			_id: this.username + "-match",
			challenger: this.username,
			challengerColor: this.profile.color,
			challengerPoints: 0,
			challenged: Meteor.user().username,
			challengedColor: Meteor.user().profile.color,
			challengedPoints: 0
		});
		Challengers.update(
		   { _id: Meteor.user().username },
		   { $set:
		      {
		      	challenged: ''
		      }
		   }
		);
		Challengers.update(
		   { _id: this.username },
		   { $set:
		      {
		      	challenged: ''
		      }
		   }
		);
	},
});