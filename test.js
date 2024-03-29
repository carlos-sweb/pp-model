var ppModel = require('./pp-model.min.js');
// Declare model here
var model = new ppModel({
  defaults:{
   salary:5000
  },
  rules:{
    age:"numeric|range:30,40"
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
    //console.log(`Lisen next()`);
    next();
  }

})

// If you want to the listen after change
MyModel.on('changed:salary',function( value ){
    // You can also the this
    // this.isUndefined
    // this.isString
	   console.log(`value changed caugth MyModel  ${value}`);

})


// If you want to the listen after any change
MyModel.on('changed',function(key , value){
   // You can also the this
    // this.isUndefined
    // this.isString
    console.log(`value changed caugth MyModel  ${value} from ${key}`);

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

// check https://github.com/carlos-sweb/pp-validate
var result =  MyModel.validate({
   name:"minlength:6",
   salary:"number",
   age:"number|range:18,45"
});

console.log( result );