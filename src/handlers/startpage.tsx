import { EngineHandler, Suggestion, SuggestionGetter } from "types";
import icon from "icons/startpage.png";
import ShowSuggestions from "components/ShowSuggestions";

const SUGGESTIONS_URL =
  "https://www.startpage.com/suggestions?segment=startpage.udog&q=";

const SEARCH_URL = "https://www.startpage.com/search?query=";

const startpage: EngineHandler = ({ term, actions, display, order }) => {
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

export default startpage;

/**
 * Get suggestions for entered query
 */
const getSuggestions: SuggestionGetter = async (term: string) => {
  return fetch(`${SUGGESTIONS_URL}${term}`)
    .then((response) => response.json())
    .then((response) => response.suggestions as Record<"text", string>[])
    .then((res) => res.map(mapToSuggestion));
};

const mapToSuggestion = (suggestion: Record<"text", string>): Suggestion => ({
  title: suggestion.text,
});
