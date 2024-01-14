# @cerebroapp/search

> Use your favourite search engine in CerebroApp

⚠️ Requires Cerebro `v0.7.0` or higher

## Features

### Native supported search engines

This search engines are natively supported by this plugin, including suggestions.
You just need to select one of them from the plugin settings dropdown.

- [x] Google (default)
- [x] DuckDuckGo
- [x] Ecosia
- [x] Brave
- [x] MetaGer
- [x] StartPage

> The plugin is currently in development so not all search engines are implemented yet.
>
> If your search engine is not listed, please open an issue on the repo and we will add it to the roadmaap.

### Set your favourite search engine

If your favourite search engine is not in the plugin settings list, you can add it by setting the "Search Link" property.
There you must introduce a string with the template url to search with your favourite search engine.

Some examples (note recommended as they are native implemented):

- Google: `https://www.google.com/search?q=`
- Ecosia: `https://www.ecosia.org/search?q=`

    _The search string must end just where the search query starts._

The downside of this is that you can't get suggestions, this just opens the query in the search engine in your browser.
> We encourage you to open an issue so we know what engines are missing.

## Related

This plugin is based the individual implementations of each search engine plugin:

- [cerebro-google](https://github.com/cerebroapp/cerebro-google)
- [cerebro-duckduckgo](https://github.com/cerebroapp/cerebro-duck-duck-go)
- [cerebro-ecosia](https://github.com/dubisdev/cerebro-ecosia)
