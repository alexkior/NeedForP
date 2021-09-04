const express = require("express");
const { User } = require('../db/models');
const { Point } = require('../db/models');
const { Like } = require('../db/models');
// const { Toilet } = require('../db/models');
const router = express.Router();

router.route("/")
  .get(async (req, res) => {
    const user = req?.session?.user;
    res.locals.user = user;

    const allPoints = await Point.findAll({
        include: [
          {
            model: User,
            as: "User"
          }
        ]
      });
    // const findUsers = await User.findAll();
    // console.log(req.session.guest);
    // const allPoints = await Toilet.findAll({
    //   include: [
    //     {
    //       model: Point,
    //       as: "Point"
    //     },
    //     {
    //       model: User,
    //       as: "User"
    //     }
    //   ]
    // });
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',allPoints);
    
    res.locals.allPoints = allPoints;
    // , {findPoints, findUsers}
    res.render("index");
  });


router.route("/points")
  .get(async (req, res) => {
    const user = req?.session?.user;
    res.locals.user = user;
    const points = await Point.findAll({ raw: true });

    res.json(points);
  });

  router.route('/search')
  .get((req, res) => {
    res.render('index')
  })


/// поиск
  // router.route('/search')
  // .post(async (req, res) => {
  //   const { pointid, userid } = req.body;
  //   const findPoints = await Point.findOne({ where: { id: pointid } });
  //   const findUsers = await User.findOne({ where: { id: userid } });
  //   if (pointid != 1 && userid != 1) {
  //     const findToilets = await Toilet.findAll({ where: { pointid, userid } });
  //     console.log(findEvents);
  //     res.json({findToilets, findPoints, findUsers});
  //   }
  //   if (pointid == 1 && userid != 1) {
  //     const findToilets = await Toilet.findAll({ where: { pointid } });
  //     res.json({findToilets, findPoints, findUsers});
  //   }
  //   if (pointid != 1 && userid == 1) {
  //     const findToilets = await Toilet.findAll({ where: { userid } });
  //     res.json({findToilets, findPoints, findUsers});
  //   }
  // });


  // Лайки
  router.route("/points/:id/like")
  .post(async function (req, res) {
    const user = req?.session?.user;
    res.locals.user = user;
    const userId = await User.findOne({ where: req.session.user });
    let findPoint = await Point.findOne({ where: { id: req.params.id } });
    await findPoint.increment('likes', { by: 1 });
    const uId = userId.id;
    const pId = findPoint.id;
    await Like.create({postid: pId, userid: uId});
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',findPoint.id, userid.id);
  
    res.redirect('/')
  });


  router.route('/logout')
  .get(async (req, res) => {
    req.session.destroy();
    res.clearCookie('sId').redirect('/');
  });
  
module.exports = router;
