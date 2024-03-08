"use client";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import Image from "next/image";

// Define a type for the Pokemon data
type Pokemon = {
  id: number;
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
};

type PokemonListResponse = {
  pokemonList: any[]; // Replace 'any' with a more specific type if possible
  currentPage: number;
  totalPages: number;
};

async function getPokemonList(page: number, limit: number) {
    // Fetch the list of Pokémon with pagination
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * limit}&limit=${limit}`);
  
    if (!res.ok) {
      throw new Error(`Failed to fetch Pokemon list: ${res.statusText}`);
    }
  
    const listResult = await res.json();
  
    // Fetch additional details for each Pokémon to get the sprites
    const pokemonDetails = await Promise.all(
      listResult.results.map(async (pokemon: { name: string; url: string }) => {
        const pokemonRes = await fetch(pokemon.url);
        if (!pokemonRes.ok) {
          throw new Error(`Failed to fetch Pokemon details: ${pokemonRes.statusText}`);
        }
        return pokemonRes.json();
      })
    );
  
    // Return the list with additional details including sprites
    return {
      pokemonList: pokemonDetails,
      currentPage: page,
      totalPages: Math.ceil(listResult.count / limit),
    };
  }

export default function GetComponent() {
  const [page, setPage] = React.useState(1);
  const limit = 18;

  const { data, isLoading, isError } = useQuery<PokemonListResponse>(
    ["pokemonList", page, limit],
    () => getPokemonList(page, limit),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    <div className="bg-poketitleBG h-[100dvh] flex justify-center items-center py-20r">
    Loading pokemon data...
  </div>
  }

  if (isError) {
    return <div>Error fetching Pokemon list.</div>;
  }

  
  const { pokemonList, currentPage, totalPages } = data ?? { pokemonList: [], currentPage: 0, totalPages: 0 };

  return (
    <div className="container mx-auto items-center flex-col justify-center py-20 md:px-0 px-20">
      <h1 className="text-3xl font-bold mb-4 flex items-center justify-center text-pokeBody font-3xl">Pokedex App</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pokemonList.map((pokemon: Pokemon) => (
  <li key={pokemon.id} className="bg-white flex justify-center items-center hover:bg-opacity-95 shadow rounded p-4 border-pokeBorder border-2">
    <Link
      legacyBehavior
      href={`/pokemon/${pokemon.id}`}
    >
      <a className="text-pokeBody transition-none text-center hover:text-poketitleBG capitalize">
        <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100}/>
        {pokemon.name}
      </a>
    </Link>
  </li>
))}
      </ul>

      <div className="flex justify-center mt-8  py-1 px-5 items-center">
        <button
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-pokeBG hover:text-poketitleBG text-pokeBody border-poketitleBG border-2"
            }`}
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
        {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-pokeBG hover:text-poketitleBG text-pokeBody border-poketitleBG border-2"
        }`}
          onClick={() =>
            setPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        
      </div>
    </div>
  );
}
