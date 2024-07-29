import React, { useContext } from "react";
import { noteContext } from "../../context/noteContext";

export default function NavbarMenu() {
  let { notesList } = useContext(noteContext);
  return (
    <>
      <nav className="navbar bg-liner-gradient  text-white rounded-pill my-3  shadow">
        <div className="container-fluid d-flex justify-content-center">
          <p className="navbar-text mb-0 text-white fs-4">
            <i className="fa-regular fa-clipboard me-1"></i>
            Notes : {notesList.length}
          </p>
        </div>
      </nav>
    </>
  );
}
