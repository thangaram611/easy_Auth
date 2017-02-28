var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var speakeasy = require("speakeasy");
var QRCode = require('qrcode');
var http = require('http');
var session = require('express-session');

var app = express();
var port = 8080;
var sess;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));
app.use(session({ secret: 'SECRETKEY611',resave:true , saveUninitialized: true}));

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
	sess = req.session;
	console.log(req.body);
	sess.email = req.body.email;
	console.log("register"+sess.email);
	registrations.insert(req.body, function(err) {
		if (err) {
			console.log(err);
		} else {
			res.send(true);
		}
	});
});
app.post('/checkregistered', function(req, res) {
	sess = req.session;
	sess.email = req.body.email;
	console.log("login"+sess.email);
	registrations.findOne({ 'email': sess.email }, function(err, doc) {
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
	console.log("qrcode"+sess.email);
	var secret = speakeasy.generateSecret({ length: 20 });
	secrets.insert({ "email": req.body.email, "secretkey": secret }, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("secret inserted");
		}
	});
	console.log(secret + "this is inserted with" + req.body.email);
	QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
		res.send(data_url);
	});
});
// token handling
app.post('/checktoken', function(req, res) {
	sess = req.session;
	global.keyemail = sess.email;
	console.log("token email"+sess.email);
	secrets.findOne({ 'email': sess.email }, function(err, doc) {
		var verified = false;
		var token = speakeasy.totp({
			secret: doc.secretkey.base32,
			encoding: 'base32'
		});
		if (token == req.body.token) {
			verified = true;
		}
		res.send(verified);
	});
});
app.get('/getemail', function(req, res){
	sess = req.session;
	console.log(global.keyemail);
	res.send(global.keyemail);
});
app.get('/details', function(req, res){
	registrations.findOne({ 'email': global.keyemail }, function(err, doc){
		if(err){
			console.log("error "+err);
		}
		console.log("this is the doc "+doc+"for email "+global.keyemail);
		res.send(doc.name);
	});
});
app.listen(port);
console.log('server started at port:' + port);
