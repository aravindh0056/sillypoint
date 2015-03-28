'use strict';

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var promiseWhile = require('./../util/promisewhile');
var app     = express();
var Q = require('q');
var scores;
var cache;

function getTitle(){
	var $ = cheerio.load(this);
	var deferred = Q.defer();
	$('span').remove();
	var title = $('h3').text();

	if(title) {
		deferred.resolve(title);
	} else {
		deferred.reject();
	}

	return deferred.promise;
}

function getScoreDetails() {
	var $ = cheerio.load(this);
	var deferred = Q.defer();
	var index = 0;
	console.log("Test");
	$('.cbz_module_item').each(function() {
			var json = {};
			
			json.teamName1 = $($(this).find('.team_name_completed')[0]).text();
			json.score1= $($(this).find('.teams_scores')[0]).text();

			json.teamName2 = $($(this).find('.team_name_completed')[1]).text();
			json.score2= $($(this).find('.teams_scores')[1]).text();
			//scores.push(json);
	})

	deferred.resolve(scores);

	return deferred.promise;
}

function getMatchStatus() {
	var $ = cheerio.load(this);
	var deferred = Q.defer();
	var json = {};
	$('.scag_status_current').each(function() {
		json.status = $(this).text();
	})

	deferred.resolve(json);

	return deferred.promise;
}

function getHyperLinks() {
	var $ = cheerio.load(this);
	var deferred = Q.defer();
	var hyperLinks = [];
	var index=0;
	$('a').each(function() {
		hyperLinks[index++] = $(this).attr('href');
	});

	deferred.resolve(hyperLinks);
	return deferred.promise;
}

function getMatches(cb) {
	var finalStep = function(title, score, status, hyperLinks) {
		//Get scores from hyperlink because the score we have now is not updated frequently in cricbuzz
		var LiveScore = require('./scorecard')
		console.log("Title:" + title);
		console.log("Score" + score);
		console.log("hyperlink:" + "  "+ hyperLinks[1]);
		var promise = new LiveScore(hyperLinks[1]);
		promise.then(function(status) {
			scores.push(status);
			console.log(status);
		}).
		done(cb)
	}

	Q.all([getTitle.call(this),
		   getScoreDetails.call(this),
		   getMatchStatus.call(this),
		   getHyperLinks.call(this)])
	.spread(finalStep)
	.fail(function(err){
    	console.log("Error: " + err);
	})
	.done();
}

exports.getCachedScores = function(req, res) {
	res.send(cache);
}

exports.getAllScores = function(req, res){

	var url = 'http://www.cricbuzz.com/cricket-match/live-scores';
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var deferred = Q.defer();
			scores = [];
			var mainDiv = $('div .series_current').find('.cbz_module_item');
			//var mainDiv = $('div .series_current');
			var totalItems = mainDiv.length;
			var index = 1;
			var _ = require('underscore');
			var cb = _.after(totalItems, function() {
				cache = scores;
			});
			promiseWhile(function () { return index <= totalItems; }, function () {
			    //Practicing promises and understanding event loops
			    //Latentflip video
			    getMatches.call(mainDiv[index - 1], cb);
			    index++;
			    return Q.delay(1); // arbitrary async
			}).then(function () {
			    console.log("done");
			}).done();

/*
			$('div .series_current').each(function(){
				//Cant use because of event loops. Check http://stackoverflow.com/questions/28009044/using-deferred-promise-inside-for-each-loop-using-node-js
				var json = getScores(this);

			});*/
			//TODO: Learn how to use promise inside loop

			/*$('div .series_current').each(function(){
				getTitle(this)
				.then(getScoreDetails)
				.then(getMatchStatus)
				.then(getHyperLinks)
			});*/

		}


	})
}
