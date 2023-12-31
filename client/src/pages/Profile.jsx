import React, { useState, useEffect } from "react";
import { useRef } from "react";
// REMARK: icons
import AddAPhoto from "@mui/icons-material/AddAPhotoRounded";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import ConfirmDeleteAcc from "../components/ConfirmDeleteAcc";
import axios from "axios";
import VisibilityOffSharp from "@mui/icons-material/VisibilityOffSharp";
import CircularProgress from "@mui/material/CircularProgress";
// REMARK: redux
import { useSelector } from "react-redux";
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
// REMARK: react router
import { Link } from "react-router-dom";

// REMARK: firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();
  const [passwordUnmatched, setPasswordUnmatched] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListing, setShowListing] = useState([]);
  const [showListingError, setShowListingError] = useState(false);
  const dispatch = useDispatch();

  //LOGS:
  // console.log(currentUser.user.email);
  // console.log(file);
  // console.log(filePercentage);
  // console.log(formData);
  useEffect(() => {
    showListing && showListing.length > 0 && console.log(showListing);
  });

  let accessToken = document.cookie
    .split(";")
    .find((token) => token.trim().startsWith("accessToken="))
    .split("=");

  accessToken = accessToken[accessToken.length - 1];

  // TODO: upload user profile to firebase functionality
  // NOTE: uploading user profile image with google firebase requires internet
  // NOTE: the code bellow is a rule for uploading images in to our firebase storage accessible in the firebase storage rule section
  /*//  
  allow read;
  allow write : if 
  request.resource.size < 2*1024*1024 && 
  request.resource.contentType.matches("image/.*")
   /*/

  useEffect(() => {
    const handleUploadProfile = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `profile/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePercentage(Math.round(progress));
        },

        (error) => {
          setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL });
          });
        }
      );
    };

    if (file) {
      handleUploadProfile(file);
    }
  }, [file, formData]);

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
        accessToken,
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
        accessToken,
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

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const response = await axios.get(
        "http://localhost:8800/api/authentication/sign-out"
      );
      const { data } = response;
      document.cookie = `accessToken=${accessToken}; expires=Tue, 01 jan 1970 00:00:00 UTC; path=/; Secure; SameSite=None;`;
      dispatch(signOutUserSuccess(data));
    } catch (err) {
      const { data } = err.response;
      dispatch(signOutUserFailure(data.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);

      const userDataInfo = {
        accessToken,
      };

      const response = await axios.post(
        `http://localhost:8800/api/listing/user/${currentUser.user._id}`,
        userDataInfo
      );

      setShowListing(response.data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const userDataInfo = {
        accessToken,
      };

      const response = await axios.post(
        `http://localhost:8800/api/listing/delete/${listingId}`,
        userDataInfo
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" p-3 max-w-lg mx-auto gap-1">
      <h1 className="text-2xl font-semibold text-white text-center">Profile</h1>

      <form className="" onSubmit={handleUpdateAccount}>
        <section className="upper-section  flex flex-col gap-1 items-center my-3">
          <div className="relative">
            {currentUser && (
              <img
                src={formData.avatar || currentUser.user.avatar}
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
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePercentage > 0 && filePercentage < 100 ? (
              <span className="text-green-700">{`Uploading ${filePercentage}%`}</span>
            ) : filePercentage === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
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
            className="bg-amber-900 p-2 rounded-md text-base md:text-lg text-slate-200 uppercase font-normal hover:opacity-90 transition-all"
          >
            {loading ? <CircularProgress size={"20px"} /> : "Update"}
          </button>
          <Link
            to={"/create-list"}
            className="bg-green-900 p-2 rounded-md text-base md:text-lg text-slate-200 uppercase font-normal hover:opacity-90 transition-all text-center"
          >
            Create List
          </Link>
        </section>
      </form>

      <div>
        <div className="flex mt-6 mb-2 justify-between">
          <span
            className="border border-red-800 rounded p-2 cursor-pointer text-slate-200 text-sm md:text-base transition-all hover:bg-red-800 uppercase"
            onClick={() => setShowConfirmation(true)}
          >
            Delete account
          </span>
          <span
            className="border border-red-800 rounded p-2 cursor-pointer text-slate-200 text-sm md:text-base transition-all  hover:bg-red-800 uppercase"
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

      <section className=" bottom-section flex flex-col">
        <div className="flex flex-col items-center justify-center">
          <button
            className="bg-gradient-to-r from-blue-500 to-red-500 text-white py-1 px-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate capitalize"
            onClick={handleShowListing}
          >
            Show listing
          </button>
        </div>

        {showListing && showListing.length > 0 && (
          <div className="text-white flex flex-col gap-4">
            <h1 className="mt-7 text-2xl font-semibold text-center">
              Your Listing
            </h1>

            <li className="list-container list-none">
              {/* map and return the data here */}
              {showListing.map((list) => (
                <div
                  className=" border border-white flex flex-row justify-between gap-4 p-2"
                  key={list._id}
                >
                  <div className="cursor-pointer">
                    <Link
                      to={`/listing/${list._id}`}
                      className="flex flex-row items-center gap-1"
                    >
                      <img
                        src={list.imgUrls[0]}
                        alt="Apartment_Image"
                        className="w-20 rounded"
                      />
                      <p className="text-white/80 text-sm">{list.name}</p>
                    </Link>
                  </div>
                  <div className="flex flex-col justify-between text-center gap-1">
                    <span className="text-white/70 text- cursor-pointer px-1 border border-green-800 rounded  hover:bg-green-800">
                      Edit
                    </span>
                    <span
                      className="text-white/70 text- cursor-pointer px-1 border border-red-800 rounded hover:bg-red-800"
                      onClick={() => handleDeleteListing(list._id)}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              ))}
              {/* Individual list end */}
            </li>
          </div>
        )}
      </section>
    </div>
  );
}
