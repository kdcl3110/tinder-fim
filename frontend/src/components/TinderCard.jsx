import React, { useEffect, useRef, useState } from "react";
import { FaTimes, FaHeart } from "react-icons/fa";
import { motion, useMotionValue, useTransform } from "motion/react";
import format_date from "../utils/format_date";
import { useDispatch } from "react-redux";
import { replaceMovie } from "../slices/movie";

const TinderCard = ({ item, movies = [] }) => {
  const dispatch = useDispatch();

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const [exitX, setExitX] = useState(0);

  const handleSwipe = (direction) => {
    setExitX(direction === "left" ? -500 : 500); // Définit la direction du mouvement
    setTimeout(() => {
      dispatch(replaceMovie(movies.filter((e) => e?._id !== item?._id)));
    }, 300); // Supprime l'élément après l'animation
  };

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      // const newTab = movies.filter((e) => e?._id != item?._id);
      dispatch(replaceMovie(movies.filter((e) => e?._id != item?._id)));
    }
  };

  return (
    <motion.div
      className="relative grid h-[90vh] md:h-[45rem] max-w-lg flex-col items-end justify-center overflow-hidden rounded-lg bg-black hover:cursor-grab active:cursor-grabbing shadow-md shadow-slate-900"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        // opacity,
        rotate,
      }}

      initial={{ x: 0 }}
      animate={{ x: exitX }}
      exit={{ x: exitX, opacity: 0 }} // Disparition en fondu
      transition={{ duration: 0.3, ease: "easeInOut" }} // Durée et fluidité de l'animation

      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <div
        className={`absolute inset-0 m-0 h-full w-full overflow-hidden rounded-lg bg-transparent bg-cover bg-center`}
        style={{ backgroundImage: `url("${item?.poster}")` }}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </div>

      <div className="border-4 h-14 w-14 border-yellow-500 absolute top-5 right-5 rounded-full flex items-center justify-center text-white font-bold">
        {Math.round(item?.vote_average * 10) / 10}
      </div>
      <div className="relative w-screen sm:w-[500px]">
        <div className="px-6 py-4">
          <div className="font-bold text-white text-2xl mb-2">
            {item?.title}
          </div>
          <p className="text-white text-sm">{item?.overview}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {item?.categories?.map((e) => (
            <span className="inline-block border-2 border-white text-white rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2">
              {e?.name}
            </span>
          ))}
        </div>
        <div className="absolute top-5 right-5 rounded-full flex items-center justify-center text-white text-sm space-x-2">
          <span className="border rounded p-1 border-gray-400 text-gray-400">
            15
          </span>
          <span>{format_date(item?.release_date, "DD/MM/YY")}</span>
        </div>

        <div className="w-full flex justify-around px-4 mb-3">
          <motion.button
            className={`bg-gray-800 p-3 rounded-full text-red-500`}
            whileHover={{ scale: 1.3 }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleSwipe("left");
            }}
          >
            <FaTimes className="text-3xl" />
          </motion.button>

          <motion.button
            className={`bg-gray-800 p-3 rounded-full text-green-500`}
            whileHover={{ scale: 1.3 }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleSwipe("right");
            }}
          >
            <FaHeart className="text-3xl" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TinderCard;
