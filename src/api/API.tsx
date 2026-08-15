import { championsList } from '../data/championsList';
import type { Pokemon } from '../interfaces/Pokemon.interface';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

/**
 * Fetches a single Pokémon (or form/variant) from PokéAPI by its resource name.
 * Slug casing does not matter to PokéAPI, but we lowercase for consistency.
 */
export async function fetchPokemon(slug: string): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/${slug.toLowerCase()}/`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch "${slug}" from PokéAPI (status ${response.status})`
    );
  }

  const data = await response.json();

  const speedStat = data.stats.find(
    (s: { stat: { name: string }; base_stat: number }) =>
      s.stat.name === 'speed'
  );

  return {
    id: data.id,
    name: data.name,
    slug,
    spriteUrl:
      data.sprites?.other?.['official-artwork']?.front_default ??
      data.sprites?.front_default ??
      null,
    types: data.types.map((t: { type: { name: string } }) => t.type.name),
    speed: speedStat ? speedStat.base_stat : 0,
  };
}

/**
 * Picks two distinct random slugs from the curated Champions list
 * and fetches both from PokéAPI in parallel.
 */
export async function getRandomPokemonPair(): Promise<[Pokemon, Pokemon]> {
  const [slugA, slugB] = pickTwoDistinctSlugs();
  const [pokemonA, pokemonB] = await Promise.all([
    fetchPokemon(slugA),
    fetchPokemon(slugB),
  ]);
  return [pokemonA, pokemonB];
}

function pickTwoDistinctSlugs(): [string, string] {
  const firstIndex = Math.floor(Math.random() * championsList.length);
  let secondIndex = Math.floor(Math.random() * championsList.length);

  while (secondIndex === firstIndex) {
    secondIndex = Math.floor(Math.random() * championsList.length);
  }

  return [championsList[firstIndex], championsList[secondIndex]];
}
