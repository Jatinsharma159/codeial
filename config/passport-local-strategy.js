const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    }, 
    function(email,password,done){   // done is callback function which is reporting back to passport js
        // To find a user and establish identity
        User.findOne({email:email}, function(err,user){    // {email(The one we are looking for in db) : email(The one which is passed)}
            if(err){
                console.log('Error while finding user ---> passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Username or Password');
                return done(null,false);
            } 

            return done(null,user);   // Will return the user to serializer
        })

    }));

// serializing the user to decide which key is to be kept in cookies
// Will store user's id in session cookie which will be encrypted using express-session middleware
passport.serializeUser(function(user,done){      
    done(null,user.id);
});

// deserializing the user from the key in the cookie
passport.deserializeUser(function(id,done){    // We are finding the user from the cookie

    User.findById(id,function(err,user){
        if(err){
            console.log('Error while finding user ---> passport');
            return done(err);
        }
        return done(null,user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // If the user is signed-in, pass on the request to the next function (controller's actions)
    if(req.isAuthenticated()){  // Detects if a user is signed-in or not
        return next();
    }
    // If the user isn't signed-in
    return res.redirect('/users/sign-in');
}

// Checks if user is authenticated(session cookie present or not) and the user will be set in locals
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
// req.user contains the current signed-in user from the session cookie and we are just sending it to the locals for the views
        res.locals.user = req.user;          // (Doubt) Maybe user returned from a 'done' callback
    }
    next();
}

module.exports = passport;