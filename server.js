var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var config = require('./app/config');
var mongoose = require('mongoose');
var contact = require('./app/models/contact');
var port = process.env.PORT || 5000;
var app = express();
var Contact = mongoose.model('Contact');

app.set('port', port);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(expressValidator());

app.use(express.static('./app/public'));

mongoose.connect(config.dbConfig, function(err) {
  if (err) {
    console.error('MongoDB connection error');
    console.error('Error:', err);
  } else {
    console.info('Connected to MongoDB');
  }
});

app.get('/', function(request, response) {
  var params = {user: {}, errors: {}};
  if(request.query.success){
    params.user.successMsg=true;
  }
  response.render('index', params);
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
    var cnt = new Contact(req.body.user);

    cnt.save(function(err){
        if(err)
            console.log(err);
        else
            console.log(cnt);
        res.redirect('/?success=true');
    });
  }

});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server started on URL localhost:' + port + ' at ' +new Date());
});