import chalk from 'chalk';
import skillsManager from '../core/intelligence/skillsManager.js';

export async function skillsCommand(action, id, options = {}) {
    if (options.json && action === 'list') {
        skillsManager.list(true);
        return;
    }
    switch (action) {
        case 'list':
            const skills = skillsManager.list();
            console.log(chalk.blue.bold('\n🧠 AVAILABLE AI SKILLS & AGENTS:\n'));
            skills.forEach(s => {
                console.log(`${chalk.cyan.bold(s.name.padEnd(15))} | ${chalk.white(s.description)} [${chalk.gray(s.type)}]`);
            });
            console.log('');
            break;

        case 'launch':
            if (!id) {
                console.error(chalk.red('❌ Error: Skill ID is required. Example: xeyal-system skills launch openclaw'));
                return;
            }
            console.log(chalk.yellow(`🚀 Launching ${id}...`));
            try {
                await skillsManager.launch(id);
                console.log(chalk.green(`✅ Skill ${id} is now active.`));
            } catch (err) {
                console.error(chalk.red(`❌ Failed to launch ${id}: ${err.message}`));
            }
            break;

        case 'stop':
            if (!id) {
                console.error(chalk.red('❌ Error: Skill ID is required.'));
                return;
            }
            if (skillsManager.stop(id)) {
                console.log(chalk.green(`✅ Skill ${id} stopped.`));
            } else {
                console.log(chalk.yellow(`⚠️ Skill ${id} was not running.`));
            }
            break;

        default:
            console.log(chalk.gray('Usage: xeyal-system skills <list|launch|stop> [id]'));
    }
}
