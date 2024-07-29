import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { noteContext } from "../../context/noteContext";

export default function SideMenu() {
  let { setOpenModal } = useContext(noteContext);

  let navigate = useNavigate();

  const logOut = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 py-3 px-2 bg-liner-gradient sticky-top shadow rounded-4">
      <Link
        to="/"
        className="d-flex align-items-center justify-content-center mb-3 mb-md-0 link-light text-decoration-none"
      >
        <i className="fa-brands fa-wolf-pack-battalion fs-2"></i>
        <span className="fs-3 d-none d-md-inline-block ms-1">Notes</span>
      </Link>
      <hr style={{ borderColor: "#fff" }} />
      <ul className="nav  flex-column  mb-auto">
        <li className="nav-item text-center text-md-start w-100">
          <Link to="/notes" className="nav-link px-0 px-md-3 text-light">
            <i className="fa-solid fa-note-sticky"></i>
            <span className="d-none d-md-inline-block ms-1">Notes</span>
          </Link>
        </li>
        <li className="nav-item w-100">
          <button
            className="nav-link text-light text-md-start w-100 px-0 px-md-3"
            onClick={() => setOpenModal(true)}
          >
            <i className="fa-solid fa-notes-medical"></i>
            <span className="d-none d-md-inline-block ms-1">Add Note</span>
          </button>
        </li>
        <li className="nav-item text-center text-md-start w-100">
          <Link to="/profile" className="nav-link px-0 px-md-3 text-light">
            <i className="fa-solid fa-user"></i>
            <span className="d-none d-md-inline-block ms-1">Profile</span>
          </Link>
        </li>
        <hr className="mt-5" style={{ borderColor: "#fff" }} />
        <li className="nav-item  w-100">
          <button
            className="nav-link text-light w-100 px-0 px-md-3 text-center text-md-start"
            onClick={logOut}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="d-none d-md-inline-block ms-1">logOut</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
