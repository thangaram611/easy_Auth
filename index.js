var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var speakeasy = require("speakeasy");
var QRCode = require('qrcode');
var http = require('http');
var session = require('express-session');
const pug = require('pug');
var rand = require("random-key");
var cryptico = require("cryptico-js");

var app = express();
var port = 8080;
var sess;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));
app.set('view engine', 'pug')
app.use(session({ secret: 'SECRETKEY611', resave: true, saveUninitialized: true }));

//encryption

var PassPhrase = "this is the security code";
var Bits = 1024;
var MyRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
var MyPublicKeyString = cryptico.publicKeyString(MyRSAkey);

var myencrypt = function(PlainText) {
	var obj = cryptico.encrypt(PlainText, MyPublicKeyString);
	return obj.cipher;
}
var mydecrypt = function(CipherText) {
		var obj = cryptico.decrypt(CipherText, MyRSAkey);
		console.log(obj.plaintext);
		return obj.plaintext;
	}
	// admin


// rendering html
app.get('/', function(req, res) {
	res.render('index');
});
// db connection
var db = mongojs('mongodb://localhost:27017/servicedb');
var registrations = db.collection('adminregistrations');
var secrets = db.collection('secrets');
// registration and login
app.post('/register', function(req, res) {
	sess = req.session;
	sess.email = req.body.email;
	req.body.uniqid = rand.generate(8);
	req.body.pass = myencrypt(req.body.pass);
	registrations.insert(req.body, function(err) {
		if (err) {
			console.log(err);
		} else {
			res.send(req.body.uniqid);
		}
	});
});
app.post('/checkregistered', function(req, res) {
	sess = req.session;
	sess.email = req.body.email;
	console.log("login" + sess.email);
	registrations.findOne({ 'email': sess.email }, function(err, doc) {
		if (err) {
			console.log(err);
		} else if (doc) {
			console.log(doc.pass);
			doc.pass = mydecrypt(doc.pass);
			console.log(doc.pass);
			if (doc.pass == req.body.pass) {
				sess.uniqid = doc.uniqid;
				res.send(true);
			} else {
				res.send(false);
			}
		} else {
			res.send(false);
		}
	});
});

app.get('/servicereq', function(req, res) {
	sess = req.session;
	console.log(sess.email);
	if (sess.email) {
		res.render('servicereq');
	} else {
		res.redirect('/');
	}
});

app.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if (err) {
			console.log("error:" + err);
			res.send(false);
		} else {
			console.log("success");
			res.redirect('/');
		}
	});
});

app.get('/getuniqid', function(req, res) {
	sess = req.session;
	console.log(sess.uniqid);
	res.send(sess.uniqid);
});

// user

app.post('/user/:adminid/login', function(req, res) {
	var id = req.params.adminid;
	var userdb = mongojs('mongodb://localhost:27017/userdb');
	var userregistrations = userdb.collection('userregistrations_' + id);
	userregistrations.findOne({ 'email': req.body.email }, function(err, doc) {
		if (err) {
			console.log(err);
		} else if (doc) {
			doc.pass = mydecrypt(doc.pass);
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
app.post('/user/:userid/register', function(req, res) {
	var id = req.params.userid;
	console.log(req.body);
	req.body.pass = myencrypt(req.body.pass);
	var userdb = mongojs('mongodb://localhost:27017/userdb');
	var userregistrations = userdb.collection('userregistrations_' + id);
	req.body.uniqid = rand.generate(8);
	console.log("register" + req.body.uniqid);
	userregistrations.insert(req.body, function(err) {
		if (err) {
			console.log(err);
		} else {
			res.send(true);
		}
	});
});


// QRcode generation
app.get('/user/:userid/qrcode', function(req, res) {
	var id = req.params.userid;
	var secret = speakeasy.generateSecret({ length: 20 });
	secrets.insert({ "uniqid": id, "secretkey": secret }, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("secret inserted");
		}
	});
	QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
		res.send(data_url);
	});
});
// token handling
app.post('/user/:userid/checktoken', function(req, res) {
	var id = req.params.userid;
	secrets.findOne({ 'uniqid': id }, function(err, doc) {
		var verified = false;
		var token = speakeasy.totp({
			secret: doc.secretkey.base32,
			encoding: 'base32'
		});
		if (token == req.body.token) {
			verified = true;
			res.send(true);
		} else {
			res.send(false);
		}
	});
});

app.listen(port);
console.log('server started at port:' + port);
