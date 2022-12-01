const express = require('express');  // Becuase we don't this variable to be overridden anywhere in the code
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');   // Used for session cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.static('./assets'));
app.use(expressLayouts);

app.use(express.urlencoded());
app.use(cookieParser());

// Extract styles and scripts from sub pages to the layout
 app.set('layout extractStyles', true);
 app.set('layout extractScripts', true);

// Set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'codeial',
    // Change the secret before deployment in production mode
    secret: 'ehhsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    }
}))

app.use(passport.initialize());
app.use(passport.session());


// Use Express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error while starting express : ${err}`)
    }
    console.log(`Express is up and running on port: ${port}`);
});