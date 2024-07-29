import axios from "axios";
import { createContext } from "react";

const baseUrl = "https://note-sigma-black.vercel.app/api/v1";

export let authContext = createContext();

const register = async (values) => {
  try {
    let response = await axios.post(`${baseUrl}/users/signUp`, values);
    // console.log("response", response);
    return response;
  } catch (err) {
    // console.log(err.message);
    return err;
  }
};

const login = async (values) => {
  try {
    let response = await axios.post(`${baseUrl}/users/signIn`, values);
    // console.log("response", response);
    return response;
  } catch (err) {
    // console.log(err.message);
    return err;
  }
};

export default function AuthContextProvider({ children }) {
  return (
    <authContext.Provider value={{ register, login }}>
      {children}
    </authContext.Provider>
  );
}
