import { EngineHandler } from "types";
import icon from "icons/metager.png";

const SEARCH_URL = "https://metager.es/meta/meta.ger3?eingabe=";

/**
 * NOTE: MetaGer does not support suggestions.
 */
const metager: EngineHandler = ({ term, actions, display, order }) => {
  const title = `Search: ${term}`;

  const searchFn = (q: string) => {
    actions.open(`${SEARCH_URL}${q}`);
    actions.hideWindow();
  };

  display({
    title,
    icon,
    onSelect: () => searchFn(term),
    order
  });
};

export default metager;
