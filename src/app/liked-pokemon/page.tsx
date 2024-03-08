"use client";
import { useAtom } from "jotai";
import { likedPokemonAtom } from "../atoms/likedPokemonAtom";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "react-query";
import { useQueries } from "react-query";
import VerticalNavBar from "../components/verticalnavbar";
import HorizontalNavBar from "../components/HorizontalNavBar";

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
};

async function getPokemonDetails(id: number) {
  const res = await fetch(`/api/pokemon/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch Pokemon details: ${res.statusText}`);
  }

  return res.json();
}
export default function LikedPokemonPage() {
  const [likedPokemon] = useAtom(likedPokemonAtom);

  const pokemonDataResults = useQueries(
    likedPokemon.map((pokemonId) => ({
      queryKey: ["pokemonDetails", pokemonId],
      queryFn: () => getPokemonDetails(pokemonId),
    }))
  );

  return (
    <div className="w-full flex flex-col md:flex-row h-[100dvh]">
    <div className="bg-pokedexBG max-w-full w-full container mx-auto flex  flex-col md:flex-row items-center justify-center">
      <div className="md:w-1/5 md:block hidden">
        <VerticalNavBar />
      </div>
      <div className="h-fit md:hidden block w-full">
        <HorizontalNavBar />
      </div>
      <div className="md:w-4/5">
        <div className="bg-red-300 max-w-full py-10  h-[100dvh]  overflow-y-scroll container mx-auto items-center flex-col justify-center px-10 md:px-20">
          <div className="items-center flex justify-center flex-col pb-10">
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center text-pokeBody font-3xl">
              Pokemons you've liked
            </h1>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pokemonDataResults.map((result, index) => {
              if (result.isLoading) {
                return <li key={index}>Loading...</li>;
              }

              if (result.isError) {
                return <li key={index}>Error fetching Pokemon details.</li>;
              }

              const pokemon = result.data as Pokemon;

              return (
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
                        {pokemon?.types
                          .map((type) => type.type.name)
                          .join(", ")}
                      </p>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}
