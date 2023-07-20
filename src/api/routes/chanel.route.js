const {Router} = require("express")
const { create, getAllChannels, showFollowers } = require("../controllers/chanel.controller")
const isAuth = require("../middlewares/isAuth")


const router =  Router()
router.post("/channel", create)
router.get("/allchannels", getAllChannels)
router.post("/channel/admin/:channel_id", isAuth, showFollowers)

module.exports = router