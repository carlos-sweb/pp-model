# pp-model.js

### How Use ?

```javascript
var model = new ppModel({
	defaults:{
		salary:5000
	}
});

var MyModel = new model({
		username:"MyUsername",
		age:33,
		skill:["Vue.js","Backbone.js","Angular.js"],
		adress:"Adress, city , contry"
});
```

### Methods

#### getAll
>  Obtains all data

```javascript
var data = MyModel.getAll();
```

#### get
>  Obtains data from key

```javascript
var value = MyModel.get(key);
```

#### keys
>  Obtains all keys from data

```javascript
var keys = MyModel.keys();
```

#### values
>  Obtains all values from data

```javascript
var values = MyModel.values();
```

#### has
>  Check if exists key from data

```javascript
var exists = MyModel.has(key);
```

#### isBoolean
>  Verify if is boolean key from data

```javascript
var boolean = MyModel.isBoolean(key);
```

#### isString
> Verify if is string key from data

```javascript
var string = MyModel.isString(key);
```

#### isEmpty
>  Verify if is empty key from data

```javascript
var exists = MyModel.has(key);
```

#### set
>  Change value 

```javascript
var newValue = MyModel.set(key,MyValue);
```

#### pick
>  Return data only key defined

```javascript
var MyData = MyModel.pick(key1,key2,key3);
```

#### omit
> Return data only key not defined

```javascript
var MyData = MyModel.omit(key1,key2);
```
#### stringify
>  return string from object data, Use as JSON.stringify 

```javascript
var stringify = MyModel.stringify(undefined,2);
```

### Events

#### Lisen

> myModel.on("change:username",function);

```javascript
var myModel = MyModel.on("change:username",function(newValue,OldValue,next){

	// Put you code here
	next();
});
```