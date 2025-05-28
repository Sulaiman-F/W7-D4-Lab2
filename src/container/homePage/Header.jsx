import React from "react";

function Header() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-5 bg-neutral-100">
        <h1 className="text-4xl font-bold text-center md:text-5xl">Welcome</h1>
        <p className="w-3/4 text-center text-md md:text-xl md:w-1/2">
          Welcome P
        </p>
      </div>
    </>
  );
}

export default Header;
