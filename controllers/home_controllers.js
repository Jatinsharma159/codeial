const User = require('../model/users');
const Post = require('../model/post');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    return res.render('home',{
        title: "Home"
    }) // Name of the file and the context we want to send
}


