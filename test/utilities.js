var mongoose = require('mongoose');

function dropDatabase(done) {
    mongoose.connection.db.dropDatabase();
    if (done) {
        done();
    }

}

module.exports = {
    dropDatabase: dropDatabase
}