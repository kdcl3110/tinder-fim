import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaComments } from "react-icons/fa";
import { motion } from "motion/react";

const MatcheItem = ({ item, index }) => {
  return (
    <div
      className={`relative w-full h-36 lg:max-w-full flex text-white shadow-sm shadow-stone-700 bg-black`}
    >
      <motion.img
        className="h-36 lg:h-auto h-full flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        src={item?.movie?.poster}
        title="Woman holding a mug"
        whileHover={{ scale: 1.1 }}
      />
      <div className="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className=" font-bold mb-2">{item?.movie?.title}</div>
          <p className="text-xs">
            Score : <span className="text-xl font-bold">{item?.score}</span> 
          </p>
        </div>
      </div>
      <div
        className={`w-10 h-10 border-4 rounded-full absolute bottom-1 right-1 flex items-center justify-center font-bold ${
          index == 0
            ? " border-primary-500"
            : index == 1
            ? "border-red-500"
            : index == 2
            ? "border-blue-500"
            : "border-black"
        }`}
      >
        {index + 1}
      </div>
    </div>
  );
};

export default MatcheItem;
