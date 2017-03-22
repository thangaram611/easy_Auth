var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');
var session = require('express-session');


var app = express();
var port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));
app.use(session({ secret: 'SECRETKEY2806', resave: true, saveUninitialized: true }));
var sess;
// rendering html
app.get('/', function(req, res) {
	res.send(index);
});
app.get('/dashboard', function(req, res) {
	sess = req.session;
	if (sess.log) {
		res.status(200).sendFile('dashboard.html', { root: path.join(__dirname, '/static/') });
	} else {
		res.redirect('/');
	}
});
app.post('/login', function(req, res) {
	console.log(req.body);
	var email = req.body.email;
	var pass = req.body.pass;
	request.post(
		'http://localhost:8080/user/' + req.body.uniqid + '/login', { json: { email, pass } },
		function(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body)
				if (body) {
					sess = req.session;
					sess.userid = body;
					sess.log = true;
					res.send(true);
				} else {
					res.send(false);
				}
			} else {
				res.send(false);
			}
		}
	);
});
app.post('/register', function(req, res) {
	var reply = "";
	console.log(req.body);
	var name = req.body.name;
	var email = req.body.email;
	var pass = req.body.pass;
	request.post(
		'http://localhost:8080/user/' + req.body.uniqid + '/register', { json: { name, email, pass } },
		function(error, response, body) {
			if (!error && response.statusCode == 200) {
				sess = req.session;
				sess.userid = body;
				res.send(true);
			} else {
				res.send(false);
			}
		}
	);
});
app.post('/qrcode', function(req, res) {
	var reply = "";
	sess = req.session;
	sess.log = false;
	http.get('http://localhost:8080/user/' + sess.userid + '/qrcode', function(resp) {
		resp.on('data', function(chunk) {
			reply += chunk;
			console.log(reply + " this is the reply");
		});
		resp.on('end', function() {
			if (reply) {
				res.send(reply);
			} else {
				req.session.destroy(function(err) {
					if (err) {
						console.log("error:" + err);
					} else {
						res.redirect('/');
					}
				});
				res.send(false);
			}
		});
	}).on("error", function(e) {
		console.log("Got error: " + e.message);
	});
});
app.post('/checktoken', function(req, res) {
	var reply = "";
	var token = req.body.token;
	sess = req.session;
	request.post(
		'http://localhost:8080/user/' + sess.userid + '/checktoken', { json: { token } },
		function(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body)
				sess.log = true;
				res.send(body);
			} else {
				req.session.destroy(function(err) {
					if (err) {
						console.log("error:" + err);
					} else {
						res.send(true);
					}
				});
				res.send(false);
			}
		}
	);
});
app.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if (err) {
			console.log("error:" + err);
		} else {
			res.redirect('/');
		}
	});
});
app.listen(port);
console.log('server started at port:' + port);
