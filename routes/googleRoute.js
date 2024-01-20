const express = require("express")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport = require("passport")
const googleModel = require("../models/googleModel")


const googleRoute = express.Router()


passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
    let user = await googleModel.findById(id)
    done(null, user)
})

passport.use(new GoogleStrategy({
    callbackURL: 'http://localhost:5173/home',
    clientID: process.env.clientId,
    clientSecret: process.env.clientSecret,
}, async (request, acessToken, refreshToken, profile, done) => {
    let currentUser = await googleModel.findOne({
        googleId: profile.id
    })
    if (currentUser) {
        console.log(`currentuser:`, currentUser);
        done(null, currentUser)
    } else {
        let newUser = await googleModel.create({
            username: profile.displayName,
            googleId: profile.id
        })
        console.log(newUser);
        done(null, newUser)
    }
}))


googleRoute.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}))

module.exports = googleRoute