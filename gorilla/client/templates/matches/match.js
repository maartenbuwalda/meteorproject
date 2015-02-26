Meteor.subscribe("matches");

var currentMatch = []
var challenger = {}
var challenged = {}

Template.match.helpers({
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
	'click #player1-hit': function () {
		currentMatch.challengerPoints ++;
  		Matches.update(
		   { _id: currentMatch._id },
		   { $set:
		      {
		      	challengerPoints: currentMatch.challengerPoints,
		      }
		   }
		)
		if(currentMatch.challengerPoints === 10){
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
	},
	'click #player2-hit': function () {
		console.log(challenged.wins);
  		currentMatch.challengedPoints ++;
  		Matches.update(
		   { _id: currentMatch._id },
		   { $set:
		      {
		      	challengedPoints: currentMatch.challengedPoints,
		      }
		   }
		)
		if(currentMatch.challengedPoints === 100){
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
			Matches.remove( {"_id": currentMatch._id});
		}
	}
});