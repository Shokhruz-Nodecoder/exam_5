const {Router} = require("express")
const { userBalanceFill } = require("../controllers/user.controller")
const router = Router()


router.post("/account", userBalanceFill)


module.exports = router