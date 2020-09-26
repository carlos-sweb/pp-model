var ppModel = require("./../pp-model.min.js");

var model = ppModel({
	defaults:{
		name:"Carlos Illesca"
	}
});


var user = new model({
	age:30,
	skill:["vue","backbone","underscore","lodash","voca"]
});

console.log( user.getAll() );




