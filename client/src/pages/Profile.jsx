import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddAPhoto from "@mui/icons-material/AddAPhotoRounded";
import ConfirmDeleteAcc from "../components/ConfirmDeleteAcc";
import { useRef } from "react";
import axios from "axios";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import VisibilityOffSharp from "@mui/icons-material/VisibilityOffSharp";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();
  const [notifyText, setNotifyText] = useState(false);
  const [display, setDisplay] = useState(false);
  const [success, setSuccess] = useState(null);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //LOGS:
  // console.log(currentUser.user.email);
  // console.log(file);

  useEffect(() => {
    console.log(success);
  }, [success]);

  // TODO: upload user profile to firebase functionality
  // NOTE: uploading user profile image with google firebase requires internet

  // TODO: handle delete acc functionality

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
      if (
        inputPassword.current.value &&
        inputPassword.current.value !== inputConfirmPassword.current.value
      ) {
        setNotifyText(true);
        setDisplay(!display);
        console.log("password in not similar");
        return;
      } else {
        setDisplay(false);
      }

      let access_token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("access_token="))
        .split("=");

      access_token = access_token[access_token.length - 1];

      const userDataInfo = {
        user: formData,
        access_token,
      };

      const { _id: id } = currentUser.user;

      const response = await axios.post(
        `http://localhost:8800/api/user/update/${id}`,
        userDataInfo
      );

      if (response.statusText === "OK") {
        setNotifyText(true);
        setSuccess(true);
      } else {
        setNotifyText(false);
      }

      // REMARK: userID bellow will be dynamic
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
    console.log("handleDeleteClick");
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
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <VisibilityOffSharp />
              ) : (
                <RemoveRedEye className="cursor-pointer" />
              )}
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
            <span onClick={() => setShowConfirmPassword(!showConfirmation)}>
              {showConfirmPassword ? (
                <VisibilityOffSharp className="cursor-pointer" />
              ) : (
                <RemoveRedEye className="cursor-pointer" />
              )}
            </span>
          </label>
          <button
            type="submit"
            className="bg-amber-900 p-2 rounded-lg text-lg text-slate-200
        uppercase font-normal hover:opacity-95 transition-all"
          >
            Update
          </button>
        </section>
      </form>

      <div>
        <div className="flex mt-6 mb-2 justify-between">
          <span
            className="bg-red-800 px-2 rounded-md cursor-pointer text-slate-200 transition-all hover:opacity-95"
            onClick={handleDeleteClick}
          >
            Delete account
          </span>
          <span className="bg-red-800  px-2 rounded-md cursor-pointer text-slate-200 transition-all  hover:opacity-90">
            Sign out
          </span>
        </div>

        {/* TODO: customize warning or success message */}
        <div></div>
      </div>

      {showConfirmation && <ConfirmDeleteAcc />}
    </div>
  );
}
