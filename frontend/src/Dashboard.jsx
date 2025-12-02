import React, { useEffect, useState } from "react";
import Header from "./Commun/Header";
import { useUser } from "./UserContext";
import axios from "axios";
import ProductCard from "./componentsAdmin/ProductCard";
import AddProductModal from "./componentsAdmin/AddProductModal";
import AdminStats from "./componentsAdmin/AdminStats";

function AdminDashboard() {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchProducts = async () => {
    if (!user || user.role !== "admin") return;
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/all", {
        headers: { "x-auth-token": user.token },
      });
      setProducts(Array.isArray(res.data) ? res.data : res.data.data);
    } catch (err) {
      console.error("Erreur fetch produits :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user]);

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${productId}`, {
        headers: { "x-auth-token": user.token },
      });
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Erreur suppression produit :", err);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50">
      <Header />
      <section className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          Admin Dashboard
        </h1>

        {/* Stats */}
        <AdminStats products={products} />

        {/* Actions */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ajouter un produit
          </button>
        </div>

        {/* Produits */}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                isAdmin={true}
                onDelete={() => handleDeleteProduct(p._id)}
              />
            ))}
          </div>
        )}

        {/* MODAL FIXÉ */}
        <AddProductModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      </section>
    </div>
  );
}

export default AdminDashboard;
