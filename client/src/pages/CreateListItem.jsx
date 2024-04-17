import React, { useState } from "react";
import { useSelector } from "react-redux";
import Delete from "@mui/icons-material/DeleteForeverOutlined";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import UploadFile from "@mui/icons-material/Upload";
import { useNavigate } from "react-router-dom";

// REMARK: firebase
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function CreateListItem() {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    userRef: "",
    regularPrice: 50,
    discountPrice: 50,
    bathRooms: 1,
    bedRooms: 1,
    type: "rent",
    furnished: false,
    parking: false,
    offer: false,
    imgUrls: [],
  });
  const [error, setError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // LOGS:
  // console.log(currentUser.user);
  // console.log(files);
  // console.log(formData);
  // console.log(imageUploadError);
  // console.log(isUploading);

  const handleChange = (evt) => {
    if (evt.target.id === "sale" || evt.target.id === "rent") {
      setFormData({ ...formData, type: evt.target.id });
    }

    if (
      evt.target.id === "parking" ||
      evt.target.id === "furnished" ||
      evt.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [evt.target.id]: evt.target.checked,
      });
    }

    if (
      evt.target.type === "number" ||
      evt.target.type === "text" ||
      evt.target.type === "textarea"
    ) {
      setFormData({ ...formData, [evt.target.id]: evt.target.value });
    }
  };

  const storeImages = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageReference = ref(storage, `RealEstateImages/${fileName}`);
      const uploadTask = uploadBytesResumable(storageReference, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Upload ${Math.round(progress)} done!`);
        },
        (error) => {
          reject(error);
        },
        () => {
          // When the image is uploaded to the server, we can create a URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // TODO: here stuck due to internet storeImage function must be built to store image in the firebase DB
  // TEST: will be done on sunday
  // DONE: test done successfully

  const handleUploadImage = async (e) => {
    if (files.length > 0 && files.length + formData.imgUrls < 7) {
      setIsUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImages(files[i]));
      }

      Promise.all(promises)
        .then((url) => {
          // POINT: the ((url)) parameter above send an array that contains downloadURL forEach image uploaded to firebase storage
          // POINT: therefore we will be handling the array  bellow
          // console.log(url);
          setFormData({ ...formData, imgUrls: formData.imgUrls.concat(url) });
          setImageUploadError(false);
          setIsUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setIsUploading(false);
        });
    } else if (files.length > 6) {
      setImageUploadError("You can only upload 6 images per listing!");
      setIsUploading(false);
    } else {
      setImageUploadError("You must upload at least one image!");
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imgUrls: formData.imgUrls.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      if (formData.imgUrls.length <= 0)
        return setError("You must upload at least one image!");

      if (+formData.discountPrice > +formData.regularPrice)
        return setError("Discount price must be lower than regular price!");
      setIsLoading(true);
      setError(false);

      // LOGS:
      // console.log({ ...formData, userRef: currentUser.user._id });
      // console.log(isLoading)

      const response = await axios.post(
        "/api/listing/create",
        {
          ...formData,
          userRef: currentUser.user._id,
        }
      );

      const { data } = response;

      navigate(`/listing/${data.id}`);
      // console.log(data._id);

      setIsLoading(false);
    } catch (err) {
      const { data } = err.response;
      setError(data.message);
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-slate-300 text-center my-7 text-3xl font-semibold">
        Create a Listing Item
      </h1>

      {/* DONE: fix responsiveness on different screen*/}
      <form
        className="flex sm:flex-row flex-col flex-1 mx-auto"
        onSubmit={handleSubmit}
      >
        <section className="upper-section flex flex-col p-2 gap-3">
          <input
            type="text"
            placeholder="Name"
            required
            id="name"
            maxLength='62'
            minLength='10'
            className="p-2 rounded border text-sm md:text-base outline-none text-slate-300 bg-zinc-900 "
            onChange={handleChange}
          />
          <textarea
            type="text"
            placeholder="Description"
            required
            id="description"
            className="p-2 rounded border text-sm md:text-base outline-none text-slate-300 bg-zinc-900"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Address"
            required
            id="address"
            className="p-2 rounded border text-sm md:text-base outline-none text-slate-300 bg-zinc-900"
            onChange={handleChange}
          />
          <div className="middle text-slate-300 flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 md:w-5 outline-none"
                name="sale"
                id="sale"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span className="text-sm md:text-base">Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 md:w-5 outline-none"
                name="rent"
                id="rent"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span className="text-sm md:text-base">Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 md:w-5 outline-none"
                name="parking"
                id="parking"
                checked={formData.parking}
                onChange={handleChange}
              />
              <span className="text-sm md:text-base">Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 md:w-5 outline-none"
                name="furnished"
                id="furnished"
                checked={formData.furnished}
                onChange={handleChange}
              />
              <span className="text-sm md:text-base">Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 md:w-5 outline-none"
                name="offer"
                id="offer"
                checked={formData.offer}
                onChange={handleChange}
              />
              <span className="text-sm md:text-base">Offer</span>
            </div>
          </div>

          {/*POINT: bottom  */}
          <div className="bottom text-slate-200 flex flex-wrap gap-6 justify-start">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-1 w-14 rounded border text-sm md:text-base outline-none text-slate-300 bg-zinc-900 "
                name="bedRooms"
                id="bedRooms"
                min={"1"}
                max={"10"}
                required
                onChange={handleChange}
                defaultValue={formData.bedRooms}
              />
              <span className="text-sm md:text-base">Bedrooms</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-1 w-14 rounded border text-sm md:text-base outline-none text-slate-300 bg-zinc-900"
                name="bathRooms"
                id="bathRooms"
                min={"1"}
                max={"10"}
                required
                onChange={handleChange}
                defaultValue={formData.bathRooms}
              />
              <span className="text-sm md:text-base">Baths</span>
            </div>

            <div className="flex flex-col justify-between lg:flex-row gap-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  className="p-1 w-28 rounded border text-sm md:text-base outline-none text-slate-300 bg-zinc-900"
                  name="regularPrice"
                  id="regularPrice"
                  min={"50"}
                  max={"100000000"}
                  required
                  onChange={handleChange}
                  defaultValue={formData.regularPrice}
                />
                <div className="text-container flex flex-col">
                  <p className="text-sm md:text-base">Regular Price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="p-1 w-28 rounded border text-sm md:text-base outline-none text-slate-300 bg-zinc-900"
                  name="discountPrice"
                  id="discountPrice"
                  min={"50"}
                  max={"100000000"}
                  required
                  onChange={handleChange}
                  defaultValue={formData.discountPrice}
                />
                <div className="text-container flex flex-col">
                  <p className="text-sm md:text-base">Discount Price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lower-section sm:w-1/2 w-full flex flex-col gap-3 sm:items-start items-center md:pr-2">
          <div className="flex flex-row gap-1  text-slate-300 text-sm md:text-base">
            <span className="font-semibold">Image: </span>
            <p>The first image will be covered (max 6)</p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-3 items-center justify-between  mx-auto">
              <div className="input-container w-56 md:w-64 lg:w-80  border border-slate-300 p-2 rounded">
                <input
                  onChange={(evt) => setFiles(evt.target.files)}
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  className="text-xs md:text-sm text-slate-300"
                  multiple
                />
              </div>
              <div>
                <div className="border border-green-600 text-slate-300 p-1 hover:bg-green-600 transition duration-300 rounded cursor-pointer">
                  <button
                    type="button"
                    className="text-xs sm:text-sm"
                    onClick={handleUploadImage}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      "Uploading..."
                    ) : (
                      <div className="flex flex-row justify-center items-center">
                        <UploadFile /> <p> Upload </p>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-red-700 text-sm text-center py-1">
              {imageUploadError && imageUploadError}
            </p>

            {formData.imgUrls.length > 0 && (
              <div className="border border-slate-300 my-2 rounded p-2 flex flex-col gap-2">
                {formData.imgUrls.map((imgUrl, index) => {
                  return (
                    <div className="" key={imgUrl}>
                      <div className="flex items-center justify-between">
                        <img
                          src={imgUrl}
                          alt="houseImage"
                          className="w-24 object-cover rounded-tr-lg rounded-bl-lg transition-transform transform hover:scale-110 duration-200 "
                        />
                        <Delete
                          onClick={() => handleRemoveImage(index)}
                          className="text-white hover:text-red-800 cursor-pointer transition duration-500"
                        />
                      </div>
                      <hr className="my-2" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="mx-auto md:w-full flex flex-col gap-2 text-center">
            <div className="mt-2 border border-green-600 hover:bg-green-600 rounded lg:w-full md:w-full w-72 text-center transition duration-300">
              <button
                className="text-slate-300 w-full p-2 uppercase text-xs sm:text-sm"
                disabled={isLoading || isUploading}
              >
                {isLoading ? (
                  <CircularProgress size={"20px"} />
                ) : (
                  "Create Listing"
                )}
              </button>
            </div>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </section>
      </form>
    </main>
  );
}
