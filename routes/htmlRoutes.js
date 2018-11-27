// html Index
const path = require('path')

module.exports = (app) => {
  
  app.get('/signIn', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/loginpage.html'))
  })

  app.get('/students', (req, res) => {
    // authorization
    if(req.user) {
      res.sendFile(path.join(__dirname, '../public/studentpage.html'))
    } else {
      res.redirect('/signIn')
    }    
  })

}