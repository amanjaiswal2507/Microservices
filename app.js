const express = require('express');
const app =express();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path =require('path');
const key = require('./key');
const middlewares= require('./middlewares');
const bodyParser =require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use('/assets', express.static('assets'));
app.set('view engine', 'ejs');


//Mock user login accepted directly
//localhost:3000/login to get jwtoken key
app.get('/login',(req,res)=>{
    const user = req.query;
    //taking the token key
    let token =jwt.sign(user, key.secret);
    //storing it in the localstorage
    localStorage.setItem("jwttoken",token);
    res.json(token);
});

//for downloading and resizing the image
app.get('/image', middlewares.verification, middlewares.ThumbnailCreation, (req,res)=>{
    res.send("Downloaded successfully and thumbnail created");
});

app.get('/', function(req,res){
    res.send("CashFlo - Nodejs Assignment")
});
//else show 404 error status
app.get('*', function(req,res){
    res.render('404');
});

app.listen(3000);

