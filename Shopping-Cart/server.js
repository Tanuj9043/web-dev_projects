var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = require('./db.js');

app.use('/',express.static('public'));
app.use('/manager',express.static('manager'));
app.use('/customer',express.static('customer'));

app.get('/manager/getItem',function(req,res){
	db.displayItems(function(data){
		res.send(data);
	});
});

app.get('/customer/getItem',function(req,res){
	db.displayItems(function(data){
		res.send(data);
	});
});

app.get('/customer/getCart',function(req,res){
	db.displayCart(function(data){
		res.send(data);
	});
});

app.post('/manager/addItem',function(req,res){
	var Obj = req.body;
	db.addItem(Obj.name, Obj.price, Obj.discount, Obj.brand, Obj.description, function(){
		db.displayItems(function(data){
			res.send(data);
		});
	});
});

app.post('/customer/addToCart',function(req,res){
	var Obj = req.body;
	db.addToCart(Obj.id,function(){
		db.displayCart(function(data){
			res.send(data);
		});
	});
});

app.post('/customer/removeFromCart',function(req,res){
	var Obj = req.body
	db.removeFromCart(Obj.id,function(){
		db.displayCart(function(data){
			res.send(data);
		});
	});
});

app.listen(port, function(){
	console.log(`Server listening on port ${port}`);
});