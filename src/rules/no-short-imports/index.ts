import { DISALLOWED_PATHS } from "./disallowed-paths";

const CORE_MODULES_PREFIX = "tns-core-modules";

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
            TSExternalModuleReference: (importNode) => {
                const source = importNode.expression;
                checkDisallowedAndReport(importNode, source, context);
            },
            ImportDeclaration: (importNode) => {
                const source = importNode.source;
                checkDisallowedAndReport(importNode, source, context);
            },
            CallExpression: (importNode) => {
                const { callee, arguments: args } = importNode;
                if (callee.name !== "require" && callee.type !== "Import") {
                    return;
                }

                const source = args[0];
                checkDisallowedAndReport(importNode, source, context);
            },
        };
    },
};

function checkDisallowedAndReport(importNode, source, context) {
    if (isDisallowedPath(source)) {
        context.report(getReport(importNode, source));
    }
}

function isDisallowedPath(node) {
    const path = node.value;

    return DISALLOWED_PATHS.some((disallowedPath) => disallowedPath.startsWith(path));
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
    return `${CORE_MODULES_PREFIX}/${path}`;
}
