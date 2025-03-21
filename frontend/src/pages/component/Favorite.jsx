import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaComments } from "react-icons/fa";
import LikeItem from "../../components/Liked";
import { MdFavorite } from "react-icons/md";

const Favorite = () => {
  const { likes } = useSelector((state) => state.movie);
  return (
    <div className="w-full flex flex-col">
      {likes?.length == 0 ? (
        <div className="flex flex-col items-center px-6 text-white text-center justify-center">
          <div className="relative">
            <MdFavorite className="text-primary-500 opacity-40 text-8xl" />
          </div>
          <h1 className="text-2xl font-bold mt-6">Dites bonjour</h1>
          <p className="text-gray-400 text-sm mt-4 max-w-md">
            Vous souhaitez voir vos likes ? Lorsque vous likés les films, vos
            likes personnel apparaîtrons à cet endroit.
          </p>
        </div>
      ) : (
        <div className="flex-1 space-y-5 w-full">
          {likes?.map((e) => (
            <LikeItem key={e?._id} item={e} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
