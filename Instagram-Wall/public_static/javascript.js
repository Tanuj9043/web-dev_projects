$(document).ready(function(){
	var userInfo;
	var userId;
	var recentMedia;
	var follows;
	var followers;
	var taggedMedia;

	$.ajax({url:'/home/getUserInfo', success: function(d){
		var x = JSON.parse('['+d+']');
		userInfo = x[0].data;
		userId = x[0].data.id;
		console.log(userInfo);
		addProfile();
	}});

	function addProfile(){
		var data = '<a href="'+userInfo.profile_picture+'" target="_blank">'+
						'<img src="'+userInfo.profile_picture+'" class="img-responsive profImg">'+
					'</a>'
		$('#profileImg').html(data);
		$('#name').html(userInfo.full_name);
		$('#aka').html('('+userInfo.username+')');
		$('#mediaCount').html(userInfo.counts.media);
		$('#following').html(userInfo.counts.follows);
		$('#followers').html(userInfo.counts.followed_by);
	}
	
	$.ajax({url:'/home/getUserMedia', success: function(d){
		var x = JSON.parse('['+d+']');
		recentMedia = x[0].data;
		console.log(recentMedia);
		addMedia(recentMedia);
	}});

	$('#showBtn').click(function(){
		var text = $('#tagName').val();
		var data = {
			tag: text
		}
		$.post({url:'/home/getUserTags', data, success: function(d,status){
			var x = JSON.parse('['+d+']');
			taggedMedia = x[0].data;
			console.log(taggedMedia);
			addMedia(taggedMedia);
		}});
	});

	function addMedia(Media){
		var data="";
		$('#media').innerHTML="";
		for(var i=0; i<Media.length; i++){
			if(Media[i].type==="image"){
				data += '<div class="instagram-pic">'+
							'<a href="'+Media[i].images.standard_resolution.url+'" target="_blank">'+
								'<img src="'+Media[i].images.thumbnail.url+'" class="img-responsive">'+
							'</a>'+
							'<div class="container-fluid bar">'+
								'<div class="container-fluid text-center likes">'+
									'<i class="fa fa-heart" aria-hidden="true"></i>&nbsp;'+Media[i].likes.count+'</div>'+
								'<div class="container-fluid text-center comments">'+
									'<i class="fa fa-comment" aria-hidden="true"></i>&nbsp;'+Media[i].comments.count+'</div>'+
							'</div>'+
						'</div>';
			}
			else{
				data += '<div class="instagram-pic">'+
							'<a href="'+Media[i].videos.standard_resolution.url+'" target="_blank">'+
								'<img src="'+Media[i].images.thumbnail.url+'" class="img-responsive">'+
							'</a>'+
							'<div class="container-fluid bar">'+
								'<div class="container-fluid text-center likes">'+
									'<i class="fa fa-heart" aria-hidden="true"></i>&nbsp;'+Media[i].likes.count+'</div>'+
								'<div class="container-fluid text-center comments">'+
									'<i class="fa fa-comment" aria-hidden="true"></i>&nbsp;'+Media[i].comments.count+'</div>'+
							'</div>'+
						'</div>';
			}
		}
		$('#media').html(data);
	}
});