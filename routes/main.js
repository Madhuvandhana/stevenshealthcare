const express = require('express');
const router = express.Router();
const resData = require('../data/main');


router.post('/', async (req, res) => {
    let usersData = req.body;
  
    try {
      const result = await resData.addResult(
        usersData['username']
      );
      res.render('result', {data: result});
    } catch (e) {
      res.status(400).render('result', {
        error: e,
        hasErrors: true,
      });
      //res.sendStatus(400);

    }
  });

  module.exports = router;