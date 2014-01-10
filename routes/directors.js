
var request = require('request'); // allows me to hit the livestream API to get director information
var mongoose  = require('mongoose'); // Used to inertact with my mongo database

var directorModel = require('../models/director').Director; // This model holds the schema for creating a new director
var APIResponder = require('../lib/apiresponder'); // I use this to make sure my responses are sent back in proper json formatt

// This function is used to get specific director using the livestream_id 
exports.getDirectorById = function(req, res) {
	var id = req.params.id; // livestream_id REQUIRED

	directorModel.findOne({ livestream_id: id}, function (err, doc){
		if(err || doc === null){ // I included the OR to shorten the error checking becuase the response can either return no directors with ID or mongod may have an error both of which are important to include
			response_error = "Error while getting director: " + err;
      return APIResponder.respond(res, null, response_error);
		} else {
			return APIResponder.respond(res, doc);
		}
	});
};

// This function is used to get all currently saved directors in the DB no params are required 
exports.getAllDirectors = function(req, res) {
  directorModel.find(function(err, directors) {
    if(err) {
      response_error = "Error while getting directors: " + err; // IF for some reason an error occurs we send back this emssage plus the actualy error from mongo
      return APIResponder.respond(res, null, response_error);
    }
      return APIResponder.respond(res, directors); // send back all directors in database
  });
};
 
exports.addDirector = function(req, res) {
	livestream_id = req.body.livestream_id; // REQUIRED
	favorite_camera = req.body.favorite_camera;
	favorite_movies = req.body.favorite_movies;
	if(!livestream_id){ // if livestream is not included we let them know its required
		response_error = "livestream ID is required;";
		APIResponder.respond(res, null, response_error);
	} else{
		// Once we know a livestream ID is sent we use request to hit the livestream API and GET the corresponding directors information
		request({
			uri: "https://api.new.livestream.com/accounts/" + livestream_id,
			method: "GET",
			timeout: 10000,
			followRedirect: true,
			maxRedirects: 10,
			json: true
			}, function(error, response, body) { // IF we succesfuly find an account with that id we save it into our databse otherwise we let the user know what went wrong by checking for different errors the API may send back
				if(error || body.name === "NotFoundError" || body.name === "BadRequestError"){ // I included the OR case because your api does not return an error if livestream_id is used with no associtated user
					response_error = "It appears there was a problem retreiving a director with that livestream_id";
					APIResponder.respond(res, null, response_error);
				} else {
					// creating new director from the response of livestream API
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
// The following function is used to update an exsiting director in the DB
exports.updateDirector = function(req, res) {
	livestream_id = req.body.livestream_id; // REQUIRED
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


