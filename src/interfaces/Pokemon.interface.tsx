// Shape of the data our app needs from a PokéAPI /pokemon/{name}/ response.
// Only the fields the quiz actually uses are included — PokéAPI returns much more.

export interface Pokemon {
  id: number;
  name: string;
  slug: string; // the exact PokéAPI resource name used to fetch this Pokémon
  spriteUrl: string | null;
  types: string[];
  speed: number;
}
