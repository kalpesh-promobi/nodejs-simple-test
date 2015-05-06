'use strict';

var hippie = require('hippie');
var request = require('supertest')

var app = require('../server');

describe('Server', function () {

  describe('/ endpoint', function () {

    it('Serves index page', function (done) {
      hippie(app)
        .get('/')
        .end(function(err) {
          if (err)
            throw err;
          else
            done();
        });
    });

  });

  describe('/contacts endpoint', function () {

    it('Creates a contact request with valid parameters should redirect', function (done) {
      request(app)
        .post('/contacts')
        .type('form')
        .send({user: {name: 'Kalpesh', phone_number: '123456', email: 'kalpesh@promobitech.com', address: 'Pune', comments: 'This is comment'}})
        .set('Accept', 'application/json')
        .expect(302)
        .end(function(err, res) {
          if (err)
            throw err;
          else
            done();
        });
    });

  });

  describe('/contacts endpoint', function () {

    it('Creates a contact request with invalid parameters should render same page', function (done) {
      request(app)
        .post('/contacts')
        .type('form')
        .send({user: {name: '', phone_number: '', email: '', address: 'Pune', comments: 'This is comment'}})
        .expect(422)
        .end(function(err, res) {
          if (err)
            throw err;
          else
            done();
        });
    });

  });

});