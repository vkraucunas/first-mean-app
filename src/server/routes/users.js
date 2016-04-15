var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var config = require('../../_config');

var User = require('../models/users');

router.post('/register', function(req, res, next) {
    //ensure users doesn't exist yet
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            res.status(409).json({
                status: 'fail',
                message: "This email already used"
            });
        }
        var newUser = new User(req.body);
        newUser.save(function() {
            var token = genToken(newUser);

            res.status(200).json({
                status: 'success',
                data: {
                    token: token,
                    user: newUser.email
                }
            })
        })
    })
})

router.post('/login', function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(401).json({
                status: 'fail',
                message: "Email and/or password is incorrect"
            });
        }
        user.comparePassword(req.body.password, function(err, match) {
            if (err) {
                return next(err);
            }
            if (!match) {
                res.status(401).json({
                    status: 'fail',
                    message: "Email and/or password does not match"
                });
            }
            user = user.toObject();
            delete user.password;
            var token = genToken(user);
            res.status(200).json({
                status: 'success',
                data: {
                    token: token,
                    user: user
                }
            });
        });
    });
});

router.post('/logout', function(req, res, next) {
    res.sendFile('/index.html');
})


/// help, i need somebody
function genToken(user) {
    var payload = {
        exp: moment().add(14, 'days').unix(),
        iat: moment().unix(),
        sub: user._id
    }
    return jwt.encode(payload, config.TOKEN_SECRET);
}

function ensureAuthenticated(req, res, next) {
    if (!(req.headers && req.headers.authorization)) {
        return res.status(400).json({
            status: "fail",
            message: "No header present or no authorization"
        })
    }
    //decode token
    var header = req.headers.authorization.split(' ');
    var token = header[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);
    var now = moment().unix();
    // ensure it's valid and not expired
    if (now > payload.exp || payload.iat > now) {
        return res.status(401).json({
            status: "fail",
            message: "Token is invalid"
        })
    }
    //ensure user is still in database
    User.findById(payload.sub, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(404).json({
                status: 'fail',
                message: "User does not exist"
            });
        }
        // attach user to request obj
        req.user = user;
        // call next middleware
        next();
    })
}


function ensureAdmin(req, res, next) {

    //check that user.admin = true
    if (!(req.user && req.user.admin)) {
        return res.status(401).json({
            status: "fail",
            message: "User is not authorized"
        })
    }
    next();
}



module.exports = router;