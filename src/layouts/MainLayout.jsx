import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import NavbarMenu from "../components/NavbarMenu/NavbarMenu";
import ModalAddNote from "../components/ModalAddNote/ModalAddNote";
import SideMenu from "../components/SideMenu/SideMenu";
import { noteContext } from "../context/noteContext";

export default function MainLayout() {
  let { openModal } = useContext(noteContext);
  return (
    <>
      {openModal && <ModalAddNote />}
      <div className="container" style={{ maxWidth: "800px" }}>
        <NavbarMenu />
        <div className="row g-3">
          <div className="col-2   col-md-3">
            <SideMenu />
          </div>
          <div className="col-10  col-md-9">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
