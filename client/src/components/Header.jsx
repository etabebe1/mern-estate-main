import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black shadow-lg">
      <section className="flex justify-between items-center max-w-5xl mx-auto px-2 sm:px-6 md:px-7 py-4">
        <Link to={"/"}>
          <h1 className="flex items-center gap-1 cursor-pointer text-base md:text-xl">
            <span className="text-amber-900">Verse</span>
            <span className="text-slate-300">Estate</span>
          </h1>
        </Link>
        <form>
          <div className="flex items-center justify-between rounded-lg bg-slate-200  px-3 py-0 ">
            <input
              type="text"
              placeholder="Search..."
              className="w-28 bg-transparent sm:w-52 lg:w-80 focus:outline-none text-zinc-900 text-sm md:text-base md:py-1"
            />
            <SearchIcon className="text-zinc-900 cursor-pointer font-light " />
          </div>
        </form>
        <ul className="text-slate-300 flex justify-center items-end gap-4 text-sm md:text-base">
          <li className="hidden sm:inline hover:underline">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hidden sm:inline hover:underline">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="sm:inline hover:underline">
            <Link to={"/sign-in"}>
              <Person></Person>
            </Link>
          </li>
        </ul>
      </section>
    </header>
  );
}
