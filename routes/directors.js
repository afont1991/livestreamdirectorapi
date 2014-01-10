var request = require('request');
var mongoose  = require('mongoose');

var directorModel = require('../models/director').Director;
var APIResponder = require('../lib/apiresponder');
 
exports.getDirectorById = function(req, res) {
	var id = req.params.id;
	res.send("stuff is working" + id);
};
 
exports.getAllDirectors = function(req, res) {
	res.send("stuff is working");
};
 
exports.addDirector = function(req, res) {
	request({
		uri: "https://api.new.livestream.com/accounts/6488834",
		method: "GET",
		timeout: 10000,
		followRedirect: true,
		maxRedirects: 10,
		json: true
		}, function(error, response, body) {
			director = {
				id: body['id'],
				full_name: body['full_name'],
				dob: body['dob'],
				favorite_camera : "canon",
				favorite_movies : "Anything by Quentin Tarantino"
			};
			res.send("created" + director);
	});
};
 
exports.updateDirector = function(req, res) {

};
 
exports.deleteDirector = function(req, res) {

};


