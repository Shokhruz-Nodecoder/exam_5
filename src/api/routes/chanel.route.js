const {Router} = require("express")
const { create } = require("../controllers/chanel.controller")


const router =  Router()
router.post("/chanel", create)


module.exports = router