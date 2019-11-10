var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var passport = require('passport');
var settings = require('../config/settings')
var User = require('../models/User');

module.exports = function(){
    var opts={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = settings.secret;
    passport.use(new JwtStrategy(opts,function(jwt_payload,done){
        User.findOne({id:jwt_payload.id},function(err,user){
            if(err){
                return done(err,false);

            }
            if(user){
                done(null,user);
            }
            else{
                done(null,false)
            }

        })
    }))
}

