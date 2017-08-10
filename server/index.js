const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var massive = require('massive');
// var passport = require('passport');
var session = require('express-session');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config.js');

const app = module.exports = express();

app.use(bodyParser.json());
// app.use(session({
//   secret: config.secret,
//     resave: true,
//     saveUninitialized: false,
//     cookie:{
//       maxAge: (1000*60*60*24*14) //this is 14 days
//     }
// }))

// app.use(passport.initialize());
// app.use(passport.session());

massive(config.connection)
.then( db => {
  app.set('db', db);
})


app.use(express.static(__dirname + './../build'))

// var userController = require("./userController.js");

/////////////Oauth functions

// passport.use(new GoogleStrategy({
//   clientID: config.auth0.clientID,
//   clientSecret: config.auth0.clientSecret,
//   callbackURL: '/auth/callback'
//   },
//   userController.findById
// ));

// passport.serializeUser(function(user,done){
//   console.log('serializing',user);
//   done(null,user);
// });

// passport.deserializeUser(function(id,done){
//   db.find_by_id([id],function(err,user){
//     done(err,user);
//   });
// });

///////Oauth endpoints ->
// app.get('/getuserinfo',userController.getUserInfo);

// app.get('/logout',function(req,res){
//   req.session.destroy(function(err,data){
//   });
// });

// app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/calendar'] }));

// app.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/LoginPage' }), function (req, res) {
//     res.redirect('/');
// });

//////////Other endpoints for the front end ->

const tellerController = require('./tellerController');

// All Teller Controls
app.get('/api/members', tellerController.getAllMembers);
app.get('/api/getMember/:acctInput', tellerController.getMember);
app.get('/api/getMembersAccounts/:acctInput', tellerController.getMembersAccounts);
app.get('/api/getMemberByLastName/:lastNameInput', tellerController.getMemberByLastName);

app.put('/api/depositStepOne/:accountNumber', tellerController.deposit);
// End of teller cntl

const bankerController = require('./bankerController');

//Banker Controls
app.post('/api/createNewMember', bankerController.createNewMember);
//End of Banker controls


const port = 8000;
// app.listen(config.port, console.log("you are now connected on " + config.port));
app.listen(port, console.log(`you are now connected on port ${port}`));
