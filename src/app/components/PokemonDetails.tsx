import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";
import { likedPokemonAtom } from "../atoms/likedPokemonAtom";
import { Pokemon } from "../interfaces/Pokemon";

type PokemonDetailsProps = {
  pokemon: Pokemon;
};

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const [likedPokemon, setLikedPokemon] = useAtom(likedPokemonAtom);
  const isLiked = likedPokemon.includes(pokemon.id);

  const toggleLike = () => {
    if (isLiked) {
      setLikedPokemon(likedPokemon.filter((id) => id !== pokemon.id));
    } else {
      setLikedPokemon([...likedPokemon, pokemon.id]);
    }
  };

  return (
    <div className="flex flex-row m-5 md:m-20 rounded p-4 items-center justify-center">
      <span className="md:p-10 rounded-lg">
        <div className="flex flex-col">
          {pokemon.sprites.front_default && (
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={200}
              height={200}
            />
          )}
          <div className="text-center flex flex-col md:items-center items-center">
            <br />
            <h1 className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody uppercase font-bold mb-4 text-2xl">
              {pokemon.name}
            </h1>
            <p className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody text-opacity-50">
              No. {pokemon.id}
            </p>
            <p className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody text-opacity-50 uppercase">
              Types: {pokemon.types.map((type) => type.type.name).join(", ")}
            </p>
          </div>
        </div>
        <h2 className="text-center md:text-start drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-xl font-bold mt-4 uppercase">
          Stats
        </h2>
        <ul className="text-center md:text-start drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody uppercase gap-4 text-opacity-50">
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-4 items-center">
          <button
            className={`mt-4 px-4 py-2 rounded w-full ${
              isLiked
                ? "drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)]  text-lg border-pokeBody border-2 py-1 px-2 font-bold text-pokeBody rounded-md"
                : "drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] bg-cardBG text-lg border-pokeBody border-2 py-1 px-2 font-bold text-pokeBody rounded-md"
            } text-pokeBody`}
            onClick={toggleLike}
          >
            {isLiked ? "Unlike this pokemon" : "Like this pokemon ♥"}
          </button>
          <Link href="/">
            <button className="px-4 py-2 underline underline-offset-4 rounded">
              Back
            </button>
          </Link>
        </div>
      </span>
    </div>
  );
}
