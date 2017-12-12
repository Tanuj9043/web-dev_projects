var z=7;
var DATA=[];
var disp=0;
function initMap() {
	var map;
	var uluru;
	var marker = [];
	if(disp==0) {
		uluru = {
			lat: 51.4826,
			lng: 0
		};
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: uluru
		});
	}
	else {
		uluru = {
			lat: parseFloat(DATA[0].venue.location.lat),
			lng: parseFloat(DATA[0].venue.location.lng)
		};
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: uluru
		});
		for(let i=0; i<5; i++) {
			let temp = {
				lat: parseFloat(DATA[i].venue.location.lat),
				lng: parseFloat(DATA[i].venue.location.lng)
			}
			marker[i] = new google.maps.Marker({
				map: map,
				position: temp
			});
		}
		for(let i=0; i<marker.length; i++) {
			google.maps.event.addListener(marker[i], 'click', function(){
				$('.cardList').css({
					'background-color': 'white'
				});
				$('#'+i).css({
					'background-color': 'blanchedalmond'
				});
			});
		}
	}
	google.maps.event.addListenerOnce(map, 'idle', function () {
		google.maps.event.trigger(map, 'resize');
		map.setCenter(uluru);
	});
}
$(document).ready(function(){
	var loader = $('#ld');
	var overlay = $('#orlay');
	var showBtn = $('#showBtn');
	var place = $('#place');
	var main = $('.main');
	var cards = $('.cards');
	var closeBtn = $('#closeBtn');
	var near;
	var section;
	var list;
	var client_id = 'MLBWT3RFA5BU535D0G2I3PQ4HWSQYMWZMME3RQ0RUAB44ESO';
	var client_secret = '1QXKJG4BQF4R1S5YVWLIFRFD0S1HSXDBDRDCNUKFLEMIMD3X';
	var endpoint = 'https://api.foursquare.com/v2/venues/explore?';
	var url;

	showBtn.click(function(){
		$('.cardList').remove();
		overlay.css({
			'display': 'block'
		});
		loader.css({
			'display': 'block'
		});
		list = $('#placeType option:selected');
		near = place.val();
		section = (list.text()).toLowerCase();
		url = endpoint + 'near=' + near + '&section=' + section + '&limit=5' + '&client_id=' + client_id + '&client_secret=' + client_secret + '&v=20171001' + '&m=foursquare';
		
		AjaxRequest(url, function(d) {
			disp=1;
			DATA=d.response.groups[0].items;
			setData();
			initMap();
			main.css({
				'display': 'flex',
				'flex-wrap': 'wrap'
			});
			loader.css({
				'display': 'none'
			});
		});
	});
	
	closeBtn.click(function(){
		overlay.css({
			'display': 'none'
		});
		loader.css({
			'display': 'none'
		});
		main.css({
			'display': 'none'
		});
	});
	
	overlay.click(function(){
		overlay.css({
			'display': 'none'
		});
		loader.css({
			'display': 'none'
		});
		main.css({
			'display': 'none'
		});
	});
		
	function AjaxRequest(url,callback){
		$.ajax({url: url, dataType: 'jsonp', success: function(data){
			callback(data);
		}});
	}
	
	function setData() {
		for(var i=0; i<5; i++) {
			var add ="";
			for(var j=0; j<DATA[i].venue.location.formattedAddress.length; j++) {
				add = add + DATA[i].venue.location.formattedAddress[j] + " ";
			}
			cards.append('<div class="card cardList" id=' + i +
				'> <div class="card-header cardHead">' + (DATA[i].venue.location.lat).toFixed(4) + ', ' + (DATA[i].venue.location.lng).toFixed(4) + '</div>' +
				'<div class="card-body cardBody"> <h6 class="card-title">' + DATA[i].venue.name +
				'</h6> <p class="card-text">' + add + '</p> </div> </div>'
			);
		}
	}
});