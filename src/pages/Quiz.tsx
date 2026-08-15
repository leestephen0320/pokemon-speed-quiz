import { useCallback, useEffect, useState } from 'react';
import { getRandomPokemonPair } from '../api/API';
import PokemonCard from '../components/PokemonCard';
import type { Pokemon } from '../interfaces/Pokemon.interface';

type Selection = 0 | 1 | 'tie' | null;

function Quiz() {
  const [pair, setPair] = useState<[Pokemon, Pokemon] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selection, setSelection] = useState<Selection>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const loadNewRound = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSelection(null);

    try {
      const newPair = await getRandomPokemonPair();
      setPair(newPair);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong loading Pokémon.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNewRound();
  }, [loadNewRound]);

  const isTie = pair ? pair[0].speed === pair[1].speed : false;
  const correctAnswer: Selection = pair
    ? isTie
      ? 'tie'
      : pair[0].speed > pair[1].speed
      ? 0
      : 1
    : null;

  const revealed = selection !== null;
  const pickedCorrectly = revealed && selection === correctAnswer;

  const handleSelect = (choice: Selection) => {
    if (selection !== null || !pair || choice === null) return;

    setSelection(choice);
    setTotalCount((prev) => prev + 1);

    if (choice === correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const cardResult = (index: 0 | 1): 'faster' | 'slower' | 'tie' => {
    if (!pair) return 'slower';
    if (isTie) return 'tie';
    return correctAnswer === index ? 'faster' : 'slower';
  };

  let tieButtonClass = 'tie-button';
  if (revealed) {
    tieButtonClass += isTie ? ' tie-button-tied' : ' tie-button-not-tied';
  } else if (selection === 'tie') {
    tieButtonClass += ' tie-button-selected';
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1 className="quiz-title">Who's Faster?</h1>
        <p className="quiz-subtitle">
          Pick the Pokémon with the higher base Speed stat, unless it is a tie.
        </p>
      </div>

      <div className="quiz-score">
        Score:{' '}
        <span className="quiz-score-value">
          {correctCount} / {totalCount}
        </span>
      </div>

      {loading && (
        <div className="quiz-loading">
          <div className="quiz-spinner" />
          <p>Loading Pokémon...</p>
        </div>
      )}

      {!loading && error && (
        <div className="quiz-error">
          <p className="quiz-error-message">{error}</p>
          <button type="button" onClick={loadNewRound} className="btn btn-primary">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && pair && (
        <>
          <div className="quiz-battle">
            <PokemonCard
              pokemon={pair[0]}
              onSelect={() => handleSelect(0)}
              isSelected={selection === 0}
              revealed={revealed}
              result={cardResult(0)}
              disabled={revealed}
            />

            <button
              type="button"
              onClick={() => handleSelect('tie')}
              disabled={revealed}
              className={tieButtonClass}
            >
              Tie?
            </button>

            <PokemonCard
              pokemon={pair[1]}
              onSelect={() => handleSelect(1)}
              isSelected={selection === 1}
              revealed={revealed}
              result={cardResult(1)}
              disabled={revealed}
            />
          </div>

          <div className={`quiz-result ${revealed ? 'quiz-result-visible' : ''}`}>
            {revealed && (
              <>
                <p
                  className={`quiz-result-message ${
                    pickedCorrectly ? 'result-correct' : 'result-incorrect'
                  }`}
                >
                  {isTie
                    ? pickedCorrectly
                      ? "Correct! It's a tie!"
                      : "Wrong! It's actually a tie!"
                    : pickedCorrectly
                    ? 'Correct!'
                    : 'WRONG!'}
                </p>

                <button type="button" onClick={loadNewRound} className="btn btn-primary btn-lg">
                  Next Pokémon
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
