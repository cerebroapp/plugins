import { EngineHandler, Suggestion, SuggestionGetter } from "types";
import icon from "icons/ecosia.png";
import ShowSuggestions from "components/ShowSuggestions";

const SUGGESTIONS_URL = "http://ac.ecosia.org/autocomplete?q=";

const SEARCH_URL = "https://www.ecosia.org/search?q=";

const ecosia: EngineHandler = ({ term, actions, display, order }) => {
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

export default ecosia;

/**
 * Get suggestions for entered query
 */
const getSuggestions: SuggestionGetter = async (term: string) => {
  return fetch(`${SUGGESTIONS_URL}${term}`)
    .then((response) => response.json())
    .then((response) => (response.suggestions || []) as string[])
    .then((res) => res.map(mapToSuggestion));
};

const mapToSuggestion = (suggestion: string): Suggestion => ({
  title: suggestion,
});
