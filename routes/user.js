const express = require('express');
const { User } = require('../db/models');
const { Point } = require('../db/models');
const { Toilet } = require('../db/models');
const bcrypt = require('bcrypt');
const router = express.Router();

router.route('/reg')
  .get(async (req, res) => {
    res.render('user/reg');
  })
  .post(async (req, res) => {
    const { email, pass: password, name } = req.body;
    if (email && password) {
      const hashPass = await bcrypt.hash(password, +process.env.SALTROUND);
      const newUser = await User.create(
        { name, email, password: hashPass},
        { returning: true, plain: true }
      );
      req.session.user = { email: newUser.email, password: newUser.password, name: newUser.name};
      return res.sendStatus(200);
    } 
    return res.sendStatus(401);
  });

  router.route('/auth')
  .get(async (req, res) => {
    res.render("user/auth");
  })
  .post(async (req, res) => {
    const { email, pass: password} = req.body;
    if (email && password) {
      const currentUser = await User.findOne({ where: { email } });
      if (
        currentUser &&
        (await bcrypt.compare(password, currentUser.password))
      ) {
        req.session.user = {email: currentUser.email, password: currentUser.password };
        return res.sendStatus(200);
      } else {
        return res.sendStatus(401);
      }
    }
  });

router.route('/account')
  .get(async (req, res) => {
    const user = req?.session?.user;
    res.locals.user = user;
    // const userId = await User.findOne({ where: req.session.user });
    // const productIds = await Post.findAll({ where: { creatorId: userId.id } });
    // const likes = await Like.findAll({ where: { userId: userId.id } });
    // function finder(arr) {
    //   const newarr = arr.map((el) => el = el.userId);
    //   return newarr;
    // }
    // const allLikes = await Like.findAll({ where: { id: finder(likes) }, raw: true }); 
    
    // let counter = finder(likes).reduce((acc, el) => {
    //   if (!acc[el]) {
    //     acc[el] = 1;
    //   } else if (acc[el]) {
    //     acc[el]++
    //   }
    //   return acc;
    // }, {});

    // res.locals.likes = counter[userId.id];


    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',counter[userId.id]);

    // for (let i of products) {
    //   i.count = counter[i.id];
    // }
    // res.locals.counter = counter;
    // res.locals.posts = productIds;
    
    res.render('user/account');
    // res.json(products)
  });

  router.route("/createPoint")
  .post(async (req, res) => {
    const user = req?.session?.user;
    // let str = f
    // const coords = await coords;
    const userId = await User.findOne({ where: req.session.user });
    const username = userId.name;
    // function numberiser(some) {
    //   return Number(some);
    // }
    // coordslat: req.body.coordslat, coordslon: req.body.coordslon,
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',req.body);
    await Point.create({user: username, userid: userId.id ,coordslat: req.body.coord[0] , coordslon: req.body.coord[1] , text: req.body.text , havetopay: true , rate: req.body.rate });
    res.sendStatus(200).end();
  });
// Надо модель переделать, чтобы было откуда поинту брать все 
  module.exports = router;
