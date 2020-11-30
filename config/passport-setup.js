const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const user = require('../models/Users');
const admin = require('firebase-admin');
require('dotenv').config();

const db = admin.firestore();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    var checkProfileId = JSON.parse(JSON.stringify(id));
    var checkingConditions = db.collection('users').doc(checkProfileId); //Checking for unique profile id
    var doc = await checkingConditions.get();
    done(null, doc); //doc already exists if user is signed in
});

passport.use(
    new GoogleStrategy(
    {
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: "/auth/google/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
        //passport callback function
        //checking is user already exists in the db with given profile id
        var checkProfileId = JSON.parse(JSON.stringify(profile.id)); //
        var checkingConditions = db.collection('users').doc(checkProfileId); //Checking for unique profile id
        var doc = await checkingConditions.get();
        //checking if the document exists in db or not
        if(doc.exists) {
            var {_id, name, email, googleId} = doc.data(); //obtaining data
            const token = jwt.sign({_id, name, email, googleId}, process.env.JWTTOKEN, {expiresIn: "1d"}); //making a JWT
            var tokenConverted = JSON.parse(JSON.stringify(token));
            var res = await checkingConditions.update({token: tokenConverted});
            var sendingTemplate = {_id, googleId: doc.data().googleId, name, email} //For returning values
            done(null, sendingTemplate);
        }
        else {
            var userDetails = await new user ({
                _id: new mongoose.Types.ObjectId(),
                googleId: profile.id,
                name: profile.displayName,
                email: profile._json.email
            })
            //Creating token with name, email and googleId
            const token = jwt.sign({_id: userDetails.id, googleId: userDetails.googleId, name: userDetails.name, email: userDetails.email}, process.env.JWTTOKEN, {expiresIn: "1d"});
            //Adding token to the response
            userDetails.token = token;
            var info = JSON.parse(JSON.stringify(userDetails));
            var docName = JSON.parse(JSON.stringify(profile.id));
            //saving the data
            const saveData = db.collection('users').doc(docName).set(info);
            //sending template of info
            done(null, userDetails);
        }
    }
));

