//routes/user.js
//import { express, router } from "./auth";
export const express = require('express');
export const router  = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user profile. */
router.get('/profile', function(req, res, next) {
    res.send(req.user);
});

module.exports = router;