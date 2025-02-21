import React, { useState } from "react";
import Logo from "/images/logo.png";
import { MdFavorite } from "react-icons/md";
import { AiFillAppstore } from "react-icons/ai";
import { FaFire } from "react-icons/fa";

function Tabbar({ active, setActive }) {
  return (
    <footer className="lg:hidden h-[7vh] sticky bottom-0 z-40 px-4 px-1 py-1 flex items-center justify-around">
      <button onClick={(e) => setActive(1)}>
        <AiFillAppstore
          className={`text-3xl ${
            active == 1 ? "text-primary-500" : "text-slate-500"
          }`}
        />
      </button>
      <button onClick={(e) => setActive(2)}>
        <FaFire
          className={`text-3xl ${
            active == 2 ? "text-primary-500" : "text-slate-500"
          }`}
        />
      </button>
      <button onClick={(e) => setActive(3)}>
        <MdFavorite
          className={`text-3xl ${
            active == 3 ? "text-primary-500" : "text-slate-500"
          }`}
        />
      </button>
    </footer>
  );
}

export default Tabbar;
