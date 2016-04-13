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

router.delete('/', function(req, res, next) {
    Students.remove({ firstName: 'James' }, function(err) {
        if (err) {
            return next(err);
        }

        res.status(200).json({
            status: "success"
        })
    });
})

module.exports = router;
