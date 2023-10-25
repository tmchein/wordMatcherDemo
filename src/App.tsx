import { useEffect, useState } from 'react';
import './App.css';
import WordColumn from './components/Column';
import { areWordsTheSame, getWords } from './utils/getLangWords';
import { data } from './utils/data';

function App() {
  const [match, setMatch] = useState({
    spanishWordID: '',
    englishWordID: '',
  });

  const [words, setWords] = useState({
    spanishWords: getWords('spanish', data),
    englishWords: getWords('english', data),
  });

  useEffect(() => {
    if (
      Boolean(match.englishWordID) &&
      Boolean(match.spanishWordID) &&
      areWordsTheSame(match.englishWordID, match.spanishWordID)
    ) {
      const newSpanishWords = words.spanishWords.filter(
        (word) => word.id !== match.spanishWordID
      );
      const newEnglishWords = words.englishWords.filter(
        (word) => word.id !== match.englishWordID
      );

      setMatch({
        spanishWordID: '',
        englishWordID: '',
      });

      setTimeout(() => {
        setWords({
          spanishWords: newSpanishWords,
          englishWords: newEnglishWords,
        });
      }, 500);
    }
  }, [match]);

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
