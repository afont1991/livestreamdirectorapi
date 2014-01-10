## WELCOME TO MY LIVESTREAM DIRECTOR DIRECTORY!

### Requirements
- MongoDB installed and running on your localhost
- node.js installed

### HOW TO RUN
- Run mongod on your local machine
- Run "node server.js" to start up the API

### ROUTES
	GET http://localhost:3000/directors/:id
		- Returns Single Director with ID
		- ID is required
	GET http://localhost:3000/directors
		- Returns all currently registered directors
	POST http://localhost:3000/directors
		- Registers new director
		Example: 
			curl -i -X POST -H 'Content-Type: application/json' -d '{"livestream_id": "6488824", "favorite_movies": "Anything by Quentin Tarantino", "favorite_camera": "Canon"}' http://localhost:3000/directors
	PUT http://localhost:3000/directors
		- Can be used to update a directors favorite camera or movie
		Example: