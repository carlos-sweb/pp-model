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

## Methods

### getAll: [Function]

```
get all data
```

### get: [Function]
```
get data from key
```
### keys: [Function]

___Native Function [Check](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)___

### values: [Function]

```
Native Function [Check]
```

### has: [Function]
```
Native Function [Check]
```
### isBoolean: [Function]

```
Checks if value is classified as a boolean primitive or object.
```
### isString: [Function]
```
Checks if value is classified as a String primitive or object.
```

### isEmpty: [Function]

```
Checks if value is an empty object, collection, map, or set. Objects are considered empty if they have no own enumerable string keyed properties. Array-like values such as arguments objects, arrays, buffers, strings, or jQuery-like collections are considered empty if they have a length of 0. Similarly, maps and sets are considered empty if they have a size of 0.
```
### set: [Function]
```
Set a hash of attributes (one or many) on the model. If any of the attributes change the model's state, a "change" event will be triggered on the model. Change events for specific attributes are also triggered, and you can bind to those as well, for example: change:title, and change:content. You may also pass individual keys and values.
```
### omit: [Function]
```
Return a copy of the object, filtered to omit the disallowed keys (or array of keys). Alternatively accepts a predicate indicating which keys to omit.
```
### stringify: [Function]
```
Native Function [Check]
```
## Events

### on: [Function]