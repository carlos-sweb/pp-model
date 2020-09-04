var model = new ppModel({
	defaults:{
		lab:"Chile",
		name:"Naproxeno",
		price:3000,
		mg:"500mg"
	}
});
var algo = new model({});
var a = document.getElementById("showmy");
a.innerText = algo.stringify(undefined,2);