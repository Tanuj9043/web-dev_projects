var Items = [];
var cartItems = [];
$(document).ready(function(){
	$.ajax({
		url: '/manager/getItem',
		success: function(data){
			Items=data;
			displayItems();
		}
	});
	$.ajax({
		url: '/customer/getCart',
		success: function(data){
			cartItems=data;
			displayCart();
		}
	});
});

function displayItems(){
	var x="";
	var value=0;
	for(let i=Items.length - 1; i>=0; i--){
		value = parseFloat(parseFloat(Items[i].price)-(parseFloat(Items[i].discount)*parseFloat(Items[i].price))/100).toFixed(2);
		x+=	'<div class="card border-info" style="max-width: 15rem; margin-left:3px;">'+
			  	'<div class="card-header border-info d-flex">'+
			  		'<div class="container-well text-left text-info" style="width: 60%;">'+
			  			'<h4 class="card-title text-center text-info" style="margin: auto;">'+Items[i].name+'</h4>'+
			  		'</div>'+
			  		'<div class="container-well text-right" style="width: 40%;">'+
			  			'<button type="button" class="btn btn-outline-primary mx-1" id=' + Items[i].id +' onclick="addItem(this)">+</button>'+
			  			'<button type="button" class="btn btn-outline-danger" id=' + Items[i].id +' onclick="removeItem(this)">-</button>'+
			  		'</div>'+
				'</div>'+
			  	'<div class="card-body" style="padding: 5px;">'+
			  		'<h5 class="card-title">Brand: '+Items[i].brand+'</h5>'+
			    '<p class="card-text">'+Items[i].description+'</p>'+
			  	'</div>'+
			  	'<div class="card-footer border-info d-flex" style="padding: 10px;">'+
			  		'<div class="container-well text-left text-danger" style="width: 50%;">'+
			  			'<i class="fa fa-inr" aria-hidden="true"></i><s>'+Items[i].price+'</s> '+Items[i].discount+'% off'+
			  		'</div>'+
			  		'<div class="container-well text-right text-primary" style="width: 50%;">'+
			  			'<i class="fa fa-inr" aria-hidden="true"></i>'+value+
			  		'</div>'+
			  	'</div>'+
			'</div>';
	}
	$('#itemList').html(x);
}

function displayCart(){
	var x="";
	var total=0;
	var value=0;
	for(let i=0; i<cartItems.length; i++){
		value = parseFloat(parseFloat(cartItems[i].price)-(parseFloat(cartItems[i].discount)*parseFloat(cartItems[i].price))/100).toFixed(2);
		total = parseFloat(parseFloat(total)+parseFloat(value)*parseFloat(cartItems[i].qty)).toFixed(2);
		x+=	'<div class="card border-info" style="max-width: 15rem; margin-left:3px;">'+
			  	'<div class="card-header border-info">'+
			  		'<h4 class="card-title text-center text-info" style="margin: auto;">'+cartItems[i].name+'</h4>'+
				'</div>'+
			  	'<div class="card-body" style="padding: 5px;">'+
			  		'<h5 class="card-title">Brand: '+cartItems[i].brand+'</h5>'+
			    '<p class="card-text">'+cartItems[i].description+'</p>'+
			  	'</div>'+
			  	'<div class="card-footer border-info d-flex" style="padding: 10px;">'+
			  		'<div class="container-well text-left text-danger" style="width: 50%;">'+
			  			'Quantity : '+cartItems[i].qty+
			  		'</div>'+
			  		'<div class="container-well text-right text-primary" style="width: 50%;">'+
			  			'<i class="fa fa-inr" aria-hidden="true"></i>'+value+
			 	 	'</div>'+
			  	'</div>'+
			'</div>';
	}
	$('#cartList').html(x);
	var temp = parseInt(total);
	$('#total').val(temp);
	temp = parseFloat(parseFloat(total)-parseInt(temp)).toFixed(2);
	temp = temp.toString();
	temp = temp.substring(1,4);
	$('#decimal').html(temp);
}

function addItem(el){
	var data={
		id : el.id
	}
	$.post({
		url: '/customer/addToCart',
		data,
		success: function(data){
			cartItems = data;
			displayCart();
		}
	});
}

function removeItem(el){
	var data={
		id : el.id
	}
	$.post({
		url: '/customer/removeFromCart',
		data,
		success: function(data){
			cartItems = data;
			displayCart();
		}
	});
}