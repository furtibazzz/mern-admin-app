var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    title:String,
    author:String,
    descriptioN:String,
    published_date:Date,
    publisher:String,
    update_date:{
        type:Date,
        default:Date.now
    }


})

module.exports = mongoose.model("Book",BookSchema);
