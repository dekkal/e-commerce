const router = require("express").Router();
const { register, login } = require("../Controllers/auth.controller");
const { verifyUser,verifyAdmin } = require("../middlewares/token");

router.post("/register" ,register);
router.post("/login",login);

module.exports = router;
