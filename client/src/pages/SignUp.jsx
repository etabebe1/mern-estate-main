import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import VisibilityOffSharp from "@mui/icons-material/VisibilityOffSharp";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();
  const navigate = useNavigate();

  const handleChange = (evt) => {
    evt.preventDefault();
    setFormData({ ...formData, [evt.target.id]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (inputPassword.current.value === inputConfirmPassword.current.value) {
      setIsLoading(true);

      try {
        await axios.post(
          "http://localhost:8800/api/authentication/sign-up",
          formData
        );
        setIsLoading(false);
        navigate("/sign-in");
      } catch (err) {
        const { data } = await err.response;
        if (data.success === false) {
          setError(data.message);
        }
        setIsLoading(false);
      }
    } else {
      setError("Confirm password doesn't match Password");
    }
  };

  return (
    <div className="max-w-md mx-auto p-3">
      <h1 className=" my-7 text-3xl text-center font-semibold text-slate-300">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="py-2 px-2 rounded-lg border text-sm md:text-base focus:outline-none"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          required
          minLength="3"
          // min="true"
        />
        <input
          type="email"
          className="py-2 px-2 rounded-lg border text-sm md:text-base focus:outline-none"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          required
        />
        <label
          htmlFor="password"
          className="bg-white py-2 px-2 rounded-lg border flex gap-0 justify-between"
        >
          <input
            type={showPassword ? "text" : "password"}
            className=" text-sm md:text-base focus:outline-none w-11/12"
            placeholder="Password"
            id="password"
            ref={inputPassword}
            onChange={handleChange}
            required
            minLength="6"
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <VisibilityOffSharp className="cursor-pointer"></VisibilityOffSharp>
            ) : (
              <RemoveRedEye className="cursor-pointer"></RemoveRedEye>
            )}
          </span>
        </label>

        <label
          htmlFor="re-password"
          className="bg-white py-2 px-2 rounded-lg border flex gap-0 justify-between"
        >
          <input
            type={showConfirmPassword ? "true" : "password"}
            className=" text-sm md:text-base focus:outline-none w-11/12"
            placeholder="Confirm password"
            id="re-password"
            ref={inputConfirmPassword}
            onChange={handleChange}
            required
            minLength="6"
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? (
              <VisibilityOffSharp className="cursor-pointer"></VisibilityOffSharp>
            ) : (
              <RemoveRedEye className="cursor-pointer"></RemoveRedEye>
            )}
          </span>
        </label>
        <button
          type="submit"
          className="bg-amber-900 py-2 px-2 rounded-lg uppercase text-slate-300 hover:opacity-90 transition-all"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={"20px"} /> : "Sign In"}
        </button>
        <OAuth></OAuth>
      </form>
      <div className="flex gap-1 mt-5">
        <p className="text-slate-300">Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-amber-900">Sign In</span>
        </Link>
      </div>
      <p className="text-red-600">{error && error}</p>
    </div>
  );
}
