var express = require('express'),
	directors = require('./routes/directors'),
	mongoose  = require('mongoose');
 
var app = express();

mongoose.connect('mongodb://localhost/test');

// checking to make sure mongod is running if not an error is returned
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("conected succesfully to mongoDB");
});


app.configure(function () {
	app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
});
 

app.get('/directors/:id', directors.getDirectorById);
app.get('/directors', directors.getAllDirectors);
app.post('/directors', directors.addDirector);
app.put('/directors', directors.updateDirector);
 
app.listen(3000);
console.log('Listening on port 3000...');