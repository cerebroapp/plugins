import { Engine } from "types";

export const SearchEngines: Engine[] = [
  "Google",
  "Brave",
  "DuckDuckGo",
  "Ecosia",
  "MetaGer",
  "StartPage",
];

/**
 * @returns A valid options array with each search engine name and label
 */
const generateOptions = (): Array<{ value: string; label: string }> => {
  const options = SearchEngines.map((engine) => ({
    value: engine,
    label: engine,
  }));

  return options;
};

export default {
  "Search Engine": {
    type: "option",
    options: generateOptions(),
    defaultValue: { value: "Google", label: "Google" },
    description: "Select a search engine",
  },
  "Search Link": {
    type: "string",
    description:
      "The link your search engine uses to search. I.e.\nhttps://google.com/search?q=",
  },
};
