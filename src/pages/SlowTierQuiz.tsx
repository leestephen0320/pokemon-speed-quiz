import QuizGame from '../components/QuizGame';
import { getRandomPokemonPairInRange } from '../api/API';

const fetchSlowTierPair = () => getRandomPokemonPairInRange(0, 70);

function SlowTierQuiz() {
  return (
    <QuizGame
      title="Trickroom Test"
      subtitle="May the slowest win the trickroom."
      fetchPair={fetchSlowTierPair}
    />
  );
}

export default SlowTierQuiz;
