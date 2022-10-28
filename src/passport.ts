import { correctUserAndPassword } from "./DatabaseAccess/loggingIn";

//passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    function (username, password, cb, connection) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return correctUserAndPassword(username, password, connection)
           .then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect email or password.'});
               }
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));