import fs from 'fs-extra';
import path from 'path';
import logger from './logger.js';
import chalk from 'chalk';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECTS_FILE = path.resolve(__dirname, '../../config/projects.json');

/**
 * Project Manager Core
 * Handles CRUD operations for developer projects.
 */
export const getProjects = async () => {
    try {
        if (!await fs.pathExists(PROJECTS_FILE)) {
            await fs.writeJson(PROJECTS_FILE, { active: null, projects: [] });
        }
        return await fs.readJson(PROJECTS_FILE);
    } catch (error) {
        logger.error(`Failed to read projects: ${error.message}`);
        return { active: null, projects: [] };
    }
};

export const saveProjects = async (data) => {
    try {
        await fs.writeJson(PROJECTS_FILE, data, { spaces: 2 });
    } catch (error) {
        logger.error(`Failed to save projects: ${error.message}`);
    }
};

export const addProject = async (name, projectPath) => {
    const data = await getProjects();
    const absolutePath = path.resolve(projectPath);
    
    // check for duplicates
    // check for duplicates
    const projectsList = data.projects || [];
    const exists = projectsList.find(p => p.name === name || p.path === absolutePath);
    if (exists) throw new Error(`Project with name "${name}" or path already exists.`);

    if (!data.projects) data.projects = [];
    data.projects.push({ name, path: absolutePath, addedAt: new Date().toISOString() });
    
    // If first project, set active
    if (!data.active) data.active = name;

    await saveProjects(data);
    logger.info(`Project added: ${name} at ${absolutePath}`);
};

export const switchProject = async (name) => {
    const data = await getProjects();
    const projectsList = data.projects || [];
    const project = projectsList.find(p => p.name === name);
    
    if (!project) throw new Error(`Project "${name}" not found.`);

    data.active = name;
    await saveProjects(data);
    logger.info(`Switched active project to: ${name}`);
    return project;
};

export const getActiveProject = async () => {
    const data = await getProjects();
    const projectsList = data.projects || [];
    return projectsList.find(p => p.name === data.active) || null;
};

export default {
    getProjects,
    addProject,
    switchProject,
    getActiveProject
};
