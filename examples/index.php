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


<p class="title is-3" >Install</p>

<div class="notification is-info is-light  elevation"><!--<button class="delete"></button>--><i>npm i pp-mode.js --save</i></div>
<br>
<p class="title is-3" >Initialize</p>
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

<p class="title is-2 underline" >Example:</p>

</div>
</section>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/codemirror.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/mode/javascript/javascript.min.js" integrity="sha512-9miXlEjnHTF+nVGdc2IGOLGTFW2wWkWbd1/7Ltlre+dM53ZSCUQ/PNN+jtsmYqr3ndiD5RW6XQJUm/Hz8JvyOQ==" crossorigin="anonymous"></script>
<script type="text/javascript" src="pp-model.min.js" ></script>
<script type="text/javascript" src="index.js?v=<?=rand(0,5000000000000)?>"></script>
</body>
</html>