import QuizGame from '../components/QuizGame';
import { getRandomPokemonPairInRange } from '../api/API';

const fetchMidTierPair = () => getRandomPokemonPairInRange(60, 110);

function MidTierQuiz() {
  return (
    <QuizGame
      title="Middling Midterm"
      subtitle="Are they trickroom or tailwind?"
      fetchPair={fetchMidTierPair}
    />
  );
}

export default MidTierQuiz;
