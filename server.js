
// server.js

// modules =================================================
var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

// configuration ===========================================
var app = express();
var db = mongojs('contactlist', ['contactlist']);


// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

// get list DATA
app.get('/contactlist', function (req, res) {
	console.log('I resived a GET request');

	db.contactlist.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
	
});

// post DATA
app.post('/contactlist', function (req, res) {
	console.log(req.body);
	db.contactlist.insert(req.body, function (err, doc) {
		res.json(doc);
	});
});

// start app ===============================================
// startup our app at http://192.168.59.27:3000
app.listen(3000);

// shoutout to the user
console.log('Server running on port 3000!');
