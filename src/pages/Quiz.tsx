import QuizGame from '../components/QuizGame';
import { getRandomPokemonPair } from '../api/API';

function Quiz() {
  return (
    <QuizGame
      title="Who's Faster?"
      subtitle="Pick the Pokémon with the higher base Speed stat — or call a tie. Any Pokémon Champions Pokémon is fair game."
      fetchPair={getRandomPokemonPair}
    />
  );
}

export default Quiz;
