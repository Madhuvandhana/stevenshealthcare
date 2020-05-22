const express = require('express');
const router = express.Router();
const usersData = require('../data/users');
const xss = require('xss');

router.post('/', async (req, res) => {
    let usersResponse = req.body;
    let username = usersResponse.username
    if (!username) {
      res.status(400).json({error: 'You must provide username'});
      return;
    }
    if (!usersResponse.email) {
      res.status(400).json({error: 'You must provide email'});
      return;
    }

    if (!usersResponse.password) {
      res.status(400).json({error: 'You must provide password'});
      return;
    }
  
    try {
      const result = await usersData.addUsers(
        xss(usersResponse['username']), xss(usersResponse['email']), xss(usersResponse['password'])
      );
      req.session.user = result;
      res.cookie('AuthCookie');
      var hour = 900000 //15 minutes
      req.session.cookie.expires = new Date(Date.now() + hour)
      req.session.cookie.maxAge = hour
      res.redirect('users/userDetails');
    } catch (e) {
      res.status(400).render('signup', {
        error: e,
        hasErrors: true,
      });
      //res.sendStatus(400);

    }
  });

  //logged in user details-displayes page with user details
	router.get('/userDetails',async function (req, res) {
		let user = req.session.user;
		let userDetails = await usersData.getUser(req.session.user._id);//user data from database
		//console.log(userDetails.userName);
		res.render('userDetails', { data:userDetails, id:req.session.user._id});
    });

  router.post('/login', async (req, res) => {
    let usersResponse = req.body;
    console.log("login here"+req.body.username);
   
  
    try {
      const result = await usersData.checkLogin( xss(req.body.email));
      if (result === null) {
       result = await usersData.addUsers(
        xss(req.body.username), xss(req.body.email) );
       }
       console.log(JSON.stringify(result));
      req.session.user = result;//users data stored in session
      res.cookie('AuthCookie');
      var hour = 900000 //15 minutes
      req.session.cookie.expires = new Date(Date.now() + hour)
      req.session.cookie.maxAge = hour
      
      res.sendStatus(200);
    } catch (e) {
      res.status(400).render('login', {
        error: e,
        hasErrors: true,
      });
      //res.sendStatus(400);

    }
  });
  
  
  module.exports = router;
