// PASSPORT: Sing-In and Sing-up routes
const express = require('express');
const passport = require('passport');
const db = require('../models')

// Auth Index
module.exports = (app) => {

  // Create - redirect need to be 
  //          manually handled in frontend
  app.post('/signUp', (req, res) => {

    // decode user from request body
    const {
      username,
      password
    } = req.body;
    let sessionUser = {
      username: username,
      password: password
    }

    // does the user already exists?
    db.users.findOne({
        where: {
          username: username
        }
      })
      .then(r => {

        if (r === null) {

          console.log('username:', username)
          console.log('password:', password)

          // create user if does not exist 
          db.users.create(sessionUser)
            .then(r => {
              let user = r.dataValues
              req.login(user, () => {
                // redirect without a code, will set redirect flag in resposne to true
                return res.redirect('/');
              })
            })
            .catch(e => console.error(e))

        } else {
          // redirect with a code, will set redirect flag in resposne to false
          return res.redirect(200, '/signIn')
        }
      })
      .catch(e => console.error(e))

  })


  // OPTION #1 : adjusted autamnticating (preferred)
  //             uses local strategy, but redirect need to be 
  //             manually handled in frontend
  app.post('/signIn', (req, res, next) => {
    // authenticate
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        // redirect with a code, will set redirect flag in resposne to false
        return res.redirect(200, '/signIn')
      }
      req.login(user, (err) => {
        if (err) {
          console.log('error: ', err)
          return next(err)
        }

        console.log('success')
        // redirect without a code, will set redirect flag in resposne to true
        return res.redirect('/')
      })
    })(req, res, next)

  })

  // OPTION 2: suggested authentication
  //           it give errors in frontend
  app.post('/signIn2', passport.authenticate('local', {
    sucessRedirect: '/signIn',
    failureRedirect: './login'
  }))

  // OPTION 3: Customized authentication
  //           this does not use strategies
  app.post('/signIn3', (req, res) => {
    // decode user from request body
    const {
      username,
      password
    } = req.body;

    //Find - one
    db.users.findOne({
        where: {
          username: username
        }
      })
      .then(r => {
        let user = r.dataValues
        if (user.password === password) {
          req.login(user, () => {
            res.json(user)
            return res.redirect('/');
          })
        }
      })
      .catch(e => console.error(e))

  })

  // SIGN out
  app.get('/signOut', (req, res) => {
    console.log("backend-signOut")
    req.logout()
    res.redirect('/');
  })

  // Get Session user
  app.get('/sessionuser', (req, res) => {
    let sessionUser = {}
    if (req.user !== undefined) {
      sessionUser = req.user
    }
    return res.json(sessionUser);
  })



}