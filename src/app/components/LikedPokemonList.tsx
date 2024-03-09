"use client";
import { useAtom } from "jotai";
import { likedPokemonAtom } from "../atoms/likedPokemonAtom";
import Link from "next/link";
import Image from "next/image";
import { useQueries } from "react-query";
import { Pokemon } from "../interfaces/Pokemon";

async function getPokemonDetails(id: number) {
  const res = await fetch(`/api/pokemon/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch Pokemon details: ${res.statusText}`);
  }

  return res.json();
}

export default function LikedPokemonList() {
  const [likedPokemon] = useAtom(likedPokemonAtom);

  const pokemonDataResults = useQueries(
    likedPokemon.map((pokemonId) => ({
      queryKey: ["pokemonDetails", pokemonId],
      queryFn: () => getPokemonDetails(pokemonId),
    }))
  );

  const isLoading = pokemonDataResults.some((result) => result.isLoading);
  const isError = pokemonDataResults.some((result) => result.isError);

  if (isLoading) {
    return (
      <div className="max-w-full py-10 h-[100dvh] flex justify-center items-center">
        <div className="text-pokeBody text-2xl">Loading liked Pokemon...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-full py-10 h-[100dvh] flex justify-center items-center">
        <div className="text-pokeBody text-2xl">Error fetching liked Pokemon.</div>
      </div>
    );
  }

  return (
    <div className="max-w-full py-10 h-[100dvh] overflow-y-scroll container mx-auto items-center flex-col justify-center px-10 md:px-20">
      <div className="items-center flex justify-center flex-col pb-10">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center text-pokeBody font-3xl">
          Pokemons you've liked
        </h1>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemonDataResults.map((result) => {
          const pokemon = result.data as Pokemon;

          return (
            <li
              key={pokemon.id}
              className="flex justify-center items-center hover:bg-opacity-95 rounded-xl p-4"
            >
              <Link legacyBehavior href={`/pokemon/${pokemon.id}`}>
                <a className="text-pokeBody font-bold text-xl transition-none text-center items-center justify-center flex flex-col gap-2 hover:text-poketitleBG capitalize">
                  <Image
                    src={pokemon.sprites.front_default || 'unable to load pokemon'}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <p className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody text-opacity-50 font-bold text-sm">
                    No.{pokemon.id}
                  </p>
                  <p className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody uppercase font-bold text-2xl">
                    {pokemon.name}
                  </p>
                  <p className="drop-shadow-[0_1.2px_0px_rgba(0,255,0,0.5)] text-pokeBody text-opacity-50 uppercase font-bold text-sm">
                    {pokemon?.types.map((type) => type.type.name).join(", ")}
                  </p>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}