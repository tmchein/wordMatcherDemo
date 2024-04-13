import { useEffect, useState } from 'react';
import './App.css';
import WordColumn from './components/Column';
import {
  areWordsTheSame,
  getRandomWord,
  getWords,
  shuffleArray,
} from './utils/getLangWords';
import { data } from './utils/data';

function App() {
  const [match, setMatch] = useState<{
    spanishWordID: string;
    englishWordID: string;
  }>({
    spanishWordID: '',
    englishWordID: '',
  });

  const spanishWords = getWords('spanish', data).slice(0, 5);
  const englishWords = getWords('english', data).slice(0, 5);

  const [words, setWords] = useState({
    spanishWords: shuffleArray(spanishWords),
    englishWords: shuffleArray(englishWords),
  });

  useEffect(() => {
    if (
      Boolean(match.englishWordID) &&
      Boolean(match.spanishWordID) &&
      areWordsTheSame(match.englishWordID, match.spanishWordID)
    ) {
      setTimeout(() => {
        setMatch({
          spanishWordID: '',
          englishWordID: '',
        });

        const randomPairOfNewWords = getRandomWord(data);
        const newRandomSpanishWord = getWords('spanish', [
          randomPairOfNewWords,
        ]);
        const newRandomEnglishWord = getWords('english', [
          randomPairOfNewWords,
        ]);

        setWords((prev) => ({
          spanishWords: shuffleArray([
            ...prev.spanishWords.filter(
              (word) => word.id !== match.spanishWordID
            ),
            ...newRandomSpanishWord,
          ]),
          englishWords: shuffleArray([
            ...prev.englishWords.filter(
              (word) => word.id !== match.englishWordID
            ),
            ...newRandomEnglishWord,
          ]),
        }));
      }, 200);
    }
  }, [match, words.englishWords, words.spanishWords]);

  return (
    <main className="min-h-screen bg-gray-900">
      <section className="flex flex-row h-screen items-center justify-center gap-8">
        <WordColumn
          language="spanish"
          words={words.spanishWords}
          setMatch={setMatch}
          match={match}
        />
        <WordColumn
          language="english"
          words={words.englishWords}
          setMatch={setMatch}
          match={match}
        />
      </section>
    </main>
  );
}

export default App;
