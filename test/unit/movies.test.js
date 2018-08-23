const app = require('../../server');
const movies = require('../../app/models/movie');
const comment = require('../../app/models/comment');
const chai = require('chai');
const mocha = require('mocha');
const request = require('supertest');
const expect = chai.expect;

describe('/movies', () => {
  it('[POST] /movies', (done) => {
     let title = 'Shrek 16'
     request(app)
       .post('/movies')
       .type('json')
       .send({ title: title })
       .end((err, res) => {
         expect(res.statusCode).to.be.equal(201);
         expect(res.body.title).to.be.equal(title);
         done();
       });
   });

  it('[GET] /movies', (done) => {
    request(app)
      .get('/movies')
      .end((err, res) => {
        expect(typeof res.body).to.have.length.gt(0);
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });
  it('[POST] 400 (bad request) /movies', (done) => {
    request(app)
      .post('/movies')
      .type('json')
      .send({ title: 1 })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});
