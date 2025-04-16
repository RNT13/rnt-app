import fs from 'fs';
import path from 'path';
import { execCommand } from './utils/helpers';

const runSetup = async (): Promise<void> => {
  const appName = process.argv[2] || "novo-app";
  const appPath = path.join(process.cwd(), appName);

  // 🚀 Criando um novo projeto com Vite e React-TS
  console.log("📦 Criando novo projeto com Vite...");
  execCommand(`npx create-vite@latest ${appName} --template react-ts`);

  process.chdir(appPath);

  // 🎯 Instalando dependências
  console.log("📦 Instalando dependências...");
  execCommand("npm install");

  console.log("📦 Instalando pacotes adicionais...");
  execCommand(
    "npm install eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-prettier prettier styled-components @types/styled-components typescript react-redux @reduxjs/toolkit @types/react-redux polished framer-motion react-router-dom@latest react-slick slick-carousel ts-node @types/node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-testing-library eslint-config-prettier msw @types/react-router-dom vite-plugin-eslint @storybook/react react-docgen react-icons --save-dev --save-exact --legacy-peer-deps"
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
  folders.forEach(folder => fs.mkdirSync(folder, { recursive: true }));

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
  `);

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
};

export default runSetup;








