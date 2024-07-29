// import { useFormik } from "formik";
import React, { useContext, useRef, useState } from "react";
import { noteContext } from "../../context/noteContext";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import "./ModalUpdateNote.css";

export default function ModalUpdaeNote({ note, setOpenUpdateModel }) {
  //   let { setOpenModal } = useState();
  const [loading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  let { getAllNotes, setNotesList, updateNote } = useContext(noteContext);

  let noteSchema = Yup.object({
    title: Yup.string()
      .required("required")
      .min(3, "min length title 3 characters")
      .max(100, "max length title 100 characters"),
    content: Yup.string()
      .required("required")
      .min(3, "min length content 3 characters")
      .max(150, "max length content 150 characters"),
  });
  let formik = useFormik({
    initialValues: {
      title: `${note.title}`,
      content: `${note.content}`,
    },
    validationSchema: noteSchema,
    onSubmit: async (values) => {
      onUpdateNotes(note._id, values);
    },
  });

  const getNotes = async () => {
    let data = await getAllNotes();
    if (data?.data?.notes) {
      setNotesList(data?.data?.notes.reverse());
    }
  };

  const onUpdateNotes = async (noteId, values) => {
    setIsLoading(true);
    let data = await updateNote(noteId, values);
    if (data.data.msg === "done") {
      toast.success(`successfully Updated.`);
      setOpenUpdateModel(false);
      getNotes();
    } else {
      toast.error(data?.response?.data?.msg);
    }
    setIsLoading(false);
  };

  const handleColseModal = (e) => {
    if (modalRef.current === e.target) {
      setOpenUpdateModel(false);
    }
  };

  return (
    <>
      <div
        ref={modalRef}
        className="modal-container position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center"
        onClick={handleColseModal}
      >
        <div className="container">
          <div className="modal-updateNote mx-auto bg-white p-3 border rounded-3 shadow">
            <div className=" d-flex justify-content-center align-items-center">
              <h2 className="mb-0 h4">Update Note</h2>
              <button
                type="button"
                className="btn-close d-block ms-auto "
                onClick={() => setOpenUpdateModel(false)}
              />
            </div>

            <hr />
            <div className=" my-4 mx-2">
              <form>
                <div className="mb-2">
                  <input
                    id="title"
                    name="title"
                    placeholder="Title"
                    className="form-control"
                    type="text"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div className="alert alert-danger mt-2">
                      {formik.errors.title}
                    </div>
                  ) : null}
                </div>
                <div className="mb-2">
                  <input
                    id="content"
                    name="content"
                    placeholder="content"
                    className="form-control"
                    type="text"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.content && formik.errors.content ? (
                    <div className="alert alert-danger mt-2">
                      {formik.errors.content}
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
            <div className=" d-flex justify-content-end ">
              <button
                type="button"
                className="btn btn-secondary me-3"
                onClick={() => setOpenUpdateModel(false)}
              >
                Close
              </button>

              {loading ? (
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={formik.handleSubmit}
                  disabled
                >
                  <i
                    className="spinner-border spinner-border-sm text-light me-1"
                    role="status"
                  ></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={formik.handleSubmit}
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  Update Note
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
