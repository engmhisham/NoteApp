import React from "react";

export default function Profile() {
  return (
    <div className="bg-white  shadow rounded-4 p-3">
      <div className="row">
        <div className="col-4">
          <div className="box border shadow-sm rounded-2 p-3 text-center">
            <i className="fa-regular fa-user fa-7x text-main "></i>
          </div>
        </div>
        <div className="col-8">
          <div className="box py-3">
            <p>
              <span className="fw-bold me-2 ">Email:</span>
              <span className="text-main">
                {localStorage.getItem("userEmail")}
              </span>
            </p>
            <p>
              <span className="fw-bold me-2 ">Id:</span>
              <span className="text-main">
                {localStorage.getItem("userId")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
