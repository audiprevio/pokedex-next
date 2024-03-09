import type { Metadata } from "next";
import React from "react";
import VerticalNavBar from "./components/VerticalNavBar";
import AllPokemonList from "./components/AllPokemonList";
import HorizontalNavBar from "./components/HorizontalNavBar";

export const metadata: Metadata = {
  title: "Pokedext",
  description: "NextJS Based Pokedex App",
};

const page = () => {
  return (
    <div className="w-full flex flex-col md:flex-row h-[100dvh]">
      <div className="md:w-1/5 md:block hidden">
        <VerticalNavBar />
      </div>
      <div className="h-fit md:hidden block">
        <HorizontalNavBar />
      </div>
      <div className="pokemonListBg md:h-full h-[90%] p-10 md:w-4/5 overflow-y-scroll">
        <AllPokemonList />
      </div>
    </div>
  );
};

export default page;
