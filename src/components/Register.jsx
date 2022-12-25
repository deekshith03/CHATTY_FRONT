import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { FormInput } from "./FormInput";
import { FiArrowLeftCircle } from "react-icons/fi";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../axios";
import { colors } from "../variables/color.variables";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
  RegisterForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "5rem",
    border: "1px solid white",
    borderRadius: "10px",
    margin: "0.5rem",
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
    background: "rgba(0, 0, 0, 0.82) center no-repeat",
    backgroundImage: `url(
      "https://media.giphy.com/media/8agqybiK5LW8qrG3vJ/giphy.gif"
    )`,
    zIndex: 1,
  },
});

const signupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  name: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Enter a valid name")
    .max(40)
    .min(2)
    .required(),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16})/,
      "password must contain 8-16 characters, one Uppercase, one Lowercase, one Number and one special case character"
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

export const Register = ({ handleNewUser }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const values = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    const isFormValid = await signupSchema.isValid(values, {
      abortEarly: false,
    });

    if (isFormValid) {
      setLoading(true);
      axiosInstance
        .post("/api/user/register", values)
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          navigate("/chats");
          setLoading(false);
        })
        .catch((error) => {
          toast(error.response.data.error);
          setLoading(false);
        });
    } else {
      signupSchema.validate(values, { abortEarly: false }).catch((err) => {
        const errors = err.inner.reduce((acc, error) => {
          return {
            ...acc,
            [error.path]: error.errors[0],
          };
        }, {});
        toast(Object.values(errors)[0]);
      });
    }
  };

  return (
    <>
      {loading ? (
        <div className={classes.loaderContainer} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <form>
            <div className={classes.RegisterForm}>
              <h2>Register Here !!</h2>
              <FormInput
                description="Email id"
                placeholder="Enter your email-id"
                type="email"
                handleChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <FormInput
                description="name"
                placeholder="Enter your name"
                type="text"
                handleChange={(e) => setName(e.target.value)}
                value={name}
              />
              <FormInput
                description="Password"
                placeholder="atleast 8-16 length"
                type="password"
                handleChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FormInput
                description="Confirm Password"
                placeholder="atleast 8-16 length"
                type="password"
                handleChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <button
                className={classes.submitBtn}
                type="button"
                onClick={() => handleSubmit()}
              >
                Register
              </button>
            </div>
          </form>
          <div>
            <FiArrowLeftCircle
              size="3em"
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => handleNewUser()}
            />
          </div>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={5000} pauseOnHover />
    </>
  );
};
