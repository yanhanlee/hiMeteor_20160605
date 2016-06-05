Messages = new Mongo.Collection('messages')

sampleMessage = [
			{text :'text1' , num : 1 ,createdAt : '20160605 12:00:00', from :'jsInput'},
			{text :'text2' , num : 2 ,createdAt : '20160605 10:00:00', from :'jsInput'},
			{text :'text3' , num : 4 ,createdAt : '20160605 08:00:00', from :'jsInput'}
]

if(Meteor.isClient){
	Template.body.helpers({
		messages:function(){
			return Messages.find({}, { sort : { createdAt : -1} ,limit : 5})
		}
	})

	Template.body.events({
		'change #messages': function(event){
			let text = $(event.target).val()
			let num = Messages.find().count()+1
			$(event.target).val('')
			let messages ={
				text,
				num,
				from:'db',
				createdAt: new Date()
			}
			Messages.insert(messages)
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