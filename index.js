var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

var mongojs = require('mongojs')
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var app = express()
var port = 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('static'))

app.get('/', function(req, res) {
    res.send(index.html)
})

app.listen(port)
console.log('server started at port:' + port)