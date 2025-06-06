import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaComments, FaTimes } from "react-icons/fa";
import { motion } from "motion/react";
import { replaceMovie, swipe } from "../slices/movie";
import { showError, showSucces } from "./Toasts";

const LikeItem = ({ item }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const unlike = () => {
      const data = {
        user: currentUser?._id,
        movie: item?.movie?._id,
        choice: "unlike",
      };
      setTimeout(() => {
        dispatch(swipe(data))
          .unwrap()
          .then((res) => {
            // dispatch(replaceMovie(movies.filter((e) => e?._id != item?._id)));
            // dispatch(getLike(currentUser?._id));`
            showSucces("Vous avez supprimé ce film de vos favoris");
          })
          .catch((err) => {
            showError(err?.message);
          });
  
        // dispatch(replaceMovie(movies.filter((e) => e?._id !== item?._id)));
      }, 300);
    };

  return (
    <div className="relative w-full h-36 lg:max-w-full flex bg-black text-white shadow-sm shadow-stone-700">
      <motion.img
        className="h-36 lg:h-auto h-full flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        src={item?.movie?.poster}
        title="Woman holding a mug"
        whileHover={{ scale: 1.1 }}
      />
      <div className="bg-black rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className=" font-bold mb-2">{item?.movie?.title}</div>
          <p className="text-xs">
            {item?.movie?.overview?.slice(0, 100) + "..."}
          </p>
        </div>
      </div>
      <div
        className={` absolute bottom-1 right-1 flex items-center justify-center font-bold`}
      >
        <motion.button
          className={`bg-gray-800 p-3 rounded-full text-red-500`}
          whileHover={{ scale: 1.1 }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            unlike();
          }}
        >
          <FaTimes className="text-xl" />
        </motion.button>
      </div>
    </div>
  );
};

export default LikeItem;
