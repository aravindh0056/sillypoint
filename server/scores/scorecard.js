'use strict';

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var promiseWhile = require('./../util/promisewhile');
var app     = express();
var Q = require('q');

module.exports = LiveScore;

function LiveScore(url){
	console.log(url);
	var deferred = Q.defer();
	//url = "http://www.cricbuzz.com/live-cricket-scorecard/13848/england-vs-india-3rd-match-india-and-england-in-australia-tri-series-2015";
	//url = "http://www.cricbuzz.com/live-cricket-scores/13847/australia-vs-india-2nd-match-india-and-england-in-australia-tri-series-2015";
	request.get(url, function(error, response, html){
		if(!error) {
			console.log("Getting live");
			var $ = cheerio.load(html);
			var title = $('.cbz_module_content').find('h3');
			title = $(title).text();
			var innings_1 = $('#innings_1').find('h4')[0];
			var innings_2 = $('#innings_2').find('h4')[0];
			deferred.resolve({
				title : title,
				innings1 : $(innings_1).text(),
				innings2: $(innings_2).text()
			});
			//score1 = score1.replace(/\t/g,'');

		}
	});

	return deferred.promise;
}

function getDetails(a) {
	var $ = cheerio.load(a);
	var test = $('.batteamdesc').find('tr');
	abc.filter('td').each(
		function() {
			console.log('1');
		}
	);
	var test1 = $(test).find('.mhtn_bat');
	var score = test.siblings()[0];
	console.log(test);
}

