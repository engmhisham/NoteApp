import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";

export let tokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);

  //    

 

  const updateToken = (newToken) => {
    if (newToken) {
      setToken(newToken);
      const { email, id } = jwtDecode(newToken);
      localStorage.setItem("token", newToken);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userId", id);
    }
  };

  return (
    <tokenContext.Provider value={{ updateToken, token }}>
      {children}
    </tokenContext.Provider>
  );
}
