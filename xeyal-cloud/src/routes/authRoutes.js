import express from 'express';
import { register, login, generateKey } from '../controllers/authController.js';
import { validateApiKey } from '../middleware/authMiddleware.js';

const router = express.Router();

// User Auth
router.post('/register', register);
router.post('/login', login);

// API Key Management (Requires Auth)
router.post('/keys', validateApiKey, generateKey);

export default router;
