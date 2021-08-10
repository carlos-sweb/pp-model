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

  // You can also the this
  // this.isUndefined
  // this.isString

	// Example
  if( 4000 < newValue ){
    next();
  }
})

// If you want to the listen after change
MyModel.on('changed:salary',function( value ){
    // You can also the this
    // this.isUndefined
    // this.isString
	   console.log('value changed caugth ' + value);

})


// If you want to change the value
MyModel.set('salary',4000); // dont work
MyModel.set('salary',4999);
MyModel.set('age',30);



// If you want to get any value
console.log( MyModel.get('age') );
// output = 30
console.log( MyModel.get('salary') );
// output = 4999
console.log( MyModel.isNumber('salary') );
// output = true

MyModel.isNumber('salary', function( value ){
      //Type your code here
})
