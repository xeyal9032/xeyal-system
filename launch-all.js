import { spawn } from 'child_process';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.blue.bold('\n🚀 Xeyal-System: Orchestrating Cluster Startup...\n'));

const services = [
    { name: 'Xeyal Cloud (Backend)', cwd: 'xeyal-cloud', cmd: 'npm start', color: chalk.cyan },
    { name: 'Xeyal Dashboard (Frontend)', cwd: 'xeyal-dashboard', cmd: 'npm run dev', color: chalk.green },
    { name: 'My-System (Core)', cwd: 'my-system', cmd: 'node cli/index.js dev', color: chalk.magenta }
];

services.forEach(service => {
    console.log(service.color(`  [+] Starting ${service.name}...`));
    
    const [command, ...args] = service.cmd.split(' ');
    const child = spawn(command, args, {
        cwd: path.resolve(__dirname, service.cwd),
        shell: true,
        stdio: 'inherit'
    });

    child.on('error', (err) => {
        console.error(chalk.red(`  [!] Failed to start ${service.name}: ${err.message}`));
    });
});

console.log(chalk.blue.bold('\n✅ All services initiated. Control them via their respective terminals or the dashboard.\n'));
