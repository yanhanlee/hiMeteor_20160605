
Messages = new Mongo.Collection('messages')


sampleMessage = [
			{text :'text1' , num : 1 ,createdAt : '20160605 12:00:00', from :'jsInput'},
			{text :'text2' , num : 2 ,createdAt : '20160605 10:00:00', from :'jsInput'},
			{text :'text3' , num : 4 ,createdAt : '20160605 08:00:00', from :'jsInput'}
]

Router.route( '/', function(){
	this.render('chatroom')
})

if(Meteor.isClient){

	Meteor.startup(function(){
		Accounts.ui.config({
		passwordSignupFields:'USERNAME_ONLY',
		});
	});


	Template.chatroom.helpers({
		messages:function(){
			return Messages.find({}, { limit : 5})
		}
	})

	Meteor.subscribe("messages")

	Template.chatroom.events({
		'change #messages': function(event){
			let text = $(event.target).val()
			$(event.target).val('')
			let messages ={
				text
			}
			Meteor.call('createMessages', messages)
		}
		
	})

}


if(Meteor.isServer){
	if(Messages.find().count()===0){
		for(let messages of sampleMessage){
			Messages.insert(messages)
		}
	}

	Meteor.methods({
		createMessages : function(messages){
			let user = Meteor.user()
			if(user){
				messages.userId = Meteor.user().username
				messages.num = Messages.find().count()+1
				messages.createdAt = moment().format("hh:mm:ss")
				messages.from = 'db'
				Messages.insert(messages)
			}
		}

	})

	Meteor.publish("messages", function(){
		 return Messages.find({}, { sort : { createdAt : -1} ,limit : 3})
	})
}