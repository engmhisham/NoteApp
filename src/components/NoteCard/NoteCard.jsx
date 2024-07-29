import React, { useContext, useState } from "react";
import { noteContext } from "../../context/noteContext";
import { toast } from "react-toastify";
import ModalUpdaeNote from "../ModalUpdaeNote/ModalUpdaeNote";
import { Fade } from "react-awesome-reveal";

export default function NoteCard({ note, getNotes }) {
  let { deleteNote } = useContext(noteContext);
  const [isLoading, setIsLoading] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);

  const onDelete = async (noteId) => {
    setIsLoading(true);
    let data = await deleteNote(noteId);
    if (data?.data?.msg === "done") {
      toast(`remove successfully.`);
      getNotes();
    } else {
      toast.error(data?.response?.data?.msg);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Fade triggerOnce>
        <div className="col-12">
          <div className="card border-primary-subtle shadow-sm">
            <div className="card-header text-main border-primary-subtle ">
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => setOpenUpdateModel(true)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              {note.title}
            </div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p className="">{note.content}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-muted mb-0 font-sm ">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                  <button
                    className="btn text-danger "
                    onClick={() => onDelete(note._id)}
                  >
                    {isLoading ? (
                      <i
                        className="spinner-border spinner-border-sm text-danger"
                        role="status"
                      ></i>
                    ) : (
                      <i className="fa-solid fa-trash-can fs-3"></i>
                    )}
                  </button>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </Fade>
      {openUpdateModel && (
        <ModalUpdaeNote setOpenUpdateModel={setOpenUpdateModel} note={note} />
      )}
    </>
  );
}
