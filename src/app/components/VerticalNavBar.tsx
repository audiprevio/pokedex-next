import React from "react";
import Image from "next/image";
import Link from "next/link";

const VerticalNavBar = () => {
  return (
    <div className="w-full h-[100dvh] border-r-2 bg-pokeboxBG border-pokeBorder border-opacity-90 text-center">
      <div className="flex flex-col gap-4 px-10 py-10 border-pokeBorder border-opacity-90">
        <Link href="/">
          <button>
            <h1 className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-4xl font-bold text-pokeBody">
              POKEDEXT
            </h1>
          </button>
        </Link>
        <h4 className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody text-opacity-75">
          A NextJS Based Pokedex App
        </h4>
        <h4 className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody text-opacity-75">
          by Audi Previo
        </h4>
      </div>
      <div className="px-10 flex flex-col gap-4">
        <h3 className="font-bold text-pokeBody drop-shadow-[0.5px_2px_0px_rgba(0,0,0,0,0.9)]">
          Navigation
        </h3>
        <Link href="/liked-pokemon">
          <button className="hover:text-pokeBorder bg-cardBG hover:border-pokeBorder drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody border-pokeBody border-2 px-2 text-sm py-2 rounded-lg w-full">
            Liked Pokemons
          </button>
        </Link>
        <Link href="/">
          <button className="hover:text-pokeBorder bg-cardBG hover:border-pokeBorder drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody border-pokeBody border-2 px-2 text-sm py-2 rounded-lg w-full">
            All Pokemons
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VerticalNavBar;
