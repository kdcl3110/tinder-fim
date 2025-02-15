import React, { useEffect, useRef, useState } from "react";
import {
  FaRedo,
  FaTimes,
  FaStar,
  FaHeart,
  FaBolt,
  FaArrowRight,
} from "react-icons/fa";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";

const TinderCard = ({ item }) => {
  const x = useMotionValue(0);

  // useMotionValueEvent(x, "change", (value) => console.log(value))

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
    }
  };

  return (
    <motion.div
      className="max-w-sm rounded-lg  overflow-hidden shadow-lg shadow-slate-900 bg-black hover:cursor-grab active:cursor-grabbing"
      style={{ gridRow: 1, gridColumn: 1, x, opacity, rotate }}
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <img
        className="w-full"
        src={item?.poster}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-white text-xl mb-2">
          {item?.title}
        </div>
        <p className="text-gray-400 text-sm">
          {item?.overview}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2">
          #winter
        </span>
      </div>

      <div className="w-full flex justify-around px-4 mb-3">
        {[
          { icon: FaTimes, color: "text-red-500" },
          { icon: FaHeart, color: "text-green-500" },
        ].map((btn, index) => (
          <button
            key={index}
            className={`bg-gray-800 p-3 rounded-full ${btn.color}`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <btn.icon className="text-xl" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default TinderCard;
