"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("./utils/helpers");
const runSetup = async () => {
    const appName = process.argv[2] || "novo-app";
    const appPath = path_1.default.join(process.cwd(), appName);
    // 🚀 Criando um novo projeto com Vite e React-TS
    console.log("📦 Criando novo projeto com Vite...");
    (0, helpers_1.execCommand)(`npx create-vite@latest ${appName} --template react-ts`);
    process.chdir(appPath);
    // 🎯 Instalando dependências
    console.log("📦 Instalando dependências...");
    (0, helpers_1.execCommand)("npm install");
    console.log("📦 Instalando pacotes adicionais...");
    (0, helpers_1.execCommand)("npm install eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-prettier prettier styled-components @types/styled-components typescript react-redux @reduxjs/toolkit @types/react-redux polished framer-motion react-router-dom@latest react-slick slick-carousel ts-node @types/node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-testing-library eslint-config-prettier msw @types/react-router-dom vite-plugin-eslint @storybook/react react-docgen react-icons --save-dev --save-exact --legacy-peer-deps");
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
    folders.forEach(folder => fs_1.default.mkdirSync(folder, { recursive: true }));
    // 📝 Criando arquivos de configuração...
    console.log("📄 Criando arquivos de configuração...");
    // Vercel config
    fs_1.default.writeFileSync("vercel.json", JSON.stringify({}, null, 2));
    /// VSCode settings
    fs_1.default.writeFileSync(".vscode/settings.json", JSON.stringify({}, null, 2));
    // Prettierrc settings
    fs_1.default.writeFileSync(".prettierrc", JSON.stringify({}, null, 2));
    // Editorconfig settings
    fs_1.default.writeFileSync(".editorconfig", `
    
  `);
    // Theme
    fs_1.default.writeFileSync("src/style/theme.ts", `
    
  `);
    // Global styles
    fs_1.default.writeFileSync("src/style/globalStyles.ts", `
    
  `);
    // .gitignore
    fs_1.default.writeFileSync(".gitignore", `
    
  `);
    // ESLint config
    fs_1.default.writeFileSync("eslint.config.js", `
    
  `);
    //tscongig.json
    fs_1.default.writeFileSync("tsconfig.json", `
    
  `);
    //store.ts
    fs_1.default.writeFileSync("src/redux/store.ts", `
    
  `);
};
exports.default = runSetup;
