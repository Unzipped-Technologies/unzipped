const express = require("express")
const router = express.Router()
const listHelper = require('../helpers/list')
const businessHelper = require('../helpers/business')
const userHelper = require('../helpers/user')
const requireLogin = require('../middlewares/requireLogin');
const permissionCheckHelper = require('../middlewares/permissionCheck')
const { likeEnum } = require('../enum/likeEnum');

// let admin create a list for any user
router.post('/create', requireLogin, permissionCheckHelper.hasPermission('userLike'), async (req, res) => {
    try {
      if (req.body.likeType === likeEnum.PROFILE_LIKES || req.body.likeType === likeEnum.PROFILE_DISLIKES) {
        const newLike = await userHelper.addLikeToFreelancer(req.body, req.user.sub)
        if(!newLike) throw Error('like not created')
        res.json(newLike)
      } else {
        const newLike = await businessHelper.addLikeToBusiness(req.body, req.user.sub)
        if(!newLike) throw Error('like not created')
        res.json(newLike)
      }

    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let admin create a list for any user
router.get('/user/list', requireLogin, permissionCheckHelper.hasPermission('listLikesForUser'), async (req, res) => {
    try {
      const likeList = await userHelper.listLikes(req.user.sub)
      if(!likeList) throw Error('list not created')
      res.json(likeList)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let admin create a list for any user
router.post('/delete', requireLogin, permissionCheckHelper.hasPermission('userDeleteLike'), async (req, res) => {
    try {
      if (req.body.likeType === likeEnum.PROFILE_LIKES || req.body.likeType === likeEnum.PROFILE_DISLIKES) {
        const likeCount = await userHelper.removeLikeToFreelancer(req.body, req.user.sub)
        res.json(likeCount)
      } else {
        const likeCount = await businessHelper.removeLikeToBusiness(req.body, req.user.sub)
        res.json(likeCount)
      }

    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

module.exports = router;