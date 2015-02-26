Meteor.subscribe("challengers");

Template.userItem.helpers({
	challengers: function() {
		var challengers = Challengers.find().fetch();

		for(var i = 0; i < challengers.length; i++){
			if(challengers[i]._id === this.username){
				return challengers[i];
			}
		}
	},
	checkUser: function () {
		if(Meteor.user().username === this.username){
			return true;
		}
	},
	checkOwnChallenge: function() {
		var challengers = Challengers.find().fetch();

		for(var i = 0; i < challengers.length; i++){
			if(challengers[i]._id === Meteor.user().username && challengers[i].challenged === this.username){
				return true;
			}
		}
	},
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
	'click #accept-btn': function () {
		Matches.insert({
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
		)
		Challengers.update(
		   { _id: this.username },
		   { $set:
		      {
		      	challenged: ''
		      }
		   }
		)
	},
});