import React from "react";

export default function CreateListItem() {
  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-slate-300 text-center my-7 text-3xl font-semibold">
        Create Listing
      </h1>

      {/* DONE: fix responsiveness on different screen*/}
      <form className="flex sm:flex-row flex-col flex-1 mx-auto">
        <section className="upper-section flex flex-col p-2 gap-3">
          <input
            type="text"
            placeholder="Name"
            required
            id="name"
            className="p-2 rounded-lg border text-sm md:text-base"
          />
          <textarea
            type="text"
            placeholder="Description"
            required
            id="description"
            className="p-2 rounded-lg border text-sm md:text-base"
          />
          <input
            type="text"
            placeholder="Address"
            required
            id="address"
            className="p-2 rounded-lg border text-sm md:text-base"
          />
          <div className="middle text-slate-300 flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="sell" id="sell" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="parking" id="parking" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="furnished" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" id="offer" />
              <span>Offer</span>
            </div>
          </div>

          {/*POINT: bottom  */}
          <div className="bottom text-slate-200 flex flex-wrap gap-6 justify-start">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-1 border rounded-lg w-14 text-slate-900 outline-none"
                name="bedroom"
                id="bedroom"
                min={"1"}
                max={"10"}
                required
              />
              <span>Bedrooms</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-1 border rounded-lg w-14 text-slate-900 outline-none"
                name="baths"
                id="baths"
                min={"1"}
                max={"10"}
                required
              />
              <span>Baths</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                className="p-1 border rounded-lg w-32 text-slate-900 outline-none"
                name="regularPrice"
                id="regularPrice"
                min={"50"}
                max={"100000000"}
                required
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
              <button className="text-slate-300 w-full p-2 uppercase">Create Item</button>
            </div>
        </section>
      </form>
    </main>
  );
}
