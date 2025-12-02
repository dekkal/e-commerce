

const Cart = require("../models/cart.model");
const Product = require("../models/products.model");

// GET /cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.user.id }).populate("productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération panier", error: err.message });
  }
};

// POST /cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Récupéré automatiquement depuis le token
    const { productId } = req.body;

    // Vérifier si le produit est déjà dans le panier
    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
      return res.status(200).json({ message: "Quantité augmentée", cartItem });
    }

    // Sinon créer une nouvelle entrée
    const newItem = await Cart.create({ userId, productId, quantity: 1 });

    return res.status(201).json({ message: "Produit ajouté au panier", newItem });
  } catch (err) {
    console.error("Erreur addToCart :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT /cart
const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const item = await Cart.findOne({ userId: req.user.id, productId });
    if (!item) return res.status(404).json({ message: "Produit non trouvé dans le panier" });

    item.quantity = quantity;
    await item.save();
    res.json({ message: "Quantité mise à jour", data: item });
  } catch (err) {
    res.status(500).json({ message: "Erreur mise à jour panier", error: err.message });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const removed = await Cart.findOneAndDelete({ userId, productId });

    if (!removed) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json({ message: "Produit supprimé !" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};


module.exports={
getCart,
addToCart,
updateCart,
removeFromCart
}