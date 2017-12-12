var dataArray = [];
$(document).ready(function(){
	var n = $('#name');
	var p = $('#price');
	var d = $('#discount');
	var des = $('#description');
	var b = $('#brand');
	var addBtn = $('#addBtn');

	$.ajax({
		url: '/manager/getItem',
		success: function(data){
			dataArray=data;
			display();
		}
	});

	addBtn.click(function(){
		var data = {
			name : n.val(),
			brand : b.val(),
			description : des.val(),
			price : p.val(),
			discount : d.val(),
		}
		console.log(data);
		$.post({
			url: '/manager/addItem',
			data,
			success: function(data){
				dataArray = data;
				display();
			}
		});
	});
});

function display(){
	var x="";
	var value=0;
	for(let i=dataArray.length - 1; i>=0; i--){
		value = parseFloat(parseFloat(dataArray[i].price)-(parseFloat(dataArray[i].discount)*parseFloat(dataArray[i].price))/100).toFixed(2);
		x+=	'<div class="card border-info" style="max-width: 15rem; margin-left:3px;">'+
			  	'<div class="card-header border-info">'+
			  		'<h4 class="card-title text-center text-info" style="margin: auto;">'+dataArray[i].name+'</h4>'+
				'</div>'+
			  	'<div class="card-body" style="padding: 5px;">'+
			  		'<h5 class="card-title">Brand: '+dataArray[i].brand+'</h5>'+
			    '<p class="card-text">'+dataArray[i].description+'</p>'+
			  	'</div>'+
			  	'<div class="card-footer border-info d-flex" style="padding: 10px;">'+
			  		'<div class="container-well text-left text-danger" style="width: 50%;">'+
			  			'<i class="fa fa-inr" aria-hidden="true"></i><s>'+dataArray[i].price+'</s> '+dataArray[i].discount+'% off'+
			  		'</div>'+
			  		'<div class="container-well text-right text-primary" style="width: 50%;">'+
			  			'<i class="fa fa-inr" aria-hidden="true"></i>'+value+
			  		'</div>'+
			  	'</div>'+
			'</div>';
	}
	$('#list').html(x);
}