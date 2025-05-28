import React, { useState } from "react";
import { Link } from "react-router";
import { IoClose } from "react-icons/io5";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="flex justify-between lg:justify-start items-center h-13 lg:h-16 text-white bg-gradient-to-r from-neutral-700 to-neutral-900 w-full fixed px-5 md:px-5 lg:px-25 py-1.5 shadow-md z-50">
        <img
          className="h-full invert"
          src="https://w7-d4-lab2-crhf.onrender.com"
          alt=""
        />
        <ul className="hidden gap-5 ml-10 text-lg font-medium text-neutral-200 lg:flex">
          <li className="transition duration-500 ease-in-out hover:text-white hover:scale-105">
            <Link to="/home">Home</Link>
          </li>
          <li className="transition duration-500 ease-in-out hover:text-white hover:scale-105">
            <Link to="/post">List</Link>
          </li>
        </ul>
        <div
          className={`lg:flex fixed lg:static top-12 right-0 w-full lg:w-auto bg-gradient-to-r from-lime-500 to-lime-600 text-white transition-transform duration-300 ease-in-out lg:bg-transparent lg:translate-x-0 ${
            isOpen ? "translate-x-0" : "translate-x-[-100%]"
          }`}
        >
          <ul className="flex flex-col gap-5 p-5 text-lg lg:hidden lg:flex-row lg:p-0">
            <li>
              <Link to="/home" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/post" onClick={toggleMenu}>
                Post
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:hidden">
          {isOpen ? (
            <IoClose className="text-3xl" onClick={toggleMenu} />
          ) : (
            <HiMiniBars3BottomRight className="text-2xl" onClick={toggleMenu} />
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
