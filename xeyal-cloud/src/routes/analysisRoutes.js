import express from 'express';
import { validateApiKey } from '../middleware/authMiddleware.js';
import { analyzeError } from '../controllers/analysisController.js';

const router = express.Router();

// Analyze an existing error
router.post('/:errorId', validateApiKey, analyzeError);

export default router;
