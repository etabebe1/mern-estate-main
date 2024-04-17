import React from "react";
import { Link } from "react-router-dom";

// Importing react icon

import { IoLocation } from "react-icons/io5";

export default function ListingItem({ list }) {
  // console.log(list.description);
  // console.log(list.imgUrls[0]);
  return (
    <Link to={`/listing/${list._id}`}>
      <div className="w-[256px] h-[350px] rounded-md group bg-black/50 hover:scale-105 transition-all">
        <div className="top-container h-1/2">
          <img
            src={`${list.imgUrls[0]}`}
            className="object-cover object-center rounded-t-md h-full w-full"
            alt=""
          />
        </div>
        <div className="bottom-container w-full h-1/2 rounded-b-md py-3 px-2 space-y-2 text-white">
          <h2 className="font-semibold text-sm text-center px-3 truncate">
            {list.name}
          </h2>
          <div className="text-container flex flex-row items-center gap-1">
            <IoLocation className="text-green-500" />
            <p className="text-gray-300 text-sm">{list.address}</p>
          </div>

          <p className="text-sm line-clamp-2">{list.description}</p>

          <p className="text-amber-800 text-sm">
            ${list.offer ? list.discountPrice : list.regularPrice}
            {list.type === "rent" && "/ month"}
          </p>
          <div className="flex flex-row gap-2">
            <p className="text-xs text-white font-semibold">
              {list.bedRooms > 1
                ? `${list.bedRooms} beds`
                : `${list.bedRooms} bed`}
            </p>
            <p className="text-xs text-white font-semibold">
              {list.bedRooms > 1
                ? `${list.bedRooms} beds`
                : `${list.bedRooms} bed`}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
