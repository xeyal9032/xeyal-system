import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import logger from './logger.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../');
const BACKUP_DIR = path.join(ROOT_DIR, 'backups');

/**
 * Snapshot Manager
 * Provides system-wide backup and restoration capabilities.
 */
class SnapshotManager {
    constructor() {
        this.dirsToBackup = ['cli', 'core', 'commands', 'config', 'plugins', 'dashboard'];
        this.filesToBackup = ['main.js', 'package.json', 'system-integrity-check.js'];
    }

    /**
     * Create a new system snapshot.
     */
    async createSnapshot(tag = 'auto') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const snapshotName = `${tag}_${timestamp}`;
        const targetPath = path.join(BACKUP_DIR, snapshotName);

        console.log(chalk.blue(`\n📦 Creating System Snapshot: ${chalk.white(snapshotName)}...`));

        try {
            await fs.ensureDir(targetPath);

            // Copy Directories
            for (const dir of this.dirsToBackup) {
                const source = path.join(ROOT_DIR, dir);
                const dest = path.join(targetPath, dir);
                if (await fs.pathExists(source)) {
                    await fs.copy(source, dest, {
                        filter: (src) => !src.includes('node_modules') && !src.includes('.git')
                    });
                    console.log(chalk.gray(`   - Backed up: /${dir}`));
                }
            }

            // Copy Single Files
            for (const file of this.filesToBackup) {
                const source = path.join(ROOT_DIR, file);
                const dest = path.join(targetPath, file);
                if (await fs.pathExists(source)) {
                    await fs.copy(source, dest);
                }
            }

            console.log(chalk.green(`✅ Snapshot saved to /backups/${snapshotName}\n`));
            logger.info(`System snapshot created: ${snapshotName}`, { category: 'SYSTEM' });
            
            return snapshotName;
        } catch (error) {
            console.error(chalk.red(`❌ Snapshot failed:`), error.message);
            logger.error(`Snapshot failed: ${error.stack}`);
            throw error;
        }
    }

    /**
     * List available snapshots.
     */
    async listSnapshots() {
        if (!await fs.pathExists(BACKUP_DIR)) return [];
        const items = await fs.readdir(BACKUP_DIR);
        return items.filter(item => fs.statSync(path.join(BACKUP_DIR, item)).isDirectory()).sort().reverse();
    }

    /**
     * Restore system from a snapshot.
     */
    async restoreSnapshot(snapshotId) {
        const sourcePath = path.join(BACKUP_DIR, snapshotId);
        if (!await fs.pathExists(sourcePath)) {
            throw new Error(`Snapshot ${snapshotId} not found.`);
        }

        console.log(chalk.red.bold(`\n⚠️  RESTORING SYSTEM TO: ${snapshotId}`));
        console.log(chalk.yellow(`   Warning: Current core files will be overwritten.\n`));

        try {
            // Restore Directories
            for (const dir of this.dirsToBackup) {
                const source = path.join(sourcePath, dir);
                const dest = path.join(ROOT_DIR, dir);
                if (await fs.pathExists(source)) {
                    // Safe approach: move current to temp or just overwrite? 
                    // Overwrite is cleaner for restoration.
                    await fs.copy(source, dest, { overwrite: true });
                    console.log(chalk.gray(`   - Restored: /${dir}`));
                }
            }

            // Restore Files
            for (const file of this.filesToBackup) {
                const source = path.join(sourcePath, file);
                const dest = path.join(ROOT_DIR, file);
                if (await fs.pathExists(source)) {
                    await fs.copy(source, dest, { overwrite: true });
                }
            }

            console.log(chalk.green.bold(`\n✨ System successfully restored to ${snapshotId}.`));
            console.log(chalk.white(`   Please restart the system to apply all changes.\n`));
            logger.info(`System restored from snapshot: ${snapshotId}`, { category: 'SYSTEM' });

            return true;
        } catch (error) {
            console.error(chalk.red(`❌ Restoration failed:`), error.message);
            logger.error(`Restoration failed: ${error.stack}`);
            throw error;
        }
    }
}

export default new SnapshotManager();
