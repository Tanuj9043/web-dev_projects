var z=3;
var lt=51.4826,lg=0;
var latVal = $('#lat');
var lngVal = $('#lng');
function initMap() {
	var uluru = {
		lat: parseFloat(lt),
		lng: parseFloat(lg)
	};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: parseInt(z),
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
	google.maps.event.addListener(map, 'click', function(event){
		latVal.val(event.latLng.lat());
		lngVal.val(event.latLng.lng());
		lt=event.latLng.lat();
		lg=event.latLng.lng();
		initMap();
	});
	google.maps.event.addListener(marker, 'click', function(){
		latVal.val(lt);
		lngVal.val(lg);
	});
	google.maps.event.addListener(map, 'zoom_changed', function(){
		z = map.getZoom();
	});
}
$(document).ready(function(){	
	var tz = $('#tz');
	var ltlg = $('#ltlg');
	var tm = $('#tm');
	var tmp = $('#tmp');
	var hm = $('#hm');
	var prs = $('#prs');
	var ws = $('#ws');
	var sm = $('#sm');
	var wthCard = $('#wthCard');
	var orlay = $('#orlay');
	var ld = $('#ld');
	var mapBtn = $('#mapBtn');
	var wthBtn = $('#wthBtn');
	var closeBtn = $('#closeBtn');
	var clientId = '1bb74d7b9df8a91b8d1180146a881ccb';
	var endpoint = 'https://api.darksky.net/forecast/';
	var url;
	latVal.val(lt);
	lngVal.val(lg);

	mapBtn.click(function(){
		lt=latVal.val();
		lg=lngVal.val();
		initMap();
	});
	
	closeBtn.click(function(){
		wthCard.css({
			'display': 'none'
		});
		orlay.css({
			'display': 'none'
		});
	});
	
	wthBtn.click(function(){
		lt=latVal.val();
		lg=lngVal.val();
		initMap();
		orlay.css({
			'display': 'block'
		});
		ld.css({
			'display': 'block'
		});
		var parameters = '/' + latVal.val() + ',' + lngVal.val();
		url = endpoint + clientId + parameters;
		AjaxRequest(url, function(d){
			currentSummary(d);
		});
	});
	
	function AjaxRequest(url,callback){
		$.ajax({url: url, dataType: 'jsonp', success: function(data){
			callback(data);
		}});
	}
	
	function currentSummary(cur){
		var current = {
			lat: cur.latitude,
			lng: cur.longitude,
			time: new Date(cur.currently.time*1000),
			timezone: cur.timezone,
			temp: cur.currently.temperature,
			humidity: parseFloat(cur.currently.humidity).toFixed(2),
			pressure: parseFloat(cur.currently.pressure/10).toFixed(2),
			windSpeed: parseFloat(cur.currently.windSpeed).toFixed(2),
			summary: cur.currently.summary
		}
		current.temp = parseFloat(((parseFloat(current.temp)-32)*5)/9).toFixed(2);
		tz.text(current.timezone);
		ltlg.text(current.lat+' , '+current.lng);
		tm.text(current.time.getDate() + "/"
                + (current.time.getMonth()+1)  + "/" 
                + current.time.getFullYear() + " @ "  
                + current.time.getHours() + ":"  
                + current.time.getMinutes() + ":" 
                + current.time.getSeconds());
		tmp.text(current.temp+ ' C');
		hm.text(current.humidity);
		prs.text(current.pressure+' kilopascal');
		ws.text(current.windSpeed+' km/hr');
		sm.text(current.summary);
		
		wthCard.css({
			'display': 'block'
		});
		ld.css({
			'display': 'none'
		});
	}
});