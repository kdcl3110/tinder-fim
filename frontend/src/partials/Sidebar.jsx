import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "/images/logo.png";
import ModalAlert from "../pages/modals/ModalAlert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";
import { RiExchangeFill } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";
import { BiSolidBusiness } from "react-icons/bi";
import { AiFillAppstore } from "react-icons/ai";
import { MdSecurity } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import UserMenu from "../components/DropdownProfile";
import LikeItem from "../components/Liked";
import MatcheItem from "../components/MatcheItem";
import Matching from "../pages/component/Matching";
import Favorite from "../pages/component/Favorite";


function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;
  const [deconnexion, setDeconnexion] = useState(false);
  const [active, setActive] = useState(1);

  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="bg-[#14141c]">
      {/* Sidebar backdrop (mobile only) */}
      <ModalAlert
        open={deconnexion}
        setOpen={setDeconnexion}
        message={"Vous allez vous déconnecter"}
        action={() => {
          dispatch(logout())
            .unwrap()
            .then(() => {
              navigate("/signin");
            });
        }}
      />

      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-96 lg:sidebar-expanded:!w-96 2xl:!w-96 shrink-0  transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-96"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between">
          <div className="flex items-center justify-between w-full bg-primary-500 h-[80px] px-3">
            <UserMenu align="left" />
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-[rgba(0,0,0,0.6)] text-white flex items-center justify-center">
                <AiFillAppstore className="text-xl" />
              </div>
              <div className="h-10 w-10 rounded-full bg-[rgba(0,0,0,0.6)] text-white flex items-center justify-center">
                <BiSolidBusiness className="text-xl" />
              </div>
              <div className="h-10 w-10 rounded-full bg-[rgba(0,0,0,0.6)] text-white flex items-center justify-center">
                <MdSecurity className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="fixed top-16 z-20 md:sticky top-0">
          <div className="relative z-20">
            <div className="absolute bottom-0  h-px" aria-hidden="true" />
            <ul className="relative text-sm text-white font-medium flex flex-nowrap  no-scrollbar pt-3">
              <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                <a
                  className={`block px-3 flex font-bold justify-center items-center ${
                    active == 1
                      ? "border-b-3 border-primary-500"
                      : " hover:text-slate-600"
                  }  whitespace-nowrap`}
                  href="#0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(1);
                  }}
                >
                  <p className="">Matchs</p>
                </a>
              </li>
              <li className="last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                <a
                  className={`block flex px-3 justify-center font-bold items-center ${
                    active == 2
                      ? "border-b-3 border-primary-500"
                      : "hover:text-slate-600"
                  }  whitespace-nowrap`}
                  href="#0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(2);
                  }}
                >
                  <p className="">Mes likes</p>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex">
          <div
            className="w-full flex flex-col items-center overflow-y-auto overflow-x-hidden p-1 md:p-2 "
            style={{ maxHeight: window.innerHeight - 140 }}
          >
            {active == 1 && <Matching />}
            {active == 2 && <Favorite />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
