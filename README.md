# pp-model.js

```
npm i pp-mode.js --save
```

check the <a href="https://pp-model.netlify.app">Documentation</a>


## Getting Started

In the web project include pp-model.js with:

```
<script src="https://cdn.jsdelivr.net/npm/pp-model.js@1.0.7/pp-model.min.js" ></script>
```

Or 

## Install

```
npm i pp-mode.js --save
```

## Initialize

Models are the heart of any JavaScript application.

```javascript
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
		skill:["Vue.js","Backbone.js","Angular.js"],
		adress:"Adress, city , contry"
});

// If you want to change the value
MyModel.set('age',30);

// If you want to get any value
console.log( MyModel.get('age') );
// output = 30
```