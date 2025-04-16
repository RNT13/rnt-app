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
  "src/components",
  "src/hooks",
  "src/pages",
  "src/models",
  "src/utils/enums",
  "src/containers",
  "src/redux",
  "src/redux/slices",
  ".vscode"
];
folders.forEach(folder => fs.mkdirSync(path.join(appPath, folder), { recursive: true }));

// 📝 Criando arquivos de configuração...
console.log("📄 Criando arquivos de configuração...");

// Vercel config
fs.writeFileSync("vercel.json", JSON.stringify({
  "rewrites": [{ "source": "/:match*", "destination": "/index.html" }]
}, null, 2));

// VSCode settings
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
}

export const darkTheme = {
  colors: {
    primaryColor: '#13161b',
    secondaryColor: '#1c1f25',
    background: '#2F2F2F',
    inputColor: '#0d0e12',
    white: '#121212',
    blue: '#0d6efd',
    blue2: '#0000FF',
    red: '#FF3347',
    green: '#28a745',
    orange: '#ff4500',
    yellow: '#fffF00',
    shadow: '#000',
    grey: '#a1a1a1',
    textColor: '#f1f1f1',
    neon: {
      pink1: '#FF1493',
      pink2: '#FF00FF',
      green1: '#39FF14',
      green2: '#00FF7F',
      blue1: '#00BFFF',
      blue2: '#00FFFF'
    }
  }
}

export const lightTheme = {
  colors: {
    primaryColor: '#666666',
    secondaryColor: '#a1a1a1',
    background: '#808080',
    inputColor: '#f1f1f1',
    white: '#ffffff',
    blue: '#3a86ff',
    blue2: '#0000FF',
    red: '#FF0000',
    green: '#34d399',
    orange: '#ff4500',
    yellow: '#ffff00',
    shadow: '#000',
    grey: '#a1a1a1',
    textColor: '#13161b',
    neon: {
      pink1: '#FF1493',
      pink2: '#FF00FF',
      green1: '#39FF14',
      green2: '#00FF7F',
      blue1: '#00FFFF',
      blue2: '#00BFFF'
    }
  }
}

