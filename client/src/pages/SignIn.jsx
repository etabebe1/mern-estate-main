import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import VisibilityOffSharp from "@mui/icons-material/VisibilityOffSharp";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
// import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { loading, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const inputPassword = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // LOGS:

  const handleChange = (evt) => {
    evt.preventDefault();
    setFormData({ ...formData, [evt.target.id]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      dispatch(signInStart());

      const response = await axios.post(
        "http://localhost:8800/api/authentication/sign-in",
        formData
      );

      const { data } = response;

      console.log(data);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 60);

      //* FIXME: httpOnly=false make it  "true" fro better security

      // removing existing cookie
      document.cookie = `access_token= ${data.bearer.token}; expires = Tue, 01 jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure;`;

      // set the token as a cookie with an expiration data of 60 days
      document.cookie = `access_token=${
        data.bearer.token
      }; expires=${expirationDate.toUTCString()}; path=/; Secure; SameSite=None;`;

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      console.log(err);
      const { data } = err.response;
      dispatch(signInFailure(data.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-3">
      <h1 className=" my-7 text-3xl text-center font-semibold text-slate-300">
        Sign In
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="bg-amber-900 py-2 px-2 rounded-lg uppercase text-slate-300 hover:opacity-90 transition-all"
          disabled={loading}
        >
          {loading ? <CircularProgress size={"20px"} /> : "Sign In"}
        </button>
        <OAuth></OAuth>
      </form>
      <div className="flex gap-1 mt-5">
        <p className="text-slate-300">Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-amber-900">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-600 my-4">{error && error}</p>
    </div>
  );
}
