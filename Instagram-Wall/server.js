
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
//var ig = require('instagram-node').instagram();
var request = require('request');
var port = 8080 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/',express.static('public'));
app.use('/home',express.static('public_static'));

var clientId = 'a776e5e29605446c8898aac0dcdbd2f9';
var clientSecret= 'cbe04dcc8c9b47a4a910e465dfeb0553';
var redirectUri = 'http://localhost:8080/handleAuth';
var accessToken;
var id;
var url = `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=basic+public_content+comments+relationships+likes`;

app.get('/authorize', function(req, res){
	// set the scope of our application to be able to access likes and public content
    res.redirect(url);
});

app.get('/handleAuth', function(req, res){
    //retrieves the code that was passed along as a query to the '/handleAuth' route and uses this code to construct an access token
    var ccode = req.query.code;
    if(accessToken!=''){
	    request.post({
	    	url:'https://api.instagram.com/oauth/access_token',
	        formData:{
		        client_id: clientId,
		        client_secret: clientSecret,
		        grant_type: 'authorization_code',
		        redirect_uri: 'http://localhost:8080/handleAuth',
		        code:ccode,
	    	}},
	    	function optionalCallback(err,httpResponse,body){
		    	//setting accessToken to a global variable
		        accessToken = JSON.parse(body).access_token;
		        //redirect to a display route
		        res.redirect('http://localhost:8080/home');
		    }
	    );
	}
	else{
		res.redirect('/authorize');
	}
});

app.get('/home/getUserInfo', function(req,res){
	request('https://api.instagram.com/v1/users/self/?access_token='+accessToken, function(err,request,respond){
		res.send(respond);
	});
});

app.get('/home/getUserMedia', function(req,res){
	request('https://api.instagram.com/v1/users/self/media/recent/?access_token='+accessToken, function(err,request,respond){
		res.send(respond);
	});
});

app.get('/home/getUserFollows', function(req,res){
	request('https://api.instagram.com/v1/users/self/follows?access_token='+accessToken, function(err,request,respond){
		res.send(respond);
	});
});

app.get('/home/getUserFollowers', function(req,res){
	request('https://api.instagram.com/v1/users/self/followed-by?access_token='+accessToken, function(err,request,respond){
		res.send(respond);
	});
});

app.post('/home/getUserTags', function(req,res){
	var x = req.body.tag;
	console.log(x);
	request('https://api.instagram.com/v1/tags/'+x+'/media/recent?access_token='+accessToken, function(err,request,respond){
		res.send(respond);
	});
});

app.listen(port,function(){
	console.log(`Running on port ${port}`);
});