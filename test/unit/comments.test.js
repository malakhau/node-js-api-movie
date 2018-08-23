const app = require('../../server');
const movies = require('../../app/models/movie');
const comment = require('../../app/models/comment');
const chai = require('chai');
const mocha = require('mocha');
const request = require('supertest');
const expect = chai.expect;

describe('/comments', () => {

    it('[GET] /comments', (done) => {
        request(app)
            .get('/comments')
            .end((err, res) => {
                expect(typeof res.body).to.have.length.gt(0);
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });
    it('[GET] 422 /comments/:movie_uuid?', (done) => {
        request(app)
            .get('/comments/qwertyuiopasdfghjklzxcvb')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(422);
                done();
            });
    });
    it('[GET] 404 (no comment for given movie_uuid) /comments/:movie_uuid?', (done) => {
       request(app)
           .get('/comments/abcdzzzz1234zzzz1234zzzz')
           .end((err, res) => {
               expect(res.statusCode).to.be.equal(422);
               done();
           });
   });
});
