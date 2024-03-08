"use client";
import React, { useState } from "react";
import Link from "next/link";

const HorizontalNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`w-full h-full border-r-2 z-10 bg-pokeNavBG border-pokeBorder border-opacity-90 text-center ${
        isMenuOpen ? "fixed inset-0" : ""
      }`}
    >
      <div className="flex flex-col gap-4 px-4 py-4 border-b-pokeBorder border-opacity-90">
        <div className="flex flex-col justify-between">
          <span className="flex flex-row justify-between">
            <Link href="/">
              <button>
                <h1 className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-2xl font-bold text-pokeBody">
                  POKEDEXT
                </h1>
              </button>
            </Link>
            <button
              className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-lg border-pokeBody border-2 py-1 px-2 font-bold text-pokeBody rounded-md"
              onClick={toggleMenu}
            >
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </span>
          {isMenuOpen && (
            <span className="flex flex-col gap-4 justify-between items-start">
              <hr />
              <Link href="/" legacyBehavior>
                <a className="text-pokeBody hover:text-pokeBodyHover">
                  All Pokemons
                </a>
              </Link>
              <Link href="/liked-pokemon" legacyBehavior>
                <a className="text-pokeBody hover:text-pokeBodyHover">
                  Liked Pokemons
                </a>
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HorizontalNavBar;
