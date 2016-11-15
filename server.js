var express=require("express");
var app=express();

app.use(express.static(__dirname + "/public"));

app.set("port",process.env.PORT || 2010);//hvhyu

app.listen(app.get("port"),function() {
	console.log("servidor encendido");
});