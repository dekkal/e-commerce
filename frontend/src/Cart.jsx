import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Commun/Header";
import { useUser } from "./UserContext";

function Cart() {
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger le panier uniquement si user connecté
  useEffect(() => {
    if (!user || !user.id || !user.token) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:3000/api/v1/cart/cartall/${user.id}`,
          { headers: { "x-auth-token": user.token } }
        );

        const payload = res.data.data || res.data;
        setCart(payload);
      } catch (err) {
        console.error("Erreur chargement panier :", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // Supprimer un produit
  const handleDelete = async (productId) => {
    if (!user) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/v1/cart/delete/${user.id}/${productId}`,
        { headers: { "x-auth-token": user.token } }
      );

      setCart(cart.filter((item) => item.productId._id !== productId));
    } catch (err) {
      console.error("Erreur suppression :", err.response?.data || err);
      alert("Erreur lors de la suppression");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.productId.price || 0) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <section className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-indigo-700 mb-8 text-center">
          Votre Panier
        </h1>

        {/* 🚫 Pas de user → pas de panier */}
        {!user || !user.id || !user.token ? (
          <p className="text-center text-gray-600 text-xl">
            Vous devez être connecté pour accéder à votre panier.
          </p>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : cart.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">Panier vide…</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow rounded-xl flex p-4"
                >
                  <img
                    src={item.productId.imgUrl}
                    alt={item.productId.name}
                    className="w-28 h-28 object-cover rounded-lg"
                  />

                  <div className="ml-4 flex-grow">
                    <h2 className="font-bold text-lg text-indigo-700">
                      {item.productId.name}
                    </h2>

                    <p className="text-gray-600">
                      Prix : {item.productId.price} €
                    </p>

                    <p className="text-gray-600">
                      Quantité : {item.quantity}
                    </p>

                    <button
                      onClick={() => handleDelete(item.productId._id)}
                      className="mt-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white shadow rounded-xl p-6 h-fit">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                Résumé
              </h2>

              <p className="text-lg font-semibold text-gray-700">
                Total :
                <span className="text-indigo-600"> {total} €</span>
              </p>

              <button className="mt-6 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600">
                Passer la commande
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
