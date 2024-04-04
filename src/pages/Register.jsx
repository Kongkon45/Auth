import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../firebase.config";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepts = e.target.terms.checked;
    console.log({ name, email, password, accepts });

    // reset error and success
    setRegisterError("");
    setSuccess("");

    // validation 
    if (password.length < 6) {
      setRegisterError("Password must be 6 character");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("password must be use uppercase character only");
      return;
    }
    else if(!accepts){
        setRegisterError("please accepts our terms and conditions");
        return;
    }

    // logic
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess("User is created");

        // update profile 
        updateProfile(result.user, {
          displayName : name,
          photoURL : "https://example.com/jane-q-user/profile.jpg"
        })
        .then(()=>{
          console.log("profile is updated")
        })
        .catch((error)=>{
          console.log(error)
        })

        // send varification email 
        sendEmailVerification(result.user)
        .then(()=>{
          alert("Please check your email and verify your account")
        })
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mt-5 text-center">Register Form</h2>
      <form
        onSubmit={handleSubmit}
        className="w-1/3 mx-auto p-10 rounded-lg shadow-xl mt-5 border-2"
      >
        <div className="mb-4">
          <label className="text-md font-bold" htmlFor="name">
            Name :
          </label>
          <input
            className="border-2 py-1 px-2 rounded-lg w-full"
            placeholder="Enter your name..."
            type="text"
            name="name"
            id="name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-md font-bold" htmlFor="email">
            Email :
          </label>
          <input
            className="border-2 py-1 px-2 rounded-lg w-full"
            placeholder="Enter your email..."
            type="email"
            name="email"
            id="email"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="text-md font-bold" htmlFor="password">
            Password :
          </label>
          <input
            className=" border-2 py-1 px-2 rounded-lg w-full"
            placeholder="Enter your password..."
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            required
          />
          <span
            className="absolute right-2 top-9 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="mb-4">
            <input type="checkbox" name="terms" id="terms" />
            <label className="ml-2 text-md" htmlFor="terms">Accepts our Terms and Conditios</label>
        </div>
        
        <div className="flex justify-center mb-4">
          <button
            className="bg-green-500 text-white text-md rounded-lg transition ease-in-out duration-300 hover:scale-105 py-1 px-4"
            type="submit"
          >
            Register
          </button>
        </div>
        {registerError && (
          <p className="text-red-500 text-center ">{registerError}</p>
        )}
        {success && <h3 className="text-green-500 text-center">{success}</h3>}
        <p>Already have an Account? Please <Link className='underline text-violet-700'  to="/login">Login</Link></p>
      </form>
      
    </div>
  );
};

export default Register;
