const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;
const register = require('../model/Admin/register');
const userData = require('../model/User/user');

// Admin
var opt = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'AJ',
}
passport.use(new jwtStrategy(opt, async (reccord, done) => {
    let checkAdmin = await register.findById(reccord.AdminData._id);
    if (checkAdmin) {
        return done(null, checkAdmin);
    }
    else {
        return done(null, false);
    }
}))

// User
var opt1 = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'User',
}
passport.use('user',new jwtStrategy(opt1, async (reccord, done) => {
    let checkUser = await userData.findById(reccord.UserData._id);
    if (checkUser) {
        return done(null, checkUser);
    }
    else {
        return done(null, false);
    }
}))

passport.serializeUser( (user, done)=> {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    let recheck = await register.findById(id);
    if (recheck) {
        return done(null, recheck);
    }
    else {
        return done(null, false);
    }
})