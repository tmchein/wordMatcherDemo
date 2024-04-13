type DATA_MAP = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  spanish: string;
  english: string;
};

type translated_elements = {
  id: `${string}-${string}-${string}-${string}-${string}`
  text: string 
}

export type LANG = "spanish" | "english";

export function getWords(lang: LANG, data: DATA_MAP[]) {
  const test: translated_elements[] =  data.map((words) => ({
    id: words.id,
    text: words[lang],
  }));
  return test
}

export function getRandomWord(data: DATA_MAP[]){
  return data[Math.floor(Math.random() * data.length)]
}

export function areWordsTheSame(spanishWord: string, englishWord: string) {
  return spanishWord === englishWord;
}

export function shuffleArray(array:translated_elements[]) {
  // Iterate from the last element to the first element
  for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap the elements at index i and j
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}