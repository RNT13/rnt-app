"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCommand = execCommand;
exports.askQuestion = askQuestion;
const child_process_1 = require("child_process");
const readline_1 = __importDefault(require("readline"));
function execCommand(cmd) {
    try {
        (0, child_process_1.execSync)(cmd, { stdio: 'inherit' });
    }
    catch (err) {
        console.error(`❌ Erro ao executar: ${cmd}`);
        process.exit(1);
    }
}
function askQuestion(query) {
    return new Promise((resolve) => {
        const rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(query, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}
exports.default = { execCommand, askQuestion };
