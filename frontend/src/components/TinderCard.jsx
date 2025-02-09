import React, { useEffect, useRef, useState } from "react";

import { FaRedo, FaTimes, FaStar, FaHeart, FaBolt, FaArrowRight } from "react-icons/fa";

const TinderCard = () => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 bg-black rounded-3xl overflow-hidden shadow-lg relative h">
      {/* Image de profil */}
      <div className="relative">
        <img
          src="https://media.istockphoto.com/id/2166288947/fr/photo/passerelle-en-bois-%C3%A0-travers-le-champ-fleuri.jpg?s=2048x2048&w=is&k=20&c=np9MXVjiy8F4gUeAD5bs3gMNH2ITvg6IGiYZJs6Bd9Q=" 
          alt="Profile"
          className="w-full h-[400px] object-cover"
        />
        {/* Icône pour faire défiler */}
        <button className="absolute top-2/4 right-4 bg-black/50 p-2 rounded-full">
          <FaArrowRight className="text-white text-lg" />
        </button>
      </div>

      {/* Informations */}
      <div className="p-4 bg-gradient-to-t from-black to-transparent absolute bottom-0 w-full">
        <h2 className="text-white text-xl font-bold">Vanessa <span className="font-normal">20</span></h2>
        <div className="flex items-center text-gray-400 text-sm mt-2">
          <span className="mr-2">⚡ Passions</span>
        </div>

        {/* Passions */}
        <div className="flex flex-wrap gap-2 mt-2">
          {["Voyage", "Baseball", "Festivals", "Gin tonic", "Sushi"].map((tag, index) => (
            <span key={index} className="text-white bg-gray-700 px-3 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="absolute bottom-4 w-full flex justify-between px-4">
        {[
          { icon: FaRedo, color: "text-yellow-500" },
          { icon: FaTimes, color: "text-red-500" },
          { icon: FaStar, color: "text-blue-500" },
          { icon: FaHeart, color: "text-green-500" },
          { icon: FaBolt, color: "text-purple-500" },
        ].map((btn, index) => (
          <button key={index} className={`bg-gray-800 p-3 rounded-full ${btn.color}`}>
            <btn.icon className="text-xl" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default TinderCard;