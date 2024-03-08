"use client";
import { useAtom } from 'jotai';
import { likedPokemonAtom } from '../atoms/likedPokemonAtom';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { useQueries } from 'react-query';

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
  
    // useQueries returns an array of query results
    const pokemonDataResults = useQueries(
      likedPokemon.map((pokemonId) => ({
        queryKey: ['pokemonDetails', pokemonId],
        queryFn: () => getPokemonDetails(pokemonId),
      }))
    );
  
    return (
      <div className="bg-pokeBorder max-w-full  h-full container mx-auto items-center flex-col justify-center py-20 md:px-10 px-20">
        <div className='items-center flex justify-center flex-col pb-10'>
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center text-pokeBody font-3xl">Liked Pokemon</h1>
        <Link href="/">
            <button className="border-pokeBody border-2 px-2 text-sm py-2 rounded-lg">
                See other pokemons
            </button>
          </Link>
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
              <li key={pokemon.id} className="bg-white flex justify-center items-center hover:bg-opacity-95 shadow rounded p-4 border-pokeBorder border-2">
                <Link legacyBehavior href={`/pokemon/${pokemon.id}`}>
                  <a className="text-pokeBody transition-none text-center hover:text-poketitleBG capitalize">
                    {pokemon.sprites && (
                      <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
                    )}
                    {pokemon.name} (#{pokemon.id})
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }