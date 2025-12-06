import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Fake logged-in user (later AuthContext থেকে আসবে)
  const fakeUser = {
    displayName: "Demo User",
    photoURL: "https://i.ibb.co/4pDNDk1/avatar.png"
  };

  const navLinks = (
    <>
      <NavLink to="/" className="px-4 py-2">Home</NavLink>
      <NavLink to="/all-contests" className="px-4 py-2">All Contests</NavLink>
      <NavLink to="/extra" className="px-4 py-2">Extra Section</NavLink>
      <NavLink to="/leaderboard" className="px-4 py-2">Leaderboard</NavLink>
    </>
  );

  return (
    <div className="shadow-md bg-white dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center py-4 px-3">
        <Link className="text-2xl font-bold">ContestHub</Link>

        <div className="hidden md:flex items-center gap-4">
          {navLinks}

          {/* User Dropdown */}
          <div className="relative group cursor-pointer">
            <img
              src={fakeUser.photoURL}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />

            <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 p-3 rounded shadow-lg right-0">
              <p className="font-bold">{fakeUser.displayName}</p>
              <Link to="/dashboard" className="block py-1">Dashboard</Link>
              <button className="block py-1 text-red-500">Logout</button>
            </div>
          </div>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-xl">
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 p-3">
          {navLinks}
        </div>
      )}
    </div>
  );
}