import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "./apiCalls";
import Header from "./Commun/Header";

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Valeur par défaut
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await api.post("/auth/register", data);
        return res.data;
      } catch (err) {
        setErrorMsg(err.response?.data?.message || "Erreur serveur");
        throw err;
      }
    },
    onSuccess: () => {
      alert("Inscription réussie !");
      setInputs({
        username: "",
        email: "",
        password: "",
        role: "",
      });
      setErrorMsg(null);
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

  return (
    <>
      <Header />

      <section
        className="flex flex-col gap-6 w-full max-w-md p-6 border border-gray-200
                   rounded-xl shadow-md bg-white absolute top-1/2 left-1/2
                   -translate-x-1/2 -translate-y-1/2"
      >
        <h2 className="text-4xl font-quicksand text-center">Register</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={inputs.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={inputs.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500"
            required
          />

          {/* Sélection du rôle */}
          <select
            name="role"
            value={inputs.role}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

          <button
            type="submit"
            disabled={mutation.isLoading}
            className={`bg-blue-500 rounded-lg px-6 py-2 text-white mx-auto transition
            ${mutation.isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
          >
            {mutation.isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </section>
    </>
  );
}

export default Register;
