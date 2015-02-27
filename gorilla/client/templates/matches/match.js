Meteor.subscribe("matches");

// Set empty vars which will be filled by the helper function
var currentMatch = []
var challenger = {}
var challenged = {}

Template.match.helpers({
	// Get info about the currentmatch, and fill in the empty vars
	matches: function(){
		var matches = Matches.find().fetch();
		var challengers = Challengers.find().fetch();

		for(var i = 0; i < challengers.length; i++){
			if(challengers[i]._id === currentMatch.challenger) {
				challenger = challengers[i];
			} else if(challengers[i]._id === currentMatch.challenged) {
				challenged = challengers[i];
			}
		}

		for(var i = 0; i < matches.length; i++){
			if(matches[i].challenger === Meteor.user().username || matches[i].challenged === Meteor.user().username){
				currentMatch = matches[i];
				return matches[i];
			}
		}
	}
});

Template.match.events({
	// Set click events for the match 'hit' button
	'click #hit-btn': function () {
		if(Meteor.user().username === currentMatch.challenged){
			// Add points the challenged player
	  		currentMatch.challengedPoints ++;
	  		Matches.update(
			   { _id: currentMatch._id },
			   { $set:
			      {
			      	challengedPoints: currentMatch.challengedPoints,
			      }
			   }
			)
			// At 50 points, the challenged wins, and the challenger loses
			if(currentMatch.challengedPoints === 50){
				challenged.wins ++;
				challenger.losses ++;
				Challengers.update(
				   { _id: currentMatch.challenged },
				   { $set:
				      {
				      	wins: challenged.wins
				      }
				   }
				)
				Challengers.update(
				   { _id: currentMatch.challenger },
				   { $set:
				      {
				      	losses: challenger.losses
				      }
				   }
				)
				// This match is done, the wins and losses have been counted, so let's remove the match
				Matches.remove( {"_id": currentMatch._id});
			}
		} else if (Meteor.user().username === currentMatch.challenger) {
			currentMatch.challengerPoints ++;
	  		Matches.update(
			   { _id: currentMatch._id },
			   { $set:
			      {
			      	challengerPoints: currentMatch.challengerPoints,
			      }
			   }
			)
			if(currentMatch.challengerPoints === 50){
				challenger.wins ++;
				challenged.losses ++;
				Challengers.update(
				   { _id: currentMatch.challenger },
				   { $set:
				      {
				      	wins: challenger.wins
				      }
				   }
				)
				Challengers.update(
				   { _id: currentMatch.challenged },
				   { $set:
				      {
				      	losses: challenged.losses
				      }
				   }
				)
				Matches.remove( {"_id": currentMatch._id});
			}
		}
	}
});