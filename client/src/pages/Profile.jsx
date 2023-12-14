import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAPhoto from "@mui/icons-material/AddAPhotoRounded";
import ConfirmDeleteAcc from "../components/ConfirmDeleteAcc";
import { useRef } from "react";
import axios from "axios";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import VisibilityOffSharp from "@mui/icons-material/VisibilityOffSharp";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();
  const [passwordUnmatched, setPasswordUnmatched] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //LOGS:
  // console.log(currentUser.user.email);
  // console.log(file);

  // POINT:

  let access_token = document.cookie
    .split(";")
    .find((token) => token.trim().startsWith("access_token="))
    .split("=");

  access_token = access_token[access_token.length - 1];

  // TODO: upload user profile to firebase functionality
  // NOTE: uploading user profile image with google firebase requires internet

  // TODO: handle update user acc functionality
  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleUpdateAccount = async (evt) => {
    evt.preventDefault();

    try {
      dispatch(updateUserStart());

      if (
        inputPassword.current.value &&
        inputPassword.current.value !== inputConfirmPassword.current.value
      ) {
        setPasswordUnmatched(true);
        dispatch(updateUserFailure());
        setTimeout(() => {
          setPasswordUnmatched(false);
        }, 2000);
        return;
      }

      const userDataInfo = {
        user: formData,
        access_token,
      };

      // REMARK: userID bellow will be dynamic
      const response = await axios.post(
        `http://localhost:8800/api/user/update/${currentUser.user._id}`,
        userDataInfo
      );

      const { data } = response;
      console.log(data);

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (err) {
      const { data } = err.response;
      dispatch(updateUserFailure(data.message));
    }
  };

  // TODO: handle delete and cancel acc functionality
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());

      const userDataInfo = {
        access_token,
      };

      const response = await axios.post(
        `http://localhost:8800/api/user/delete/${currentUser.user._id}`,
        userDataInfo
      );

      const { data } = response;
      dispatch(deleteUserSuccess(data));
    } catch (err) {
      const { data } = err.response;
      dispatch(deleteUserFailure(data.message));
    }

    setShowConfirmation(false);
  };

  // const handleCancelDelete = () => {
  // };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const response = await axios.get(
        "http://localhost:8800/api/authentication/sign-out"
      );
      const { data } = response;
      document.cookie = `access_token=${access_token}; expires=Tue, 01 jan 1970 00:00:00 UTC; path=/; Secure; SameSite=None;`;
      dispatch(signOutUserSuccess(data));
    } catch (err) {
      const { data } = err.response;
      dispatch(signOutUserFailure(data.message));
    }
  };

  return (
    <div className=" p-3 max-w-lg mx-auto gap-4">
      <h1 className="text-2xl font-semibold text-white text-center">Profile</h1>

      <form className="" onSubmit={handleUpdateAccount}>
        <section className="upper-section  flex flex-col gap-4 items-center my-7 ">
          <div className="relative">
            {currentUser && (
              <img
                src={
                  currentUser.user.avatar
                    ? PF + currentUser.user.avatar
                    : PF + "no-profile/person-4.svg"
                }
                alt="profile"
                className="bg-slate-200 rounded-full w-20 h-20 object-cover"
              />
            )}
            <div className="absolute bottom-0 right-0">
              <label htmlFor="profile" className="cursor-pointer">
                <input
                  hidden
                  type="file"
                  id="profile"
                  ref={fileRef}
                  name="profile"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <AddAPhoto
                  className="text-white "
                  onClick={() => fileRef.current.click()}
                />
              </label>
            </div>
          </div>
        </section>

        <section className="lower-section flex flex-col max-w-xl mx-auto gap-3">
          <input
            type="text"
            className="py-2 px-2 rounded-lg border text-sm md:text-base focus:outline-none text-gray-800"
            placeholder="Username"
            id="username"
            defaultValue={currentUser.user.username}
            minLength="3"
            onChange={handleChange}
          />
          <input
            type="email"
            className="py-2 px-2 rounded-lg border text-sm md:text-base focus:outline-none text-gray-800"
            placeholder="Email"
            id="email"
            defaultValue={currentUser.user.email}
            onChange={handleChange}
          />
          <label
            htmlFor="password"
            className="bg-white py-2 px-2 rounded-lg border flex gap-0 justify-between"
          >
            <input
              type={showPassword ? "text" : "password"}
              className=" text-sm md:text-base focus:outline-none w-11/12 text-gray-800"
              placeholder="Password"
              id="password"
              minLength="6"
              ref={inputPassword}
              onChange={handleChange}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            >
              {showPassword ? <VisibilityOffSharp /> : <RemoveRedEye />}
            </span>
          </label>

          <label
            htmlFor="confirmPassword"
            className="bg-white py-2 px-2 rounded-lg border flex gap-0 justify-between"
          >
            <input
              type={showConfirmPassword ? "text" : "password"}
              className=" text-sm md:text-base focus:outline-none w-11/12 text-gray-800"
              placeholder="Confirm password"
              id="confirmPassword"
              minLength="6"
              ref={inputConfirmPassword}
              onChange={handleChange}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmation)}
              className="cursor-pointer"
            >
              {showConfirmPassword ? <VisibilityOffSharp /> : <RemoveRedEye />}
            </span>
          </label>
          <button
            type="submit"
            className="bg-amber-900 p-2 rounded-lg text-lg text-slate-200 uppercase font-normal hover:opacity-90 transition-all"
          >
            {loading ? <CircularProgress size={"20px"} /> : "Update"}
          </button>
          <Link
            to={"/create-list"}
            className="bg-green-900 p-2 rounded-lg text-lg text-slate-200 uppercase font-normal hover:opacity-90 transition-all text-center"
          >
            Create List
          </Link>
        </section>
      </form>

      <div>
        <div className="flex mt-6 mb-2 justify-between">
          <span
            className="bg-red-800 px-2 rounded-md cursor-pointer text-slate-200 transition-all hover:opacity-90"
            onClick={() => setShowConfirmation(true)}
          >
            Delete account
          </span>
          <span
            className="bg-red-800  px-2 rounded-md cursor-pointer text-slate-200 transition-all  hover:opacity-90"
            onClick={handleSignOut}
          >
            Sign out
          </span>
        </div>

        {/* DONE: customize warning || error or success message */}

        <p className="text-red-800 animate-shake">
          {passwordUnmatched ? "Password do not match!" : ""}
        </p>
        <p className="text-red-800">{error ? error : ""}</p>
        <p className="text-green-800">
          {updateSuccess ? "Updated successfully!" : ""}
        </p>
      </div>

      {showConfirmation && (
        <ConfirmDeleteAcc
          handleDeleteAccount={handleDeleteAccount}
          handleCancelDelete={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
}
