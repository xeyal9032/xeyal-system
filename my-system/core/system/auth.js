import crypto from 'crypto';
import fs from 'fs-extra';
import path from 'path';

const USERS_FILE = path.resolve('config/users.json');

/**
 * Authentication Engine
 * Handles Hashing, Verification, and User Management.
 */
class AuthEngine {
    /**
     * Hash a password using scrypt
     */
    hashPassword(password) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.scryptSync(password, salt, 64).toString('hex');
        return `${salt}:${hash}`;
    }

    /**
     * Verify a password against a stored hash
     */
    verifyPassword(password, storedValue) {
        if (!storedValue || !storedValue.includes(':')) return false;
        const [salt, hash] = storedValue.split(':');
        const buffer = crypto.scryptSync(password, salt, 64);
        return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), buffer);
    }

    async getUsers() {
        if (!await fs.pathExists(USERS_FILE)) return {};
        return await fs.readJson(USERS_FILE);
    }

    async addUser(username, password) {
        const users = await this.getUsers();
        users[username] = this.hashPassword(password);
        await fs.writeJson(USERS_FILE, users, { spaces: 2 });
    }
}

const authEngine = new AuthEngine();
export default authEngine;
