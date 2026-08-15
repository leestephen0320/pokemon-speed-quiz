import type { Pokemon } from '../interfaces/Pokemon.interface';

type CardResult = 'faster' | 'slower' | 'tie';

interface PokemonCardProps {
  pokemon: Pokemon;
  onSelect: () => void;
  isSelected: boolean;
  revealed: boolean;
  result: CardResult;
  disabled?: boolean;
}

// Official-ish Pokémon type colors, paired with a readable text color for each.
const TYPE_STYLES: Record<string, { bg: string; text: string }> = {
  normal: { bg: '#A8A878', text: '#33332A' },
  fire: { bg: '#F08030', text: '#FFFFFF' },
  water: { bg: '#6890F0', text: '#FFFFFF' },
  electric: { bg: '#F8D030', text: '#3D3300' },
  grass: { bg: '#78C850', text: '#173D07' },
  ice: { bg: '#98D8D8', text: '#0A3D3D' },
  fighting: { bg: '#C03028', text: '#FFFFFF' },
  poison: { bg: '#A040A0', text: '#FFFFFF' },
  ground: { bg: '#E0C068', text: '#4A3C0A' },
  flying: { bg: '#A890F0', text: '#261F4D' },
  psychic: { bg: '#F85888', text: '#4D0821' },
  bug: { bg: '#A8B820', text: '#2E3505' },
  rock: { bg: '#B8A038', text: '#3A2F08' },
  ghost: { bg: '#705898', text: '#FFFFFF' },
  dragon: { bg: '#7038F8', text: '#FFFFFF' },
  dark: { bg: '#705848', text: '#FFFFFF' },
  steel: { bg: '#B8B8D0', text: '#2A2A3A' },
  fairy: { bg: '#EE99AC', text: '#4D1420' },
};

function formatName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function PokemonCard({
  pokemon,
  onSelect,
  isSelected,
  revealed,
  result,
  disabled = false,
}: PokemonCardProps) {
  const displayName = formatName(pokemon.name);

  let cardStateClass = '';
  if (revealed) {
    cardStateClass =
      result === 'faster'
        ? 'pokemon-card-faster'
        : result === 'tie'
        ? 'pokemon-card-tie'
        : 'pokemon-card-slower';
  } else if (isSelected) {
    cardStateClass = 'pokemon-card-selected';
  } else if (disabled) {
    cardStateClass = 'pokemon-card-locked';
  }

  const badgeText =
    result === 'faster' ? 'Faster' : result === 'tie' ? 'Tied' : 'Slower';
  const badgeClass =
    result === 'faster'
      ? 'badge-faster'
      : result === 'tie'
      ? 'badge-tie'
      : 'badge-slower';

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled || revealed}
      className={`pokemon-card ${cardStateClass}`}
    >
      {revealed && (
        <span className={`pokemon-card-badge ${badgeClass}`}>
          {badgeText}
        </span>
      )}

      {pokemon.spriteUrl ? (
        <img
          src={pokemon.spriteUrl}
          alt={displayName}
          className="pokemon-card-image"
        />
      ) : (
        <div className="pokemon-card-image-placeholder">No image</div>
      )}

      <h3 className="pokemon-card-name">{displayName}</h3>

      <div className="pokemon-card-types">
        {pokemon.types.map((type) => {
          const style = TYPE_STYLES[type] ?? { bg: '#68A090', text: '#FFFFFF' };
          return (
            <span
              key={type}
              className="pokemon-type-badge"
              style={{ backgroundColor: style.bg, color: style.text }}
            >
              {type}
            </span>
          );
        })}
      </div>

      <div className="pokemon-card-stat">
        {revealed ? (
          <span className="pokemon-card-stat-value">
            {pokemon.speed}
            <span className="pokemon-card-stat-unit">SPD</span>
          </span>
        ) : (
          <span className="pokemon-card-stat-placeholder">??? SPD</span>
        )}
      </div>
    </button>
  );
}

export default PokemonCard;
