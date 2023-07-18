const {Router} = require("express")
const { create, getAllChannels } = require("../controllers/chanel.controller")


const router =  Router()
router.post("/chanel", create)
router.get("/allchannels", getAllChannels)


module.exports = router