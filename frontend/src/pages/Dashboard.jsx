import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import TinderCard from "../components/TinderCard";
import { getMovies } from "../slices/movie";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const { movies } = useSelector((state) => state.movie);

  const dispatch = useDispatch();

  useEffect(() => {
    if (movies?.length == 0) {
      dispatch(getMovies(currentUser?._id));
    }
  }, [movies?.length]);

  if (!localStorage.getItem("user")) {
    return <Navigate to="/signin" />;
  }

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
            className="grid min-h-screen overflow-y-auto place-items-center"
            // style={{ height: window.innerHeight - 100 }}
          >
            {movies.map((e, i) => (
              <TinderCard key={e?._id} item={e} movies={movies} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
