import clsx from 'clsx';
import { LANG, areWordsTheSame } from '../../utils/getLangWords';
import Button from '../Button';

type UUID = `${string}-${string}-${string}-${string}-${string}`;

type WordsType = {
  id: UUID;
  text: string;
};

interface ColumnProps {
  words: WordsType[];
  language: LANG;
  setMatch: React.Dispatch<
    React.SetStateAction<{
      spanishWordID: string;
      englishWordID: string;
    }>
  >;
  match: {
    spanishWordID: string;
    englishWordID: string;
  };
}

const WordColumn = ({ words, language, setMatch, match }: ColumnProps) => {
  function saveWordID(id: string) {
    language === 'spanish'
      ? setMatch({ ...match, spanishWordID: id })
      : setMatch({ ...match, englishWordID: id });
  }

  const borderStyle =
    match.spanishWordID || match.englishWordID
      ? 'focus:border-blue-500'
      : undefined;

  const correctMatchStyle = (
    spanishWordID: string,
    englishWordID: string,
    buttonID: string
  ) => {
    return areWordsTheSame(spanishWordID, englishWordID) &&
      (buttonID === spanishWordID || buttonID === englishWordID)
      ? 'bg-green-500 text-gray-900'
      : null;
  };

  return (
    <aside className="flex flex-col gap-4">
      {words.map(({ text, id }) => (
        <Button
          key={`${id}-${text}`}
          id={id}
          onClick={() => saveWordID(id)}
          className={clsx(
            borderStyle,
            correctMatchStyle(match.spanishWordID, match.englishWordID, id),
            id === match.spanishWordID &&
              id === match.englishWordID &&
              'opacity-0 transition-opacity delay-150 duration-300'
          )}
        >
          {text}
        </Button>
      ))}
    </aside>
  );
};

export default WordColumn;
