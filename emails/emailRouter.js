// const express = require('express');

// const Emails = require('./emailModel');

// const router = express.Router();



// router.post('/', validateEmail, (req, res) => {
//   const emailData = req.body;
//   Emails.add(emailData)
//   .then(email => {
//     res.status(201).json(email);
//   })
//   .catch (err => {
//     res.status(500).json({ message: 'Failed to send email' });
//   });
// });

// function validateEmail(req, res, next) {
//    if (req.method === 'POST') {
//     req.body('name', 'Name cannot be empty').notEmpty();
//     req.body('email', 'Must be a valid email').isEmail();
//     req.body('message', 'Message cannot be empty').notEmpty();
//   } 
//   const errors = req.validationErrors();
//   if (errors) {
//     return res.status(400).json({
//       message: 'Validation failed',
//       failures: errors
//     });
//   } else {
//     return next();
//   }
// }

// module.exports = router;