import { EngineHandler, Suggestion, SuggestionGetter } from "types";
import icon from "icons/duckduckgo.png";
import ShowSuggestions from "components/ShowSuggestions";

const SUGGESTIONS_URL = "https://duckduckgo.com/ac/?q=";

const SEARCH_URL = "https://duckduckgo.com/?q=";

const duckduckgo: EngineHandler = ({ term, actions, display, order }) => {
  const title = `Search: ${term}`;

  const searchFn = (q: string) => {
    actions.open(`${SEARCH_URL}${q}`);
    actions.hideWindow();
  };

  display({
    title,
    icon,
    onSelect: () => searchFn(term),
    getPreview: () => (
      <ShowSuggestions
        suggestionGetter={getSuggestions}
        term={term}
        searchFn={searchFn}
      />
    ),
    order
  });
};

export default duckduckgo;

/**
 * Get suggestions for entered query
 */
const getSuggestions: SuggestionGetter = async (term: string) => {
  return fetch(`${SUGGESTIONS_URL}${term}`)
    .then((response) => response.json())
    .then((response) => (response || []) as { phrase: string }[])
    .then((res) => res.map(mapToSuggestion));
};

const mapToSuggestion = ({ phrase }: { phrase: string }): Suggestion => ({
  title: phrase,
});
