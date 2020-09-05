var model = new ppModel({
	
	defaults:{
		
		salary:50000

	}
});

var myModel = new model({
	
	username:"MyUsername",
	
	age:33,
	
	skill:[
		"Vue.js",
		"Backbone.js",
		"Angular.js"
	],
	
	adress:"Adress, city , contry"

});

myModel.set("age",55);

var div = document.getElementById("showmy");

div.innerText = myModel.stringify(undefined,3);