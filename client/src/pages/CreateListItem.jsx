import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function CreateListItem() {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    userRef: "",
    regularPrice: 50,
    discountPrice: 0,
    bathRooms: 1,
    bedRooms: 1,
    type: "rent",
    furnished: false,
    parking: false,
    offer: false,
    imgUrls: [],
  });

  // LOGS:
  // console.log(currentUser.user);

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

  // LOGS:
  console.log(formData);

  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-slate-300 text-center my-7 text-3xl font-semibold">
        Create a Listing Item
      </h1>

      {/* DONE: fix responsiveness on different screen*/}
      <form className="flex sm:flex-row flex-col flex-1 mx-auto">
        <section className="upper-section flex flex-col p-2 gap-3">
          <input
            type="text"
            placeholder="Name"
            required
            id="name"
            className="p-2 rounded border text-sm md:text-base outline-none text-slate-300 bg-zinc-900"
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
                className="w-5 outline-none"
                name="sale"
                id="sale"
                onChange={handleChange}
                // checked={formData.sale === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5 outline-none"
                name="rent"
                id="rent"
                onChange={handleChange}
                // checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5 outline-none"
                name="parking"
                id="parking"
                checked={formData.parking}
                onChange={handleChange}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5 outline-none"
                name="furnished"
                id="furnished"
                checked={formData.furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5 outline-none"
                name="offer"
                id="offer"
                checked={formData.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>

          {/*POINT: bottom  */}
          <div className="bottom text-slate-200 flex flex-wrap gap-6 justify-start">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-1 w-14 rounded border text-sm md:text-base outline-none text-slate-300 bg-zinc-900"
                name="bedRooms"
                id="bedRooms"
                min={"1"}
                max={"10"}
                required
                onChange={handleChange}
              />
              <span>Bedrooms</span>
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
              />
              <span>Baths</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                className="p-1 w-32 rounded border text-sm md:text-base outline-none text-slate-300 bg-zinc-900"
                name="regularPrice"
                id="regularPrice"
                min={"50"}
                max={"100000000"}
                required
                onChange={handleChange}
              />
              <div className="text-container flex flex-col">
                <p>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </section>

        <section className="lower-section p-2 sm:w-1/2 w-full flex flex-col gap-3 sm:items-start items-center">
          <div className="flex flex-row gap-1  text-slate-300 text-sm md:text-base">
            <span className="font-semibold">Image: </span>
            <p>The first image will be covered (max 6)</p>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <div className="input-container w-48 md:w-60 lg:w-80  border border-slate-300 p-2 rounded">
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                className="text-sm text-slate-300"
              />
            </div>
            <div>
              <div className="border border-green-600 text-slate-300 p-2 hover:bg-green-600 transition duration-300 rounded cursor-pointer">
                <span> UPLOAD</span>
              </div>
            </div>
          </div>
          <div className="my-6 border border-green-600 hover:bg-green-600 rounded lg:w-full md:w-full w-72 text-center transition duration-300">
            <button className="text-slate-300 w-full p-2 uppercase">
              Create Item
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}
