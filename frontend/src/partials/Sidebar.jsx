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

const Match = () => {
  return (
    <div className="flex flex-col items-center justify-center text-white text-center px-6">
      {/* Carte avec ombre */}
      <div className="relative">
        <div className="w-24 h-36 bg-primary-500 rounded-xl bg-black opacity-40 shadow-xl"></div>
      </div>

      {/* Titre */}
      <h1 className="text-2xl font-bold mt-6">Commencez à matcher.</h1>

      {/* Description */}
      <p className="text-gray-400 text-sm mt-4 max-w-md">
        Vos matchs apparaîtront ici. Pour en obtenir, commencez à liker les
        profils des autres utilisateurs. C'est aussi ici que vous pourrez
        directement leur écrire, quand vous serez prêt(e) à vous lancer !
      </p>
    </div>
  );
};

const Liked = () => {
  const { likes } = useSelector((state) => state.movie);
  return (
    <div className="flex flex-col ">
      {likes?.length == 0 ? (
        <div className="flex flex-col items-center px-6 text-white text-center justify-center">
          <div className="relative">
            <FaComments className="text-primary-500 opacity-40 text-8xl" />
          </div>
          <h1 className="text-2xl font-bold mt-6">Dites bonjour</h1>
          <p className="text-gray-400 text-sm mt-4 max-w-md">
            Vous souhaitez engager la conversation ? Lorsque vous matchez avec
            d'autres utilisateurs, vous pouvez leur envoyer un message sous
            "Matchs".
          </p>
        </div>
      ) : (
        <div className="flex-1 min-h-0 space-y-5 overflow-auto">
          {likes?.map((e) => (
            <LikeItem key={e?._id} item={e} />
          ))}
          {likes?.map((e) => (
            <LikeItem key={e?._id} item={e} />
          ))}
        </div>
      )}
    </div>
  );
};

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
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-96 2xl:!w-96 shrink-0  transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
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
            {active == 1 && <Match />}
            {active == 2 && <Liked />}
          </div>
        </div>

        {/* Links */}
        {/* <div className="space-y-8 p-4"></div> */}

        {/* Expand / collapse button */}
        {/* <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto p-4">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
