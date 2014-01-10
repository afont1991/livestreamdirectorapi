var express = require('express'),
	directors = require('./routes/directors');
 
var app = express();
 
app.configure(function () {
	app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
});
 

app.get('/director/:id', directors.getDirectorById);
getAllDirectors
addDirector
updateDirector
deleteDirector

app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);
 
app.listen(3000);
console.log('Listening on port 3000...');