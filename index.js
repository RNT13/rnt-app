#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const appName = process.argv[2] || "novo-app";
const appPath = path.join(process.cwd(), appName);

const execCommand = (cmd) => {
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (error) {
    console.error(`❌ Erro ao executar: ${cmd}`);
    process.exit(1);
  }
};

// 🚀 Criando um novo projeto com Vite e React-TS
console.log("📦 Criando novo projeto com Vite...");
execCommand(`npx create-vite@latest ${appName} --template react-ts`);

process.chdir(appPath);

// 🎯 Instalando dependências
console.log("📦 Instalando dependências...");
execCommand("npm install");

console.log("📦 Instalando pacotes adicionais...");
execCommand(
  "npm install eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-prettier prettier styled-components @types/styled-components typescript react-redux @reduxjs/toolkit polished framer-motion react-router-dom@latest react-slick slick-carousel ts-node @types/node jest ts-jest @testing-library/jest-dom @testing-library/react jest-environment-jsdom eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-testing-library eslint-config-prettier msw jest-axe @types/react-router-dom vite-plugin-eslint @storybook/react cypress react-docgen @types/redux@latest redux@latest i18next react-i18next react-icons --save-dev --save-exact --legacy-peer-deps"
);

// 🏗 Criando estrutura de pastas
console.log("📂 Criando estrutura de pastas...");
const folders = [
  "src/style",
  "src/__tests__/test.test.tsx",
  "src/components",
  "src/hooks",
  "src/pages",
  "src/models",
  "src/utils/enums",
  "src/utils/tests/preloader.tsx",
  "src/containers",
  "src/redux",
  "src/redux/store.ts",
  "src/redux/slices",
  "src/i18n.ts",
  ".vscode"
];

folders.forEach(folder => fs.mkdirSync(path.join(appPath, folder), { recursive: true }));

// 📝 Criando arquivos de configuração...
console.log("📄 Criando arquivos de configuração...");

// Jest config
fs.writeFileSync("jest.config.ts", `
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
`);

// Vercel config
fs.writeFileSync("vercel.json", JSON.stringify({
  "rewrites": [{ "source": "/:match*", "destination": "/index.html" }]
}, null, 2));

/// VSCode settings
fs.writeFileSync(".vscode/settings.json", JSON.stringify({
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescriptreact]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}, null, 2));

// Prettierrc settings
fs.writeFileSync(".prettierrc", JSON.stringify({
  "trailingComma": "none",
  "semi": false,
  "singleQuote": true
}, null, 2));

// Editorconfig settings
fs.writeFileSync(".editorconfig", `
root = true
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
`);

// Theme
fs.writeFileSync("src/style/theme.ts", `
export const theme = {
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1200px'
  },
  colors: {
    primaryColor: '#011627',
    secondaryColor: '#023864',
    amarelo: '#ffff00',
    amarelo2: '#E1A32A',
    azul: '#0000FF',
    azul2: '#1E90FF',
    branco: '#fff',
    cinza: '#666666',
    cinza2: '#a1a1a1',
    laranja: '#ff4500',
    laranja2: '#ff7f50',
    preto: '#000',
    vermelho: '#FF0000',
    verde: '#008000',
    verde2: '#44BD32'
  }
};`);

// Global styles
fs.writeFileSync("src/style/globalStyles.ts", `
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle\`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
  }
\`;
`);

// .gitignore
fs.writeFileSync(".gitignore", `
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`);

// ESLint config
fs.writeFileSync("eslint.config.js", `
import pluginJs from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import pluginImport from 'eslint-plugin-import'
import globals from 'globals'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'


export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    plugins: {
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
      import: pluginImport
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'none',
          semi: false,
          printWidth: 300,
          arrowParens: 'avoid'
        }
      ],
      'import/no-unresolved': ['error', { caseSensitive: true }]
    }
  },

  {
    settings: {
      react: { version: 'detect' }
    }
  }
]

`);

//tscongig.json
fs.writeFileSync("tsconfig.json", `
  {
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ESNext",
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
`);

//setupTests.ts
fs.writeFileSync("setupTests.ts", `
  import '@testing-library/jest-dom'
  import { TextEncoder } from 'util'

  global.TextEncoder = TextEncoder
`);

//media.ts
fs.writeFileSync("media.ts", `
  import { theme } from './theme';

  export const media = {
    sm: \`@media (max-width: \${theme.breakpoints.sm})\`,
    md: \`@media (max-width: \${theme.breakpoints.md})\`,
    lg: \`@media (max-width: \${theme.breakpoints.lg})\`
  };
`);

//preloader.tsx
fs.writeFileSync("src/utils/tests/preloader.tsx", `
  import { render, RenderOptions } from '@testing-library/react'
  import React, { JSX, PropsWithChildren } from 'react'
  import { Provider } from 'react-redux'
  import { AppStore, configureStore, RootState } from '../../redux/store'

  interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
  }

  export function providerRender(element: React.ReactElement, { preloadedState = {}, store = configureStore(preloadedState), ...additionalOptions }: ExtendedRenderOptions = {}) {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    store,
    ...render(element, {
      wrapper: Wrapper,
      ...additionalOptions
    })
  }
}
`);

//store.ts
fs.writeFileSync("src/redux/store.ts", `
  import { combineReducers, configureStore as toolkitConfigureStore } from '@reduxjs/toolkit'

  const rootReducer = combineReducers({
  // Seus reducers aqui!
  })

  export type RootState = ReturnType<typeof rootReducer>

  export function configureStore(preloadedState?: Partial<RootState>) {
    return toolkitConfigureStore({
      reducer: rootReducer,
      preloadedState
    })
  }

  export const store = configureStore()

  export type AppStore = ReturnType<typeof configureStore>
  export type RootReducer = typeof rootReducer
`);

//i18n.ts
fs.writeFileSync("src/i18n.ts", `
  import i18n from 'i18next'
  import { initReactI18next } from 'react-i18next'

  i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        tasks: "Tasks",
        // ...outros textos
      }
    },
    pt: {
      translation: {
        welcome: "Bem-vindo",
        tasks: "Tarefas",
        // ...outros textos
      }
    }
  },
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false
  }
})

export default i18n

`);

// Aplicando ESLint e Prettier
execCommand("npx eslint . --fix");
execCommand("npx prettier --write ./src/");

console.log("✅ ESLint e Prettier aplicados!");
console.log("✅ Projeto configurado com sucesso!");
