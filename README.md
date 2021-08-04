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
```

## Methods

### `getAll`

get all main data

```javascript
var dataRaw = MyModel.getAll();
```
---

### `get`

get value from key of main data

```javascript
var username = MyModel.get('username');
```
---

### `keys`

get all keys from main data

```javascript
var keys = MyModel.keys();
```

---

### `values`

get all values from main data

```javascript
var values = MyModel.values();
```
---

### `has`

check if exists property from main data

```javascript
var exists = MyModel.has('age');
```
---

### `isBoolean`

check if value from key is Boolean

```javascript
console.log(MyModel.isBoolean('age'));
//output = false
```
---

### `isString`

check if value from key is String

```javascript
console.log(MyModel.isString('username'));
//output = true
```

---

### `isEmpty`

Checks if value is an empty object, collection, map, or set.

```javascript
console.log(MyModel.isEmpty('skill'));
//output = false
```
---

### `set`
```javascript
MyModel.set('username','myNewUsername');
```
---

### `omit`
```javascript
MyModel.omit('username','age');
```
---

### `pick`

Creates an object composed of the picked object properties.

```javascript
MyModel.pick('username','age');
```

---

### `stringify`

```javascript
console.log(MyModel.stringify());
//output =
```
