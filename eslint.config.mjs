import importPlugin from "eslint-plugin-import";
import typescriptEslint from "typescript-eslint";

export default [{
    files: ["**/*.ts"],
}, {
    plugins: {
        "@typescript-eslint": typescriptEslint.plugin,
        "import": importPlugin,
    },

    languageOptions: {
        parser: typescriptEslint.parser,
        ecmaVersion: 2022,
        sourceType: "module",
        parserOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
        },
    },

    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
                project: "./tsconfig.json",
            },
            node: {
                extensions: [".ts", ".tsx"],
            },
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
    },

    rules: {
        "@typescript-eslint/naming-convention": ["warn", {
            selector: "import",
            format: ["camelCase", "PascalCase"],
        }],

        curly: "warn",
        eqeqeq: "warn",
        "no-throw-literal": "warn",
        semi: "warn",

        // 순환 참조 방지 규칙
        "import/no-cycle": ["error", {
            maxDepth: 10,
            ignoreExternal: true,
        }],
        
        // 같은 디렉토리 내 순환 참조 방지
        "import/no-self-import": "error",
        
        // 상대 경로 import 검증
        "import/no-relative-packages": "warn",
    },
}];