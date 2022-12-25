import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { FormInput } from "./FormInput";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../axios";
import { useNavigate } from "react-router-dom";
import { colors } from "../variables/color.variables";

const useStyles = createUseStyles({
  signInForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "5rem",
    border: "1px solid white",
    borderRadius: "10px",
    margin: "1.5rem",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.5)",
    backgroundColor: "#f2f2f2",
  },

  submitBtn: {
    border: "none",
    backgroundColor: "white",
    borderRadius: "10px",
    cursor: "pointer",
    width: "100%",
    padding: "0.5vw",
    marginTop: "0.9vw",
    color: colors.themeColor,
  },

  linkBtn: {
    background: "none",
    color: colors.linkColor,
    textDecoration: "underline",
    border: "none",
    cursor: "pointer",
  },
  "@media only screen and (max-device-width: 480px)": {
    submitBtn: {
      border: "none",
      backgroundColor: "white",
      borderRadius: "10px",
      cursor: "pointer",
      width: "100%",
      padding: "3.5vw",
      marginTop: "4.9vw",
      color: colors.themeColor,
    },
  },

  loaderContainer: {
    width: "100%",
    height: "100vh",
    position: "fixed",
    background: "rgba(0, 0, 0, 0.25) center no-repeat",
    backgroundImage: `url(
      "https://media.giphy.com/media/8agqybiK5LW8qrG3vJ/giphy.gif"
    )`,
    zIndex: 1,
  },
});

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("email required"),
  password: Yup.string().required("password required"),
});

export const SignIn = ({ handleNewUser }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const values = {
      email: email,
      password: password,
    };
    const isFormValid = await signInSchema.isValid(values, {
      abortEarly: false,
    });

    if (isFormValid) {
      setLoading(true);
      const data = { email: email, password: password };
      axiosInstance
        .post("/api/user/login", data)
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          navigate("/chats");
        })
        .catch((error) => {
          toast("Invalid credentials");
        });
    } else {
      signInSchema.validate(values, { abortEarly: false }).catch((err) => {
        const errors = err.inner.reduce((acc, error) => {
          return {
            ...acc,
            [error.path]: error.errors[0],
          };
        }, {});
        console.log(errors);
        toast(Object.values(errors)[0]);
      });
    }

    setTimeout(() => {
      setLoading(false);
    },500);
  };
  return (
    <>
      {loading ? (
        <div className={classes.loaderContainer} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <form>
            <div className={classes.signInForm}>
              <h2>CHATTY</h2>
              <h2>Welcome Back !</h2>
              <FormInput
                description="Email id"
                placeholder="Enter e-mail"
                type="email"
                handleChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <FormInput
                description="Password"
                placeholder="Enter your password"
                type="password"
                handleChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                className={classes.submitBtn}
                type="button"
                onClick={() => handleSubmit()}
              >
                Log In
              </button>
            </div>
          </form>
          <div>
            <button className={classes.linkBtn} onClick={() => handleNewUser()}>
              Don't have an account? Register here.
            </button>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={5000} pauseOnHover />
    </>
  );
};
