import fs from 'fs-extra';
import path from 'path';

/**
 * Project Analyzer
 * Detects the context of the current project.
 */
class ProjectAnalyzer {
    async analyze(projectPath = '.') {
        const pkgPath = path.join(projectPath, 'package.json');
        
        if (!await fs.pathExists(pkgPath)) {
            return { framework: 'unknown', port: null };
        }

        const pkg = await fs.readJson(pkgPath);
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        
        let framework = 'vanilla';
        let port = 3000;
        let startCmd = 'npm start';

        if (deps['express']) { framework = 'express'; startCmd = 'npm start'; }
        if (deps['next']) { framework = 'nextjs'; port = 3000; startCmd = 'npm run dev'; }
        if (deps['@nestjs/core']) { framework = 'nestjs'; startCmd = 'npm run start:dev'; }
        if (deps['vite']) { framework = 'vite'; port = 5173; startCmd = 'npm run dev'; }
        if (deps['react'] && deps['react-scripts']) { framework = 'create-react-app'; port = 3000; startCmd = 'npm start'; }
        if (deps['vue'] && !deps['vite']) { framework = 'vue-cli'; port = 8080; startCmd = 'npm run serve'; }
        if (deps['@angular/core']) { framework = 'angular'; port = 4200; startCmd = 'npm start'; }

        // Find best starting script if multiple exist
        if (pkg.scripts) {
            if (pkg.scripts.dev) startCmd = 'npm run dev';
            else if (pkg.scripts.serve) startCmd = 'npm run serve';
        }

        // Search for port in env files or scripts
        const startScript = pkg.scripts?.[startCmd.replace('npm run ', '')] || '';
        const portMatch = startScript.match(/--port (\d+)/) || startScript.match(/PORT=(\d+)/);
        if (portMatch) port = parseInt(portMatch[1]);

        return {
            name: pkg.name || 'unnamed',
            framework,
            port,
            startCmd,
            scripts: Object.keys(pkg.scripts || {})
        };
    }
}

const projectAnalyzer = new ProjectAnalyzer();
export default projectAnalyzer;
