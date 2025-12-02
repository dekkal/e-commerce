import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../apiCalls";

function AddProductModal({ isOpen, onClose }) {
  const queryClient = useQueryClient();

  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imgUrl: "",
    sold: 0,
    rating: "",
    createdAt: "", // Champ ajouté
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please login.");
      }

      // Préparer payload avec createdAt correctement
      const payload = {
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      };

      const res = await api.post("/addProducts", payload, {
        headers: { "x-auth-token": token },
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setSuccessMsg("Produit ajouté avec succès !");
      setInputs({
        name: "",
        price: "",
        description: "",
        category: "",
        imgUrl: "",
        sold: 0,
        rating: "",
        createdAt: "",
      });
      setErrorMsg(null);
    },
    onError: (err) => {
      setErrorMsg(err.response?.data?.message || err.message || "Erreur ajout produit");
      setSuccessMsg(null);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(inputs);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Ajouter un produit</h2>

        {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 mb-2">{successMsg}</p>}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={inputs.name}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Prix"
            value={inputs.price}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Catégorie"
            value={inputs.category}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="imgUrl"
            placeholder="Image URL"
            value={inputs.imgUrl}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="sold"
            placeholder="Sold"
            value={inputs.sold}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={inputs.rating}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="datetime-local"
            name="createdAt"
            value={inputs.createdAt}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
