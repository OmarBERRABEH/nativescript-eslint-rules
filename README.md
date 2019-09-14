# NativeScript ESLint Rules

This project contains ESLint rules useful for NativeScript projects.

# TypeScript Project Setup

1. Install the necessary dependencies:

```
npm i -D @nativescript/eslint-plugin @typescript-eslint/parser eslint
```

2. Add an `.eslintrc` config file:

**.eslintrc**

```json
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": ["@nativescript"],
    "rules": {
        "@nativescript/no-short-imports": "error"
    }
}
```

3. Lint the project from the command line:

```
npx eslint --ext=ts src/
```

**Notice that you need to provide the path to your source code. In the example above, that's `src/`. Change it to match your project**

4. Fix all auto-fixable problems:

```
npx eslint --ext=ts --fix src/
```

5. [Optional] Set up VSCode to use `eslint`.

-   Install the `dbaeumer.vscode-eslint` extension.
-   Add the following to your `settings.json` file:

```json
"eslint.validate": [
    {
          "autoFix": true,
          "language": "typescript"
    },
    {
          "autoFix": true,
          "language": "javascript"
    }
]
```

# JavaScript Project Setup

1. Install the necessary dependencies:

```
npm i -D @nativescript/eslint-plugin eslint
```

2. Add an `.eslintrc` config file:

**.eslintrc**

```json
{
    "parserOptions": {
        "ecmaVersion": 2015
    },
    "plugins": ["@nativescript"],
    "rules": {
        "@nativescript/no-short-imports": "error"
    }
}
```

3. Lint the project from the command line:

```
npx eslint app/
```

**Notice that you need to provide the path to your source code. In the example above, that's `app/`. Change it to match your project**

4. Fix all auto-fixable problems:

```
npx eslint --fix app/
```

5. [Optional] Set up VSCode to use `eslint`.

-   Install the `dbaeumer.vscode-eslint` extension.
-   Add the following to your `settings.json` file:

```json
"eslint.validate": [
    {
        "autoFix": true,
        "language": "javascript"
    }
]
```
