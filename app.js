var express = require('express');
var reload = require('reload');
var app = express();
var dataFile = require('./data/data.json');

//Project configurations.
app.set('port', process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views','views');

//Globals vars
app.locals.siteTitle = 'Mini IRCTC';
app.locals.data = dataFile;

//Middlewares
app.use(express.static('public'));
app.use(express.static('partials'));
app.use(require('./routers/index'));
app.use(require('./routers/live'));
// app.use(require('./routers/cancelled-trains'));

//Routes
var Server = app.listen(app.get('port'), function(){
  console.log('listen to port '+app.get('port'));
});

reload(Server, app);
