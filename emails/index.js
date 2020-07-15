// const express = require('express');
// const router = express.Router();
// const nodemailer = require('nodemailer');
const creds = require('../database/migrations/config'); 


let express = require("express"),
  path = require('path'),
  nodeMailer = require('nodemailer'),
  bodyParser = require('body-parser');

let app = express();

app.use(express.static('src'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/send', function (req, res) {
  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          // should be replaced with real sender's account
          user: creds.USER,
    	  pass: creds.PASS
      }
  });
  let mailOptions = {
      // should be replaced with real recipient's account
	  to: 'maggieprice2016@gmail.com',
      name: req.body.name,
      subject: req.body.subject,
      email: req.body.email,
      message: req.body.message
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.writeHead(301, { Location: 'index.html' });
  res.end();
});

let server = app.listen(4000, function(){
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});


const cors = require('cors');

// const transport = {
//   host: 'smtp.gmail.com',
//   port: 465,
// 	secure: true,
//   auth: {
//     user: creds.USER,
//     pass: creds.PASS
//   }
// }

// const transporter = nodemailer.createTransport(transport)

// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Server is ready to take messages');
//   }
// });

// router.post('/send', validateEmail, (req, res, next) => {
//   const name = req.body.name
//   const email = req.body.email
//   const message = req.body.message
//   const content = `name: ${name} \n email: ${email} \n message: ${message} `

//   const mail = {
//     from: 'maggieprice2016@gmail.com',
//     to: 'maggieprice2016@gmail.com',  //Change to email address that you want to receive messages on
//     subject: 'New Message from Contact Form',
//     text: content
//   }

//   transporter.sendMail(mail, (err, data) => {
//     if (err) {
//       res.json({
//         msg: 'fail'
//       })
//     } else {
//       res.json({
//         msg: 'success'
//       })
//     }
//   })
// })


// function validateEmail(req, res, next) {
//     if (req.method === 'POST') {
//      req.body('name', 'Name cannot be empty').notEmpty();
//      req.body('email', 'Must be a valid email').isEmail();
//      req.body('message', 'Message cannot be empty').notEmpty();
//    } 
//    const errors = req.validationErrors();
//    if (errors) {
//      return res.status(400).json({
//        message: 'Validation failed',
//        failures: errors
//      });
//    } else {
//      return next();
//    }
//  }

// const express = require("express");
// const path = require("path");
// const nodemailer = require("nodemailer");

// const app = express();


// body parser middleware

// app.use(express.json());
// app.use(express.urlencoded( { extended: false } )); // this is to handle URL encoded data
// end parser middleware


// custom middleware to log data access
// const log = function (request, response, next) {
// 	console.log(`${new Date()}: ${request.protocol}://${request.get('host')}${request.originalUrl}`);
// 	console.log(request.body); // make sure JSON middleware is loaded first
// 	next();
// }
// app.use(log);
// end custom middleware


// enable static files pointing to the folder "public"
// this can be used to serve the index.html file
app.use(express.static(path.join(__dirname, "public")));


// HTTP POST
// app.post("/send", function(request, response) {
//   // create reusable transporter object using the default SMTP transport
// 	const transporter = nodemailer.createTransport({
// 		host: "smtp.gmail.com",
// 		port: 465,
// 		secure: true,
// 		auth: {
// 			user: creds.USER,
//       pass: creds.PASS
// 		}
// 	});

// 	var textBody = `FROM: ${request.body.name} EMAIL: ${request.body.email} MESSAGE: ${request.body.message}`;
// 	var htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${request.body.name} <a href="mailto:${request.body.email}">${request.body.email}</a></p><p>${request.body.message}</p>`;
// 	var mail = {
// 		from: "maggieprice2016@gmail.com", // sender address
// 		to: "maggieprice2016@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
// 		subject: "Mail From Contact Form", // Subject line
// 		text: textBody,
// 		html: htmlBody
// 	};

// 	// send mail with defined transport object
// 	transporter.sendMail(mail, function (err, info) {
// 		if(err) {
// 			console.log(err);
// 			response.json({ message: "message not sent: an error occured; check the server's console log" });
// 		}
// 		else {
// 			response.json({ message: `message sent: ${info.messageId}` });
// 		}
// 	});
// });


 

// app.listen(PORT, () => console.log(`listening on port ${PORT}`));
// module.exports = router;