import React from "react";

function AdminStats({ products }) {
 const name=products.name;
  const totalProducts = products.length;
  const totalCategories = [...new Set(products.map((p) => p.category))].length;
  const newProducts = products.filter((p) => {
    const created = new Date(p.createdAt);
    return (new Date() - created) / (1000 * 60 * 60 * 24) <= 7; // moins de 7 jours
  }).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded shadow p-4 text-center">
        <h3 className="font-bold text-xl">{totalProducts}</h3>
        <p>Produits totaux</p>
      </div>
      <div className="bg-white rounded shadow p-4 text-center">
        <h3 className="font-bold text-xl"> {name}{totalCategories}</h3>
        <p>Catégories</p>
      </div>
      <div className="bg-white rounded shadow p-4 text-center">
        <h3 className="font-bold text-xl">{newProducts}</h3>
        <p>Nouveaux produits</p>
      </div>
    </div>
  );
}

export default AdminStats;
