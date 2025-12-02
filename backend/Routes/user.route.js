const { updateUser, deleteUser,getUsers,getUserById} = require("../Controllers/user.controller");
const { verifyUser, verifyAdmin } = require("../middlewares/token");

const router = require("express").Router();

router.put("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyAdmin, deleteUser);
router.get("/:id/", getUserById);
router.get("/allUsers/",verifyAdmin,getUsers);

module.exports = router;
