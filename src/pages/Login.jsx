import React, { useRef, useState } from "react";
import auth from "../firebase.config";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log({ email, password });

    // reset error and success
    setLoginError("");
    setSuccess("");

    // logic login

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        if(result.user.emailVerified){
          setSuccess("User Login successfully")
        }
        else {
          alert("Please verify your email address")
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginError(error.message);
      });
  };

  // login reset/ forget
  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if(!email){
        console.log("Please provide an email", email)
        return;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){
        console.log("please provide a valid email")
        return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("please check your email")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mt-5 text-center">Login Form</h2>
      <form
        onSubmit={handleSubmit}
        className="w-1/3 mx-auto p-10 rounded-lg shadow-xl mt-5 border-2"
      >
        <div className="mb-4">
          <label className="text-md font-bold" htmlFor="email">
            Email :
          </label>
          <input
            className="border-2 py-1 px-2 rounded-lg w-full"
            placeholder="Enter your email..."
            type="email"
            name="email"
            ref={emailRef}
            id="email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-md font-bold" htmlFor="password">
            Password :
          </label>
          <input
            className="border-2 py-1 px-2 rounded-lg w-full"
            placeholder="Enter your password..."
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        <label className="label">
          <a
            onClick={handleResetPassword}
            href="#"
            className="label-text-alt link link-hover"
          >
            Forgot password?
          </a>
        </label>
        <div className="flex justify-center mb-4">
          <button
            className="bg-green-500 text-white text-md rounded-lg transition ease-in-out duration-300 hover:scale-105 py-1 px-4"
            type="submit"
          >
            Login
          </button>
        </div>
        {loginError && <p className="text-red-400 text-center">{loginError}</p>}
        {success && <h1 className="text-green-500 text-center">{success}</h1>}
        <p>
          New to this website? Please{" "}
          <Link className="underline text-violet-700" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
