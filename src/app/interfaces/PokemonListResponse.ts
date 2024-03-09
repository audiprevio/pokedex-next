export type PokemonListResponse = {
    pokemonList: any[]; // Replace 'any' with a more specific type if possible
    currentPage: number;
    totalPages: number;
  };