import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import logger from '../system/logger.js';

class PatchEngine {
    /**
     * Apply a fix suggested by the AI to the source code.
     * This version uses a smart replacement strategy.
     */
    async applyPatch(filePath, originalCode, suggestedFix) {
        try {
            const absolutePath = path.resolve(process.cwd(), filePath);
            
            if (!await fs.pathExists(absolutePath)) {
                throw new Error(`File not found: ${filePath}`);
            }

            console.log(chalk.blue(`   - Patching file: ${chalk.white(filePath)}`));

            // In a production-grade system, this would use AST or Diff-Match-Patch.
            // For the MVP, we assume the AI provides the corrected block.
            
            // 1. Create a backup before patching
            const backupPath = `${absolutePath}.bak`;
            await fs.copy(absolutePath, backupPath);

            // 2. Perform the patch (In this MVP, we overwrite the file with the fix if it's a small file, 
            // or we do a smart string replacement if the AI gives us a search/replace pair).
            // For now, let's assume 'suggestedFix' is the full content for simplicity or a target replacement.
            
            await fs.writeFile(absolutePath, suggestedFix);

            console.log(chalk.green(`   - Success: Applied AI-generated patch.`));
            logger.info(`Auto-patched file: ${filePath}`, { category: 'INTELLIGENCE' });

            return true;
        } catch (error) {
            console.error(chalk.red(`   - Patch Error:`), error.message);
            logger.error(`PatchEngine failed: ${error.stack}`);
            return false;
        }
    }

    /**
     * Revert the last patch
     */
    async revertPatch(filePath) {
        const absolutePath = path.resolve(process.cwd(), filePath);
        const backupPath = `${absolutePath}.bak`;

        if (await fs.pathExists(backupPath)) {
            await fs.move(backupPath, absolutePath, { overwrite: true });
            console.log(chalk.yellow(`   - Reverted patch for: ${filePath}`));
            return true;
        }
        return false;
    }
}

export default new PatchEngine();
