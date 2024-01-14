import {
  Preload,
  Loading,
  KeyboardNav,
  KeyboardNavItem,
} from "@cerebroapp/cerebro-ui";
import { Suggestion, SuggestionGetter } from "types";
import styles from "./suggestions.module.css";

type ShowSuggestionProps = {
  suggestionGetter: SuggestionGetter;
  term: string;
  searchFn: (term: string) => void;
};

const ShowSuggestions = ({
  suggestionGetter,
  term,
  searchFn,
}: ShowSuggestionProps) => {
  return (
    <Preload promise={suggestionGetter(term)} loader={<Loading />} key={term}>
      {(suggestions: Suggestion[]) => {
        return (
          <div className={styles.wrapper}>
            <KeyboardNav>
              <ul className={styles.list}>
                {suggestions.map(({ title }) => {
                  return (
                    <KeyboardNavItem
                      tagName={"li"}
                      key={title}
                      onSelect={() => searchFn(title)}
                    >
                      {title}
                    </KeyboardNavItem>
                  );
                })}
              </ul>
            </KeyboardNav>
          </div>
        );
      }}
    </Preload>
  );
};

export default ShowSuggestions;
