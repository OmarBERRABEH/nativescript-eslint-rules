export default {
    name: "no-short-imports",
    meta: {
        type: "problem",
        docs: {
            description: "Disallow use of console",
            category: "Best Practices",
            recommended: true,
        },
        fixable: "code",
    },
    create(context) {
        return {
            ImportDeclaration: (importNode) => {
                const source = importNode.source;
                if (isDisallowedPath(source)) {
                    context.report(getReport(importNode, source));
                }
            },
            CallExpression: (importNode) => {
                const { callee, arguments: args } = importNode;
                if (callee.name !== "require" || !args.length) {
                    return;
                }

                const source = args[0];
                if (isDisallowedPath(source)) {
                    context.report(getReport(importNode, source));
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

function getReport(importNode, sourceNode) {
    return {
        node: importNode,
        message: "Using short imports from 'tns-core-modules' is not allowed.",
        fix: getFixer(sourceNode),
    };
}

function getFixer(node) {
    const disallowedPath = node.value;
    const fixedPath = fixPath(disallowedPath);

    const rawPath = node.raw;
    const fixedRawPath = rawPath.replace(disallowedPath, fixedPath);

    return (fixer) => {
        return fixer.replaceText(node, fixedRawPath);
    };
}

function fixPath(path) {
    const CORE_MODULES_PREFIX = "tns-core-modules";

    return `${CORE_MODULES_PREFIX}/${path}`;
}
