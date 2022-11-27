const express = require('express');// Becuase we don't this variable to be overridden anywhere in the code
const app = express();
const port = 8000;


app.listen(port,function(err){
    if(err){
        console.log(`Error while starting express : ${err}`)
    }
    console.log(`Express is up and running on port: ${port}`);
});