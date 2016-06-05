if(Meteor.isClient){
	Template.body.helpers({
		messages:[
			{text :'text1' , num : 1 ,time : '20160605 12:00:00'},
			{text :'text2' , num : 2 ,time : '20160605 10:00:00'},
			{text :'text3' , num : 4 ,time : '20160605 08:00:00'}
		]
	})
}

