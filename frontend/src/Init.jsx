import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import {
  replaceCurrentUser,
  replaceIsLoggedIn,
  replaceSocket,
} from "./slices/auth";
import { baseURL } from "./utils/baseUrl";
import {
  getLike,
  getMatchedMovie,
  getMovies,
  replaceLike,
  replaceMatches,
} from "./slices/movie";

const Init = ({ children }) => {
  const { currentUser, isLoggedIn, socket, language } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const socket1 = io(baseURL, {
    // reconnectionDelayMax: 10000,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10,
    autoConnect: false,
  });

  useEffect(() => {
    if (isLoggedIn) {
      try {
        socket1.connect();
        dispatch(replaceSocket(socket1));
      } catch (error) {
        console.log(error);
      }
    }

    if (localStorage.getItem("user")) {
      if (!currentUser || JSON.stringify(currentUser) == "{}") {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        dispatch(replaceCurrentUser(user));
        dispatch(replaceIsLoggedIn(true));
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getMovies(currentUser?._id));
      dispatch(getLike(currentUser?._id));
      dispatch(getMatchedMovie(10));
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket) {
      socket?.on("connect", () => {
        // dispatch(replaceOnline(true));
      });

      // socket?.on("disconnect", () => {
      //   dispatch(replaceOnline(false));
      //   // showWarning("Connexion intérrompue");
      // });

      socket?.on("matches:list", (data) => {
        console.log("matches:list-------------", data);
        if (data && data?.length > 0) {
          dispatch(replaceMatches([...data]));
        }
      });

      if (
        JSON.stringify(currentUser) != "{}" &&
        JSON.stringify(currentUser) != ""
      ) {
        socket?.on(`movie:liked:${currentUser?._id}`, (data) => {
          console.log("-------------", data);
          
          if (data && data?.length > 0) {
            dispatch(replaceLike([...data]));
          }
        });
      }
    }
    // currentUser
  }, [socket, currentUser]);

  return <React.Fragment>{children}</React.Fragment>;
};
export default Init;
