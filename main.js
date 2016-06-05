if(Meteor.isClient){
	Template.body.helpers({
		messages:[
			{text :'text1' , num : 1 , num2 : 3},
			{text :'text2' , num : 2},
			{text :'text3' , num : 3}
		]
	})
}