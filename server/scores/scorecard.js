'use strict';

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var promiseWhile = require('./../util/promisewhile');
var app     = express();
var Q = require('q');

module.exports = LiveScore;

function populateFullScoreCard(innings, index, $) {
	var arr = [];
	var innings = $('#' + innings).find('table')[index];
	var row = $(innings).find('tr');

	for(var i=1;i<row.length;i++) {
		var col = $(row[i]).find('td');
		var a = {};
		for(var j=0;j<col.length;j++) {
			var val = $(col[j]).text();
			a['key' + j] = val.replace(/\t/g,'').replace(/\r\n/g,'');;
		}
		arr.push(a);
	}

	return arr;
}

function LiveScore(url){
	console.log(url);
	var deferred = Q.defer();
	request.get(url, function(error, response, html){
		if(!error) {
			console.log("Getting live");
			var $ = cheerio.load(html);
			var title = $('.cbz_module_content').find('h3');
			title = $(title).text();
			var innings_1 = $('#innings_1').find('h4')[0];
			var innings_2 = $('#innings_2').find('h4')[0];

			var innings1Batting = populateFullScoreCard("innings_1", 0, $);
			var innings1Bowling = populateFullScoreCard("innings_1", 1, $);

			var innings2Batting = populateFullScoreCard("innings_2", 0, $);
			var innings2Bowling = populateFullScoreCard("innings_2", 1, $);
		
			//var test = $('#innings_1').find('table').find('tr')[tbody-1];
			deferred.resolve({
				title : title,
				innings1 : $(innings_1).text(),
				innings1Batting : innings1Batting,
				innings1Bowling : innings1Bowling,
				innings2 : $(innings_2).text(),
				innings2Batting : innings2Batting,
				innings2Bowling : innings2Bowling
			});
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

