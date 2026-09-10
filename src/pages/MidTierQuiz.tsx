import QuizGame from '../components/QuizGame';
import { getRandomPokemonPairInRange } from '../api/API';

const fetchMidTierPair = () => getRandomPokemonPairInRange(60, 110);

function MidTierQuiz() {
  return (
    <QuizGame
      title="Middling Midterm"
      subtitle="Who is faster among these seemingly average speedsters?"
      fetchPair={fetchMidTierPair}
    />
  );
}

export default MidTierQuiz;
