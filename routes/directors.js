var request = require('request');
var mongoose  = require('mongoose');

var directorModel = require('../models/director').Director;
var APIResponder = require('../lib/apiresponder');
 
exports.getDirectorById = function(req, res) {
	var id = req.params.id;
	directorModel.findOne({ livestream_id: id}, function (err, doc){
		if(err || doc === null){
			response_error = "Error while getting director: " + err;
      return APIResponder.respond(res, null, response_error);
		} else {
			return APIResponder.respond(res, doc);
		}
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
	livestream_id = req.body.livestream_id;
	favorite_camera = req.body.favorite_camera;
	favorite_movies = req.body.favorite_movies;
	if(!livestream_id){
		response_error = "livestream ID is required;";
		APIResponder.respond(res, null, response_error);
	} else{
		request({
			uri: "https://api.new.livestream.com/accounts/" + livestream_id,
			method: "GET",
			timeout: 10000,
			followRedirect: true,
			maxRedirects: 10,
			json: true
			}, function(error, response, body) {
				if(error || body.name === "NotFoundError" || body.name === "BadRequestError"){ // I included the OR case because your api does not return an error if livestream_id is used with no associtated user
					response_error = "It appears there was a problem retreiving a director with that livestream_id";
					APIResponder.respond(res, null, response_error);
				} else {
					director = new directorModel;
					director.livestream_id= body['id'];
					director.full_name = body['full_name'];
					director.dob = body['dob'];
					director.favorite_camera = favorite_camera;
					director.favorite_movies = favorite_movies;

					director.save(function(err) {
						if(err) {
							console.log(err);
							response_error = "Error while creating account for Director " + err;
							APIResponder.respond(res, null, response_error);
						} else {
							APIResponder.respond(res, director);
						}
					});
				}
		});
	}
};
 
exports.updateDirector = function(req, res) {
	livestream_id = req.body.livestream_id;
	favorite_camera = req.body.favorite_camera;
	favorite_movies = req.body.favorite_movies;
	if(!livestream_id){
		response_error = "livestream ID is required;";
		APIResponder.respond(res, null, response_error);
	} else {
		directorModel.update({livestream_id: livestream_id}, {favorite_camera: favorite_camera, favorite_movies: favorite_movies}, function(err, updated) {
			if(err || updated === 0) {
				response_error = "Couldn't update director " + livestream_id;
				APIResponder.respond(res, null, response_error);
			} else {
				APIResponder.respond(res, "Director Updated");
			}
		});
	}
};


