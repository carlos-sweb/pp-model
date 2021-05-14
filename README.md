## Getting Started

In the web project include pp-model.js with:

```html
<script src="https://cdn.jsdelivr.net/npm/pp-events@latest/pp-events.min.js" ></script>
<script src="https://cdn.jsdelivr.net/npm/pp-model.js@latest/pp-model.min.js" ></script>
```

Or

## Install

```console
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
		skill:["Vue.js","Backbone.js","Angular.js","React.js"],
		adress:"Adress, city , contry"
});

// If you want to the listen and filter
MyModel.on('change:salary',function( newValue , oldValue , next ){
	// Example
  if( newValue >= 4500 ){
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
```

## Methods

### `getAll`

```
get all data
```
---

### `get`
```
get data from key
```
---

### `keys`

Native Function [Check](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

---

### `values`

```
Native Function [Check]
```
---

### `has`
```
Native Function [Check]
```
---

### `isBoolean`

```
Checks if value is classified as a boolean primitive or object.
```
---

### `isString`
```
Checks if value is classified as a String primitive or object.
```

---

### `isEmpty`

```
Checks if value is an empty object, collection, map, or set. Objects are considered empty if they have no own enumerable string keyed properties. Array-like values such as arguments objects, arrays, buffers, strings, or jQuery-like collections are considered empty if they have a length of 0. Similarly, maps and sets are considered empty if they have a size of 0.
```
---

### `set`
```
Set a hash of attributes (one or many) on the model. If any of the attributes change the model's state, a "change" event will be triggered on the model. Change events for specific attributes are also triggered, and you can bind to those as well, for example: change:title, and change:content. You may also pass individual keys and values.
```
---

### `omit`
```
Return a copy of the object, filtered to omit the disallowed keys (or array of keys). Alternatively accepts a predicate indicating which keys to omit.
```
---

### `stringify`
```
Native Function [Check]
```
