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
  types: { type: { name: string } }[];
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
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${
      (page - 1) * limit
    }&limit=${limit}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${res.statusText}`);
  }

  const listResult = await res.json();

  // Fetch additional details for each Pokémon to get the sprites
  const pokemonDetails = await Promise.all(
    listResult.results.map(async (pokemon: { name: string; url: string }) => {
      const pokemonRes = await fetch(pokemon.url);
      if (!pokemonRes.ok) {
        throw new Error(
          `Failed to fetch Pokemon details: ${pokemonRes.statusText}`
        );
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
    <div className="bg-pokedexBG h-[100dvh] flex justify-center items-center py-20r">
      Loading pokemon data...
    </div>;
  }

  if (isError) {
    return <div>Error fetching Pokemon list.</div>;
  }

  const { pokemonList, currentPage, totalPages } = data ?? {
    pokemonList: [],
    currentPage: 0,
    totalPages: 0,
  };

  return (
    <div className="container mx-auto  items-center flex-col justify-center">
      <div className="items-center  flex justify-center flex-col pb-10">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center text-pokeBody font-3xl">
          All Available Pokemons
        </h1>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemonList.map((pokemon: Pokemon) => (
          <li
            key={pokemon.id}
            className="bg-cardBG flex justify-center items-center hover:bg-opacity-95 rounded-xl p-4 border-pokeBorder border-2"
          >
            <Link legacyBehavior href={`/pokemon/${pokemon.id}`}>
              <a className="text-pokeBody font-bold text-xl transition-none text-center items-center justify-center flex flex-col gap-2 hover:text-poketitleBG capitalize">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <p className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody  text-opacity-50 font-bold text-sm">
                  No.{pokemon.id}
                </p>
                <p className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody  uppercase font-bold text-2xl">
                  {pokemon.name}
                </p>
                <p className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody  text-opacity-50 uppercase font-bold text-sm">
                  {pokemon?.types.map((type) => type.type.name).join(", ")}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-8  py-1 px-5 items-center">
        <button
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed border-gray-300 border-2"
              : " hover:text-white hover:border-white text-pokeBody border-pokeBody border-2"
          }`}
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span className="px-4 py-2">
          {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed border-gray-300 border-2"
              : " hover:text-white hover:border-white text-pokeBody border-pokeBody border-2"
          }`}
          onClick={() =>
            setPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
