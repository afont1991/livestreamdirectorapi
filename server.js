var express = require('express'),
	directors = require('./routes/directors');
 
var app = express();
 
app.configure(function () {
	app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
});
 

app.get('/directors/:id', directors.getDirectorById);
app.get('/directors', directors.getAllDirectors);
app.post('directors/add', directors.addDirector);
app.put('directors/update/:id', directors.updateDirector);
app.delete('/directors/delete/:id', directors.deleteDirector);
 
app.listen(3000);
console.log('Listening on port 3000...');