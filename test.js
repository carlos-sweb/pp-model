var ppEvents = require('pp-events');
var ppModel = require('./pp-model.js');

// Declare model here
var model = new ppModel({
  defaults:{
   salary:5000
  }
});

// How to use it ?
var MyModel = new model({
   username:"MyUsername",
   age:33,
   skill:["Vue.js","Backbone.js","Angular.js","React.js"],
   adress:"Adress, city , contry"
});

// If you want to the listen and filter
MyModel.on('change:salary',function( newValue , oldValue , next ){
	// Example
  if( 4000 >= newValue ){    
    next();
  }
})

// If you want to change the value
MyModel.set('salary',4000); // dont work
MyModel.set('age',30);


// If you want to get any value
console.log( MyModel.get('age') );
// output = 30
console.log( MyModel.get('salary') );
// output = 5000