export const themeConfig = {
  light: lightTheme,
  dark: darkTheme
}
`);

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

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: ${({ theme }) => theme.colors.background};
      color: ${({ theme }) => theme.colors.textColor};
      transition: background-color 0.3s, color 0.3s;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button {
      cursor: pointer;
      border: none;
      background: none;
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
  import globals from 'globals'
  import tseslint from 'typescript-eslint'
  
  /** @type {import('eslint').Linter.Config[]} */
  export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { globals: globals.browser } },
  
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
  
    {
      plugins: {
        'react-hooks': reactHooks,
        prettier: prettierPlugin
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
            printWidth: 350,
            arrowParens: 'avoid'
          }
        ]
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
fs.writeFileSync("tsconfig.json", JSON.stringify({
  files: [],
  references: [
    { path: "./tsconfig.app.json" },
    { path: "./tsconfig.node.json" }
  ],
  compilerOptions: {
    module: "CommonJS",
    target: "ESNext",
    jsx: "react-jsx",
    esModuleInterop: true,
    skipLibCheck: true
  }
}, null, 2));


//media.ts
fs.writeFileSync("src/style/media.ts", `
  import { theme } from './theme';

  export const media = {
    sm: \`@media (max-width: \${theme.breakpoints.sm})\`,
    md: \`@media (max-width: \${theme.breakpoints.md})\`,
    lg: \`@media (max-width: \${theme.breakpoints.lg})\`
  };
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

const fs = require('fs');
const readline = require('readline');
const { execSync } = require('child_process');

// Função utilitária para perguntar no terminal
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

// Executar comandos no terminal
function execCommand(command) {
  execSync(command, { stdio: 'inherit' });
}

// Função principal
async function runOptions() {
  const installI18n = await askQuestion('Deseja instalar i18n? (y/n): ');
  if (installI18n.toLowerCase() === 'y') {
    console.log('📦 Instalando i18n...');
    execCommand('npm install i18next react-i18next');

    console.log('📂 Criando arquivo i18n.ts...');
    fs.writeFileSync('src/i18n.ts', `
    import i18n from 'i18next'
    import { initReactI18next } from 'react-i18next'

    i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          home: 'Home',
          tasks: 'Tasks',
          editing: 'Editing...',
          name: 'Name',
          email: 'Email',
          phone: 'Phone',
          save: 'Save',
          cancel: 'Cancel',
          editContact: 'Edit contact',
          editTask: 'Edit task',
          remove: 'Remove',
          login: 'Login',
          logout: 'Logout',
          password: 'Password',
          enter: 'Enter',
          hide: 'Hide',
          show: 'Show',
          hidePassword: 'Hide password',
          showPassword: 'Show password',
          calendar: 'Calendar',
          contacts: 'Contacts',
          products: 'Products',
          profile: 'Profile',
          requests: 'Requests',
          newContact: 'New Contact',
          newTask: 'New Task',
          addToCart: 'Add to Cart',
          pending: 'Pending',
          completed: 'Completed',
          urgent: 'Urgent',
          important: 'Important',
          normal: 'Normal',
          friend: 'Friend',
          known: 'Known',
          unknown: 'Unknown',
          search: 'Search',
          return: 'Return',
          all: 'All',
          markedAs: 'marked as',
          task: 'Task',
          contact: 'Contact',
          description: 'Description',
          fullName: 'Full Name',
          contactMarkedAsAll: 'contact(s) marked as: All',
          contactMarketAs: 'contact(s) marked as:',
          taskMarkedAsAll: 'task(s) marked as: All',
          taskMarketAs: 'task(s) marked as:',
          title: 'Title',
          fillAllFilds: 'Please fill in all required fields.',
          test: 'Test',
          click: 'Click Here',
          cart: 'Cart',
          cartEmpty: 'Your cart is empty',
          cartTotal: 'Total'
        }
      },
      pt: {
        translation: {
          home: 'Início',
          tasks: 'Tarefas',
          editing: 'Editando...',
          name: 'Nome',
          email: 'Email',
          phone: 'Telefone',
          save: 'Salvar',
          cancel: 'Cancelar',
          editContact: 'Editar contato',
          editTask: 'Editar tarefa',
          remove: 'Remover',
          login: 'Conectar',
          logout: 'Desconectar',
          password: 'Senha',
          enter: 'Entrar',
          hide: 'Ocultar',
          show: 'Mostrar',
          hidePassword: 'Ocultar senha',
          showPassword: 'Mostrar senha',
          calendar: 'Calendário',
          contacts: 'Contatos',
          products: 'Produtos',
          profile: 'Perfil',
          requests: 'Solicitações',
          newContact: 'Novo Contato',
          newTask: 'Nova Tarefa',
          addToCart: 'Adicionar ao Carrinho',
          pending: 'Pendente',
          completed: 'Concluído',
          urgent: 'Urgente',
          important: 'Importante',
          normal: 'Normal',
          friend: 'Amigo',
          known: 'Conhecido',
          unknown: 'Desconhecido',
          search: 'Pesquisar',
          return: 'Voltar',
          all: 'Todos(as)',
          markedAs: 'marcado como',
          task: 'Tarefa',
          contact: 'Contato',
          description: 'Descrição',
          fullName: 'Nome Completo',
          contactMarkedAsAll: 'contato(s) marcado(s) como: Todos',
          contactMarketAs: 'contato(s) marcado(s) como:',
          taskMarkedAsAll: 'tarefa(s) marcada(s) como: Todas',
          taskMarketAs: 'tarefa(s) marcada(s) como:',
          title: 'Título',
          fillAllFilds: 'Por favor, preencha Todos os campos obrigatórios.',
          test: 'Teste',
          click: 'Clique Aqui',
          cart: 'Carrinho',
          cartEmpty: 'Seu carrinho está vazio',
          cartTotal: 'Total'
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

    fs.mkdirSync('src/redux/slice', { recursive: true });
    fs.writeFileSync('src/redux/slice/languageSlice.ts', `
    import { createSlice, PayloadAction } from '@reduxjs/toolkit'

    interface LanguageState {
      language: 'pt' | 'en'
    }

    const initialState: LanguageState = {
      language: 'en'
    }

    const languageSlice = createSlice({
      name: 'language',
      initialState,
      reducers: {
        toggleLanguage: (state, action: PayloadAction<'pt' | 'en'>) => {
          state.language = action.payload
        }
      }
    })

    export const { toggleLanguage } = languageSlice.actions
    export default languageSlice.reducer
  `);
  }

  const installTests = await askQuestion('Deseja instalar a área de testes? (y/n): ');
  if (installTests.toLowerCase() === 'y') {
    console.log('📦 Instalando dependências de teste...');
    execCommand('npm install jest ts-jest @testing-library/react jest-environment-jsdom cypress mochawesome');

    console.log('📂 Criando pastas...');
    execCommand('mkdir src/__tests__ src/utils/tests');

    console.log('📄 Criando arquivos...');
    fs.writeFileSync('setupTests.ts', `
    import '@testing-library/jest-dom'
    import { TextEncoder } from 'util'

    global.TextEncoder = TextEncoder
    `);

    fs.writeFileSync('jest.config.ts', `
    export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts']
    }
    `);

    fs.writeFileSync('src/utils/tests/preloader.tsx', `
    import { render, RenderOptions } from '@testing-library/react'
    import React, { JSX, PropsWithChildren } from 'react'
    import { Provider } from 'react-redux'
    import { AppStore, configureStore, RootState } from '../../redux/store'

    interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
      preloadedState?: Partial<RootState>
      store?: AppStore
    }

    export function providerRender(element: React.ReactElement, { preloadedState = {}, store = configureStore(preloadedState), ...additionalOptions }: ExtendedRenderOptions = {}) {
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

    fs.writeFileSync('src/__tests__/test.test.tsx', '');
  }
}


// Aplicando ESLint e Prettier
execCommand("npx eslint . --fix");
execCommand("npx prettier --write ./src/");

console.log("✅ ESLint e Prettier aplicados!");
console.log("✅ Projeto configurado com sucesso!");

runOptions();