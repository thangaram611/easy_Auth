var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();
var port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));
// rendering html
app.get('/', function(req, res) {
	res.send(index.html);
});

app.get('/dashboard', function(req, res) {
	console.log("dash");
	var email = "";
	http.get('http://localhost:8080/getemail', function(resp) {
		resp.on('data', function(chunk) {
			email += chunk;
			console.log(email);
		});
		resp.on('end', function() {
			if (email) {
				res.sendFile(path.join(__dirname + '/static/dashboard.html'));
			} else {
				res.sendFile(path.join(__dirname + '/static/index.html'));
			}
		});
	}).on("error", function(e) {
		console.log("Got error: " + e.message);
	});
});
var user_details = "";
app.get('/detail', function(req, res) {
	http.get('http://localhost:8080/details', function(resp) {
		resp.on('data', function(chunk) {
			user_details += chunk;
			console.log(user_details);
		});
		resp.on('end', function() {
			res.send(user_details);
		});
	}).on("error", function(e) {
		console.log("Got error: " + e.message);
	});
});
app.listen(port);
console.log('server started at port:' + port);
