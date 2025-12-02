import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "./apiCalls";
import Header from "./Commun/Header";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useUser();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (res) => {
      const userData = {
        id: res.result._id,
        token: res.result.token,
        email: res.result.email,
        role: res.result.role,
      };

      // Stocker le token dans localStorage pour les futures requêtes
      localStorage.setItem("token", res.result.token);

      setUser(userData);
      setErrorMsg(null);
      alert("Connexion réussie !");

      if (res.result.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/products");
      }
    },
    onError: (err) => {
      setErrorMsg(err.response?.data?.message || "Erreur de connexion");
    },
  });

  const handleChange = (e) =>
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(inputs);
  };

  return (
    <>
      <Header />
      <section className="flex flex-col gap-6 w-full max-w-md p-6 border border-gray-200 rounded-xl shadow-md
                          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
        <h2 className="text-4xl font-quicksand text-center">Login</h2>
        <div className="flex flex-col gap-4">
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
          {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
          <button
            onClick={handleSubmit}
            disabled={mutation.isLoading}
            className={`bg-blue-500 rounded-lg px-6 py-2 text-white mx-auto transition
              ${mutation.isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
          >
            {mutation.isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </section>
    </>
  );
}

export default Login;
