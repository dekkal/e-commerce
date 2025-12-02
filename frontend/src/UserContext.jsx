import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Charger user depuis localStorage au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setUser(null);
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);

      // Vérifications essentielles
      if (!parsed.id || !parsed.token) {
        console.warn("User localStorage incomplet → reset");
        setUser(null);
        localStorage.removeItem("user");
        return;
      }

      // User valide → on le charge
      setUser(parsed);

    } catch (err) {
      console.error("Erreur JSON localStorage :", err);
      setUser(null);
      localStorage.removeItem("user");
    }
  }, []);

  // Sauvegarder user quand il change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
