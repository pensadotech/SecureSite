// STEP 4:  passport local startegy
const passport = require('passport')
const { Strategy } = require('passport-local')
//const Strategy = require('passport-local').Strategy
const db = require('../../../models')

module.exports = () => {

  passport.use( new Strategy( 
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {

      // Find-one
      db.users.findOne({
          where: {
            username: username
          }
        })
        .then(user => {
          // Does password matches?
          if (user !== null && user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch(e => console.error(e))
    }

  ))

} // module.exports