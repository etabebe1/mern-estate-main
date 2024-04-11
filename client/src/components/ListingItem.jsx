import React from "react";
import { Link } from "react-router-dom";

// Importing react icon

import {IoLocation} from "react-icons/io5"


export default function ListingItem({ list }) {
  console.log(list.description);
  console.log(list.imgUrls[0]);

  return (
    <Link to={`/listing/${list.id}`}>
      <div className="w-[256px] h-[300px] rounded-md group bg-black/50 hover:scale-105 transition-all">
        <div className="top-container h-1/2">
          <img
            src={"assets/test/9.jpeg"}
            className="object-cover object-center rounded-t-md h-full w-full"
            alt=""
          />

        </div>
        <div className="bottom-container w-full h-1/2 rounded-b-md py-3 px-2 text-white">
          <h2 className="font-semibold text-sm px-3">{list.name}</h2>
        </div>
      </div>
    </Link>
  );
}
