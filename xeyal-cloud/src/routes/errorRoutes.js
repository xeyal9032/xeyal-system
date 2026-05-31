import express from 'express';
import { validateApiKey } from '../middleware/authMiddleware.js';
import { reportError, getErrors } from '../controllers/errorController.js';

const router = express.Router();

// Report a new error
router.post('/', validateApiKey, reportError);

// List errors for the user
router.get('/', validateApiKey, getErrors);

export default router;
