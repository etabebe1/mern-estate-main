import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import component
import ListingItem from "../components/ListingItem";

// Importing React Icon
import { FiCheckCircle } from "react-icons/fi";

export default function Search() {
  const navigate = useNavigate();
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListing] = useState([]);

  // LOGS:
  // console.log(sideBarData);
  // console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    // console.log(searchTermFromUrl);

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSideBarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListing = async () => {
      setLoading(true);

      try {
        const searchQuery = urlParams.toString();
        const response = await axios.get(
          `http://localhost:8800/api/listing/search?${searchQuery}`
        );

        const { data } = response;
        // console.log(data);
        setListing(data);
      } catch (error) {
        const { response } = error;
        console.log(response);
      }

      setLoading(false);
    };

    fetchListing();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.search]);

  const inputHandler = (e) => {
    e.preventDefault();

    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sideBarData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSideBarData({ ...sideBarData, type: e.target.id });
    }

    /*::::::::::::::: Boolean Data Type ::::::::::::::: */

    // offer check list
    if (e.target.id === "offer") {
      setSideBarData({ ...sideBarData, offer: true });
    }
    if (e.target.id === "offer" && sideBarData.offer === true) {
      setSideBarData({ ...sideBarData, offer: false });
    }

    // parking check list
    if (e.target.id === "parking") {
      setSideBarData({ ...sideBarData, parking: true });
    }
    if (e.target.id === "parking" && sideBarData.parking === true) {
      setSideBarData({ ...sideBarData, parking: false });
    }

    // furnished check list
    if (e.target.id === "furnished") {
      setSideBarData({ ...sideBarData, furnished: true });
    }
    if (e.target.id === "furnished" && sideBarData.furnished === true) {
      setSideBarData({ ...sideBarData, furnished: false });
    }

    // sort order list
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSideBarData({ ...sideBarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("type", sideBarData.type);
    urlParams.set("parking", sideBarData.parking);
    urlParams.set("furnished", sideBarData.furnished);
    urlParams.set("offer", sideBarData.offer);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("order", sideBarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div
        className="p-7 overflow-y-hidden border-r-2"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <form
          className="flex flex-col gap-8 text-slate-400 font-mono"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-md px-1 w-full bg-slate-300 text-slate-900 outline-none font-sans"
              defaultValue={sideBarData.searchTerm}
              onChange={inputHandler}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label>Type:</label>
            <div className="flex gap-2 items-center">
              <FiCheckCircle
                id="all"
                onClick={inputHandler}
                className={`text-lg cursor-pointer 
              ${sideBarData.type === "all" && "text-yellow-800"}`}
              />
              <span>Rent & Sale</span>
            </div>

            <div className="flex gap-2 items-center">
              <FiCheckCircle
                id="rent"
                onClick={inputHandler}
                className={`text-lg cursor-pointer 
              ${sideBarData.type === "rent" && "text-yellow-800"}`}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-2 items-center">
              <FiCheckCircle
                id="sale"
                onClick={inputHandler}
                className={`text-lg cursor-pointer 
              ${sideBarData.type === "sale" && "text-yellow-800"}`}
              />
              <span>Sale</span>
            </div>

            <div className="flex gap-2 items-center">
              <FiCheckCircle
                id="offer"
                onClick={inputHandler}
                className={`text-lg cursor-pointer 
              ${sideBarData.offer && "text-yellow-800"}`}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="text-base md:text-">Amenities:</label>
            <div className="flex gap-2">
              <FiCheckCircle
                id="parking"
                onClick={inputHandler}
                className={`text-lg cursor-pointer 
              ${sideBarData.parking && "text-yellow-800"}`}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <FiCheckCircle
                id="furnished"
                onClick={inputHandler}
                className={`text-lg cursor-pointer 
              ${sideBarData.furnished && "text-yellow-800"}`}
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              defaultValue={"created_at_desc"}
              id="sort_order"
              onChange={inputHandler}
              className="border rounded-lg p-1 cursor-pointer"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button
            className="bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-95"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-300 mt-5">
          Listing results:
        </h1>

        {/* listings start here */}
        <div className="p-5 flex justify-center gap-6 w-full">
          <div className="flex flex-wrap justify-start gap-5 max-w-[808px]">
            {!loading && listings.length === 0 && (
              <p className="text-white text-center w-full">No listing found!</p>
            )}

            {!loading &&
              listings &&
              listings.map((list, index) => {
                return <ListingItem list={list} key={index + 1} />;
              })}
          </div>
        </div>

        {/* listings ends here */}
      </div>
    </div>
  );
}
