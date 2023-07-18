const { Router } = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = Router();


router.post("/signin", login);
router.post("/signup", register);

module.exports = router;
