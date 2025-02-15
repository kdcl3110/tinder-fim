import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import { RiAddCircleFill, RiExchangeFill } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";
import TinderCard from "../components/TinderCard";
import { getMovies } from "../slices/movie";

const AddButton = ({ openModal, setOpenModal }) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.stopPropagation();
        setOpenModal(true);
      }}
      className="flex p-3 bg-primary-500 text-white rounded-full items-center space-x-2 my-2 mx-5"
    >
      <RiAddCircleFill className="text-xl" />
      <span>Nouvelle session</span>
    </a>
  );
};

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const [active, setActive] = useState(1);

  const { movies } = useSelector((state) => state.movie);

  const [datas, setDatas] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  // if (!localStorage.getItem("user")) {
  //   return <Navigate to="/signin" />;
  // }

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

        <main className="h-full relative">
          <div
            className="grid max-h-screen bg-red-500 overflow-y-auto place-items-center"
            // style={{ height: window.innerHeight - 100 }}
          >
            {movies.map((e, i) => (
              <TinderCard key={e?._id} item={e} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
