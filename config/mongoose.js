const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');

const db = mongoose.connection;

db.on('err',function(err){
    if(err){
        console.error.bind(console,"Error while connecting to database");
        return;
    }
});

db.once('open',function(){
    console.log("Successfully connected to the database")
});

module.exports = db;