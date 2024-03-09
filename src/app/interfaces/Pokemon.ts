export type Pokemon = {
    id: number;
    name: string;
    url: string;
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    sprites: {
        front_default: string | null; 
    };
  };