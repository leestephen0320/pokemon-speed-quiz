import QuizGame from '../components/QuizGame';
import { getRandomPokemonPairInRange } from '../api/API';

const fetchFastTierPair = () => getRandomPokemonPairInRange(100, Infinity);

function FastTierQuiz() {
  return (
    <QuizGame
      title="Fast Finals"
      subtitle="Who is really the fastest?"
      fetchPair={fetchFastTierPair}
    />
  );
}

export default FastTierQuiz;
