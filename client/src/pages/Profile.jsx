import React, { useState } from "react";
import { useSelector } from "react-redux";
import Person from "@mui/icons-material/Person";
import AddAPhoto from "@mui/icons-material/AddAPhotoRounded";
import ConfirmDeleteAcc from "../components/ConfirmDeleteAcc";
import { useRef } from "react";
import axios from "axios";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //LOGS:
  // console.log(currentUser);
  // console.log(file);

  // TODO: upload user profile to firebase functionality
  // NOTE: uploading user profile image with google firebase requires internet

  // TODO: handle delete acc functionality

  // TODO: handle update user acc functionality
  const handleUpdateAccount = async (evt) => {
    evt.preventDefault();

    try {
      let access_token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("access_token="))
        .split("=");

      access_token = access_token[access_token.length - 1];

      const userDataInfo = {
        user: {
          username: "Jeremiah",
          email: "jeremiah@mail.com",
          password: "Secret",
        },
        access_token,
      };

      // console.log(userDataInfo);

      // 
      const userID = 49578497

      const response = await axios.post(
        `http://localhost:8800/api/user/update/${userID}`,
        userDataInfo
      );
      console.log(response);
    } catch (error) {}
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
    console.log("handleDeleteClick");
  };

  return (
    <div className=" p-3 max-w-lg mx-auto gap-4">
      <section className="upper-section  flex flex-col gap-4 items-center my-7 ">
        <h1 className="text-2xl font-semibold text-white">Profile</h1>
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

      <form
        className="flex flex-col max-w-xl mx-auto gap-3"
        onSubmit={handleUpdateAccount}
      >
        <input
          type="text"
          className="py-2 px-2 rounded-lg border text-sm md:text-base focus:outline-none text-gray-800"
          placeholder="Username"
          id="username"
          // required
          minLength="3"
          // min="true"
        />
        <input
          type="email"
          className="py-2 px-2 rounded-lg border text-sm md:text-base focus:outline-none text-gray-800"
          placeholder="Email"
          id="email"
          // required
        />
        <label
          htmlFor="password"
          className="bg-white py-2 px-2 rounded-lg border flex gap-0 justify-between"
        >
          <input
            type="password"
            className=" text-sm md:text-base focus:outline-none w-11/12 text-gray-800"
            placeholder="Password"
            id="password"
            // required
            minLength="6"
          />
        </label>

        <label
          htmlFor="re-password"
          className="bg-white py-2 px-2 rounded-lg border flex gap-0 justify-between"
        >
          <input
            type={"password"}
            className=" text-sm md:text-base focus:outline-none w-11/12 text-gray-800"
            placeholder="Confirm password"
            id="re-password"
            // required
            minLength="6"
          />
        </label>
        <button
          type="submit"
          className="bg-amber-900 p-2 rounded-lg text-lg text-slate-200
        uppercase font-normal hover:opacity-95 transition-all"
        >
          Update
        </button>
      </form>

      <div className="flex my-6 justify-between">
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

      {showConfirmation && <ConfirmDeleteAcc />}
    </div>
  );
}
