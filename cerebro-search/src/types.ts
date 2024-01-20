export type EngineArgs = {
  term: string;
  actions: Record<string, any>;
  display: ({}) => void;
  order: number;
};
export type EngineHandler = (args: EngineArgs) => void;

export type Suggestion = {
  title: string;
  description?: string;
};

export type SuggestionGetter = (apiResult: any) => Promise<Suggestion[]>;

export type Engine =
  | "Google"
  | "DuckDuckGo"
  | "Ecosia"
  | "Brave"
  | "MetaGer"
  | "StartPage";
