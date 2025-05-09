const express = require('express');
const router = express.Router();
const http = require("http");
const auth = require("http-auth");

const digest = auth.digest({
  realm: "Bruno",
  file: () => 'foo:passwd',
});

router.get('/auth', digest.check(), (req, res) => {
  res.status(200).json({ message: 'Authentication successful' });
});

module.exports = router;
