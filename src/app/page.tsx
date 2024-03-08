import type { Metadata } from "next";
import React from "react";
import VerticalNavBar from "./components/verticalnavbar";
import GetComponent from "./components/maincomponents/pokemonlistscomponent";

export const metadata: Metadata = {
  title: "Pokedex App",
  description: "NextJS Based Pokedex App",
};

const page = () => {
  return (
    <div className="w-full flex flex-row h-[100dvh]">
      <div className="w-1/5">
        <VerticalNavBar />
      </div>
      <div className="bg-pokedexBG h-full p-10 w-4/5 overflow-y-scroll">
        <GetComponent />
      </div>
    </div>
  );
};

export default page;
