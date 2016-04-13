process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var should = chai.should();
var testUtilities = require('../utilities');


chai.use(chaiHttp);


describe('students routes', function() {


    beforeEach(function(done) {
        testUtilities.dropDatabase(done);
    });

    afterEach(function(done) {
        testUtilities.dropDatabase(done);
    });

    describe('', function() {

        it('', function(done) {
          done();
        });
});

});