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
  const [slugA, slugB] = pickTwoDistinctSlugs(championsList);
  const [pokemonA, pokemonB] = await Promise.all([
    fetchPokemon(slugA),
    fetchPokemon(slugB),
  ]);
  return [pokemonA, pokemonB];
}

/**
 * Picks two distinct random Pokémon whose base Speed falls within
 * [minSpeed, maxSpeed] (inclusive). Since speed isn't known ahead of
 * fetching, this samples random slugs from the Champions list in small
 * parallel batches, checking each one's actual speed, until two matches
 * are found (or the attempt budget runs out).
 */
export async function getRandomPokemonPairInRange(
  minSpeed: number,
  maxSpeed: number,
  maxAttempts = 80,
  batchSize = 8
): Promise<[Pokemon, Pokemon]> {
  const candidates = shuffle(championsList);
  const matches: Pokemon[] = [];
  let attempts = 0;
  let index = 0;

  while (
    matches.length < 2 &&
    index < candidates.length &&
    attempts < maxAttempts
  ) {
    const batch = candidates.slice(index, index + batchSize);
    index += batch.length;
    attempts += batch.length;

    const results = await Promise.allSettled(batch.map(fetchPokemon));

    for (const result of results) {
      if (
        result.status === 'fulfilled' &&
        result.value.speed >= minSpeed &&
        result.value.speed <= maxSpeed
      ) {
        matches.push(result.value);
        if (matches.length >= 2) break;
      }
    }
  }

  if (matches.length < 2) {
    throw new Error(
      `Couldn't find two Pokémon with Speed between ${minSpeed} and ${
        maxSpeed === Infinity ? '∞' : maxSpeed
      }. Try again.`
    );
  }

  return [matches[0], matches[1]];
}

function pickTwoDistinctSlugs(list: string[]): [string, string] {
  const firstIndex = Math.floor(Math.random() * list.length);
  let secondIndex = Math.floor(Math.random() * list.length);

  while (secondIndex === firstIndex) {
    secondIndex = Math.floor(Math.random() * list.length);
  }

  return [list[firstIndex], list[secondIndex]];
}

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
