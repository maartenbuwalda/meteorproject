Template.userItem.helpers({
	checkUser: function (){
		if(Meteor.user().username === this.username){
			return true;
		}
	}
});

Template.userItem.events({
  'click #challenge-btn': function () {
  	console.log(this._id)
    	// Challengers.update(this._id, {$set: {challenged_by:Meteor.user()._id}});
	}
});