const User = require('../model/users');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    return res.render('home',{
        title: "Home"
    }) // Name of the file and the context we want to send
}
module.exports.post = function(req,res){
    User.create(req.body,function(err){
        if(err){
            console.log('Error while creating post');
        }
    }
    )
}