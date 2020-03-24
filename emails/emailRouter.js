const express = require('express');

const Emails = require('./emailModel');

const router = express.Router();

router.post('/', (req, res) => {
  const emailData = req.body;
  Emails.add(emailData)
  .then(email => {
    res.status(201).json(email);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to send email' });
  });
});


module.exports = router;