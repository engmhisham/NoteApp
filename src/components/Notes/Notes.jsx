/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { noteContext } from "../../context/noteContext";
import Loading from "./../Loading/Loading";
import NoteCard from "../NoteCard/NoteCard";

export default function Notes() {
  let { getAllNotes, notesList, setNotesList, setOpenModal } =
    useContext(noteContext);

  const [isloading, setIsloading] = useState(false);

  const getNotes = async () => {
    setIsloading(true);
    let data = await getAllNotes();
    if (data?.data?.notes) {
      setNotesList(data?.data?.notes.reverse());
    } else {
      setNotesList([]);
    }
    setIsloading(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

  if (isloading) return <Loading />;
  return (
    <div className="bg-white  shadow rounded-4 p-3">
      <button
        className="btn btn-primary d-block ms-auto"
        onClick={() => setOpenModal(true)}
      >
        + add note
      </button>

      {notesList?.length >= 1 ? (
        <div className="row mt-3 g-4">
          {notesList.map((note) => (
            <NoteCard key={note._id} note={note} getNotes={getNotes} />
          ))}
        </div>
      ) : (
        <h3 className="text-main fs-5 fw-bold text-center mt-4">
          No notes found
        </h3>
      )}
    </div>
  );
}
