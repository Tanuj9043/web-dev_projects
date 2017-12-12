var mysql = require('mysql');

var config = {
	host: 'localhost',
	user: 'tanuj',
	password: '12345',
	database: 'shop'
}

var connection = mysql.createConnection(config);

function Connect(){
	connection.connect();
}

function addToCart(id,callback){
	connection.query(`select id from cart where id=${id}`,function(err,data){
		if(err) throw err;
		else if(data==""){
			connection.query(`insert into cart values(${id},1)`,function(err,data){
				callback();
			});
		}
		else{
			connection.query(`update cart set qty = qty + 1 where id=${id}`,function(err,data){
				callback();
			});
		}
	});
}

function addItem(name,price,discount,brand,description,callback){
	connection.query(`insert into items(name,price,discount,brand,description) values('${name}',${price},${discount},'${brand}','${description}')`,function(err,data){
		if(err) throw err;
		else callback();
	});
}

function removeFromCart(id,callback){
	connection.query(`select qty from cart where id=${id}`,function(err,data){
		if(err) throw err;
		else if(data==""){
			callback();
		}
		else if(data[0].qty==1){
			connection.query(`delete from cart where id=${id}`,function(err,data){
				callback();
			});
		}
		else{
			connection.query(`update cart set qty = qty - 1 where id=${id}`,function(err,data){
				callback();
			});
		}
	});
}

function displayItems(callback){
	connection.query(`select * from items`,function(err,data){
		if(err) throw err;
		else callback(data);
	});
}

function displayCart(callback){
	connection.query(`select * from cart natural join items`,function(err,data){
		if(err) throw err;
		else callback(data);
	});
}

module.exports = {
	connect: Connect,
	addItem: addItem,
	removeFromCart: removeFromCart,
	displayItems: displayItems,
	addToCart: addToCart,
	displayCart: displayCart
}