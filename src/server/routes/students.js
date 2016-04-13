var express = require('express');
var router = express.Router();
var Students = require('../models/students');

router.get('/', function(req, res, next) {
    Students.find({}, function(err, students) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            status: "success",
            data: students
        });
    });
});

router.get('/:id', function(req, res, next) {
    Students.find({_id: req.params.id}, function(err, student) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            status: "success",
            data: student
        })
    })
})

router.delete('/:id', function(req, res, next) {
    Students.remove({ _id: req.params.id }, function(err) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            status: "success"
        })
    });
})

router.put('/update/:id', function(req, res, next) {
    Students.findByIdAndUpdate( req.params.id, req.body, { new: true }, function(err, update) {
        if (err) { return next(err) };
        res.status(200).json({
            status : 'success',
            data : update
        });
    });
});

router.post('/', function(req, res, next){
    var student = Students(req.body);
    student.save(function(error, student){
        res.status(200).json({
         status: 'success',
         data: student
        });
    });
});

module.exports = router;
