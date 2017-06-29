var express = require('express');
var bodyparser = require('body-parser');
var favicon = require('serve-favicon')
var path = require('path');
var app = express();
var hbs = require('express-handlebars');
var routes = require('./routes/index');
var api_employee = require('./api/employee');

var port = process.env.PORT || 3000;

//View Config
app.engine('hbs', hbs({extname:'hbs',defaultLayout:'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//Render Page Requests and Responses
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

//Public files
app.use(favicon(path.join(__dirname, 'assets', 'images', 'favicon.ico')))
app.use('/assets', express.static('assets'));

//Routes
app.use('/', routes);
app.use('/employee/detail', routes);
app.use('/api', api_employee);

//System Start
app.listen(port, function(){
    console.log("System started at " + port);
});