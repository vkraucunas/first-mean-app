var express = require('express');
var router = express.Router();
var Students = require('../models/students');

router.get('/', function(req, res, next) {
    Students.find({})
        .then(function(students) {
            res.status(200).json({
                status: "success",
                data: students
            })
        })
        .catch(function(error) {
            return next(error);
        })
});

router.get('/:id', function(req, res, next) {
    Students.find({_id: req.params.id})
        .then(function(student) {
            res.status(200).json({
                status: "success",
                data: student
            })
        })
        .catch(function(err) {
            return next(err);
        })
})

router.delete('/:id', function(req, res, next) {
    Students.remove({ _id: req.params.id })
        .then(function() {
            res.status(200).json({
                status: "success"
            })
        })
        .catch(function(err) {
            return next(err);
        });
})

router.put('/update/:id', function(req, res, next) {
    Students.findByIdAndUpdate( req.params.id, req.body, { new: true })
        .then(function(update) {
            res.status(200).json({
                status : 'success',
                data : update
            });

        })
        .catch(function(err) {
            return next(err);
        })
});

router.post('/', function(req, res, next){
    var student = Students(req.body);
    student.save()
        .then(function(student) {
            res.status(200).json({
                status: 'success',
                data: student
            });
        })
        .catch(function(err) {
            return next(err);
        })
});

module.exports = router;
