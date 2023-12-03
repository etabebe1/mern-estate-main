import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // LOGS:
  // console.log(currentUser.user);
  // console.log(PF + currentUser.user.avatar);

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
          <li className="hidden sm:inline hover:underline transition duration-500">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hidden sm:inline hover:underline transition-all">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="sm:inline">
            <Link to={"/profile"}>
              {currentUser ? (
                <img
                  src={
                    currentUser.user.avatar
                      ? PF + currentUser.user.avatar
                      : PF + "no-profile/person-4.svg"
                  }
                  alt="profile"
                  className="w-7 h-7 rounded-full object-cover bg-slate-200 hover:bg-amber-900 transition-all"
                />
              ) : (
                <Person className="text-black bg-slate-200 rounded-full hover:bg-amber-900 transition-all" />
              )}
            </Link>
          </li>
        </ul>
      </section>
    </header>
  );
}
