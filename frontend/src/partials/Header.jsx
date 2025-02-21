import React, { useState } from "react";
import Logo from "/images/logo.png";
import UserMenu from "../components/DropdownProfile";

function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <header className="lg:hidden sticky top-0 bg-[#14141c] z-40 px-4 px-1 py-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <img
            className="w-8 h-8"
            src={Logo}
            width="32"
            height="32"
            alt="User"
          />
          <div className="text-xl text-primary-900 font-mono font-bold">
            FlixTinder
          </div>
        </div>
        <UserMenu align="right" />
      </div>
    </header>
  );
}

export default Header;
