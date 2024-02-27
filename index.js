const express = require('express');
const port = 8001;
const app = express();

// Requires
const db = require('./config/mongoose');
const passport = require('passport');
const passportjwt = require("./config/passport_jwt_strategy");

// encoded the code
const session = require('express-session');
app.use(express.urlencoded());


app.use(session({
    name: 'adminJwt',
    secret: 'AJ',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 100
    }
}))

app.use(passport.initialize());
app.use(passport.session());


app.use('/admin', require('./routes/API/V1/Admin/admin'));

// Server connection
app.listen(port,(err)=>{
    if(err) console.log("Something wrong");
    console.log("Server connect on", port);
})