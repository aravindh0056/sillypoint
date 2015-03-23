'use strict';

// Dependencies
var server = require( './../server' ).server;
var score = require( '../scores/index' )

// Router
// Index route - usually served as static via express
server.get( '/', require( './main' ) );

// Example route
server.get( '/route/:route', require( './example' ) );

server.get( '/livescore', score.getCachedScores );

// Example database route
//server.get( '/db', require( '../db/example' ) );

// Catch all
server.get( '*', require( './main' ) );


