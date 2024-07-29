import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { authContext } from "../../context/authContext";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function Register() {
  const [isloading, setIsLoading] = useState(false);
  let { register } = useContext(authContext);
  let navigate = useNavigate();

  let registerSchema = Yup.object({
    name: Yup.string()
      .min(6, "Name must be at least 6 characters.")
      .max(40, "Name max 40 characters.")
      .required("required."),
    email: Yup.string().email("Invalid email").required("required."),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Minimum 8 characters, at least one upper case,one number and one special character"
      )
      .required("required."),
    age: Yup.number()
      .min(16, "Age must be at least 16 years old.")
      .max(100, "Maximum value of 100.")
      .required("required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "please enter Egyption phone number")
      .required("required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      let data = await register(values);

      if (data?.data) {
        toast.success(`Successfully registered.`);
        navigate("/login");
      } else {
        let err = data?.response?.data?.msg;
        toast.error(`${err}`);
      }

      setIsLoading(false);
    },
  });

  return (
    <>
      <div className="register  py-md-5">
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="wrapper">
            <div className="title-main">Register</div>
            <form onSubmit={formik.handleSubmit}>
              <div
                className={`field ${
                  formik.touched.name && formik.errors.name ? "mb-5" : ""
                }`}
              >
                <input
                  className={`form-control ${
                    formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <label>Name</label>
                <div className="invalid-feedback ms-2">
                  {formik.errors.name}
                </div>
              </div>

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

              <div
                className={`field ${
                  formik.touched.age && formik.errors.age ? "mb-5" : ""
                }`}
              >
                <input
                  className={`form-control ${
                    formik.touched.age && formik.errors.age ? "is-invalid" : ""
                  }`}
                  type="number"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <label>Age</label>
                <div className="invalid-feedback ms-2">{formik.errors.age}</div>
              </div>

              <div
                className={`field ${
                  formik.touched.phone && formik.errors.phone ? "mb-5" : ""
                }`}
              >
                <input
                  className={`form-control ${
                    formik.touched.phone && formik.errors.phone
                      ? "is-invalid"
                      : ""
                  }`}
                  type="tel"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <label>Phone</label>
                <div className="invalid-feedback ms-2">
                  {formik.errors.phone}
                </div>
              </div>

              <div className="field">
                {isloading ? (
                  <button type="submit" className="btn" disabled>
                    <i
                      className="spinner-border spinner-border-sm text-light me-1"
                      role="status"
                    ></i>
                    Register
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn"
                    disabled={!(formik.dirty && formik.isValid)}
                  >
                    Register
                  </button>
                )}
              </div>

              <div className="signup-link">
                Already have an account? <Link to="/login">Signin now</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
