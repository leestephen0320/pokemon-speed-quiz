import QuizGame from '../components/QuizGame';
import { getRandomPokemonPairInRange } from '../api/API';

const fetchMidTierPair = () => getRandomPokemonPairInRange(60, 110);

function MidTierQuiz() {
  return (
    <QuizGame
      title="Mid Tier"
      subtitle="Both Pokémon have a base Speed between 60 and 110."
      fetchPair={fetchMidTierPair}
    />
  );
}

export default MidTierQuiz;
