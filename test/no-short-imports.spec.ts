import { RuleTester, Rule } from "eslint";

import rule from "../src/rules/no-short-imports";

const ruleTester = new RuleTester({
    parserOptions: {
        sourceType: "module",
    },
    parser: "@typescript-eslint/parser",
});

ruleTester.run("no-short-imports", rule as Rule.RuleModule, {
    invalid: [
        getInvalidTest(
            "import { SearchBar } from \"ui/search-bar\"",
            "import { SearchBar } from \"tns-core-modules/ui/search-bar\"",
        ),
        getInvalidTest(
            "import { SearchBar } from 'ui/search-bar'",
            "import { SearchBar } from 'tns-core-modules/ui/search-bar'",
        ),
        getInvalidTest(
            "import * as searchBarModule from \"ui/search-bar\"",
            "import * as searchBarModule from \"tns-core-modules/ui/search-bar\"",
        ),
        getInvalidTest(
            "import SearchBarExports from \"ui/search-bar\"",
            "import SearchBarExports from \"tns-core-modules/ui/search-bar\"",
        ),
        getInvalidTest(
            "import searchBarModule = require(\"ui/search-bar\");",
            "import searchBarModule = require(\"tns-core-modules/ui/search-bar\");",
        ),
        getInvalidTest(
            "const searchBarModule = require(\"ui/search-bar\")",
            "const searchBarModule = require(\"tns-core-modules/ui/search-bar\")",
        ),
        getInvalidTest(
            "const searchBarModule = require(\"ui/search-bar\")",
            "const searchBarModule = require(\"tns-core-modules/ui/search-bar\")",
        ),
        getInvalidTest(
            "const searchBarModule = require('ui/search-bar')",
            "const searchBarModule = require('tns-core-modules/ui/search-bar')",
        ),
        getInvalidTest(
            "const SearchBar = require(\"ui/search-bar\").SearchBar",
            "const SearchBar = require(\"tns-core-modules/ui/search-bar\").SearchBar",
        ),
    ],

    valid: [
        "import { SearchBar } from \"tns-core-modules/ui/search-bar\"",
        "const text = \"import { SearchBar } from 'ui/search-bar'\"",
        "console.log('ui/search-bar')",
    ],
});

function getInvalidTest(code: string, output: string) {
    const invalidTest = {
        code,
        errors: [{ message: "Using short imports from 'tns-core-modules' is not allowed." }],
        output,
    };

    return invalidTest;
}
