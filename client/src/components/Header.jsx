import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // LOGS:
  // console.log(currentUser.user);
  // console.log(PF + currentUser.user.avatar);
  console.log(searchTerm);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFormUrl = urlParams.get("searchTerm");
    console.log(searchTermFormUrl);
    searchTermFormUrl && setSearchTerm(searchTermFormUrl);
  }, []);

  return (
    <header className="bg-black shadow-lg">
      <section className="flex justify-between items-center max-w-5xl mx-auto px-2 sm:px-6 md:px-7 py-4">
        <Link to={"/"}>
          <h1 className="flex items-center gap-1 cursor-pointer text-base md:text-xl">
            <span className="text-amber-900">Verse</span>
            <span className="text-slate-300">Estate</span>
          </h1>
        </Link>

        <form
          className="flex items-center justify-between rounded bg-slate-200 px-3 py-0"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-28 bg-transparent sm:w-52 lg:w-80 focus:outline-none text-zinc-900 text-sm md:text-base md:py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <SearchIcon className="text-zinc-900 cursor-pointer font-light" />
          </button>
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
                  src={currentUser.user.avatar}
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
