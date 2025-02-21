import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaComments } from "react-icons/fa";
import { motion } from "motion/react";

const LikeItem = ({ item }) => {
  return (
    <div className="w-full h-36 flex bg-black text-white shadow-sm shadow-stone-700">
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
    </div>
  );
};

export default LikeItem;
