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
                console.log('I navlid Username or Password');
                return done(null,false);
            } 

            return done(null,user);
        })

    }));

// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){      // We are basically setting cookie
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

module.exports = passport;