"use client";
import React from "react";
import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { likedPokemonAtom } from "../../atoms/likedPokemonAtom";
import Image from "next/image"; // If you're using Next.js Image component
import Link from "next/link";

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
      <div className="bg-poketitleBG h-[100dvh] flex justify-center items-center py-20r">
        Loading pokemon data...
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching Pokemon details.</div>;
  }

  return (
    <div className="bg-poketitleBG max-w-full h-[100dvh] container mx-auto flex items-center justify-center">
      <div className="bg-white flex flex-row border-2 w-fit pr-20 border-pokeBorder my-20 shadow rounded p-4  items-center">
        {/* Display the sprite image */}
        <span>
          {pokemon?.sprites.front_default && (
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={120}
              height={120}
            />
          )}
          <h1 className="text-3xl font-bold mb-4 capitalize">
            {pokemon?.name}
          </h1>

          <p className="text-pokeBody text-opacity-75">ID: {pokemon?.id}</p>
          <p className="text-pokeBody text-opacity-75">
            Types: {pokemon?.types.map((type) => type.type.name).join(", ")}
          </p>
          <h2 className="text-xl font-bold mt-4">Stats</h2>
          <ul className="text-pokeBody text-opacity-75">
            {pokemon?.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4">
          <button
            className={`mt-4 px-4 py-2 rounded ${
              isLiked
                ? "bg-red-500 hover:bg-red-600"
                : "bg-poketitleBG hover:bg-poketitleBG"
            } text-pokeBody`}
            onClick={toggleLike}
          >
            {isLiked ? "Unlike this pokemon" : "Like this pokemon"}
          </button>
          <Link href="/">
            <button className="border-pokeBody border-2 px-2 text-sm py-2 rounded-lg">
                See other pokemons
            </button>
          </Link>
          <Link href="/liked-pokemon">
            <button className="underline  px-2 text-sm py-2 rounded-lg">
                See all liked pokemons
            </button>
          </Link>
          </div>
        </span>
      </div>
    </div>
  );
}
