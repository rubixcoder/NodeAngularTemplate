var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var mysql = require('mysql');
var routes = require('./routes/routes');

var config = require('./config/config.json')
var knex = require('knex')(config.dbConnection);
var bookshelf = require('bookshelf')(knex)