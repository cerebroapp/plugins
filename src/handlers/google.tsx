import { EngineHandler, Suggestion, SuggestionGetter } from "types";
import icon from "icons/google.png";
import ShowSuggestions from "components/ShowSuggestions";

const SUGGESTIONS_URL =
  "http://suggestqueries.google.com/complete/search?client=firefox&q=";

const SEARCH_URL = "https://www.google.com/search?q=";

const google: EngineHandler = ({ term, actions, display, order }) => {
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

export default google;

/**
 * Get suggestions for entered query
 */
const getSuggestions: SuggestionGetter = async (term: string) => {
  return fetch(`${SUGGESTIONS_URL}${term}`)
    .then((response) => response.json())
    .then((response) => (response[1] || []) as string[])
    .then((res) => res.map(mapToSuggestion));
};

const mapToSuggestion = (suggestion: string): Suggestion => ({
  title: suggestion,
});
