// Routes Index
module.exports = (app) => {
  require('./authRoutes')(app)
  require('./htmlRoutes')(app)
  require('./apiRoutes')(app) 
}