# pp-model

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

