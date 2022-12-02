const Post = require('../model/post');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user.id
    },function(err,newPost){
        if(err){
            console.log('Error while creating post');
        }
        return res.redirect('back');
    })
}



