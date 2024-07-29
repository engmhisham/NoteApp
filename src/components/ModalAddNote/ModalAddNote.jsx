// import { useFormik } from "formik";
import React, { useContext, useRef, useState } from "react";
import "./ModalAddNote.css";
import { noteContext } from "../../context/noteContext";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";

export default function ModalAddNote() {
  let { setOpenModal } = useContext(noteContext);
  const [loading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  let { addNote, getAllNotes, setNotesList } = useContext(noteContext);

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
      title: "",
      content: "",
    },
    validationSchema: noteSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      let data = await addNote(values);
      // console.log(data?.data);
      if (data?.data?.msg === "done") {
        toast(`successfully added.`);
        setOpenModal(false);
        getNotes();
      } else {
        toast.error(`error occurred, ${data?.data?.msg}`);
      }
      setIsLoading(false);
    },
  });

  const getNotes = async () => {
    let data = await getAllNotes();
    if (data?.data?.notes) {
      console.log(data?.data?.notes);
      setNotesList(data?.data?.notes.reverse());
    }
  };

  const handleColseModal = (e) => {
    if (modalRef.current === e.target) {
      setOpenModal(false);
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
          <div className="modal-addNote mx-auto bg-white p-3 border rounded-3 shadow">
            <div className=" d-flex justify-content-center align-items-center">
              <h2 className="mb-0 h4">+ Add New Note</h2>
              <button
                type="button"
                className="btn-close d-block ms-auto "
                onClick={() => setOpenModal(false)}
              />
            </div>

            <hr />
            <div className=" my-4 mx-2">
              <form onSubmit={formik.handleSubmit}>
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
                onClick={() => setOpenModal(false)}
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
                  Add Note
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// eslint-disable-next-line no-lone-blocks
{
  /* <form onSubmit={formik.handleSubmit}>
<div className="mb-2">
  <label htmlFor="title">title</label>
  <input
    id="title"
    name="title"
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
  <label htmlFor="content">content</label>
  <input
    id="content"
    name="content"
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



 <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />


  {
    loading ? (
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
        Add Note
      </button>
    );
  }

*/
}
