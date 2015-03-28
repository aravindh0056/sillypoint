require('nodetime').profile({
    accountKey: '795cdf7e9883d5e691505bce95f25efaab4416b0', 
    appName: 'Node.js Application',
    debug:true
  });

'use strict';

/**
 * Module dependencies
 */

var express     = require( 'express' ),
    http        = require( 'http' ),
    path        = require( 'path' ),
    io          = require( 'socket.io' ),
    appConfig   = require( './../app-config.json' );

// Server instance
var server = exports.server = express();

// Configure Server
server.configure( function() {
    server.set( 'port', process.env.PORT || appConfig.server.port );
    server.set( 'views', path.join( __dirname, './../app' ) );
    
    server.use( express.bodyParser() );
    server.use( express.methodOverride() );
    server.use( express.static( path.join( __dirname, './../app' ) ) );
    server.use( server.router );
} );

// Start server 
http.createServer( server ).listen( server.get( 'port' ), function() {
    console.log( 'Express server listening on ' + server.get( 'port' ) );
} );

// Configure Routes
require( './routes' );
setInterval(require('./scores/index').getAllScores, 10000);
