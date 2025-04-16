"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("./utils/helpers");
const runOptions = async () => {
    // Perguntar sobre i18n
    const installI18n = await (0, helpers_1.askQuestion)("Deseja instalar i18n? (y/n): ");
    if (installI18n.toLowerCase() === "y") {
        console.log("📦 Instalando i18n...");
        (0, helpers_1.execCommand)("npm install i18next react-i18next ");
        console.log("📂 Criando arquivo i18n.ts...");
        fs_1.default.writeFileSync("src/i18n.ts", `
      
    `);
        // Criar languageSlice
        fs_1.default.mkdirSync("src/redux/slice", { recursive: true });
        fs_1.default.writeFileSync("src/redux/slice/languageSlice.ts", `
      
    `);
    }
    // Perguntar sobre área de testes
    const installOtherDeps = await (0, helpers_1.askQuestion)("Deseja instalar a área de testes? (ex: Jest, Cypress, etc)? (y/n)");
    if (installOtherDeps.toLowerCase() === "y") {
        console.log("📦 Instalando dependências de teste...");
        (0, helpers_1.execCommand)("npm install jest ts-jest @testing-library/react jest-environment-jsdom cypress mochawesome");
        console.log("📂 Criando pastas de testes e utils...");
        (0, helpers_1.execCommand)("mkdir src/__tests__ src/utils/tests");
        console.log("📄 Criando arquivos de configuração e preloader para Jest...");
        fs_1.default.writeFileSync("setupTests.ts", `
      
    `);
        fs_1.default.writeFileSync("jest.config.ts", `
      
    `);
        fs_1.default.writeFileSync("src/utils/tests/preloader.tsx", `
      
    `);
        fs_1.default.writeFileSync("src/__tests__/test.test.tsx", `
      
    `);
    }
    console.log("✅ ESLint e Prettier aplicados!");
    console.log("✅ Projeto configurado com sucesso!");
};
exports.default = runOptions;
