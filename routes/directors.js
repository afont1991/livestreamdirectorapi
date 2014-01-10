var request = require('request');
var mongoose  = require('mongoose');

var directorModel = require('../models/director').Director;
var APIResponder = require('../lib/apiresponder');
 
exports.getDirectorById = function(req, res) {
  directorModel.findById(account_id, function(err, account) {
    if(err) {
      response_error = "Error while accessing account_id: " + account_id;
      return APIResponder.respond(res, null, response_error);
    }

      return APIResponder.respond(res, account);
  });
};
 
exports.getAllDirectors = function(req, res) {
  directorModel.find(function(err, directors) {
    if(err) {
      response_error = "Error while getting directors: " + err;
      return APIResponder.respond(res, null, response_error);
    }
      return APIResponder.respond(res, directors);
  });
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
			director = new directorModel;
			director.livestream_id= body['id'];
			director.full_name = body['full_name'];
			director.dob = body['dob'];
			director.favorite_camera = "canon";
			director.favorite_movies = "Anything by Quentin Tarantino";

			director.save(function(err) {
				if(err) {
					console.log(err);
					response_error = "Error while creating account for Director " + err;
					APIResponder.respond(res, null, response_error);
				} else {
					APIResponder.respond(res, director);
				}
			});
	});
};
 
exports.updateDirector = function(req, res) {

};
 
exports.deleteDirector = function(req, res) {

};


