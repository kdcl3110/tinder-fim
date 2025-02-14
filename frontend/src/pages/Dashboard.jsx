import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ModalNewGame from "./modals/ModalNewGame";
import { RiAddCircleFill, RiExchangeFill } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";
import ItemGame from "../components/ItemGame";
import TinderCard from "../components/TinderCard";

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
  const [openNewGame, setOpenNewGame] = useState(false);
  const [game, setGame] = useState();
  const [joinOpen, setJoinOpen] = useState(false);
  const [active, setActive] = useState(1);

  const { waiting, encours } = useSelector((state) => state.game);

  // if (!localStorage.getItem("user")) {
  //   return <Navigate to="/signin" />;
  // }

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <ModalNewGame
        open={openNewGame}
        setOpen={setOpenNewGame}
        setGame={setGame}
        setJoinOpen={setJoinOpen}
      />

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

        <main className="h-full relative  mx-4 md:mx-0 py-5">
          <div
            className="flex justify-center"
            style={{ height: window.innerHeight - 100 }}
          >
            <TinderCard />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
