const path =require('path');
const jwt =require('jsonwebtoken');
const key=require('./key');
const fs=require('fs');
const download= require('image-downloader');
const resizeImg = require('resize-img');



const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./jwtoken');
//storing the jwtoken in jwtoken folder in a jwttoken file


//verifying of jsonwebtoken key 
const verification = (req, res, next)=>{
    let token = localStorage.getItem("jwttoken");
    //now verifying the token with the key secret
    if(token){
        jwt.verify(token, key.secret,function(err,decoded){
            if(err){
                res.render('unauthorized_access');
                //means jwtoken key not matched with secret key, so no access
            }
            else{
                next();
            }
        });
    }
    else{
        res.render('unauthorized_access');
    } 
};

//creating thumbnail
const ThumbnailCreation= (req,res,next)=>{
    
    //just for example to check directly (localhost:3000/image)
    let url = "https://cdn.britannica.com/32/145832-004-510D6F21/types-dice.jpg";

    //otherwise use the below url assigned commented 
    //let url = req.query.url;
	let ext = path.extname(url);//extension
    
    
    if(ext === '.jpeg' || ext ==='.jpg' || ext ==='.png' || ext==='.bmp'){
        //Download image and save on the given destination
        const options={
            url: url,
            dest: './images'       
        };
        download.image(options)
        .then(({filename})=>{
            resizeImg(fs.readFileSync(filename),{width: 50, height: 50}).then (buf=>{
                let fName = filename.split("\\");
                let finalName =fName.pop();
                console.log(finalName);
                //resizing the image and saving in the thumbnail folder
                fs.writeFileSync("./thumbnails/" + finalName, buf);
                res.json({
                    Message : "Image downloaded in images folder and Thumbnail saved succesfully in thumbnails folder"
                });
                next();
            });
        });
    }
    else{
        res.render('Forbidden');//403 status code
        res.json({
            Message: "File extensions allowed -> bmp, png, jpg, jpeg"
        });
    }
};

module.exports.verification = verification;
module.exports.ThumbnailCreation = ThumbnailCreation;
