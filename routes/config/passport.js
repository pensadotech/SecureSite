// STEP 3:  passport
const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = (app) => {
  // Initialize 
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {
    // call back that actually store the user in session
    // is possible just to store the user.id
    done(null, user);
  });

  // Retrieves user from session
  // if user.id was usedd in serializeUser,
  // this function will recive user.id
  passport.deserializeUser((user, done) => {
    // if usee.id is passed, search ind BD for user
    done(null, user);
  });

} // module.exports