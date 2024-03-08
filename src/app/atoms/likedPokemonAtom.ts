// likedPokemonAtom.ts
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const likedPokemonAtom = atomWithStorage<number[]>('likedPokemon', []);