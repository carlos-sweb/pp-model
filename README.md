## Getting Started

In the web project include pp-model.js with:

```html
<script src="https://cdn.jsdelivr.net/npm/pp-is@latest/pp-is.min.js" ></script>
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
```

## Methods

### `isArray` `isBoolean` `isDate` `isElement` `isFunction` `isNull` `isNumber` `isObject` `isString` `isUndefined`

These functions extend from [pp-is](https://github.com/carlos-sweb/pp-is)

```javascript
 // Enter the key to be consulted
 if( MyModel.isString('username') ){

 };
```
or

```javascript
 // Enter the key to be consulted
 MyModel.isString('username', function( value ){
       
 })
```

---

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
