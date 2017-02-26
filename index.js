var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var speakeasy = require("speakeasy");
var QRCode = require('qrcode');

var app = express();
var port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));
// rendering html
app.get('/', function(req, res) {
	res.send(index.html);
});
// db connection
var db = mongojs('mongodb://thangaram611:kannan@ds161209.mlab.com:61209/db_auth611');
var registrations = db.collection('registrations');
var secrets = db.collection('secrets');
// registration and login
app.post('/register', function(req, res) {
	console.log(req.body);
	global.email = req.body.email;
	registrations.insert(req.body, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("no error in insertion");
			res.send(true);
		}
	});
});
app.post('/checkregistered', function(req, res) {
	global.email = req.body.email
	registrations.findOne({ 'email': email }, function(err, doc) {
		if (err) {
			console.log(err);
		} else if (doc) {
			if (doc.pass == req.body.pass) {
				res.send(true);
			} else {
				res.send(false);
			}
		} else {
			res.send(false);
		}
	});
});
// QRcode generation
app.post('/qrcode', function(req, res) {
	var secret = speakeasy.generateSecret({ length: 20 });
	console.log(secret.base32);
	secrets.insert({ "email": req.body.email, "secretkey": secret.base32 }, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("secret inserted")
		}
	});
	QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
		res.send(data_url);
	});
});
// token handling
app.post('/checktoken', function(req, res) {
	console.log(global.email);
	secrets.findOne({ 'email': global.email }, function(err, doc) {
		console.log(doc);
		var verified = false;
		var token = speakeasy.totp({
			secret: doc.secret,
			encoding: 'base32'
		});
		console.log(token);
		if(token == req.body.token){
			verified = true;
		}
		res.send(verified);
	});
});
app.listen(port);
console.log('server started at port:' + port);
