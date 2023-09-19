type DATA_MAP = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  spanish: string;
  english: string;
};

export type LANG = "spanish" | "english";

export function getWords(lang: LANG, data: DATA_MAP[]) {
  return data.map((words) => {
    return {
      id: words.id,
      text: words[lang],
    };
  });
}
