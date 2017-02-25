var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

var app = express();
var port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));

app.get('/', function(req, res) {
	res.send(index.html);
});

var db = mongojs('mongodb://thangaram611:kannan@ds161209.mlab.com:61209/db_auth611');
var registrations = db.collection('registrations');
app.post('/register', function(req, res) {
	console.log(req.body);
	registrations.insert(req.body, function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("no error in insertion");
			res.send(true);
		}
	});
});
app.post('/checkregistered', function(req, res) {
	registrations.findOne({ 'email': req.email }, function(err, doc) {
		if (err) {
			console.log(err);
		} else if (doc) {
			if (doc.pass == req.pass) {
				res.send(true);
			} else {
				res.send(false);
			}
		} else {
			res.send(false);
		}
	});
});

app.listen(port);
console.log('server started at port:' + port);