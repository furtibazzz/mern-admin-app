
var express=require('express');
var favicon = require('serve-favicon');
var bodyParser=require('body-parser');
var logger=require('morgan');
var path=require('path');
var book= require('./routes/book')
var auth= require('./routes/auth');

var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost:27017/adminportaldb",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    promiseLibrary:require('bluebird')
})
.then(()=>console.log("connection successfully done"))
.catch((err)=>console.error(err))


var app=express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'build')));

app.use('/api/book',book);
app.use('/api/auth',auth);

app.use(function(req,res,next){
    var err=new Error("Not Found");
    err.status=404;
    next(err);
});

app.use(function(err,req,res,next){
    //set locals to providing errors in developement
    res.locals.message=err.message;
    // res.local.error=req.app.get('env')='development'?Error:{};
    //render the error page
    res.status(err.status||500);
    res.render('error');
});

module.exports=app;
