"use client";
import VerticalNavBar from "../components/VerticalNavBar";
import HorizontalNavBar from "../components/HorizontalNavBar";
import LikedPokemonList from "../components/LikedPokemonList";


export default function LikedPokemonPage() {
  return (
    <div className="w-full flex flex-col md:flex-row h-[100dvh]">
      <div className="bg-pokedexBG max-w-full w-full container mx-auto flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/5 md:block hidden">
          <VerticalNavBar />
        </div>
        <div className="h-fit md:hidden block w-full">
          <HorizontalNavBar />
        </div>
        <div className="md:w-4/5 h-[100dvh] pokemonListBg">
          <LikedPokemonList />
        </div>
      </div>
    </div>
  );
}