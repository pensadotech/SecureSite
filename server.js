const express = require('express')
const app = express()
const bodyparser = require('body-parser') // Needed for passport
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))  // Needed for passport
app.use(bodyparser.urlencoded({
  extended: true
}))
app.use(bodyparser.json())

// STEP 1: passport, cookie-parser, express-session
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// STEP 2:  passport
app.use(cookieParser());
app.use(session({ secret: 'library' }));
// STEP 3:  passport
require('./routes/config/passport.js')(app);

// other routes
require('./routes')(app)

// sync DB and listen
require('./models').sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
  })
})