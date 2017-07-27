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
	users: process.env.POSTGRES_USER, //or put this everywhere
	password: process.env.POSTGRES_PASSWORD
});

app.set('views', __dirname + "/views");
app.set('view engine', 'pug');
// sets the viewing engine as pug and gets all the pages
app.use(express.static(__dirname + "/../public"));
// css

app.use('/', bodyParser.urlencoded({extended: true}));


