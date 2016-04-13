var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var StudentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

var Student = mongoose.model('student', StudentSchema);

// Artist.find({}).populate('artworks')
// .exec(function (err, artists) {
//   console.log('Artists:', artists[0].artworks);
// });

module.exports = Student;