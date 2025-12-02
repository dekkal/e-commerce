import React from "react";

function ProductCard({ product, isAdmin = false, onDelete }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col justify-between">
      <img
        src={product.imgUrl}
        alt={product.name}
        className="h-40 object-cover mb-4 rounded"
      />
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-indigo-700 font-semibold">${product.price}</p>
      {isAdmin && (
        <div className="mt-4 flex justify-between">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Supprimer
          </button>
          {/* Edit button peut être ajouté ici */}
        </div>
      )}
    </div>
  );
}

export default ProductCard;
