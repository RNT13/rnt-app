import { execSync } from 'child_process';
import readline from 'readline';

export function execCommand(cmd: string): void {
    try {
        execSync(cmd, { stdio: 'inherit' });
    } catch (err) {
        console.error(`❌ Erro ao executar: ${cmd}`);
        process.exit(1);
    }
}

export function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(query, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

export default { execCommand, askQuestion };