const {Router} = require("express")
const { create } = require("../controllers/subscrp.controller")

const router = Router()

router.post("/subscription/:channel_id", create)



module.exports = router