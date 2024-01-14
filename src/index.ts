import {
  google,
  duckduckgo,
  ecosia,
  brave,
  metager,
  startpage,
} from "handlers";
import { Engine, EngineHandler } from "types";
import icon from "./icons/default.png";
import settings from "./settings";

const order = 99;

const Engines: Record<Engine, EngineHandler> = {
  Google: google,
  DuckDuckGo: duckduckgo,
  Ecosia: ecosia,
  Brave: brave,
  MetaGer: metager,
  StartPage: startpage,
};

const fn = ({ term, actions, settings, display }) => {
  if (!navigator.onLine) return;

  // handle custom search engine
  if (settings["Search Link"]) {
    const title = `Search ${term}`;
    const onSelect = () => actions.open(settings["Search Link"] + term);
    return display({ title, onSelect, icon, order });
  }

  // handle built-in search engines
  const engine = Engines[settings["Search Engine"] as Engine] || Engines.Google;
  return engine({ term, actions, display, order });
};

export default {
  fn,
  settings
}
