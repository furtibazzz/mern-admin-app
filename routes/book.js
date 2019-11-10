var express=require('express');
var mongoose=require('mongoose');
var Book=require('../models/Book');
var passport=require('passport')
require('../config/passport')(passport);

var router = express.Router();


getToken = function(headers){
    if(headers && headers.authorization){
        var parted = headers.authorization.split(' ');
        if(parted.length === 2){
            return parted[1];
        }else{
            return null;
        }
    }else{
        return null;
    }

}

/* Get all Book details */
router.get('/',passport.authenticate('jwt',{session:false}),function(req,res){
    var token = getToken(req.headers);
    if(token){
        Book.find(function(err,data){
            if(err){
                return next;
            }
            res.json(data)
        })
    }
    else{
        res.status(401).send({success:false,msg:'Unauthorized'})
    }

})

router.post('/',passport.authenticate('jwt',{session:false}),function(req,res){
    var token = getToken(req.headers);
    if(token){
            Book.create(req.body,function(err,data){
                if(err){
                    return next;
                }
                res.json(data);
            })
    }
    else{
        res.status(401).send({success:false,msg:'Unauthorized'})
    }

})




module.exports = router;
