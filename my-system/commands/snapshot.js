import chalk from 'chalk';
import inquirer from 'inquirer';
import snapshotManager from '../core/system/snapshotManager.js';

/**
 * Command: snapshot
 * Manages system restore points.
 */
export const snapshotCommand = async (action, id, options = {}) => {
    try {
        const snapshots = await snapshotManager.listSnapshots();

        if (!action || action === 'list') {
            console.log(chalk.blue.bold('\n📦 System Snapshots\n'));
            if (snapshots.length === 0) {
                console.log(chalk.gray('   No snapshots found. Use "snapshot create" to make one.'));
            } else {
                snapshots.forEach((s, i) => {
                    console.log(`${chalk.cyan(i + 1 + '.')} ${chalk.white(s)}`);
                });
            }
            console.log('');
            return;
        }

        if (action === 'create') {
            let tag = id;
            if (!tag) {
                const answers = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'tag',
                        message: 'Enter a name/tag for this snapshot:',
                        default: 'manual-backup'
                    }
                ]);
                tag = answers.tag;
            }
            await snapshotManager.createSnapshot(tag);
        }

        if (action === 'restore') {
            let targetId = id;

            if (!targetId) {
                if (snapshots.length === 0) {
                    console.log(chalk.red('\n❌ No snapshots available to restore.\n'));
                    return;
                }

                const answers = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'snapshotId',
                        message: 'Select a snapshot to RESTORE:',
                        choices: snapshots
                    },
                    {
                        type: 'confirm',
                        name: 'confirm',
                        message: chalk.red.bold('Are you ABSOLUTELY sure? This will overwrite current system files.'),
                        default: false
                    }
                ]);

                if (!answers.confirm) {
                    console.log(chalk.gray('\nRestoration cancelled.\n'));
                    return;
                }
                targetId = answers.snapshotId;
            }

            await snapshotManager.restoreSnapshot(targetId);
        }

    } catch (error) {
        console.error(chalk.red(`\n❌ Snapshot command error:`), error.message);
    }
};

export default snapshotCommand;
