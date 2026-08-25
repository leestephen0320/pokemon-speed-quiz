import QuizGame from '../components/QuizGame';
import { getRandomPokemonPairInRange } from '../api/API';

const fetchSlowTierPair = () => getRandomPokemonPairInRange(0, 70);

function SlowTierQuiz() {
  return (
    <QuizGame
      title="Slow Tier"
      subtitle="Both Pokémon have a base Speed of 70 or lower."
      fetchPair={fetchSlowTierPair}
    />
  );
}

export default SlowTierQuiz;
