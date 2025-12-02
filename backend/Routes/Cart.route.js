
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} = require("../Controllers/cart.controller");
const { verifyUser } = require("../middlewares/token");

const router = require("express").Router();

// Toutes les routes nécessitent l'utilisateur connecté
router.get("/cartall/:id", verifyUser, getCart);
router.post("/addcart", verifyUser, addToCart);
router.put("/updateCart", verifyUser, updateCart);
router.delete("/delete/:userId/:productId", verifyUser, removeFromCart);


module.exports = router;
