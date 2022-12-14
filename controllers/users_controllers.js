const User = require('../model/users');

module.exports.profile = function(req,res){
    return res.render('user',{
        title: "Users Profile"
    });
}

// render the sign-up page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

// render the sign-in page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

// get the sign-up data

module.exports.create = function(req,res){

    if(req.body.password != req.body.confirm_password){
        console.log('Passwords do not match');
        return res.redirect('back');
    }
    // To check if user with email id already exists in db
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){ console.log('error while creating user'); return}

                return res.redirect('/users/sign-in');
                 // Confirm password not saved in db, because only fields described in schema will be saved, the additional ones will not be.
            })
        }
        else{
            return res.redirect('back'); // In case email already exists
        }
    })
}

// sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}
// For logging out the user
module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log('Error while logging out')
        }
    });
    return res.redirect('/')
}