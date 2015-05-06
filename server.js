var express = require('express');
var http = require('http');
var bodyParser = require('body-parser')
var expressValidator = require('express-validator');
var port = process.env.PORT || 5000;
var app = express();


app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());
app.use(express.static('public'));


var defaultParams = {user: {}, errors: {}};

app.get('/', function(request, response) {
  response.render('index', defaultParams);
});

app.post('/contacts', function(req,res){

  // Validations
  req.checkBody(['user', 'name'], 'Please enter name').notEmpty();
  req.checkBody(['user','phone_number'], 'Phone number must contain only numbers').isInt();
  req.checkBody(['user','phone_number'], 'Please enter phone number').notEmpty();
  req.checkBody(['user','address'], 'Please enter your address').notEmpty();
  req.checkBody(['user','email'], 'A valid email is required').isEmail();
  req.checkBody(['user','email'], 'Please enter email').notEmpty();
  var errors = req.validationErrors(true);

  if( errors ){
    var requestParams = {
      user: req.body.user,
      errors: errors
    };
    res.render('index', requestParams);
  }
  else {
    res.redirect('/');
  }
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server started on URL localhost:' + port + ' at ' +new Date());
});
