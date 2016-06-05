Messages = new Mongo.Collection('messages')

sampleMessage = [
			{text :'text1' , num : 1 ,time : '20160605 12:00:00', from :'db'},
			{text :'text2' , num : 2 ,time : '20160605 10:00:00', from :'db'},
			{text :'text3' , num : 4 ,time : '20160605 08:00:00', from :'db'}
]

if(Meteor.isClient){
	Template.body.helpers({
		messages:function(){
			return Messages.find()
		}
	})
}


if(Meteor.isServer){
	if(Messages.find().count()===0){
		for(let messages of sampleMessage){
			Messages.insert(messages)
		}
	}
}