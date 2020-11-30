const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"]}));

//Redriect route for google
router.get("/auth/google/redirect", passport.authenticate("google"), (req,res,next) => {
    user = req.usser;
    res.redirect('http://localhost:8000/auth/google/loggedIn?'+'token='+req.user.token);
});

module.exports = router;