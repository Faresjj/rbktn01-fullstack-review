const express = require('express');
let bodyParse = require('body-parser');
let save = require('../database/index.js').save
let getRepos = require('../database/index.js').getRepos
let getReposByUsername = require('../helpers/github.js').getReposByUsername
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(function(req, res, next){
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*'
	})
	next();
});
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({
  extended: true
}));

app.post('/repos', function (req, res) {
  getReposByUsername(req.body.data)
	.then(response =>  save(response.body))
	.then(response => {res.status(201); res.end('Post Success')})
	.catch(err => {console.log("error: ", err); res.status(404); res.end(err)})
});

app.get('/repos', function (req, res) {
  getRepos().then(response => res.end(JSON.stringify(response))).catch(err => console.log(err));
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

