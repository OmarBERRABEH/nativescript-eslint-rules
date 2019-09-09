export default {
    meta: {
        docs: {
            description: "Disallow use of console",
            category: "Best Practices",
            recommended: true,
        },
        fixable: "code",
    },
    create(context) {
        return {
            ImportDeclaration: (node) => {
                const importPath = node.source;
                if (isDisallowedPath(importPath)) {
                    context.report({
                        node,
                        message: "Using short imports from 'tns-core-modules' is not allowed.",
                        fix: createFixer(importPath),
                    });
                }
            },
            CallExpression: (node) => {
                const { callee, arguments: args } = node;
                if (callee.name !== "require" || !args.length) {
                    return;
                }

                const importPath = args[0];
                if (isDisallowedPath(importPath)) {
                    context.report({
                        node,
                        message: "Using short imports from 'tns-core-modules' is not allowed.",
                        fix: createFixer(importPath),
                    });
                }
            },
        };
    },
};

function isDisallowedPath(node) {
    const path = node.value;
    const DISALLOWED_PATHS = ["ui/search-bar"];

    return DISALLOWED_PATHS.indexOf(path) > -1;
}

function fixPath(path) {
    const CORE_MODULES_PREFIX = "tns-core-modules";

    return `${CORE_MODULES_PREFIX}/${path}`;
}

function createFixer(node) {
    const disallowedPath = node.value;
    const fixedPath = fixPath(disallowedPath);

    const rawPath = node.raw;
    const fixedRawPath = rawPath.replace(disallowedPath, fixedPath);

    return (fixer) => {
        return fixer.replaceText(node, fixedRawPath);
    };
}
