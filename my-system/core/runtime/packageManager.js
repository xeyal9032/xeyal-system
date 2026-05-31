import fs from 'fs-extra';
import { execSync } from 'child_process';
import logger from '../system/logger.js';
import chalk from 'chalk';
import path from 'path';

/**
 * Project type detection — scans manifest files to determine the ecosystem.
 * Returns the best matching project type or 'unknown'.
 */
export const detectProjectType = async (projectPath = '.') => {
  const checks = [
    {
      type: 'node',
      label: 'Node.js',
      icon: '🟢',
      manifest: 'package.json',
      installCmd: 'npm install',
      depDir: 'node_modules',
      devCmdFn: async (p) => {
        const pkg = await fs.readJson(path.join(p, 'package.json')).catch(() => null);
        if (!pkg || !pkg.scripts) return null;
        return pkg.scripts.dev ? 'npm run dev' : pkg.scripts.start ? 'npm start' : null;
      },
      lintCmdFn: async (p) => {
        const pkg = await fs.readJson(path.join(p, 'package.json')).catch(() => null);
        return pkg?.scripts?.lint ? 'npm run lint' : null;
      },
    },
    {
      type: 'python',
      label: 'Python',
      icon: '🐍',
      manifest: 'requirements.txt',
      installCmd: 'pip install -r requirements.txt',
      depDir: null, // pip doesn't use a local dep dir we can check easily
      devCmdFn: async (p) => {
        if (await fs.pathExists(path.join(p, 'manage.py'))) return 'python manage.py runserver';
        if (await fs.pathExists(path.join(p, 'app.py'))) return 'python app.py';
        if (await fs.pathExists(path.join(p, 'main.py'))) return 'python main.py';
        return 'python -m flask run';
      },
      lintCmdFn: async () => null,
    },
    {
      type: 'python-pyproject',
      label: 'Python (pyproject)',
      icon: '🐍',
      manifest: 'pyproject.toml',
      installCmd: 'pip install -e .',
      depDir: null,
      devCmdFn: async (p) => {
        if (await fs.pathExists(path.join(p, 'main.py'))) return 'python main.py';
        return null;
      },
      lintCmdFn: async () => null,
    },
    {
      type: 'rust',
      label: 'Rust',
      icon: '🦀',
      manifest: 'Cargo.toml',
      installCmd: 'cargo build',
      depDir: 'target',
      devCmdFn: async () => 'cargo run',
      lintCmdFn: async () => 'cargo clippy',
    },
    {
      type: 'php',
      label: 'PHP (Composer)',
      icon: '🐘',
      manifest: 'composer.json',
      installCmd: 'composer install',
      depDir: 'vendor',
      devCmdFn: async (p) => {
        if (await fs.pathExists(path.join(p, 'artisan'))) return 'php artisan serve';
        return 'php -S localhost:8000';
      },
      lintCmdFn: async () => null,
    },
    {
      type: 'ruby',
      label: 'Ruby',
      icon: '💎',
      manifest: 'Gemfile',
      installCmd: 'bundle install',
      depDir: null,
      devCmdFn: async (p) => {
        if (await fs.pathExists(path.join(p, 'config.ru'))) return 'bundle exec rackup';
        if (await fs.pathExists(path.join(p, 'bin/rails'))) return 'bundle exec rails server';
        return null;
      },
      lintCmdFn: async () => null,
    },
  ];

  for (const check of checks) {
    if (await fs.pathExists(path.join(projectPath, check.manifest))) {
      return check;
    }
  }

  return null;
};

/**
 * Validate package.json (Node.js specific — kept for backwards compat)
 */
export const validatePackageJson = async (projectPath = '.') => {
  const packagePath = path.join(projectPath, 'package.json');
  if (!await fs.pathExists(packagePath)) {
    throw new Error('package.json not found in the specified directory.');
  }
  try {
    const pkg = await fs.readJson(packagePath);
    if (!pkg.name || !pkg.version) {
      throw new Error('package.json is missing required fields (name or version).');
    }
    logger.info(`Validated package.json for project: ${pkg.name}@${pkg.version}`);
    return pkg;
  } catch (error) {
    logger.error(`Failed to validate package.json: ${error.message}`);
    throw error;
  }
};

/**
 * Install dependencies — auto-detects the package manager.
 */
export const installDependencies = async (projectPath = '.') => {
  const project = await detectProjectType(projectPath);

  if (!project) {
    logger.warn('No recognized project manifest found. Skipping dependency install.');
    return;
  }

  // Check if deps already installed (for types that have a local dep dir)
  if (project.depDir && await fs.pathExists(path.join(projectPath, project.depDir))) {
    return; // Already installed
  }

  console.log(chalk.blue(`📦 Installing dependencies... (${project.icon} ${project.label})`));
  logger.info(`Running: ${project.installCmd}`, { category: 'WORKFLOW' });

  try {
    execSync(project.installCmd, { cwd: projectPath, stdio: 'pipe' });
    console.log(chalk.green('✅ Dependencies installed successfully.'));
    logger.info('Dependencies installed successfully.');
  } catch (error) {
    console.error(chalk.red(`❌ Failed to install dependencies for ${project.label}.`));
    logger.error(`Dependency installation failed: ${error.message}`);
    throw error;
  }
};

/**
 * Get the dev start command for the project type.
 * Returns null if no dev command is applicable.
 */
export const getDevCommand = async (projectPath = '.') => {
  const project = await detectProjectType(projectPath);
  if (!project) return null;
  const cmd = await project.devCmdFn(projectPath);
  return cmd ? { cmd, label: project.label, icon: project.icon } : null;
};

/**
 * Run lint check — auto-detects the linter.
 */
export const runLint = async (projectPath = '.') => {
  const project = await detectProjectType(projectPath);
  if (!project) return;

  const lintCmd = await project.lintCmdFn(projectPath);
  if (!lintCmd) return; // No lint configured — skip silently

  console.log(chalk.blue('🔍 Running lint check...'));
  try {
    execSync(lintCmd, { cwd: projectPath, stdio: 'inherit' });
    console.log(chalk.green('✅ Lint check passed.'));
    logger.info('Lint check passed.');
  } catch {
    console.warn(chalk.yellow('⚠️ Lint check found issues.'));
    logger.warn('Lint check found issues.');
  }
};

export default {
  detectProjectType,
  validatePackageJson,
  installDependencies,
  getDevCommand,
  runLint
};
