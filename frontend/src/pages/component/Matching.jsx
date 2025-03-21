import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MatcheItem from "../../components/MatcheItem";

const Matching = () => {
    const { matches } = useSelector((state) => state.movie);
    return (
      <div className="w-full flex flex-col">
        {matches?.length == 0 ? (
          <div className="flex flex-col items-center justify-center text-white text-center px-6">
            {/* Carte avec ombre */}
            <div className="relative">
              <div className="w-24 h-36 bg-primary-500 rounded-xl bg-black opacity-40 shadow-xl"></div>
            </div>
  
            {/* Titre */}
            <h1 className="text-2xl font-bold mt-6">Commencez à matcher.</h1>
  
            {/* Description */}
            <p className="text-gray-400 text-sm mt-4 max-w-md">
              Les matchs apparaîtront ici. Pour en obtenir, commencez à liker les
              Films disponible. C'est aussi ici que vous pourrez
              voir les films les plus appréçés de l'application !
            </p>
          </div>
        ) : (
          <div className="flex-1 space-y-5 w-full">
            {matches?.map((e, i) => (
              <MatcheItem key={e?._id} item={e} index = {i}/>
            ))}
          </div>
        )}
      </div>
    );
};

export default Matching;
