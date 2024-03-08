import type { Metadata } from "next";
import React from "react";
import VerticalNavBar from "./components/VerticalNavBar";
import GetComponent from "./components/maincomponents/pokemonlistscomponent";
import HorizontalNavBar from "./components/HorizontalNavBar";

export const metadata: Metadata = {
  title: "Pokedex App",
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
      <div className="bg-pokedexBG md:h-full h-[90%] p-10 md:w-4/5 overflow-y-scroll">
        <GetComponent />
      </div>
    </div>
  );
};

export default page;
