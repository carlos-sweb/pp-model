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

return all main data

```javascript
var dataRaw = MyModel.getAll();
```
---

### `get`

```javascript
var username = MyModel.get('username');
```
---

### `keys`

Native Function [Check](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

```javascript
var keys = MyModel.keys();
```

---

### `values`

```javascript
var keys = MyModel.values();
```
---

### `has`

```javascript
var exists = MyModel.has('age');
```
---

### `isBoolean`

```javascript
console.log(MyModel.isBoolean('age'));
//output = false
```
---

### `isString`

```javascript
console.log(MyModel.isString('username'));
//output = true
```

---

### `isEmpty`

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
```javascript
MyModel.pick('username','age');
```

---

### `stringify`

```javascript
console.log(MyModel.stringify());
//output = 
```
