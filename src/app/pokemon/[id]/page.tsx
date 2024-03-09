// /pokemon/[id]/page.tsx
"use client";
import React from "react";
import { useQuery } from "react-query";
import VerticalNavBar from "@/app/components/VerticalNavBar";
import HorizontalNavBar from "@/app/components/HorizontalNavBar";
import PokemonDetails from "@/app/components/PokemonDetails";
import { Pokemon } from "../../interfaces/Pokemon";

// Fetch the details of a specific Pokemon by ID
async function getPokemonDetails(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch Pokemon details: ${res.statusText}`);
  }

  return res.json();
}

export default function PokemonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery<Pokemon | undefined>(
    ["pokemonDetails", params.id],
    () => getPokemonDetails(params.id),
    {
      enabled: !!params.id,
    }
  );

  if (isLoading) {
    return (
      <div className="flex flex-row">
        <div className="w-1/5">
          <VerticalNavBar />
        </div>
        <div className="w-4/5 pokemonListBg h-[100dvh] flex justify-center items-center py-20">
          Loading pokemon data...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-row">
        <div className="w-1/5">
          <VerticalNavBar />
        </div>
        <div className="w-4/5 pokemonListBg h-[100dvh] flex justify-center items-center py-20">
          Error fetching data, please try again...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row h-[100dvh] items-center">
      <div className="bg-cardBG md:bg-pokedexBG max-w-full w-full container mx-auto flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/5 md:block hidden">
          <VerticalNavBar />
        </div>
        <div className="h-fit md:hidden block w-full">
          <HorizontalNavBar />
        </div>
        <div className="md:w-4/5 w-full h-[100dvh] pokemonListBg">
          <PokemonDetails pokemon={pokemon!} />
        </div>
      </div>
    </div>
  );
}
