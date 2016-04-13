var mongoose = require('mongoose');

function dropDatabase(done) {
    mongoose.connection.db.dropDatabase();
    done();
}

module.exports = {
    dropDatabase: dropDatabase
}