const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const creds = require('../config/config'); 

const transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', validateEmail, (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const message = req.body.message
  const content = `name: ${name} \n email: ${email} \n message: ${content} `

  const mail = {
    from: name,
    to: 'maggieprice2016@gmail.com',  //Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})


function validateEmail(req, res, next) {
    if (req.method === 'POST') {
     req.body('name', 'Name cannot be empty').notEmpty();
     req.body('email', 'Must be a valid email').isEmail();
     req.body('message', 'Message cannot be empty').notEmpty();
   } 
   const errors = req.validationErrors();
   if (errors) {
     return res.status(400).json({
       message: 'Validation failed',
       failures: errors
     });
   } else {
     return next();
   }
 }
module.exports = router;