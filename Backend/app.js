const mongoose = require("mongoose")
const dotenv = require("dotenv");
const cors = require("cors");
var express = require('express');
var app = express();
const bodyparser=require('body-parser');
const nodemailer=require('nodemailer');
const path=require('path');
const exphbs=require('express-handlebars');


// app.listen(3000);
const port = 4000;

dotenv.config();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})

app.get('/', function(req, res){
    res.send('hello world');
});


var email;

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

var transporter = nodemailer.createTransport({
  
    service : "gmail",
    auth :{
      user:"testtmailforapp@gmail.com",
       pass:"vrvxhgqxqrtfxtfd"
    },
    tls : { rejectUnauthorized: false }
  });
    
app.post('/sendOtp',function(req,res){
    email=req.body.email;

     // send mail with defined transport object
    var mailOptions={
        to: req.body.email,
       subject: "Otp for registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
  
        res.render('otp');
    });
});
