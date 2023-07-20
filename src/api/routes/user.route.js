const {Router} = require("express")
const { userBalanceFill,  usersSubscription, userStatus } = require("../controllers/user.controller")
const isActive = require("../middlewares/isActive")
const router = Router()


router.post("/account", userBalanceFill)
// router.post("/subscription/pay/:channel_id", usersSubscription)
router.put("/subscription/:channel_id", usersSubscription)
router.post("/userStatus/:id", isActive ,userStatus)
module.exports = router