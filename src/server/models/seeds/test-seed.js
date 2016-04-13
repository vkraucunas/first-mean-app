var Student = require('../students');

var data = [
    {
        firstName: "James",
        lastName: "Gibson",
        year: 2005
    }
];


function runSeed(done) {
    // data.forEach(function(el) {
    //     Students.insert(el);
    // });
    var student = new Student (data[0]);
    student.save(function(err, res) {
        done();
    });
};

module.exports = {
    runSeed: runSeed
}