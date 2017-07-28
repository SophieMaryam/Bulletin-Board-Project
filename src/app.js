const express = require('express');
// install express module
const app = express();
// initialises express module

const bodyParser = require('body-parser');
// installing bodyparser module - for req.body
const SQL = require('sql-template-strings');
// installs sql template strings

const { Client } = require('pg');

const client = new Client({
	database: 'bulletinboard',
	host: 'localhost',
	user: process.env.POSTGRES_USER, //or put this everywhere
	password: process.env.POSTGRES_PASSWORD,
	port:5432
});

app.set('views', __dirname + "/views");
app.set('view engine', 'pug');
// sets the viewing engine as pug and gets all the pages
app.use(express.static(__dirname + "/../public"));
// css

app.use('/', bodyParser.urlencoded({extended: true}));


// renders index page

app.get('/', function(req, res){
	res.render('index');
});

// post request - messages sent to database



app.post('/messages', (req, res) => {
	// first you need to 

	var sendingtitle = req.body.name;
	var sendingbody = req.body.body;
	
	console.log(req.body.name);
	console.log(req.body.body);
	
	client.connect();

	// console.log(SQL`Insert into messages (title, body) values("${sendingtitle}", "${sendingbody}")`);

	
	client.query(SQL`insert into messages (title, body) values(${sendingtitle}, ${sendingbody})`, (err, result) => {
		console.log(err ? err.stack : "new message added to the database")
	});
		// client.end(); // either remove this 
	res.redirect('/allmessages');
});


// rendering all messages on a new page  
app.get('/allmessages', function(req,res){
	const client = new Client({
		database: 'bulletinboard',
		host: 'localhost',
		user: process.env.POSTGRES_USER, //or put this everywhere
		password: process.env.POSTGRES_PASSWORD,
		port:5432
	});
	
	client.connect();
	
	client.query("select * FROM messages", (err,result) => {
		console.log(result.rows);
		if(err){
			throw err;
		}
	res.render('messagepage', {info: result.rows});
	client.end()
		.then(() => console.log('client has disconnected'));
	});
	
});



// you will need to read the file, and then render all the messages in the database ()var server = app.listen(3000, function(req, res){

var server = app.listen(3000, function(req, res){
	console.log("Example port listening on port: " + server.address().port);
});