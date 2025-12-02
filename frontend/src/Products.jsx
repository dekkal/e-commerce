import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Commun/Header";
import { useUser } from "./UserContext";

function Products() {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("default");

  // 🔥 FETCH PRODUITS (connecté ou pas)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const headers = user ? { "x-auth-token": user.token } : {};
        const params = user ? { userId: user.id } : {};

        const res = await axios.get("http://localhost:3000/api/v1/all", {
          headers,
          params,
        });

        const payload = Array.isArray(res.data) ? res.data : res.data.data;

        setProducts(payload);
        setFiltered(payload);

      } catch (err) {
        console.error("Erreur fetch produits :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  // --- Filtres et tri ---
  useEffect(() => {
    let data = [...products];

    if (category !== "all") data = data.filter(p => p.category === category);

    if (priceRange !== "all") {
      if (priceRange === "low") data = data.filter(p => p.price <= 50);
      if (priceRange === "medium") data = data.filter(p => p.price > 50 && p.price <= 150);
      if (priceRange === "high") data = data.filter(p => p.price > 150);
    }

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      data = data.filter(
        p =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (sort === "rating") data.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    if (sort === "sold") data.sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0));
    if (sort === "price") data.sort((a, b) => a.price - b.price);

    setFiltered(data);
  }, [search, sort, category, priceRange, products]);

  // --- Ajouter au panier ---
 const handleAddToCart = async (product) => {
  try {
    await axios.post(
      "http://localhost:3000/api/v1/cart/addcart",
      { productId: product._id },
      { headers: { "x-auth-token": user.token } }
    );

    alert(`${product.name} ajouté au panier !`);
  } catch (err) {
    console.error("Erreur ajout au panier :", err);
    alert("Erreur lors de l'ajout au panier");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-12">
          Nos Produits
        </h1>

        {/* Filtres */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/3 border border-gray-300 rounded-xl p-2.5"
          />
          <select value={category} onChange={e => setCategory(e.target.value)} className="border border-gray-300 rounded-xl p-2.5">
            <option value="all">Toutes les catégories</option>
            <option value="Phones">Phones</option>
            <option value="PC">PC</option>
          </select>
          <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="border border-gray-300 rounded-xl p-2.5">
            <option value="all">Tous les prix</option>
            <option value="low">Moins de 50 €</option>
            <option value="medium">50 € - 150 €</option>
            <option value="high">Plus de 150 €</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} className="border border-gray-300 rounded-xl p-2.5">
            <option value="default">Trier par défaut</option>
            <option value="rating">Meilleures notes</option>
            <option value="sold">Plus vendus</option>
            <option value="price">Prix croissant</option>
          </select>
        </div>

        {/* Produits */}
        {loading ? (
          <div className="flex justify-center h-64 items-center">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Aucun produit trouvé…
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filtered.map((product) => (
              <div key={product._id} className="group bg-white rounded-2xl shadow-md">
                <img src={product.imgUrl} alt={product.name} className="w-full h-56 object-cover" />
                <div className="p-5">
                  <h2 className="font-bold text-indigo-700">{product.name}</h2>
                  <p className="text-gray-600">{product.category}</p>
                  <p className="text-gray-600">{product.price} €</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Products;
