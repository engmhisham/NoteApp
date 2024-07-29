import axios from "axios";
import { createContext, useState } from "react";

const baseUrl = "https://note-sigma-black.vercel.app/api/v1";
const secitKey = "3b8ny__";

let headers = {
  token: `${secitKey}${localStorage.getItem("token")}`,
};
export let noteContext = createContext();

const addNote = async (values) => {
  console.log(values);
  try {
    let response = await axios.post(`${baseUrl}/notes`, values, { headers });
    // console.log("response", response);
    return response;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};
const getAllNotes = async () => {
  try {
    let response = await axios.get(`${baseUrl}/notes`, { headers });
    //console.log("response", response);
    return response;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};
const deleteNote = async (noteId) => {
  try {
    let response = await axios.delete(`${baseUrl}/notes/${noteId}`, {
      headers,
    });
    // console.log("response", response);
    return response;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};
const updateNote = async (noteId, values) => {
  try {
    let response = await axios.put(`${baseUrl}/notes/${noteId}`, values, {
      headers,
    });
    // console.log("response", response);
    return response;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

export default function NoteContextProvider({ children }) {
  const [openModal, setOpenModal] = useState(false);
  const [notesList, setNotesList] = useState([]);

  return (
    <noteContext.Provider
      value={{
        openModal,
        setOpenModal,
        notesList,
        setNotesList,
        addNote,
        getAllNotes,
        deleteNote,
        updateNote,
      }}
    >
      {children}
    </noteContext.Provider>
  );
}
