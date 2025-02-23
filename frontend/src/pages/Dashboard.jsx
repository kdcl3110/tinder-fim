import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import TinderCard from "../components/TinderCard";
import { getMovies } from "../slices/movie";
import Tabbar from "../partials/Tabbar";
import Matching from "./component/Matching";
import Favorite from "./component/Favorite";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const { movies } = useSelector((state) => state.movie);
  const [tabActive, setTabActive] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (movies?.length == 0) {
      dispatch(getMovies(currentUser?._id));
    }
  }, [movies?.length]);

  // ✅ Hook pour gérer la taille de l'écran
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)"); // md breakpoint en Tailwind

    const handleResize = (e) => {
      if (e.matches) {
        setTabActive(1); // Si l'écran est >= md, revenir à tab 1
      }
    };

    // Vérifier au chargement initial
    if (mediaQuery.matches) {
      setTabActive(1);
    }

    // Ajouter l'écouteur d'événements
    mediaQuery.addEventListener("change", handleResize);

    // Nettoyer l'écouteur quand le composant est démonté
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  if (!localStorage.getItem("user")) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="flex h-[100dvh] bg-black overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="relative h-[87dvh]">
          <div
            className="grid lg:min-h-screen md:overflow-hidden place-items-center"
            // style={{ height: window.innerHeight - 100 }}
          >
            {tabActive == 1 &&
              movies.map((e, i) => (
                <TinderCard key={e?._id} item={e} movies={movies} />
              ))}
            {tabActive > 1 && (
              <div className="h-[87dvh] overflow-y-auto">
                {tabActive == 2 && <Matching />}
                {tabActive == 3 && <Favorite />}
              </div>
            )}
          </div>
        </main>

        <Tabbar active={tabActive} setActive={setTabActive} />
      </div>
    </div>
  );
}

export default Dashboard;
