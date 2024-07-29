import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { authContext } from "../../context/authContext";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { tokenContext } from "../../context/tokenContext";

export default function Login() {
  const [isloading, setIsLoading] = useState(false);
  let { login } = useContext(authContext);
  let { updateToken } = useContext(tokenContext);
  let navigate = useNavigate();

  let registerSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("required."),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Minimum 8 characters, at least one upper case,one number and one special character"
      )
      .required("required."),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      let data = await login(values);
      if (data?.data) {
        updateToken(data?.data?.token);
        toast.success(`Wlecome back`);
        navigate("/notes");
      } else {
        let err = data?.response?.data?.msg;
        toast.error(`${err}`);
        localStorage.removeItem("token");
      }
      setIsLoading(false);
    },
  });

  return (
    <>
      <div className="login ">
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="wrapper">
            <div className="title-main">Login</div>
            <form onSubmit={formik.handleSubmit}>
              <div
                className={`field ${
                  formik.touched.email && formik.errors.email ? "mb-5" : ""
                }`}
              >
                <input
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <label>Email Address</label>
                <div className="invalid-feedback ms-2">
                  {formik.errors.email}
                </div>
              </div>

              <div
                className={`field ${
                  formik.touched.password && formik.errors.password
                    ? "mb-5"
                    : ""
                }`}
              >
                <input
                  className={`form-control ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <label>Password</label>
                <div className="invalid-feedback ms-2">
                  {formik.errors.password}
                </div>
              </div>

              <div className="field">
                {isloading ? (
                  <button type="submit" className="btn" disabled>
                    <i
                      className="spinner-border spinner-border-sm text-light me-1"
                      role="status"
                    ></i>
                    Login
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn"
                    disabled={!(formik.dirty && formik.isValid)}
                  >
                    Login
                  </button>
                )}
              </div>

              <div className="signup-link">
                Not a member? <Link to="/register">Signup now</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
