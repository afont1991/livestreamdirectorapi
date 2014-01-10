## WELCOME TO MY LIVESTREAM DIRECTOR DIRECTORY!

### Requirements
- MongoDB installed and running on your localhost
- node.js installed

### HOW TO RUN
- Run mongod on your local machine
- Run "node server.js" to start up the API

### ROUTES
	GET http://localhost:3000/directors/:id
		- Returns Single Director by id
		- livestream_id is required
	GET http://localhost:3000/directors
		- Returns all currently registered directors
	POST http://localhost:3000/directors
		- Registers new director
		- livestream_id is required
		- favortie_movies & favorite_camera are optional parameters sent as strings
		Example: 
			curl -i -X POST -H 'Content-Type: application/json' -d '{"livestream_id": "6488824", "favorite_movies": "Anything by Quentin Tarantino", "favorite_camera": "Canon"}' http://localhost:3000/directors
	PUT http://localhost:3000/directors
		- Can be used to update a directors favorite_camera or favorite_movies
		- Requires livestream_id
		- Will Return a success message with attribute changed
		Example:
			 curl -i -X PUT -H 'Content-Type: application/json' -d '{"livestream_id": "648884", "favorite_movies": "Anything with Leo In it", "favorite_camera": "Canon"}' http://localhost:3000/directors