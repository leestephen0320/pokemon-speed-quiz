import QuizGame from '../components/QuizGame';
import { getRandomPokemonPairInRange } from '../api/API';

const fetchFastTierPair = () => getRandomPokemonPairInRange(100, Infinity);

function FastTierQuiz() {
  return (
    <QuizGame
      title="Fast Tier"
      subtitle="Both Pokémon have a base Speed of 100 or higher."
      fetchPair={fetchFastTierPair}
    />
  );
}

export default FastTierQuiz;
