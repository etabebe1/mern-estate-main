import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Share from "@mui/icons-material/ShareOutlined";
import Location from "@mui/icons-material/LocationCitySharp";
import BedIcon from "@mui/icons-material/Bed";
import BathIcon from "@mui/icons-material/Bathroom";
import ParkingIcon from "@mui/icons-material/LocalParking";
import ChairIcon from "@mui/icons-material/Chair";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

export default function Listing() {
  const { currentUser } = useSelector((state) => state.user);
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();

  // LOGS:
  // console.log(params)
  // console.log(listing);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await axios.get(
          `/api/listing/getListItem/${params.listing}`
        );

        setListing(response.data);

        setIsLoading(false);
        setError(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
      }
    };
    fetchListing();
  }, [params.listing]);

  return (
    <main>
      {isLoading && <p className="text-white my-7 text-2xl">Loading...</p>}
      {error && <p className="text-white">Something went wrong!</p>}
      {listing && !isLoading && !error && (
        <section>
          <Swiper navigation>
            {listing.imgUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="share-icon bg-white/70 fixed top-[13%] right-[3%] z-10 h-12 w-12 flex items-center justify-center rounded-full hover:bg-red-500/70 transition">
            <Share
              className="text-slate-900"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}

          <div className="details max-w-4xl mx-auto flex flex-col p-3 my-7 gap-4">
            <p className="text-2xl text-slate-200 font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>

            <p className="flex items-center mt-6 gap-2 text-slate-300  text-sm">
              <Location className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white/75 text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>

            <p className="text-slate-200">
              <span className="font-semibold text-white">Description - </span>
              {listing.description}
            </p>

            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <BedIcon className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedRooms} beds `
                  : `${listing.bedRooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <BathIcon className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathRooms} baths `
                  : `${listing.bathRooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <ParkingIcon className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <ChairIcon className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            {currentUser.user &&
              listing.userRef !== currentUser.user._id &&
              !contact && (
                <button
                  onClick={() => {
                    setContact(true);
                  }}
                  className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                >
                  Contact landlord
                </button>
              )}
            {contact && <Contact listing={listing}></Contact>}
          </div>
        </section>
      )}
    </main>
  );
}
