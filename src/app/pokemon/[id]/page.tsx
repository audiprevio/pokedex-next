"use client";
import React from "react";
import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { likedPokemonAtom } from "../../atoms/likedPokemonAtom";
import Image from "next/image"; // If you're using Next.js Image component
import Link from "next/link";
import VerticalNavBar from "@/app/components/VerticalNavBar";
import HorizontalNavBar from "@/app/components/HorizontalNavBar";

// Update the Pokemon type to include the sprites field
type Pokemon = {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    front_default: string | null; // Assuming the sprite can be null
  };
};

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
  const [likedPokemon, setLikedPokemon] = useAtom(likedPokemonAtom);
  const isLiked = likedPokemon.includes(Number(params.id));

  const toggleLike = () => {
    if (isLiked) {
      setLikedPokemon(likedPokemon.filter((id) => id !== Number(params.id)));
    } else {
      setLikedPokemon([...likedPokemon, Number(params.id)]);
    }
  };

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery<Pokemon>(
    ["pokemonDetails", params.id],
    () => getPokemonDetails(params.id),
    {
      enabled: !!params.id,
    }
  );

  if (isLoading) {
    return (
      <div>
        <div className="w-1/5">
          <VerticalNavBar />
        </div>
        <div className="w-4/5 bg-pokedexBG h-[100dvh] flex justify-center items-center py-20">
          Loading pokemon data...
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching Pokemon details.</div>;
  }

  return (
    <div className="w-full flex flex-col md:flex-row h-[100dvh] items-center">
      <div className="bg-cardBG md:bg-pokedexBG max-w-full w-full container mx-auto flex  flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/5 md:block hidden">
          <VerticalNavBar />
        </div>
        <div className="h-fit md:hidden block w-full">
          <HorizontalNavBar />
        </div>
        <div className="w-4/5  flex flex-row m-5 md:m-20 rounded p-4 items-center justify-center">
          <span className="bg-cardBG md:border-2 md:border-pokeBorder md:p-10 rounded-lg">
            <div className="flex flex-col md:flex-row-reverse md:items-start justify-start">
              {pokemon?.sprites.front_default && (
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={200}
                  height={200}
                />
              )}
              <div className="text-center md:text-start flex flex-col md:items-start items-center">
                <Link href="/">
                  <button className="hidden md:block px-4 py-2 border-pokeBody border-2 rounded">
                    &lt;
                  </button>
                </Link>
                <br />
                <h1 className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody  uppercase font-bold mb-4 text-2xl">
                  {pokemon?.name}
                  {isLiked ? "♥" : ""}
                </h1>
                <p className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody text-opacity-50">
                  No. {pokemon?.id}
                </p>
                <p className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody text-opacity-50 uppercase">
                  Types:{" "}
                  {pokemon?.types.map((type) => type.type.name).join(", ")}
                </p>
              </div>
            </div>
            <h2 className="text-center md:text-start drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-xl font-bold mt-4 uppercase">
              Stats
            </h2>
            <ul className="text-center md:text-start drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody uppercase  gap-4 text-opacity-50">
              {pokemon?.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 items-center">
              <button
                className={`mt-4 px-4 py-2 rounded w-full ${
                  isLiked
                    ? "border-2 border-red-300 text-red-300"
                    : "border-2 border-pokeBody"
                } text-pokeBody`}
                onClick={toggleLike}
              >
                {isLiked ? "Unlike this pokemon" : "Like this pokemon ♥"}
              </button>
              <Link href="/">
                  <button className="block md:hidden px-4 py-2 border-pokeBody border-2 rounded">
                    &lt;
                  </button>
                </Link>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
