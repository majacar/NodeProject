/**
 * Tests user auth
 */

var app = require('../../app');
var request = require('supertest');
var should = require('chai').should();
var faker = require('faker');

describe('Sign up', function () {

  it('POST /auth Should return missing parameters', function (done) {
    var profile = {
      username: faker.internet.email().toLowerCase()
    };

    request(app)
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(profile)
      .expect(400)
      .end(function (err, res) {
        if (err) {
          throw err;
        }

        should.not.exist(err);
        res.body.message.should.equal('Missing parameters');
        done();
      });
  });

  it('POST /auth Should deny blacklist usernames', function (done) {
    var profile = {
      email: 'lepabrena@maildrop.cc',
      username: 'admin',
      password: '123'
    };

    request(app)
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(profile)
      .expect(406)
      .end(function (err, res) {
        if (err) {
          throw err;
        }

        should.not.exist(err);
        res.body.message.should.equal('This username is already registered');
        done();
      });
  });

  it('POST /auth Should return successfully registered', function (done) {
    var profile = {
      email: 'lepabrena@maildrop.cc',
      username: 'lepabrena',
      password: '123',
      skills: ['guitar']
    };

    request(app)
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(profile)
      .expect(201)
      .end(function (err, res) {
        if (err) {
          throw err;
        }

        should.not.exist(err);
        should.exist(res.body.token);

        // assign user globaly
        global.user = res.body.results;

        done();
      });
  });

  it('POST /auth Should return successfully registered', function (done) {
    var profile = {
      email: 'milekitic@maildrop.cc',
      username: 'milekitic',
      password: '123',
      skills: ['guitar']
    };

    request(app)
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(profile)
      .expect(201)
      .end(function (err, res) {
        if (err) {
          throw err;
        }

        should.not.exist(err);
        should.exist(res.body.token);

        // assign user globaly
        global.token2 = res.body.token;

        done();
      });
  });

});
