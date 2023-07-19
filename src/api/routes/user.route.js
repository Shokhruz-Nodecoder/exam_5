const {Router} = require("express")
const { userBalanceFill, usersSubscription } = require("../controllers/user.controller")
const router = Router()


router.post("/account", userBalanceFill)
router.post("/subscription/pay/:channel_id", usersSubscription)

module.exports = router