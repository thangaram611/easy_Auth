var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));
// rendering html
app.get('/', function(req, res) {
	res.send(index.html);
});

app.listen(port);
console.log('server started at port:' + port);
