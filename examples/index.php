<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/codemirror.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/theme/ayu-mirage.min.css" integrity="sha512-McHJYTvQc4LZQBg2bCgKgDbvGWaSe2ZiDbc3UoMS+ihFI103kl54eKblXb8tBtwhLAh0Yoogy8VXkmZTekMlzA==" crossorigin="anonymous" />
	<style>
.underline{
	text-decoration:underline;
}

.elevation{
  -webkit-box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);	
}

.CodeMirror { 
  border-radius:4px;
  width:100%; 
  height: auto;
  -webkit-box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}
</style>
	<title>pp-model.js</title>
</head>
<body>
<section class="section" >
<div class="container" >
	<h1 class="title is-1 underline">pp-model.js</h1>
    <p class="subtitle">Simple Model Manipualtion</p><hr>

<p class="title is-3">Getting Started</p>
<p>In the web project  include pp-model.js with:</p><br>
<textarea code ><script src="https://cdn.jsdelivr.net/npm/pp-model.js@1.0.4/pp-model.min.js" ></script></textarea>
<br>
<p>OR</p><br>
<p class="title is-4" >Install</p>
<div class="notification is-info is-light  elevation"><!--<button class="delete"></button>--><i>npm i pp-mode.js --save</i></div>
<hr>
<p class="title is-4" >Initialize</p>
<p>Models are the heart of any JavaScript application.</p><br>
<textarea code >// Declare model here
var model = new ppModel({
	defaults:{
		salary:5000
	}
});
// How use ?
var MyModel = new model({
		username:"MyUsername",
		age:33,
		skill:["Vue.js","Backbone.js","Angular.js"],
		adress:"Adress, city , contry"
});
// you would like to change the value
MyModel.set('age',30);

// you would like to get the any value

console.log( MyModel.get('age') );
// output = 30


</textarea><hr>
<p class="title is-3" >Methods</p>
<p class="title is-4 underline">getAll:<span class="has-text-info" >&nbsp;[Function]</span></p>
<div class="notification is-info is-light">get all data</div>
<hr>

<p class="title is-4 underline" >get:<span class="has-text-info" >&nbsp;[Function]</span></p>
<div class="notification is-info is-light">get data from key</div>
<hr>

<p class="title is-4 underline" >keys:<span class="has-text-info" >&nbsp;[Function]</span></p>
<div class="notification is-info is-light">Native Function&nbsp;<a target="_BLANK" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys">[Check]</a></div>
<hr>

<p class="title is-4 underline" >values:<span class="has-text-info" >&nbsp;[Function]</span></p>
<div class="notification is-info is-light">Native Function&nbsp;<a target="_BLANK" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values">[Check]</a></div><hr>

<p class="title is-4 underline" >has:<span class="has-text-info" >&nbsp;[Function]</span></p>
<div class="notification is-info is-light">
	Native Function&nbsp;<a target="_BLANK" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty">[Check]</a>
</div><hr>

<p class="title is-4 underline" >isBoolean:<span class="has-text-info" >&nbsp;[Function]</span></p>
<p class="notification is-info is-light" >Checks if value is classified as a boolean primitive or object.</p><hr>
<p class="title is-4 underline" >isString:<span class="has-text-info" >&nbsp;[Function]</span></p>
<p class="notification is-info is-light" >Checks if value is classified as a String primitive or object.</p><hr>

<p class="title is-4 underline" >isEmpty:<span class="has-text-info" >&nbsp;[Function]</span></p>
<p class="notification is-info is-light">Checks if value is an empty object, collection, map, or set.

Objects are considered empty if they have no own enumerable string keyed properties.

Array-like values such as arguments objects, arrays, buffers, strings, or jQuery-like collections are considered empty if they have a length of 0. Similarly, maps and sets are considered empty if they have a size of 0.</p><hr>

<p class="title is-4 underline" >set:<span class="has-text-info" >&nbsp;[Function]</span></p>
<p class="notification is-info is-light" >Set a hash of attributes (one or many) on the model. If any of the attributes change the model's state, a "change" event will be triggered on the model. Change events for specific attributes are also triggered, and you can bind to those as well, for example: change:title, and change:content. You may also pass individual keys and values.</p><hr>

<p class="title is-4 underline" >omit:<span class="has-text-info" >&nbsp;[Function]</span></p>
<p class="notification is-info is-light" >Return a copy of the object, filtered to omit the disallowed keys (or array of keys). Alternatively accepts a predicate indicating which keys to omit.</p><hr>

<p class="title is-4 underline" >stringify:<span class="has-text-info" >&nbsp;[Function]</span></p>
<p class="notification is-info is-light">Native Function&nbsp;<a target="_BLANK" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify">[Check]</a></p><hr>
<p class="title is-3" >Events</p>
<p class="title is-4 underline" >on:<span class="has-text-info" >&nbsp;[Function]</span></p>
<p class="notification is-info is-light">Bind a callback function to an object. The callback will be invoked whenever the event is fired. If you have a large number of different events on a page, the convention is to use colons to namespace them: "poll:start", or "change:selection". The event string may also be a space-delimited list of several events...</p>
<textarea code >MyModel.on("change:username",function( newValue , OldValue , next ){
	// Put you code here
	next();
})</textarea>
<hr>

<div class="columns is-vcentered" >
	<div class="column " >
		<figure class="image is-128x128">
<img class="is-rounded elevation"  src="https://avatars3.githubusercontent.com/u/15951745?s=128&u=8a6fe8190c3b8f8827026a051fc5c5523a0b92a5&v=4" alt="">	
</figure>

	</div>
	<div class="column is-four-fifths" >
		<p>You can contact me by e-mail <a href="mailto:c4rl0sill3sc4@gmail.com">c4rl0sill3sc4@gmail.com</a></p>
	</div>
</div>





</div>
</section>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/codemirror.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/mode/javascript/javascript.min.js" integrity="sha512-9miXlEjnHTF+nVGdc2IGOLGTFW2wWkWbd1/7Ltlre+dM53ZSCUQ/PNN+jtsmYqr3ndiD5RW6XQJUm/Hz8JvyOQ==" crossorigin="anonymous"></script>	
<script type="text/javascript" src="pp-model.min.js" ></script>
<script type="text/javascript" src="index.js?v=<?=rand(0,5000000000000)?>"></script>
</body>
</html>