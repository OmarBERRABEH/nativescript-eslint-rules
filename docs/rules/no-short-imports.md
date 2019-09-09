# Disallows usage of short imports from `tns-core-modules` (no-short-imports)

The use of short imports such as `import { SearchBar } from "ui/search-bar"` is banned. Instead prefix the module specifier with `tns-core-modules`, f.e. `import { SearchBar} from "tns-core-modules/ui/search-bar"`.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
import { SearchBar } from "ui/search-bar";
import * as searchBarModule from "ui/search-bar";
const SearchBar = require("ui/search-bar").SearchBar;
```

Examples of **correct** code for this rule:

```ts
import { SearchBar } from "tns-core-modules/ui/search-bar";
import * as searchBarModule from "tns-core-modules/ui/search-bar";
const SearchBar = require("tns-core-modules/ui/search-bar").SearchBar;
```
