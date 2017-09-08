const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var massive = require('massive');
// var passport = require('passport');
var session = require('express-session');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config.js');
// request and cheerio will let us scrape a loan site to recieve on the fly loan rates.
let request = require('request');
let cheerio = require('cheerio');

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
app.use(express.static('build'));

massive(config.connection)
.then( db => {
  app.set('db', db);
})

//this function will fire when app starts up and update loan rates.... maybe....
// getLoanRates()

// function getLoanRates() {
//     req = request.defaults({
//         jar:true,
//         rejectUnauthorized: false,
//         followAllRedirects:true
//     })
//     req.get({
//         url: 'https://www.bankrate.com',
//         uri: 'https://www.bankrate.com',
//         headers: {
//             'User-Agent': 'Chrome/41.0.2228.0'
//         }
//     }, function(err, res, body) {
        
//         if (err) {
//             console.log(err)
//             return
//         } else if (res.statusCode === 200) { 
//             let $ = cheerio.load(body);
//             console.log('hit', $('.homepage__rate-tab'))

            // $('.homepage__rate-tab').each(function() {
            //   let rates = []
            //   let rate = 
            //   console.log(rate)
            // })

            // $('a.s-access-detail-page', '#atfResults').each(function() {
            //     info = $(this).attr('href');
            //     productURLs.push(info)
            // });
            // $('a.pagnNext', '#bottomBar').each(function() {
            //     relevantPath = $(this).attr('href');
            //     console.log($(this).html())
            //     let re = new RegExp('\/.*(\/.*)')
            //     nextURL = 'https://www.amazon.com' + relevantPath.match(re)[1]
            //     console.log(nextURL)
            // });
//         }
//     })
// }
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
app.get('/api/getMembersAccountSavings1/:acctInput', tellerController.getMembersAccountSavings1);
app.get('/api/getMembersAccountChecking/:acctInput', tellerController.getMembersAccountChecking);
app.get('/api/getMemberByLastName/:lastNameInput', tellerController.getMemberByLastName);

app.put('/api/deposit/:accountNumber', tellerController.deposit);
app.put('/api/savingsWithdrawal/:accountNumber', tellerController.savingsWithdrawal);
app.put('/api/checkingDeposit/:accountNumber', tellerController.checkingDeposit);
app.put('/api/checkingWithdrawal/:accountNumber', tellerController.checkingWithdrawal);
// End of teller cntl

const bankerController = require('./bankerController');

//Banker Controls
app.post('/api/createNewMember', bankerController.createNewMember);
app.post('/api/createSavings1/:accountNumber', bankerController.createSavings1);
app.post('/api/createChecking', bankerController.createChecking);
//End of Banker controls


const port = config.port;
// app.listen(config.port, console.log("you are now connected on " + config.port));
app.listen(port, console.log(`you are now connected on port ${port}`));
