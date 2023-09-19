import { useEffect, useState } from "react";
import "./App.css";
import WordColumn from "./components/Column";
import { getWords } from "./utils/getLangWords";

const data = [
  {
    id: crypto.randomUUID(),
    spanish: "niña",
    english: "girl",
  },
  {
    id: crypto.randomUUID(),
    spanish: "niño",
    english: "boy",
  },
  {
    id: crypto.randomUUID(),
    spanish: "manzana",
    english: "apple",
  },
  {
    id: crypto.randomUUID(),
    spanish: "carro",
    english: "car",
  },
];

function App() {
  const [match, setMatch] = useState({
    spanishWordID: "",
    englishWordID: "",
  });

  const [words, setWords] = useState({
    spanishWords: getWords("spanish", data),
    englishWords: getWords("english", data),
  });

  useEffect(() => {
    if (
      Boolean(match.englishWordID) &&
      Boolean(match.spanishWordID) &&
      match.englishWordID === match.spanishWordID
    ) {
      const newSpanishWords = words.spanishWords.filter(
        (word) => word.id !== match.spanishWordID
      );
      const newEnglishWords = words.englishWords.filter(
        (word) => word.id !== match.englishWordID
      );

      setWords({
        spanishWords: newSpanishWords,
        englishWords: newEnglishWords,
      });
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
